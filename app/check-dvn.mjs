#!/usr/bin/env node
/**
 * Check DVN configuration of DOS Bridge OApps on LayerZero V2.
 * Queries SendULN config for each (oapp, destination-chain) pair.
 */
import { createPublicClient, http, parseAbi, decodeAbiParameters } from 'viem';

// LayerZero V2 endpoints
const ENDPOINTS = {
  avalanche: {
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    endpoint: '0x1a44076050125825900e736c501f859c50fE728c',
    eid: 30106, // Avalanche EID
  },
  bsc: {
    rpc: 'https://bsc-dataseed.binance.org',
    endpoint: '0x1a44076050125825900e736c501f859c50fE728c',
    eid: 30102, // BSC EID
  },
  dos: {
    rpc: 'https://main.doschain.com',
    endpoint: '0x1a44076050125825900e736c501f859c50fE728c', // verify this
    eid: 30330, // DOS Chain EID (verify)
  },
};

// OApp contracts (bridge)
const OAPPS = {
  avalanche: '0xb1c1673dedd7094699F186122B0d38CCc62eddB4',
  bsc: '0x441Ce4D820501B01832D5F1EE82f043422eF4ed0',
  dos: '0xbd6743653cf679cc061aA7153750A3b34d3610a4',
};

const endpointAbi = parseAbi([
  'function getConfig(address _oapp, address _lib, uint32 _eid, uint32 _configType) view returns (bytes memory)',
  'function getSendLibrary(address _sender, uint32 _dstEid) view returns (address)',
  'function getReceiveLibrary(address _receiver, uint32 _srcEid) view returns (address, bool)',
]);

const CONFIG_TYPE_EXECUTOR = 1;
const CONFIG_TYPE_ULN = 2;

async function checkChain(chainName, sourceEid) {
  const cfg = ENDPOINTS[chainName];
  const oapp = OAPPS[chainName];

  console.log(`\n=== ${chainName.toUpperCase()} (${oapp}) ===`);

  const client = createPublicClient({ transport: http(cfg.rpc) });

  // For each OTHER chain, check config
  for (const [destName, destCfg] of Object.entries(ENDPOINTS)) {
    if (destName === chainName) continue;

    try {
      const sendLib = await client.readContract({
        address: cfg.endpoint,
        abi: endpointAbi,
        functionName: 'getSendLibrary',
        args: [oapp, destCfg.eid],
      });

      const configBytes = await client.readContract({
        address: cfg.endpoint,
        abi: endpointAbi,
        functionName: 'getConfig',
        args: [oapp, sendLib, destCfg.eid, CONFIG_TYPE_ULN],
      });

      // UlnConfig: {confirmations:u64, requiredDVNCount:u8, optionalDVNCount:u8, optionalDVNThreshold:u8, requiredDVNs:address[], optionalDVNs:address[]}
      const [decoded] = decodeAbiParameters(
        [{ type: 'tuple', components: [
          { name: 'confirmations', type: 'uint64' },
          { name: 'requiredDVNCount', type: 'uint8' },
          { name: 'optionalDVNCount', type: 'uint8' },
          { name: 'optionalDVNThreshold', type: 'uint8' },
          { name: 'requiredDVNs', type: 'address[]' },
          { name: 'optionalDVNs', type: 'address[]' },
        ]}],
        configBytes
      );

      console.log(`  → dst ${destName} (eid ${destCfg.eid}):`);
      console.log(`    confirmations: ${decoded.confirmations}`);
      console.log(`    required DVNs (${decoded.requiredDVNCount}): ${decoded.requiredDVNs.join(', ')}`);
      console.log(`    optional DVNs (${decoded.optionalDVNCount}, threshold ${decoded.optionalDVNThreshold}): ${decoded.optionalDVNs.join(', ') || '(none)'}`);

      const totalDVNs = decoded.requiredDVNCount + decoded.optionalDVNCount;
      if (totalDVNs <= 1) {
        console.log(`    ⚠️  SINGLE DVN - SAME VULNERABILITY AS KELPDAO`);
      } else if (decoded.requiredDVNCount === 1 && decoded.optionalDVNCount === 0) {
        console.log(`    ⚠️  1-of-1 REQUIRED - AT RISK`);
      } else {
        console.log(`    ✓ multi-DVN - safe`);
      }
    } catch (err) {
      console.log(`  → dst ${destName}: ERROR - ${err.message.slice(0, 100)}`);
    }
  }
}

for (const chain of ['avalanche', 'bsc', 'dos']) {
  await checkChain(chain);
}

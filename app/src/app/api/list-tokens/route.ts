import { NextResponse } from 'next/server';
import { createPublicClient, http, parseAbi, type Log } from 'viem';

const RPC_URL = 'https://main.doschain.com';
const TREX_FACTORY = '0x7979539fb9eb7f1c92221f278a92812967303643' as const;

// TREXFactory was deployed after block 2,000,000. Scan from there forward.
const START_BLOCK = BigInt(2_000_000);
const CHUNK_SIZE = BigInt(10_000);

const dosChain = {
  id: 7979,
  name: 'DOS Chain',
  nativeCurrency: { name: 'DOS', symbol: 'DOS', decimals: 18 },
  rpcUrls: { default: { http: [RPC_URL] } },
} as const;

const factoryAbi = parseAbi([
  'event TREXSuiteDeployed(address indexed _token, address _ir, address _irs, address _tir, address _ctr, address _mc, string indexed _salt)',
]);

const tokenAbi = parseAbi([
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function decimals() view returns (uint8)',
]);

export const revalidate = 30;

export async function GET() {
  try {
    const client = createPublicClient({
      chain: dosChain,
      transport: http(RPC_URL),
    });

    // Get latest block, scan in chunks from START_BLOCK to latest
    const latestBlock = await client.getBlockNumber();
    type FactoryLog = Awaited<ReturnType<typeof client.getLogs<typeof factoryAbi[0], undefined, true>>>[number];
    const allLogs: FactoryLog[] = [];

    let fromBlock = START_BLOCK;
    while (fromBlock <= latestBlock) {
      const toBlock = fromBlock + CHUNK_SIZE - BigInt(1) > latestBlock
        ? latestBlock
        : fromBlock + CHUNK_SIZE - BigInt(1);

      try {
        const logs = await client.getLogs({
          address: TREX_FACTORY,
          event: factoryAbi[0],
          fromBlock,
          toBlock,
        });
        allLogs.push(...logs);
      } catch {
        // Skip failed chunks, continue scanning
      }
      fromBlock = toBlock + BigInt(1);
    }

    const tokens = await Promise.all(
      allLogs.map(async (log) => {
        const args = (log as Log & { args: { _token: `0x${string}`; _ir: `0x${string}`; _mc: `0x${string}` } }).args;
        const tokenAddr = args._token;
        try {
          const [name, symbol, totalSupply, decimals] = await Promise.all([
            client.readContract({ address: tokenAddr, abi: tokenAbi, functionName: 'name' }),
            client.readContract({ address: tokenAddr, abi: tokenAbi, functionName: 'symbol' }),
            client.readContract({ address: tokenAddr, abi: tokenAbi, functionName: 'totalSupply' }),
            client.readContract({ address: tokenAddr, abi: tokenAbi, functionName: 'decimals' }),
          ]);

          return {
            address: tokenAddr,
            name: name as string,
            symbol: symbol as string,
            totalSupply: (totalSupply as bigint).toString(),
            decimals: Number(decimals),
            identityRegistry: args._ir,
            compliance: args._mc,
            blockNumber: Number(log.blockNumber),
            txHash: log.transactionHash,
          };
        } catch {
          return null;
        }
      })
    );

    return NextResponse.json({
      tokens: tokens.filter(Boolean),
      factory: TREX_FACTORY,
      chainId: 7979,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg, tokens: [] }, { status: 500 });
  }
}

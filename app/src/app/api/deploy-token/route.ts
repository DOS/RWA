import { NextRequest, NextResponse } from 'next/server';
import { createWalletClient, createPublicClient, http, parseEventLogs, parseAbi, type Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

const DEPLOYER_PK = process.env.DEPLOYER_PRIVATE_KEY as Hex | undefined;
const RPC_URL = 'https://main.doschain.com';
const TREX_FACTORY = '0x7979539fb9eb7f1c92221f278a92812967303643' as const;
const CLAIM_ISSUER = '0x726B089560bd88059c804c3F0895A6023CDE3C73' as const;
const DEPLOYER_ONCHAINID = '0x3a55529D46EF3C82D48A3D4f6685892662B2AD10' as const;
const VN_COUNTRY_CODE = 704;

const dosChain = {
  id: 7979,
  name: 'DOS Chain',
  nativeCurrency: { name: 'DOS', symbol: 'DOS', decimals: 18 },
  rpcUrls: { default: { http: [RPC_URL] } },
} as const;

const trexFactoryAbi = [
  {
    type: 'function',
    name: 'deployTREXSuite',
    inputs: [
      { name: '_salt', type: 'string' },
      {
        name: '_tokenDetails', type: 'tuple',
        components: [
          { name: 'owner', type: 'address' },
          { name: 'name', type: 'string' },
          { name: 'symbol', type: 'string' },
          { name: 'decimals', type: 'uint8' },
          { name: 'irs', type: 'address' },
          { name: 'ONCHAINID', type: 'address' },
          { name: 'irAgents', type: 'address[]' },
          { name: 'tokenAgents', type: 'address[]' },
          { name: 'complianceModules', type: 'address[]' },
          { name: 'complianceSettings', type: 'bytes[]' },
        ],
      },
      {
        name: '_claimDetails', type: 'tuple',
        components: [
          { name: 'claimTopics', type: 'uint256[]' },
          { name: 'issuers', type: 'address[]' },
          { name: 'issuerClaims', type: 'uint256[][]' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getToken',
    inputs: [{ name: '_salt', type: 'string' }],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'TREXSuiteDeployed',
    inputs: [
      { name: '_token', type: 'address', indexed: true },
      { name: '_ir', type: 'address', indexed: false },
      { name: '_irs', type: 'address', indexed: false },
      { name: '_tir', type: 'address', indexed: false },
      { name: '_ctr', type: 'address', indexed: false },
      { name: '_mc', type: 'address', indexed: false },
      { name: '_salt', type: 'string', indexed: true },
    ],
    anonymous: false,
  },
] as const;

const irAbi = parseAbi([
  'function registerIdentity(address _userAddress, address _identity, uint16 _country)',
]);

const tokenAbi = parseAbi([
  'function unpause()',
  'function mint(address _to, uint256 _amount)',
  'function totalSupply() view returns (uint256)',
]);

const ZERO = '0x0000000000000000000000000000000000000000' as const;

export async function POST(request: NextRequest) {
  if (!DEPLOYER_PK) {
    return NextResponse.json({ error: 'Deployer not configured' }, { status: 503 });
  }

  try {
    const { name, symbol, totalSupply } = await request.json();
    if (!name || !symbol) {
      return NextResponse.json({ error: 'Missing name or symbol' }, { status: 400 });
    }

    const mintAmount = totalSupply ? BigInt(Number(totalSupply) || 0) : BigInt(0);

    // Unique salt from symbol + timestamp
    const salt = `${symbol.toLowerCase()}-${Date.now()}`;

    const account = privateKeyToAccount(`0x${DEPLOYER_PK.replace(/^0x/, '')}`);

    const walletClient = createWalletClient({
      account,
      chain: dosChain,
      transport: http(RPC_URL),
    });

    const publicClient = createPublicClient({
      chain: dosChain,
      transport: http(RPC_URL),
    });

    const existing = await publicClient.readContract({
      address: TREX_FACTORY,
      abi: trexFactoryAbi,
      functionName: 'getToken',
      args: [salt],
    });
    if (existing !== ZERO) {
      return NextResponse.json({ error: 'Salt already used' }, { status: 409 });
    }

    const deployer = account.address;

    // --- Step 1: Deploy TREX suite ---
    const deployTx = await walletClient.writeContract({
      address: TREX_FACTORY,
      abi: trexFactoryAbi,
      functionName: 'deployTREXSuite',
      args: [
        salt,
        {
          owner: deployer,
          name,
          symbol,
          decimals: 0,
          irs: ZERO,
          ONCHAINID: ZERO,
          irAgents: [deployer],
          tokenAgents: [deployer],
          complianceModules: [],
          complianceSettings: [],
        },
        {
          claimTopics: [BigInt(1)], // KYC
          issuers: [CLAIM_ISSUER],
          issuerClaims: [[BigInt(1)]],
        },
      ],
    });

    const deployReceipt = await publicClient.waitForTransactionReceipt({ hash: deployTx });

    const deployLogs = parseEventLogs({
      abi: trexFactoryAbi,
      eventName: 'TREXSuiteDeployed',
      logs: deployReceipt.logs,
    });

    const event = deployLogs[0]?.args;
    const tokenAddr = event?._token;
    const irAddr = event?._ir;

    if (!tokenAddr || !irAddr) {
      return NextResponse.json({ error: 'Deploy event not found' }, { status: 500 });
    }

    // --- Step 2: Register deployer in new IR ---
    const registerTx = await walletClient.writeContract({
      address: irAddr,
      abi: irAbi,
      functionName: 'registerIdentity',
      args: [deployer, DEPLOYER_ONCHAINID, VN_COUNTRY_CODE],
    });
    await publicClient.waitForTransactionReceipt({ hash: registerTx });

    // --- Step 3: Unpause token ---
    const unpauseTx = await walletClient.writeContract({
      address: tokenAddr,
      abi: tokenAbi,
      functionName: 'unpause',
    });
    await publicClient.waitForTransactionReceipt({ hash: unpauseTx });

    // --- Step 4: Mint totalSupply to deployer ---
    let mintTx: Hex | null = null;
    if (mintAmount > BigInt(0)) {
      mintTx = await walletClient.writeContract({
        address: tokenAddr,
        abi: tokenAbi,
        functionName: 'mint',
        args: [deployer, mintAmount],
      });
      await publicClient.waitForTransactionReceipt({ hash: mintTx });
    }

    return NextResponse.json({
      txHash: deployTx,
      registerTxHash: registerTx,
      unpauseTxHash: unpauseTx,
      mintTxHash: mintTx,
      blockNumber: Number(deployReceipt.blockNumber),
      token: tokenAddr,
      identityRegistry: irAddr,
      identityRegistryStorage: event?._irs,
      trustedIssuersRegistry: event?._tir,
      claimTopicsRegistry: event?._ctr,
      modularCompliance: event?._mc,
      mintedAmount: mintAmount.toString(),
      salt,
      factory: TREX_FACTORY,
      deployer,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

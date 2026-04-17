import { NextRequest, NextResponse } from 'next/server';
import { createWalletClient, createPublicClient, http, parseEventLogs, type Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

const DEPLOYER_PK = process.env.DEPLOYER_PRIVATE_KEY as Hex | undefined;
const RPC_URL = 'https://main.doschain.com';
const TREX_FACTORY = '0x7979539fb9eb7f1c92221f278a92812967303643' as const;

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

const ZERO = '0x0000000000000000000000000000000000000000' as const;

export async function POST(request: NextRequest) {
  if (!DEPLOYER_PK) {
    return NextResponse.json({ error: 'Deployer not configured' }, { status: 503 });
  }

  try {
    const { name, symbol } = await request.json();
    if (!name || !symbol) {
      return NextResponse.json({ error: 'Missing name or symbol' }, { status: 400 });
    }

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

    // Check if salt already used
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

    const txHash = await walletClient.writeContract({
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
          issuers: [],
          issuerClaims: [],
        },
      ],
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

    // Parse TREXSuiteDeployed event
    const logs = parseEventLogs({
      abi: trexFactoryAbi,
      eventName: 'TREXSuiteDeployed',
      logs: receipt.logs,
    });

    const event = logs[0]?.args;

    return NextResponse.json({
      txHash,
      blockNumber: Number(receipt.blockNumber),
      token: event?._token,
      identityRegistry: event?._ir,
      identityRegistryStorage: event?._irs,
      trustedIssuersRegistry: event?._tir,
      claimTopicsRegistry: event?._ctr,
      modularCompliance: event?._mc,
      salt,
      factory: TREX_FACTORY,
      deployer,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

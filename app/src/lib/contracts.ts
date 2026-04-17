// Contract addresses on DOS Chain (7979)
export const CONTRACTS = {
  // Security Token Factory (placeholder — deploy with Task 14+)
  SECURITY_TOKEN_FACTORY: "0x0000000000000000000000000000000000000000" as const,
  // Identity Registry (placeholder)
  IDENTITY_REGISTRY: "0x0000000000000000000000000000000000000000" as const,
  // Compliance Module (placeholder)
  COMPLIANCE_MODULE: "0x0000000000000000000000000000000000000000" as const,
} as const;

// Minimal ERC-3643 ABI for reading token info
export const SECURITY_TOKEN_ABI = [
  {
    inputs: [],
    name: "name",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

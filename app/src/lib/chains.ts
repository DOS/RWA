import { defineChain } from "viem";

export const dosChain = defineChain({
  id: 7979,
  name: "DOS Chain",
  nativeCurrency: { name: "DOS", symbol: "DOS", decimals: 18 },
  rpcUrls: { default: { http: ["https://main.doschain.com"] } },
  blockExplorers: { default: { name: "DOScan", url: "https://doscan.io" } },
});

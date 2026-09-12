import { createConfig, http } from "wagmi";
import { defineChain } from "viem";

export const botChain = defineChain({
  id: 677,
  name: "BOT Chain",
  nativeCurrency: {
    name: "BOT",
    symbol: "BOT",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.botchain.ai"] },
  },
  blockExplorers: {
    default: { name: "BOTscan", url: "https://scan.botchain.ai" },
  },
});

export const config = createConfig({
  chains: [botChain],

  transports: {
    [botChain.id]: http(),
  },
});


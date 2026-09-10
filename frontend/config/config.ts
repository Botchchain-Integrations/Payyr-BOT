import { createConfig, http } from "wagmi";
import { defineChain } from "viem";

export const botTestnet = defineChain({
  id: 968,
  name: "BOT Chain Testnet",
  nativeCurrency: {
    name: "BOT",
    symbol: "BOT",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.bohr.life"] },
  },
  blockExplorers: {
    default: { name: "BOTscan", url: "https://scan.bohr.life" },
  },
  testnet: true,
});

export const config = createConfig({
  chains: [botTestnet],

  transports: {
    [botTestnet.id]: http(),
  },
});


import { createConfig, http } from "wagmi";
import { botChain, botTestnet, supportedChains } from "./chains";

export const config = createConfig({
  chains: [...supportedChains],

  transports: {
    [botChain.id]: http(),
    [botTestnet.id]: http(),
  },
});
import { useChainId } from "wagmi";
import { botChain, botTestnet } from "./chains";

const NETWORK_ADDRESSES = {
  [botChain.id]: {
    USDT_ADDRESS:
      (process.env.NEXT_PUBLIC_MAINNET_USDT_ADDRESS ||
        "0xaBabc7Ddc03e501d190C676BF3d92ef0e6e87a3C") as `0x${string}`,
    EMPLOYEE_REGISTRY_ADDRESS:
      (process.env.NEXT_PUBLIC_MAINNET_EMPLOYEE_REGISTRY_ADDRESS ||
        "0x3581079c6318a8119A2F4e765a1e452E51553B94") as `0x${string}`,
    PAYROLL_MANAGER_ADDRESS:
      (process.env.NEXT_PUBLIC_MAINNET_PAYROLL_MANAGER_ADDRESS ||
        "0x378087B4cE8fAd89Ff21d930572594EC86CB910f") as `0x${string}`,
  },
  [botTestnet.id]: {
    USDT_ADDRESS:
      (process.env.NEXT_PUBLIC_TESTNET_USDT_ADDRESS ||
        "0x75edC9335175Fc0552D51D48439F229c10420fe3") as `0x${string}`,
    EMPLOYEE_REGISTRY_ADDRESS:
      (process.env.NEXT_PUBLIC_TESTNET_EMPLOYEE_REGISTRY_ADDRESS ||
        "0x86754C44f5ACA0C6B0d9B6106048f4c07Bec89c4") as `0x${string}`,
    PAYROLL_MANAGER_ADDRESS:
      (process.env.NEXT_PUBLIC_TESTNET_PAYROLL_MANAGER_ADDRESS ||
        "0x49F96F3d59f694346F446B681642CFC707a7D6BA") as `0x${string}`,
  },
} as const;

/** Hook that returns contract addresses for the current wagmi chain. */
export function useContracts() {
  const chainId = useChainId();
  const addresses =
    NETWORK_ADDRESSES[chainId as keyof typeof NETWORK_ADDRESSES] ??
    NETWORK_ADDRESSES[botChain.id];
  return {
    USDT_ADDRESS: addresses.USDT_ADDRESS,
    EMPLOYEE_REGISTRY_ADDRESS: addresses.EMPLOYEE_REGISTRY_ADDRESS,
    PAYROLL_MANAGER_ADDRESS: addresses.PAYROLL_MANAGER_ADDRESS,
  };
}

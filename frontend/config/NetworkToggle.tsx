"use client";

import { useEffect } from "react";
import { useWallets } from "@privy-io/react-auth";
import { useChainId, useConfig } from "wagmi";
import { switchChain } from "wagmi/actions";
import { botChain, botTestnet } from "@/config/chains";

const STORAGE_KEY = "payyr_network";

const NETWORKS = [
  {
    id: botTestnet.id,
    label: "TESTNET",
    rpcUrl: botTestnet.rpcUrls.default.http[0],
    explorer: botTestnet.blockExplorers?.default?.url ?? "https://scan.bohr.life",
    activeClass: "bg-gradient-to-r from-[#10A37F] to-[#15DCAC] text-white",
  },
  {
    id: botChain.id,
    label: "MAINNET",
    rpcUrl: botChain.rpcUrls.default.http[0],
    explorer: botChain.blockExplorers?.default?.url ?? "https://scan.botchain.ai",
    activeClass: "bg-gradient-to-r from-[#A4EF6B] to-[#10A37F] text-white",
  },
] as const;

export default function NetworkToggle() {
  const activeChainId = useChainId();
  const wagmiConfig = useConfig();
  const { wallets } = useWallets();

  const applyChain = async (chainId: number) => {
    // Prefer switching the connected privy/embedded wallet chain.
    const wallet = wallets[0];
    if (wallet) {
      try {
        await wallet.switchChain(chainId);
        return;
      } catch (error) {
        console.error("Failed to switch wallet network:", error);
      }
    }

    // Fallback: update the wagmi chain directly for read-only/public calls.
    try {
      await switchChain(wagmiConfig, { chainId });
    } catch (error) {
      console.error("Failed to switch wagmi chain:", error);
    }
  };

  // Restore the user's selected network on reload (wagmi starts on mainnet).
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (!saved || !/^\d+$/.test(saved)) return;
    const savedChainId = Number(saved);
    if (savedChainId !== activeChainId) {
      applyChain(savedChainId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = async (chainId: number) => {
    if (chainId === activeChainId) return;
    window.localStorage.setItem(STORAGE_KEY, String(chainId));
    await applyChain(chainId);
  };

  return (
    <div
      className="flex items-center rounded-lg border border-gray-700 bg-gray-900/80 p-0.5 text-[11px] font-semibold"
      role="group"
      aria-label="Select network"
    >
      {NETWORKS.map((network) => (
        <button
          key={network.id}
          type="button"
          onClick={() => handleSelect(network.id)}
          className={`px-2.5 py-1 rounded-md transition-all text-gray-300 hover:text-white ${
            activeChainId === network.id ? network.activeClass : ""
          }`}
        >
          {network.label}
        </button>
      ))}
    </div>
  );
}
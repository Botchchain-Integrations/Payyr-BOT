"use client";
import { WalletConnect } from "./WalletConnect";
import NetworkToggle from "@/config/NetworkToggle";

export function Navbar() {
  return (
    <div className="border-b bg-white border-gray-200">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-lg md:text-2xl font-semibold text-gray-900">
            Payyr
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <NetworkToggle />
          <WalletConnect />
        </div>
      </div>
    </div>
  );
}

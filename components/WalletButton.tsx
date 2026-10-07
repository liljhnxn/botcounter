"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { botchainTestnet } from "@/lib/botchain";
import { Wallet, LogOut, AlertTriangle, ArrowLeftRight, CheckCircle2 } from "lucide-react";

export function WalletButton() {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-36 rounded-xl bg-surfaceBorder/50 animate-pulse" />
    );
  }

  // Not connected
  if (!isConnected || !address) {
    const injectedConnector = connectors[0];
    return (
      <button
        onClick={() => injectedConnector && connect({ connector: injectedConnector })}
        disabled={isConnecting}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
      >
        <Wallet className="w-4 h-4 text-black" />
        <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
      </button>
    );
  }

  const isWrongNetwork = chain?.id !== botchainTestnet.id;

  // Connected on wrong network
  if (isWrongNetwork) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => switchChain({ chainId: botchainTestnet.id })}
          disabled={isSwitching}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-medium transition-all"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{isSwitching ? "Switching..." : "Switch to Botchain"}</span>
        </button>
        <button
          onClick={() => disconnect()}
          title="Disconnect Wallet"
          className="p-2 rounded-xl bg-surface border border-surfaceBorder hover:border-red-500/40 text-gray-400 hover:text-red-400 transition-all"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Formatted address: 0x1234...5678
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-cyan-500/30 text-gray-200 text-xs font-mono shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>{shortAddress}</span>
      </div>
      <button
        onClick={() => disconnect()}
        title="Disconnect Wallet"
        className="p-2 rounded-xl bg-surface border border-surfaceBorder hover:border-red-500/40 text-gray-400 hover:text-red-400 transition-all"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}

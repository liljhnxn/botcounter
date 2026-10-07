"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { botCounterAbi, BOT_COUNTER_ADDRESS, isContractConfigured } from "@/lib/contract";
import { botchainTestnet } from "@/lib/botchain";
import { Plus, Minus, ExternalLink, Loader2, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";

type TxStatus = "idle" | "awaiting_wallet" | "submitted" | "confirmed" | "rejected" | "failed";

export function CounterCard() {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected, chain } = useAccount();

  const [txStatus, setTxStatus] = useState<TxStatus>("idle");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const {
    data: countData,
    isLoading: isCountLoading,
    isError: isReadError,
    refetch,
  } = useReadContract({
    address: BOT_COUNTER_ADDRESS,
    abi: botCounterAbi,
    functionName: "getCount",
    query: {
      enabled: isContractConfigured,
      refetchInterval: 5000,
    },
  });

  const { writeContractAsync } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isReceiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Watch confirmation state
  useEffect(() => {
    if (isConfirming && txHash) {
      setTxStatus("submitted");
      setStatusMessage("Transaction submitted...");
    }
  }, [isConfirming, txHash]);

  useEffect(() => {
    if (isConfirmed && txHash) {
      setTxStatus("confirmed");
      setStatusMessage("Transaction confirmed!");
      refetch();
    }
  }, [isConfirmed, txHash, refetch]);

  useEffect(() => {
    if (isReceiptError) {
      setTxStatus("failed");
      setStatusMessage("Transaction failed. Please try again.");
    }
  }, [isReceiptError]);

  const isWrongNetwork = isConnected && chain?.id !== botchainTestnet.id;
  const isPending = txStatus === "awaiting_wallet" || isConfirming;

  const currentCount = typeof countData === "bigint" ? countData : 0n;
  const displayCount = currentCount.toString();

  const handleAction = async (action: "increment" | "decrement") => {
    if (!isContractConfigured || !BOT_COUNTER_ADDRESS) {
      setTxStatus("failed");
      setStatusMessage("Counter contract not configured yet.");
      return;
    }

    if (!isConnected) {
      setTxStatus("failed");
      setStatusMessage("Please connect your wallet first.");
      return;
    }

    if (isWrongNetwork) {
      setTxStatus("failed");
      setStatusMessage("Please switch to Botchain Testnet.");
      return;
    }

    if (action === "decrement" && currentCount <= 0n) {
      setTxStatus("failed");
      setStatusMessage("Counter is already at 0.");
      return;
    }

    try {
      setTxStatus("awaiting_wallet");
      setStatusMessage("Confirm transaction in your wallet...");
      setTxHash(undefined);

      const hash = await writeContractAsync({
        address: BOT_COUNTER_ADDRESS,
        abi: botCounterAbi,
        functionName: action,
      });

      setTxHash(hash);
      setTxStatus("submitted");
      setStatusMessage("Transaction submitted...");
    } catch (err: unknown) {
      const errorStr = (err as Error)?.message || "";
      const isUserRejected =
        errorStr.toLowerCase().includes("user rejected") ||
        errorStr.toLowerCase().includes("user denied") ||
        errorStr.toLowerCase().includes("rejected the request");

      if (isUserRejected) {
        setTxStatus("rejected");
        setStatusMessage("Transaction rejected.");
      } else {
        setTxStatus("failed");
        setStatusMessage("Transaction failed. Please try again.");
      }
    }
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-surface/80 border border-surfaceBorder animate-pulse h-80" />
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Contract not configured banner */}
      {!isContractConfigured && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-200">Contract not configured</p>
            <p className="text-xs text-amber-300/80 mt-0.5">
              Counter contract not configured yet. Configure <code className="text-amber-200 font-mono">NEXT_PUBLIC_BOT_COUNTER_ADDRESS</code> in <code className="text-amber-200 font-mono">.env</code>.
            </p>
          </div>
        </div>
      )}

      {/* Main Counter Card */}
      <div className="relative rounded-3xl bg-surface/90 border border-surfaceBorder/80 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30">
        {/* Glow ambient background */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Label */}
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400/80 mb-3 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40">
            Current Count
          </span>

          {/* Number Display */}
          <div className="my-6 min-h-[5rem] flex items-center justify-center">
            {isCountLoading && isContractConfigured ? (
              <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
            ) : isReadError ? (
              <span className="text-sm text-red-400 font-medium">Failed to read counter</span>
            ) : (
              <span className="text-7xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-sm font-mono select-none">
                {displayCount}
              </span>
            )}
          </div>

          {/* Counter Actions */}
          <div className="grid grid-cols-2 gap-4 w-full mt-4">
            {/* Decrement Button */}
            <button
              id="decrement-button"
              onClick={() => handleAction("decrement")}
              disabled={
                isPending ||
                currentCount === 0n ||
                !isConnected ||
                isWrongNetwork ||
                !isContractConfigured
              }
              className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-surfaceBorder/70 hover:bg-surfaceBorder text-white font-semibold text-base transition-all duration-200 border border-white/5 active:scale-95 disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100 group"
            >
              <Minus className="w-5 h-5 text-gray-300 group-hover:text-white" />
              <span>Decrement</span>
            </button>

            {/* Increment Button */}
            <button
              id="increment-button"
              onClick={() => handleAction("increment")}
              disabled={
                isPending ||
                !isConnected ||
                isWrongNetwork ||
                !isContractConfigured
              }
              className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-base transition-all duration-200 shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100 group"
            >
              <Plus className="w-5 h-5 text-black" />
              <span>Increment</span>
            </button>
          </div>

          {/* Wallet guidance message if not connected */}
          {!isConnected && isContractConfigured && (
            <p className="text-xs text-gray-400 mt-4">
              Connect your wallet above to increment or decrement the on-chain counter.
            </p>
          )}

          {/* Wrong network warning */}
          {isConnected && isWrongNetwork && (
            <p className="text-xs text-amber-400 mt-4">
              Please switch to Botchain Testnet to send transactions.
            </p>
          )}

          {/* Transaction State Feedback */}
          {txStatus !== "idle" && (
            <div
              className={`w-full mt-6 p-4 rounded-2xl border text-sm transition-all duration-300 ${
                txStatus === "awaiting_wallet" || txStatus === "submitted"
                  ? "bg-cyan-950/30 border-cyan-500/30 text-cyan-200"
                  : txStatus === "confirmed"
                  ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-200"
                  : txStatus === "rejected"
                  ? "bg-amber-950/30 border-amber-500/30 text-amber-200"
                  : "bg-red-950/30 border-red-500/30 text-red-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {txStatus === "awaiting_wallet" && (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin flex-shrink-0" />
                )}
                {txStatus === "submitted" && (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin flex-shrink-0" />
                )}
                {txStatus === "confirmed" && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                )}
                {txStatus === "rejected" && (
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                )}
                {txStatus === "failed" && (
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                )}
                <span className="font-medium">{statusMessage}</span>
              </div>

              {/* Botchain Explorer Link */}
              {txHash && (
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">
                    Tx: {txHash.slice(0, 10)}...{txHash.slice(-8)}
                  </span>
                  <a
                    href={`https://scan.bohr.life/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium underline-offset-4 hover:underline"
                  >
                    <span>View on Botchain Explorer</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

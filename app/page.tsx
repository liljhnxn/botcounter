import { WalletButton } from "@/components/WalletButton";
import { CounterCard } from "@/components/CounterCard";
import { BOT_COUNTER_ADDRESS } from "@/lib/contract";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#08090d] bg-grid-pattern overflow-hidden">
      {/* Glow gradient highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full border-b border-surfaceBorder/60 bg-surface/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-emerald-500/20 border border-emerald-500/30 flex items-center justify-center bg-black">
              <img
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">BotCounter</h1>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400">
                  Mainnet
                </span>
              </div>
              <p className="text-xs text-gray-400">On-chain counter built on BOT Chain</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* BOT Chain Mainnet Network Indicator & Explorer Link */}
            <a
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface hover:bg-surface/80 border border-surfaceBorder hover:border-emerald-500/40 text-xs text-gray-300 transition-all group"
              title="Open BOT Chain explorer"
            >
              <img
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                className="w-4 h-4 rounded-sm object-cover"
              />
              <span className="font-medium group-hover:text-white transition-colors">BOT Chain</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">677</span>
              <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </a>

            {/* Wallet Button */}
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl flex flex-col items-center">
          {/* Mobile Mainnet Indicator & Explorer Link */}
          <a
            href="https://scan.botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-surfaceBorder text-xs text-gray-300"
          >
            <img
              src="/botchain-logo.png"
              alt="BOT Chain Logo"
              className="w-4 h-4 rounded-sm object-cover"
            />
            <span className="font-medium">BOT Chain Mainnet (Chain ID 677)</span>
            <ExternalLink className="w-3 h-3 text-emerald-400" />
          </a>

          {/* Counter Card */}
          <CounterCard />

          {/* BOT Chain Ecosystem Section */}
          <div className="w-full max-w-md mt-8 p-5 rounded-3xl bg-surface/70 border border-surfaceBorder/80 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-surfaceBorder/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-black shadow-sm">
                  <img
                    src="/botchain-logo.png"
                    alt="BOT Chain Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">BOT Chain Ecosystem</h3>
                  <p className="text-[11px] text-gray-400">Chain ID: 677 • Native: BOT • 150M Supply</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Live
              </span>
            </div>

            {/* Mainnet Contract Address View */}
            <div className="mb-3.5 p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-1">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400">
                Mainnet Smart Contract
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-emerald-400 break-all select-all font-medium">
                  {BOT_COUNTER_ADDRESS}
                </span>
                <a
                  href={`https://scan.botchain.ai/address/${BOT_COUNTER_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-emerald-300 font-medium whitespace-nowrap transition-colors"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="https://botchain.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-surfaceBorder/30 hover:bg-surfaceBorder/60 border border-white/5 hover:border-emerald-500/40 text-xs font-medium text-gray-200 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <img
                    src="/botchain-logo.png"
                    alt="BOT Chain Logo"
                    className="w-4 h-4 rounded-sm object-cover flex-shrink-0"
                  />
                  <span>BOT Chain website</span>
                </div>
                <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
              </a>

              <a
                href="https://scan.botchain.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-surfaceBorder/30 hover:bg-surfaceBorder/60 border border-white/5 hover:border-emerald-500/40 text-xs font-medium text-gray-200 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <img
                    src="/botchain-logo.png"
                    alt="BOT Chain Logo"
                    className="w-4 h-4 rounded-sm object-cover flex-shrink-0"
                  />
                  <span>BOT Chain explorer</span>
                </div>
                <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-surfaceBorder/40 bg-surface/30 backdrop-blur-sm py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-black">
              <img
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-white">BOT Chain</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">Native Token: BOT</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 font-medium"
            >
              <img
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                className="w-3.5 h-3.5 rounded-sm object-cover"
              />
              <span>BOT Chain website</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <span className="text-gray-600 hidden sm:inline">|</span>

            <a
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 font-medium"
            >
              <img
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                className="w-3.5 h-3.5 rounded-sm object-cover"
              />
              <span>BOT Chain explorer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { WalletButton } from "@/components/WalletButton";
import { CounterCard } from "@/components/CounterCard";
import { Cpu, ExternalLink, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#08090d] bg-grid-pattern overflow-hidden">
      {/* Glow gradient highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full border-b border-surfaceBorder/60 bg-surface/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Cpu className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">BotCounter</h1>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-gray-400">A simple on-chain counter on Botchain</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Botchain Testnet Network Indicator */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-surfaceBorder text-xs text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-medium">Botchain Testnet</span>
              <span className="text-[10px] font-mono text-gray-500 bg-surfaceBorder/60 px-1.5 py-0.5 rounded">968</span>
            </div>

            {/* Wallet Button */}
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl flex flex-col items-center">
          {/* Mobile Testnet Indicator */}
          <div className="sm:hidden mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-surfaceBorder text-xs text-gray-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-medium">Botchain Testnet (Chain ID 968)</span>
          </div>

          {/* Counter Card */}
          <CounterCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-surfaceBorder/40 bg-surface/30 backdrop-blur-sm py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <a
              href="https://scan.bohr.life"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyan-400 transition-colors inline-flex items-center gap-1 font-medium"
            >
              Botchain Testnet
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>• Native Token: BOT</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://scan.bohr.life"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors inline-flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              Explorer: scan.bohr.life
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

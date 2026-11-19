import React from "react";
import { Search, ShoppingBag, Heart, Star, Smartphone, Tag } from "lucide-react";

export function GebeyaMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[260px] rounded-[32px] border-[4px] border-slate-700/60 bg-[#090d16] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(0,255,209,0.1)] transition-transform duration-300 hover:scale-[1.02]">
      {/* Speaker / Dynamic Island notch */}
      <div className="mx-auto mb-3 h-3 w-16 rounded-full bg-slate-800/80" />

      {/* Mobile Screen content */}
      <div className="space-y-3 font-sans text-xs">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-sm font-bold text-white">
              Gebeya<span className="text-[#00ffd1]">Now</span>
            </span>
            <p className="font-mono text-[9px] text-slate-400">Addis Marketplace</p>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
            <ShoppingBag size={13} />
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] text-slate-400">
          <Search size={11} />
          <span>Search products, electronics...</span>
        </div>

        {/* Categories */}
        <div className="flex gap-1 overflow-x-auto pb-1 text-[9px] font-mono">
          <span className="rounded-full bg-[#00ffd1] px-2 py-0.5 font-bold text-slate-950">
            Featured
          </span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-slate-300">
            Tech
          </span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-slate-300">
            Crafts
          </span>
        </div>

        {/* Product Cards mini grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 space-y-1">
            <div className="h-16 w-full rounded-lg bg-gradient-to-tr from-cyan-950 to-slate-800 flex items-center justify-center text-[10px] text-[#00ffd1]">
              🎧 Audio
            </div>
            <p className="font-semibold text-white truncate text-[11px]">Pro Wireless</p>
            <p className="font-mono text-[10px] font-bold text-[#00ffd1]">3,450 ETB</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 space-y-1">
            <div className="h-16 w-full rounded-lg bg-gradient-to-tr from-purple-950 to-slate-800 flex items-center justify-center text-[10px] text-purple-300">
              ☕ Habesha Art
            </div>
            <p className="font-semibold text-white truncate text-[11px]">Ceramic Set</p>
            <p className="font-mono text-[10px] font-bold text-amber-300">1,200 ETB</p>
          </div>
        </div>

        {/* Flutter framework badge */}
        <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/40 px-2 py-1 text-[9px] font-mono text-slate-400">
          <span className="flex items-center gap-1 text-slate-300">
            <Smartphone size={10} className="text-[#00ffd1]" /> Flutter Native UI
          </span>
          <span className="text-[#00ffd1]">Clean Architecture</span>
        </div>
      </div>
    </div>
  );
}

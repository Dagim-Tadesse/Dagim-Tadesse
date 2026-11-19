import React from "react";
import { Wallet, ArrowDownRight, ArrowUpRight, Database, Check } from "lucide-react";

export function SpendWiseWidget() {
  return (
    <div className="w-full space-y-3 rounded-xl border border-white/[0.08] bg-black/40 p-3.5 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <Wallet size={12} />
          </div>
          <div>
            <span className="font-mono text-xs font-semibold text-white">
              SpendWise Dashboard
            </span>
            <span className="ml-2 rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-mono text-emerald-300">
              Live Daily Driver
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
          <Database size={10} className="text-[#00ffd1]" />
          <span>Supabase Synced</span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
          <span className="text-[10px] text-slate-400">Monthly Budget</span>
          <p className="mt-0.5 text-base font-bold text-white">$1,200.00</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
          <span className="text-[10px] text-slate-400">Remaining</span>
          <p className="mt-0.5 text-base font-bold text-emerald-400">$485.40</p>
        </div>
      </div>

      {/* Progress meter */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>Spent: 59.5%</span>
          <span>Target: &lt;70%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-[#00ffd1] to-emerald-400 w-[59.5%]" />
        </div>
      </div>
    </div>
  );
}

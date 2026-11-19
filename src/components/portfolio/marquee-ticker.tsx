import React from "react";
import {
  Sparkles,
  Bot,
  Trophy,
  Cpu,
  Smartphone,
  Database,
  Share2,
  GraduationCap,
} from "lucide-react";

const TICKER_ITEMS = [
  {
    icon: Bot,
    text: "Autonomous CRM Agent",
    highlight: "Africom Tech Lead",
    color: "#00ffd1",
  },
  {
    icon: Sparkles,
    text: "Google Gemini AI Lead Scoring",
    highlight: "Production LLM Pipeline",
    color: "#a855f7",
  },
  {
    icon: Trophy,
    text: "PriceGuard-AI",
    highlight: "GDG Hackathon Winner",
    color: "#fbbf24",
  },
  {
    icon: Cpu,
    text: "ASP.NET Core Clean Architecture",
    highlight: "Hangfire + JWT",
    color: "#38bdf8",
  },
  {
    icon: Smartphone,
    text: "Gebeya Now",
    highlight: "Flutter Native UI",
    color: "#00ffd1",
  },
  {
    icon: Database,
    text: "SpendWise",
    highlight: "Supabase Daily Driver",
    color: "#34d399",
  },
  {
    icon: Share2,
    text: "n8n Webhook Ingestion",
    highlight: "5 Social Platforms",
    color: "#fb7185",
  },
  {
    icon: GraduationCap,
    text: "AASTU Software Engineering",
    highlight: "Degree Expected 2027",
    color: "#c084fc",
  },
];

export function MarqueeTicker() {
  return (
    <div className="relative w-full overflow-hidden py-10 pointer-events-auto">
      {/* Ambient background glow instead of harsh dividing lines */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ffd1]/[0.03] to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-[#00ffd1]/[0.02] blur-3xl rounded-full pointer-events-none" />

      {/* Infinite scrolling ribbon */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-4">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="group flex items-center gap-3 rounded-full border border-white/[0.08] bg-[#0d121c]/80 px-4 py-2 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:scale-105"
            >
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5"
                style={{ color: item.color }}
              >
                <Icon size={12} />
              </div>
              <span className="font-sans text-xs font-medium text-slate-200">
                {item.text}
              </span>
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  background: `${item.color}15`,
                  color: item.color,
                  border: `1px solid ${item.color}30`,
                }}
              >
                {item.highlight}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Brain,
  Sparkles,
  Terminal as TerminalIcon,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Send,
  Zap,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

type Mode = "crm" | "priceguard" | "terminal";

interface Lead {
  id: string;
  sender: string;
  company: string;
  channel: string;
  text: string;
  score: number;
  sentiment: string;
  urgency: "HIGH" | "MEDIUM" | "LOW";
  draft: string;
  platform: "LinkedIn" | "Twitter" | "Email" | "Instagram";
}

const SAMPLE_LEADS: Lead[] = [
  {
    id: "lead-1",
    sender: "Elena Vance",
    company: "Apex Global Solutions",
    channel: "LinkedIn Webhook (n8n)",
    text: "We are scaling our enterprise ERP to 450 seats. Looking for custom AI lead routing and ASP.NET Core integrations.",
    score: 96,
    sentiment: "High Intent / Ready to Deploy",
    urgency: "HIGH",
    draft: "Hi Elena, thanks for reaching out. Based on your 450-seat requirement, our Clean Architecture pipeline handles distributed lead routing seamlessly...",
    platform: "LinkedIn",
  },
  {
    id: "lead-2",
    sender: "Marcus Chen",
    company: "Kinetix Robotics",
    channel: "Twitter DM Webhook",
    text: "Saw your price prediction and machine learning projects. Are you open for summer engineering internships?",
    score: 92,
    sentiment: "Direct Hiring Opportunity",
    urgency: "HIGH",
    draft: "Hi Marcus! Yes, absolutely. I am actively looking for AI/ML and full-stack software engineering internships for summer 2026...",
    platform: "Twitter",
  },
  {
    id: "lead-3",
    sender: "Sara Ahmed",
    company: "Addis Fintech Hub",
    channel: "Inbound Email",
    text: "Could you deliver an automated social monitoring webhook layer using n8n and Gemini AI within 3 weeks?",
    score: 88,
    sentiment: "Contract / Project Inquiry",
    urgency: "MEDIUM",
    draft: "Hello Sara, that fits directly into the architecture we deployed at Africom Tech with multi-platform webhook ingest and Gemini inference...",
    platform: "Email",
  },
];

interface PriceItem {
  name: string;
  category: string;
  currentPrice: number;
  avgPrice: number;
  predictedTrend: "DROP" | "RISE" | "STABLE";
  recommendation: "BUY NOW" | "WAIT FOR DROP" | "MONITOR";
  confidence: number;
  reason: string;
}

const SAMPLE_ITEMS: PriceItem[] = [
  {
    name: "Sony WH-1000XM5 Noise Canceling",
    category: "Electronics",
    currentPrice: 278,
    avgPrice: 348,
    predictedTrend: "RISE",
    recommendation: "BUY NOW",
    confidence: 94,
    reason: "Current price is 20.1% below 90-day moving average. Historical ML floor detected.",
  },
  {
    name: "MacBook Pro 14\" M3 (512GB)",
    category: "Hardware",
    currentPrice: 1549,
    avgPrice: 1599,
    predictedTrend: "DROP",
    recommendation: "WAIT FOR DROP",
    confidence: 87,
    reason: "Cycle analysis anticipates seasonal promotional dip (-8%) in 12 days.",
  },
  {
    name: "Keychron Q1 Pro Wireless Mechanical",
    category: "Accessories",
    currentPrice: 198,
    avgPrice: 205,
    predictedTrend: "STABLE",
    recommendation: "MONITOR",
    confidence: 82,
    reason: "Low price volatility detected across retail endpoints. Stable baseline.",
  },
];

export function HeroConsole() {
  const [mode, setMode] = useState<Mode>("crm");
  const [leadIdx, setLeadIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Terminal state
  const [cliInput, setCliInput] = useState("");
  const [cliHistory, setCliHistory] = useState<
    { command: string; output: React.ReactNode }[]
  >([
    {
      command: "welcome",
      output: (
        <div>
          <p className="text-emerald-400 font-mono text-xs">
            Dagim Tadesse AI Core [Version 2.4.0-release]
          </p>
          <p className="text-slate-400 font-mono text-xs mt-1">
            Type <span className="text-[#00ffd1] font-semibold">help</span>,{" "}
            <span className="text-[#00ffd1] font-semibold">skills</span>,{" "}
            <span className="text-[#00ffd1] font-semibold">projects</span>, or{" "}
            <span className="text-[#00ffd1] font-semibold">contact</span>.
          </p>
        </div>
      ),
    },
  ]);

  const handleNextLead = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setLeadIdx((prev) => (prev + 1) % SAMPLE_LEADS.length);
      setIsProcessing(false);
    }, 450);
  };

  const handleNextItem = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setItemIdx((prev) => (prev + 1) % SAMPLE_ITEMS.length);
      setIsProcessing(false);
    }, 450);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    if (cmd === "help") {
      output = (
        <div className="space-y-1 text-xs font-mono text-slate-300">
          <p>Available commands:</p>
          <p>  <span className="text-[#00ffd1]">skills</span>     - View core technology stack</p>
          <p>  <span className="text-[#00ffd1]">projects</span>   - Top shipped projects & achievements</p>
          <p>  <span className="text-[#00ffd1]">experience</span> - Roles at Africom & ConDigital</p>
          <p>  <span className="text-[#00ffd1]">contact</span>    - Email & socials</p>
          <p>  <span className="text-[#00ffd1]">whoami</span>     - Bio synopsis</p>
          <p>  <span className="text-[#00ffd1]">clear</span>      - Clear terminal screen</p>
        </div>
      );
    } else if (cmd === "skills") {
      output = (
        <div className="text-xs font-mono text-slate-300 space-y-1">
          <p className="text-emerald-400 font-semibold">AI/ML:</p>
          <p>Google Gemini API, scikit-learn, Computer Vision, Model Training, Jupyter</p>
          <p className="text-emerald-400 font-semibold mt-1">Backend & Systems:</p>
          <p>ASP.NET Core (Clean Architecture), Supabase, Hangfire, REST, SQL, n8n</p>
          <p className="text-emerald-400 font-semibold mt-1">Frontend & Mobile:</p>
          <p>React 19, TypeScript, Tailwind CSS, Flutter, Dart</p>
        </div>
      );
    } else if (cmd === "projects") {
      output = (
        <div className="text-xs font-mono text-slate-300 space-y-1">
          <p>🏆 <span className="text-amber-300 font-bold">PriceGuard-AI</span> - GDG Hackathon Winner ML engine</p>
          <p>🤖 <span className="text-[#00ffd1] font-bold">Autonomous CRM Agent</span> - Africom Tech Lead (Gemini + n8n + ASP.NET)</p>
          <p>📱 <span className="text-purple-300 font-bold">Gebeya Now</span> - Flutter mobile marketplace built from scratch</p>
          <p>💳 <span className="text-blue-300 font-bold">SpendWise</span> - Production personal finance app (daily driver)</p>
        </div>
      );
    } else if (cmd === "experience") {
      output = (
        <div className="text-xs font-mono text-slate-300 space-y-1">
          <p><span className="text-[#00ffd1] font-semibold">Africom Tech</span>: Software Engineering Intern — Tech Lead</p>
          <p><span className="text-[#00ffd1] font-semibold">ConDigital Inc.</span>: Odoo Designer — AI Training Datasets</p>
          <p><span className="text-[#00ffd1] font-semibold">AASTU</span>: B.S. in Software Engineering (Expected 2027)</p>
        </div>
      );
    } else if (cmd === "contact") {
      output = (
        <div className="text-xs font-mono text-slate-300">
          <p>Email: <a href="mailto:dagimtadesse25@gmail.com" className="text-[#00ffd1] underline">dagimtadesse25@gmail.com</a></p>
          <p>GitHub: <a href="https://github.com/Dagim-Tadesse" target="_blank" rel="noreferrer" className="text-[#00ffd1] underline">github.com/Dagim-Tadesse</a></p>
          <p>Location: Addis Ababa, Ethiopia</p>
        </div>
      );
    } else if (cmd === "whoami") {
      output = (
        <p className="text-xs font-mono text-slate-300">
          Dagim Tadesse — Software Engineering student at AASTU building at the intersection of AI, real-world systems, and fluid UI.
        </p>
      );
    } else if (cmd === "clear") {
      setCliHistory([]);
      setCliInput("");
      return;
    } else {
      output = (
        <p className="text-xs font-mono text-rose-400">
          Command not recognized: &quot;{cmd}&quot;. Type &quot;help&quot; for available commands.
        </p>
      );
    }

    setCliHistory((prev) => [...prev, { command: cmd, output }]);
    setCliInput("");
  };

  const activeLead = SAMPLE_LEADS[leadIdx];
  const activeItem = SAMPLE_ITEMS[itemIdx];

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-2xl border border-white/[0.12] bg-[#0b0f19]/90 backdrop-blur-2xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(0,255,209,0.15)] overflow-hidden">
      {/* Decorative top accent glow line */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00ffd1] to-purple-500 opacity-80" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] px-4 py-3 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-slate-400">
            dagim-core // interactive-telemetry
          </span>
        </div>

        {/* Mode selector pills */}
        <div className="flex items-center gap-1 rounded-lg bg-black/40 p-0.5 border border-white/5">
          <button
            onClick={() => setMode("crm")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-all ${
              mode === "crm"
                ? "bg-[#00ffd1]/20 text-[#00ffd1] font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Bot size={12} />
            <span>AI CRM Agent</span>
          </button>
          <button
            onClick={() => setMode("priceguard")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-all ${
              mode === "priceguard"
                ? "bg-amber-400/20 text-amber-300 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles size={12} />
            <span>PriceGuard ML</span>
          </button>
          <button
            onClick={() => setMode("terminal")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-all ${
              mode === "terminal"
                ? "bg-purple-500/20 text-purple-300 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <TerminalIcon size={12} />
            <span>CLI</span>
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 min-h-[340px] flex flex-col justify-between">
        {/* MODE 1: CRM AGENT */}
        {mode === "crm" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ffd1] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ffd1]" />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#00ffd1]">
                  Gemini Lead Intelligence Pipeline
                </span>
              </div>
              <button
                onClick={handleNextLead}
                disabled={isProcessing}
                className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-slate-300 transition-colors hover:border-[#00ffd1]/40 hover:text-[#00ffd1]"
              >
                <RefreshCw size={11} className={isProcessing ? "animate-spin" : ""} />
                <span>Simulate Inbound</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLead.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                {/* Inbound Lead Box */}
                <div className="rounded-xl border border-white/[0.08] bg-black/40 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-white">
                      {activeLead.sender}{" "}
                      <span className="text-slate-400 font-normal">
                        ({activeLead.company})
                      </span>
                    </span>
                    <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">
                      {activeLead.channel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic border-l-2 border-[#00ffd1]/50 pl-2.5">
                    &quot;{activeLead.text}&quot;
                  </p>
                </div>

                {/* Gemini AI Evaluation Matrix */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                      AI Intent Score
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-display text-2xl font-black text-[#00ffd1]">
                        {activeLead.score}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">/ 100</span>
                      <span className="ml-auto rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-300">
                        {activeLead.urgency} INTENT
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                      Sentiment Analysis
                    </span>
                    <p className="mt-1.5 font-mono text-xs font-semibold text-white truncate">
                      {activeLead.sentiment}
                    </p>
                  </div>
                </div>

                {/* Automated Action */}
                <div className="rounded-lg border border-[#00ffd1]/20 bg-[#00ffd1]/5 p-2.5 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#00ffd1] font-semibold text-[11px]">
                    <Zap size={12} />
                    <span>Clean Arch Event: Auto-Draft Prepared & Dispatched to n8n</span>
                  </div>
                  <p className="mt-1 text-slate-300 text-[11px] line-clamp-2">
                    {activeLead.draft}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* MODE 2: PRICEGUARD ML */}
        {mode === "priceguard" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-amber-300">
                  GDG Hackathon Winner · ML Inference Engine
                </span>
              </div>
              <button
                onClick={handleNextItem}
                disabled={isProcessing}
                className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-slate-300 transition-colors hover:border-amber-400/40 hover:text-amber-300"
              >
                <RefreshCw size={11} className={isProcessing ? "animate-spin" : ""} />
                <span>Next Product</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                <div className="rounded-xl border border-white/[0.08] bg-black/40 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-sans font-semibold text-sm text-white">
                        {activeItem.name}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400">
                        {activeItem.category} · Price Tracking Active
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-base font-bold text-white">
                        ${activeItem.currentPrice}
                      </span>
                      <p className="text-[10px] font-mono text-slate-400 line-through">
                        Avg ${activeItem.avgPrice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendation pill */}
                <div className="flex items-center justify-between rounded-xl border border-amber-400/30 bg-amber-400/10 p-3">
                  <div className="flex items-center gap-2">
                    {activeItem.recommendation === "BUY NOW" ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <Clock className="h-5 w-5 text-amber-400" />
                    )}
                    <div>
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                        {activeItem.recommendation}
                      </span>
                      <p className="text-[11px] text-slate-300">
                        Confidence: {activeItem.confidence}%
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs font-bold text-amber-300">
                    {activeItem.predictedTrend === "RISE"
                      ? "▲ Price Surge Expected"
                      : "▼ Expected Dip"}
                  </span>
                </div>

                <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-2.5 text-xs text-slate-300 font-mono">
                  <p>💡 {activeItem.reason}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* MODE 3: TERMINAL CLI */}
        {mode === "terminal" && (
          <div className="flex flex-col h-[280px]">
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 font-mono text-xs">
              {cliHistory.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-[#00ffd1]">visitor@dagim-portfolio</span>:
                    <span className="text-white">~${item.command}</span>
                  </div>
                  <div className="pl-3">{item.output}</div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleCliSubmit}
              className="mt-3 flex items-center gap-2 border-t border-white/10 pt-2 font-mono text-xs"
            >
              <span className="text-[#00ffd1]">&gt;</span>
              <input
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="type a command (e.g. help, skills, projects)..."
                className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500 font-mono"
              />
              <button
                type="submit"
                className="rounded bg-white/10 px-2 py-0.5 text-xs text-slate-300 hover:text-white"
              >
                Run
              </button>
            </form>
          </div>
        )}

        {/* Footer info pill */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>Architecture: Clean Arch + Gemini API + n8n</span>
          </span>
          <span className="text-[#00ffd1]">Ready for Production</span>
        </div>
      </div>
    </div>
  );
}

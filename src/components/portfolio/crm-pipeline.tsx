import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Cpu,
  Layers,
  Share2,
  Workflow,
  CheckCircle,
  Database,
  Mail,
  Zap,
} from "lucide-react";

interface NodeDetail {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  tech: string[];
  responsibilities: string[];
}

const NODES: NodeDetail[] = [
  {
    id: "ingest",
    title: "1. Multi-Platform Ingest",
    subtitle: "Automated webhook listeners built on n8n",
    icon: Share2,
    tech: ["n8n Webhooks", "LinkedIn API", "Twitter API", "Meta Graph API"],
    responsibilities: [
      "Independently engineered multi-channel webhook listeners across 5 social platforms.",
      "Extracted comment sentiment, direct inquiries, and buyer intent payload.",
      "Formatted unstructured social interactions into unified schema for backend ingestion.",
    ],
  },
  {
    id: "backend",
    title: "2. ASP.NET Clean Arch Core",
    subtitle: "Enterprise backend led by Dagim (Tech Lead)",
    icon: Cpu,
    tech: ["ASP.NET Core", "Clean Architecture", "JWT Auth", "Hangfire", "SQL Server"],
    responsibilities: [
      "Designed domain, application, and infrastructure layers with strict separation of concerns.",
      "Configured Hangfire background job scheduler for resilient asynchronous dispatch.",
      "Led technical decision-making and code reviews across the 3-engineer team.",
    ],
  },
  {
    id: "ai",
    title: "3. Gemini AI Intelligence",
    subtitle: "Lead scoring & emotion classification model",
    icon: Brain,
    tech: ["Google Gemini API", "Prompt Engineering", "Emotion Detection", "JSON Schemas"],
    responsibilities: [
      "Engineered prompt pipelines that evaluate lead quality on a 0-100 scale.",
      "Solved critical Gemini API authentication hurdles (header vs query parameter format).",
      "Classified emotion and urgency to prioritize enterprise opportunities automatically.",
    ],
  },
  {
    id: "action",
    title: "4. Autonomous Dispatch",
    subtitle: "CRM Kanban pipeline & automated drafting",
    icon: Mail,
    tech: ["React Frontend", "Automated Email Generation", "Kanban Board"],
    responsibilities: [
      "Created dynamic email response templates customized to lead objections.",
      "Auto-populated CRM Kanban stage cards with score tags and sentiment badges.",
      "Delivered live demo successfully within tight 4-week development sprint.",
    ],
  },
];

export function CrmPipelineVisualizer() {
  const [activeNode, setActiveNode] = useState<string>("ai");
  const selected = NODES.find((n) => n.id === activeNode) || NODES[2];

  return (
    <div className="space-y-4 rounded-xl border border-white/[0.08] bg-black/40 p-4 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Workflow className="h-4 w-4 text-[#00ffd1]" />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-200">
            Interactive Architecture Flow (Click nodes to inspect)
          </span>
        </div>
        <span className="rounded-full bg-[#00ffd1]/10 px-2.5 py-0.5 font-mono text-[10px] text-[#00ffd1]">
          Africom Tech Lead
        </span>
      </div>

      {/* Nodes bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {NODES.map((node) => {
          const Icon = node.icon;
          const isSelected = node.id === activeNode;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`relative flex flex-col items-start gap-1 rounded-lg border p-2.5 text-left transition-all ${
                isSelected
                  ? "border-[#00ffd1] bg-[#00ffd1]/10 shadow-[0_0_15px_rgba(0,255,209,0.2)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Icon
                  size={14}
                  className={isSelected ? "text-[#00ffd1]" : "text-slate-400"}
                />
                <span
                  className={
                    isSelected ? "text-white font-mono" : "text-slate-300 font-mono"
                  }
                >
                  {node.title.split(". ")[1]}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 truncate w-full">
                {node.tech[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5 space-y-2 text-xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h5 className="font-display font-bold text-white text-sm">
                {selected.title}
              </h5>
              <p className="text-slate-400 text-[11px]">{selected.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {selected.tech.map((t) => (
                <span
                  key={t}
                  className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-[#00ffd1]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-2 space-y-1.5 pt-2 border-t border-white/5">
            {selected.responsibilities.map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-300">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

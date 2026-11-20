import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Cpu,
  Smartphone,
  Zap,
  FileCode,
  Copy,
  Check,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

interface SkillPillar {
  id: string;
  name: string;
  number: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  summary: string;
  accentColor: string;
  skills: { name: string; level: string; note: string; highlight?: boolean }[];
  codeFileName: string;
  codeLanguage: string;
  codeSnippet: string;
}

const PILLARS: SkillPillar[] = [
  {
    id: "ai",
    number: "01",
    name: "AI & Applied ML",
    icon: Brain,
    accentColor: "#00ffd1",
    summary:
      "Production LLM prompt pipelines, sentiment classification, regression models, and computer vision authentication.",
    skills: [
      { name: "Google Gemini AI API", level: "Advanced", note: "CRM Lead scoring & emotion inference", highlight: true },
      { name: "scikit-learn & Python ML", level: "Proficient", note: "PriceGuard price trajectory regression", highlight: true },
      { name: "Computer Vision (OpenCV)", level: "Working", note: "Face Auth biometric landmark detection" },
      { name: "Data Preprocessing & EDA", level: "Proficient", note: "Pandas, NumPy & feature engineering" },
      { name: "GDG AI/ML Curriculum", level: "Active", note: "Google Developer Groups structured track" },
    ],
    codeFileName: "GeminiLeadScoringPipeline.py",
    codeLanguage: "python",
    codeSnippet: `import google.generativeai as genai
import json

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

def analyze_inbound_lead(lead_payload: dict) -> dict:
    prompt = f"""
    Evaluate this inbound enterprise lead on a 0-100 scale:
    Sender: {lead_payload.get('sender')}
    Text: "{lead_payload.get('message')}"
    Channel: {lead_payload.get('channel')}
    
    Output strictly in JSON:
    {{
      "intent_score": int,
      "urgency": "HIGH" | "MEDIUM" | "LOW",
      "sentiment": str,
      "recommended_action": str
    }}
    """
    response = model.generate_content(prompt)
    return json.loads(response.text) # Clean Arch Ingest`,
  },
  {
    id: "backend",
    number: "02",
    name: "Clean Backends & Systems",
    icon: Cpu,
    accentColor: "#38bdf8",
    summary:
      "Enterprise ASP.NET Core Clean Architecture, Supabase PostgreSQL, Hangfire queues, and JWT auth.",
    skills: [
      { name: "ASP.NET Core (C#)", level: "Advanced", note: "Africom Tech Lead architecture", highlight: true },
      { name: "Clean Architecture (DDD)", level: "Advanced", note: "Domain, Application, Infrastructure layers", highlight: true },
      { name: "Supabase & PostgreSQL", level: "Advanced", note: "SpendWise production database with RLS" },
      { name: "Hangfire Job Scheduler", level: "Proficient", note: "Resilient asynchronous lead dispatch" },
      { name: "REST APIs & JWT Security", level: "Advanced", note: "Role-based token authorization" },
    ],
    codeFileName: "LeadIngestionService.cs",
    codeLanguage: "csharp",
    codeSnippet: `// ASP.NET Core Clean Architecture - Application Layer
namespace CrmAgent.Application.Services;

public class LeadIngestionService : ILeadIngestionService 
{
    private readonly IBackgroundJobClient _jobs;
    private readonly IGeminiScoringService _gemini;
    private readonly ILeadRepository _repository;

    public async Task<LeadResultDto> IngestLeadAsync(LeadInputDto dto)
    {
        // 1. Run AI Lead Scoring asynchronously
        var score = await _gemini.ScoreIntentAsync(dto.RawText);
        
        // 2. Persist Entity with Clean Architecture validation
        var lead = LeadEntity.Create(dto.Sender, dto.Channel, score);
        await _repository.AddAsync(lead);

        // 3. Queue automated email drafting job via Hangfire
        _jobs.Enqueue(() => DispatchEmailTask(lead.Id));
        return new LeadResultDto(lead.Id, score.IntentScore);
    }
}`,
  },
  {
    id: "mobile",
    number: "03",
    name: "Mobile, UI/UX & 3D Graphics",
    icon: Smartphone,
    accentColor: "#a855f7",
    summary:
      "Flutter cross-platform apps from scratch, React 19, 3D Canvas perspective math, and spatial UI.",
    skills: [
      { name: "Flutter & Dart", level: "Advanced", note: "Gebeya Now marketplace built from scratch", highlight: true },
      { name: "React 19 & TypeScript", level: "Advanced", note: "Modern web apps, daily framework", highlight: true },
      { name: "3D Graphics & Spatial Math", level: "Proficient", note: "6-DOF Matrix Cube & Canvas Shader Grids", highlight: true },
      { name: "Tailwind CSS & Animations", level: "Advanced", note: "Cyber aesthetics, glassmorphism" },
      { name: "Figma UI/UX Design", level: "Proficient", note: "Original mobile prototypes" },
    ],
    codeFileName: "MarketplaceRepository.dart",
    codeLanguage: "dart",
    codeSnippet: `// Flutter / Dart - Clean Architecture Repository Pattern
class ProductRepositoryImpl implements ProductRepository {
  final ApiClient _client;
  final LocalCache _cache;

  ProductRepositoryImpl(this._client, this._cache);

  @override
  Future<Either<Failure, List<Product>>> getFeaturedProducts() async {
    try {
      final cached = await _cache.getCachedProducts();
      if (cached.isNotEmpty) return Right(cached);

      final response = await _client.get('/products/featured');
      final products = (response.data as List)
          .map((json) => ProductModel.fromJson(json).toEntity())
          .toList();
          
      await _cache.save(products);
      return Right(products);
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }
}`,
  },
  {
    id: "automation",
    number: "04",
    name: "ERP & Automation Pipes",
    icon: Zap,
    accentColor: "#fbbf24",
    summary:
      "Odoo Website/CRM design for AI datasets, multi-platform n8n webhook listeners, and CI/CD.",
    skills: [
      { name: "n8n Webhook Automations", level: "Advanced", note: "5-platform social media ingest", highlight: true },
      { name: "Odoo Website & CRM", level: "Proficient", note: "ConDigital Inc. contractor", highlight: true },
      { name: "AI Dataset Structuring", level: "Proficient", note: "Data funnels & SEO lead capture" },
      { name: "Git, GitHub Actions & Vercel", level: "Advanced", note: "Production CI/CD deployment" },
    ],
    codeFileName: "n8n-webhook-workflow.json",
    codeLanguage: "json",
    codeSnippet: `{
  "name": "Multi-Platform Inbound Lead Webhook Layer",
  "nodes": [
    {
      "name": "Social Ingest Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": { "path": "/leads/inbound", "httpMethod": "POST" }
    },
    {
      "name": "Format Schema & Sanitize",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "return items.map(i => ({ json: { platform: i.json.headers['x-platform'], body: i.json.body } }));"
      }
    },
    {
      "name": "Forward to ASP.NET Core Clean API",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "https://api.crm-agent.internal/api/leads", "method": "POST" }
    }
  ]
}`,
  },
];

export function SkillsWorkbench() {
  const [activeTab, setActiveTab] = useState<string>("ai");
  const [direction, setDirection] = useState(1);
  const [copied, setCopied] = useState(false);

  const activeIndex = PILLARS.findIndex((p) => p.id === activeTab);
  const pillar = PILLARS[activeIndex] || PILLARS[0];

  const selectTab = (id: string, index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveTab(id);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(pillar.codeSnippet);
    setCopied(true);
    toast.success("Architectural code blueprint copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.96,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 320, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.96,
      filter: "blur(4px)",
      transition: { duration: 0.18 },
    }),
  };

  return (
    <div className="space-y-8">
      {/* 1. HORIZONTAL DOMAIN PILL SELECTOR (NO HEAVY CARDS) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-4">
        {PILLARS.map((p, idx) => {
          const Icon = p.icon;
          const isSelected = p.id === activeTab;
          return (
            <button
              key={p.id}
              onClick={() => selectTab(p.id, idx)}
              className={`relative flex items-center gap-2.5 rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                isSelected ? "text-slate-950 font-bold" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeSkillTabPill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${p.accentColor} 0%, #38bdf8 100%)`,
                    boxShadow: `0 0 25px ${p.accentColor}55`,
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <Icon size={14} className="relative z-10" />
              <span className="relative z-10">{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2. OPEN DUAL-PANE WORKBENCH (NO NESTED CARDS) */}
      <div className="relative min-h-[420px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={pillar.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid gap-10 lg:grid-cols-12 items-start"
          >
            {/* Left Pane: Competencies List */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00ffd1]">
                  <span>{pillar.number} // Production Domain</span>
                </div>
                <h4 className="mt-1 font-display text-3xl font-extrabold text-white">
                  {pillar.name}
                </h4>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed font-sans">
                  {pillar.summary}
                </p>
              </div>

              {/* Competency rows (NO BOXES, clean flowing list) */}
              <div className="space-y-3 pt-2">
                {pillar.skills.map((s, idx) => (
                  <div
                    key={idx}
                    className="border-b border-white/[0.06] pb-3 transition-colors hover:border-[#00ffd1]/40"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-mono font-semibold text-white flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            background: s.highlight ? pillar.accentColor : "#94a3b8",
                            boxShadow: s.highlight ? `0 0 10px ${pillar.accentColor}` : "none",
                          }}
                        />
                        {s.name}
                      </span>
                      <span className="rounded-full px-2.5 py-0.5 font-mono text-[10px] bg-white/5 text-slate-300">
                        {s.level}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400 font-sans pl-4">
                      {s.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Pane: Production Architecture Code Blueprint Window */}
            <div className="lg:col-span-7 relative">
              {/* Radial glow bloom */}
              <div
                className="pointer-events-none absolute -inset-6 rounded-full blur-3xl opacity-15"
                style={{ background: pillar.accentColor }}
              />

              <div className="relative z-10 rounded-2xl border border-white/[0.12] bg-[#07090e]/95 backdrop-blur-2xl overflow-hidden shadow-2xl">
                {/* Window titlebar */}
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                      <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                      <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="font-mono text-xs text-slate-300 flex items-center gap-1.5 ml-2">
                      <FileCode size={13} style={{ color: pillar.accentColor }} />
                      {pillar.codeFileName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400 uppercase">
                      {pillar.codeLanguage}
                    </span>
                    <button
                      onClick={copyCode}
                      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-slate-300 transition-colors hover:border-[#00ffd1] hover:text-[#00ffd1]"
                      title="Copy code snippet"
                    >
                      {copied ? <Check size={12} className="text-[#00ffd1]" /> : <Copy size={12} />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                {/* Code Body */}
                <div className="p-5 font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto bg-[#07090e]/80">
                  <pre>
                    <code>{pillar.codeSnippet}</code>
                  </pre>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between border-t border-white/[0.06] bg-black/50 px-4 py-2 text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Clean Architecture Verified</span>
                  </span>
                  <span className="text-slate-500">UTF-8 · Production Architecture Blueprint</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

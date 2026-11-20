import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Trophy,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Sparkles,
  Cpu,
  CheckCircle2,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { sfx } from "@/lib/sound-effects";

interface Milestone {
  id: string;
  badge: string;
  badgeType: "lead" | "trophy" | "contract" | "academic";
  org: string;
  location: string;
  period: string;
  title: string;
  summary: string;
  highlights: { label: string; desc: string }[];
  quote?: string;
  link?: { url: string; label: string };
  accentColor: string;
}

const MILESTONES: Milestone[] = [
  {
    id: "africom",
    badge: "Tech Lead · Internship",
    badgeType: "lead",
    org: "Africom Tech",
    location: "Addis Ababa, Ethiopia",
    period: "Recent · Tech Lead Role",
    title: "Lead Architect — Autonomous CRM Automation Agent",
    summary:
      "Led architectural decisions and technical execution across a 3-engineer team. Designed the enterprise ASP.NET Core Clean Architecture backend, integrated Google Gemini API for real-time lead qualification and emotional valence analysis, and independently built an n8n webhook ingestion layer spanning 5 social platforms.",
    highlights: [
      { label: "AI Lead Scoring", desc: "0-100 Gemini prompt evaluation" },
      { label: "Clean Architecture", desc: "ASP.NET Core DDD layers" },
      { label: "Social Mesh", desc: "5-platform n8n listeners" },
      { label: "Async Hangfire", desc: "Resilient job scheduling" },
    ],
    quote:
      "Led architecture decisions across a team of three as Tech Lead. Owned the core backend and independently built the entire n8n social monitoring layer mid-project. Overcame Gemini API authentication discrepancies and delivered a live production demo within 4 weeks.",
    accentColor: "#00ffd1",
  },
  {
    id: "gdg",
    badge: "GDG Hackathon Winner",
    badgeType: "trophy",
    org: "Google Developer Groups (GDG) · AASTU",
    location: "AASTU Campus · Addis Ababa",
    period: "Competition Champion",
    title: "GDG AI/ML Hackathon Winner — PriceGuard-AI",
    summary:
      "Built and deployed PriceGuard-AI under intense hackathon competition conditions. Engineered a price trajectory regression model in Python that analyzes product pricing across e-commerce retail endpoints to output a definitive signal: buy now or wait for the optimal price drop window.",
    highlights: [
      { label: "Regression Model", desc: "Python scikit-learn engine" },
      { label: "Live System", desc: "Deployed to production on Vercel" },
      { label: "Hackathon Champion", desc: "GDG AASTU AI/ML Track Winner" },
      { label: "Real-time Tracking", desc: "Live endpoint scraping & charts" },
    ],
    link: {
      url: "https://price-guard-ai.vercel.app/",
      label: "Launch PriceGuard-AI Live App",
    },
    accentColor: "#fbbf24",
  },
  {
    id: "condigital",
    badge: "Contractor · Current",
    badgeType: "contract",
    org: "ConDigital Inc.",
    location: "Addis Ababa, Ethiopia",
    period: "Active Contractor",
    title: "Odoo Designer — AI Training Datasets & Lead Funnels",
    summary:
      "Designing Odoo website architecture, structured forms, and data collection pipelines for machine learning training datasets. Specializing in Website and CRM modules — applying SEO optimization, lead-generation tagging, and clean data categorization.",
    highlights: [
      { label: "Odoo ERP Systems", desc: "Website & CRM architecture" },
      { label: "AI Dataset Structuring", desc: "Clean categorical data funnels" },
      { label: "Lead Capture", desc: "SEO-optimized inbound funnels" },
    ],
    accentColor: "#38bdf8",
  },
  {
    id: "aastu",
    badge: "B.S. Software Engineering",
    badgeType: "academic",
    org: "Addis Ababa Science & Technology University",
    location: "Addis Ababa, Ethiopia",
    period: "Expected June 2027",
    title: "Bachelor of Software Engineering (Self-Taught Since Jan 2022)",
    summary:
      "Rigorous university coursework in algorithms, operating systems, distributed architectures, and computer vision. Combined academic excellence with continuous personal shipping in production web and mobile software.",
    highlights: [
      { label: "High Standing", desc: "Strong academic record (3.84/4.0)" },
      { label: "Core Foundations", desc: "Algorithms, OS & Distributed Systems" },
      { label: "Self-Taught", desc: "Continuous shipping since Jan 2022" },
    ],
    accentColor: "#a855f7",
  },
];

export function MilestoneSpine() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative pl-10 sm:pl-14 space-y-16">
      {/* 1. CONTINUOUS BACKGROUND TRACK */}
      <div
        className="absolute left-3.5 sm:left-4 top-3 bottom-3 w-[2px] bg-white/[0.08]"
        aria-hidden
      />

      {/* 2. DYNAMIC KINETIC BEAM: Fills and glows down the spine with scroll */}
      <motion.div
        style={{ scaleY }}
        className="absolute left-3.5 sm:left-4 top-3 bottom-3 w-[2px] origin-top bg-gradient-to-b from-[#00ffd1] via-[#fbbf24] to-[#a855f7] shadow-[0_0_12px_rgba(0,255,209,0.8)]"
        aria-hidden
      />

      {/* 3. MILESTONE NODES */}
      {MILESTONES.map((m, idx) => {
        return (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative space-y-4 group"
          >
            {/* Glowing spine node beacon */}
            <div
              className="absolute left-3.5 sm:left-4 -translate-x-1/2 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#07090e] border-2 transition-transform duration-300 group-hover:scale-125"
              style={{
                borderColor: m.accentColor,
                boxShadow: `0 0 12px ${m.accentColor}60`,
              }}
            >
              <span
                className="h-2 w-2 rounded-full transition-transform duration-300"
                style={{
                  backgroundColor: m.accentColor,
                  boxShadow: `0 0 12px ${m.accentColor}`,
                }}
              />
            </div>

            {/* Header Badges & Meta */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span
                className="rounded-full px-3 py-0.5 font-bold border transition-colors flex items-center gap-1.5"
                style={{
                  backgroundColor: `${m.accentColor}18`,
                  color: m.accentColor,
                  borderColor: `${m.accentColor}40`,
                }}
              >
                {m.badgeType === "trophy" && <Trophy size={11} />}
                {m.badgeType === "lead" && <Cpu size={11} />}
                {m.badgeType === "academic" && <GraduationCap size={11} />}
                {m.badgeType === "contract" && <Briefcase size={11} />}
                <span>{m.badge}</span>
              </span>

              <span className="text-slate-300 font-medium">{m.org}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 flex items-center gap-1">
                <MapPin size={11} />
                {m.location}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-500 font-mono text-[11px]">{m.period}</span>
            </div>

            {/* Title */}
            <h4 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-white transition-colors">
              {m.title}
            </h4>

            {/* Narrative summary */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-3xl">
              {m.summary}
            </p>

            {/* Architectural Highlights Grid */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 pt-2 max-w-3xl">
              {m.highlights.map((h, i) => (
                <div
                  key={i}
                  className="border-l-2 pl-3 py-1.5 bg-white/[0.015] rounded-r-lg border-white/10 hover:border-white/30 transition-colors"
                  style={{ borderLeftColor: m.accentColor }}
                >
                  <p className="font-mono text-xs font-semibold text-white">{h.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{h.desc}</p>
                </div>
              ))}
            </div>

            {/* Tech Lead Quote / Testimonial if present */}
            {m.quote && (
              <blockquote className="text-xs italic text-slate-400 leading-relaxed max-w-3xl border-l-2 border-white/20 pl-4 py-1 bg-white/[0.02] rounded-r-xl">
                &quot;{m.quote}&quot;
              </blockquote>
            )}

            {/* Live App Link if present */}
            {m.link && (
              <div className="pt-1">
                <a
                  href={m.link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => sfx.playSuccess()}
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300 transition-all hover:text-white hover:underline"
                >
                  <span>{m.link.label}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

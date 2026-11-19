import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  Trophy,
} from "lucide-react";

import { PriceGuardChart } from "@/components/portfolio/priceguard-chart";
import { CrmPipelineVisualizer } from "@/components/portfolio/crm-pipeline";
import { GebeyaMockup } from "@/components/portfolio/gebeya-mockup";
import { SpendWiseWidget } from "@/components/portfolio/spendwise-widget";

interface ProjectShowcase {
  id: string;
  name: string;
  category: string;
  number: string;
  role: string;
  badge: string;
  trophy?: boolean;
  accentColor: string;
  tagline: string;
  overview: string;
  architectureHighlights: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  component: "pipeline" | "chart" | "mobile" | "spendwise";
}

const FLAGSHIP_PROJECTS: ProjectShowcase[] = [
  {
    id: "crm",
    number: "01",
    name: "Autonomous CRM Automation Agent",
    category: "Enterprise AI Systems",
    role: "Technical Team Lead (3 Engineers)",
    badge: "Internship · Africom Tech",
    accentColor: "#00ffd1",
    tagline: "Autonomous lead scoring, emotion classification, and 5-platform social automation",
    overview:
      "Led technical architecture across a 3-engineer team at Africom Tech. Engineered an ASP.NET Core Clean Architecture backend, integrated Google Gemini for real-time lead score and emotional valence analysis, and independently developed an n8n webhook ingestion layer listening to LinkedIn, Twitter, Facebook, Instagram, and TikTok.",
    architectureHighlights: [
      "ASP.NET Core DDD layers (Domain, Application, Infrastructure, Web API) with JWT security.",
      "Google Gemini LLM pipeline parsing unstructured buyer intent into verified JSON scoring schemas.",
      "Independent n8n webhook listeners collecting live leads across 5 social media platforms.",
      "Hangfire background job scheduler managing asynchronous queues and automated email dispatch.",
    ],
    techStack: ["ASP.NET Core", "React 19", "Google Gemini AI", "n8n Webhooks", "Hangfire", "Clean Architecture"],
    component: "pipeline",
  },
  {
    id: "priceguard",
    number: "02",
    name: "PriceGuard-AI",
    category: "Machine Learning & Web",
    role: "ML & Full-Stack Developer",
    badge: "🏆 GDG Hackathon Winner",
    trophy: true,
    accentColor: "#fbbf24",
    tagline: "AI price trajectory tracking & intelligent purchase recommendation engine",
    overview:
      "Engineered under hackathon pressure with a live public deployment on Vercel. Analyzes product price histories across e-commerce retail endpoints using a regression ML model to output a definitive signal: buy now or wait for the optimal price drop window.",
    architectureHighlights: [
      "Regression ML model analyzing historical moving averages, standard deviation, and volatility.",
      "Calculates confidence percentage and dynamic buy windows to save consumers money.",
      "Celebrated winner at the GDG AASTU AI/ML competition track.",
      "Deployed with real-time responsive Recharts visualization and interactive telemetry.",
    ],
    techStack: ["TypeScript", "React", "Python ML", "scikit-learn", "Recharts", "Vercel"],
    liveUrl: "https://price-guard-ai.vercel.app/",
    githubUrl: "https://github.com/Dagim-Tadesse/PriceGuard-AI",
    component: "chart",
  },
  {
    id: "spendwise",
    number: "03",
    name: "SpendWise",
    category: "Production Full-Stack",
    role: "Solo Creator & Architect",
    badge: "Live in Personal Use",
    accentColor: "#34d399",
    tagline: "Mobile-first personal finance tracker with real-time PostgreSQL database",
    overview:
      "A fast, mobile-first finance application built with React, TypeScript, and Supabase. Features real session authentication, live postgres database, custom category budget tracking, and real-time expense visualization. A genuine daily driver, not a demo.",
    architectureHighlights: [
      "Supabase PostgreSQL backend with Row Level Security (RLS) for multi-tenant data privacy.",
      "Real-time reactive balance calculation and monthly budget limit tracking.",
      "Mobile-optimized progressive web architecture with instant offline-first optimistic updates.",
      "Active daily driver used for personal cash flow tracking since early 2025.",
    ],
    techStack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel"],
    liveUrl: "https://spend-wise-bydagim.vercel.app/",
    component: "spendwise",
  },
  {
    id: "gebeya",
    number: "04",
    name: "Gebeya Now",
    category: "Mobile Native Architecture",
    role: "Solo Mobile & UI/UX Designer",
    badge: "Original Design & Code",
    accentColor: "#38bdf8",
    tagline: "Flutter native mobile marketplace designed and built from scratch",
    overview:
      "A complete Flutter mobile marketplace with custom-crafted UI design. Gebeya ('market' in Amharic) lets users list, explore, and interact with products in a fluid native mobile experience with Clean Architecture state management.",
    architectureHighlights: [
      "Complete original UI/UX design crafted in Figma and ported to responsive Flutter widgets.",
      "Separation of concerns using Dart Clean Architecture and repository pattern.",
      "Optimized native performance with local caching, smooth list scrolling, and image caching.",
      "Localized marketplace workflows adapted for Ethiopian commerce (Birr ETB currency).",
    ],
    techStack: ["Flutter", "Dart", "Clean Architecture", "Figma Design", "Mobile UI"],
    githubUrl: "https://github.com/Dagim-Tadesse/gebeya_now",
    component: "mobile",
  },
];

const ARCHIVE_PROJECTS = [
  {
    name: "Ride Price Estimation System",
    type: "AI/ML & Data Science",
    desc: "ML model predicting ride fares from route, traffic, and demand features in Jupyter.",
    tech: ["Python", "scikit-learn", "Pandas", "Jupyter"],
    github: "https://github.com/Dagim-Tadesse/Ride_Price_Estimation_System",
  },
  {
    name: "Face Auth System",
    type: "Computer Vision",
    desc: "Biometric facial recognition authentication using neural embeddings and OpenCV.",
    tech: ["Python", "OpenCV", "Biometrics"],
    github: "https://github.com/Dagim-Tadesse/face-auth-system",
  },
  {
    name: "Spark Study",
    type: "Web Workspace (8 Forks)",
    desc: "Interactive flashcard learning platform with 3D deck flips and community adoption.",
    tech: ["React", "TypeScript", "Vite", "3D CSS"],
    live: "https://spark-study-vert.vercel.app/",
    github: "https://github.com/Dagim-Tadesse/spark-study",
  },
  {
    name: "Savory Serve",
    type: "Full-Stack Web App",
    desc: "Hospitality ordering platform managing table menus, ordering, and kitchen workflows.",
    tech: ["TypeScript", "React", "State Management"],
  },
  {
    name: "Cardano Smart Contracts",
    type: "Blockchain Hackathon",
    desc: "CATs Group 2 Cardano hackathon project implementing decentralized token contracts.",
    tech: ["JavaScript", "Cardano", "Smart Contracts"],
    github: "https://github.com/Dagim-Tadesse/CATs-Group-2",
  },
];

export function ProjectTheater() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const setProject = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % FLAGSHIP_PROJECTS.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + FLAGSHIP_PROJECTS.length) % FLAGSHIP_PROJECTS.length);
  };

  const project = FLAGSHIP_PROJECTS[currentIndex];

  // Directional slide and blur variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 140 : -140,
      opacity: 0,
      scale: 0.94,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 320, damping: 28 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
        filter: { duration: 0.24 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 140 : -140,
      opacity: 0,
      scale: 0.94,
      filter: "blur(6px)",
      transition: { duration: 0.2 },
    }),
  };

  return (
    <div className="space-y-12">
      {/* 1. HORIZONTAL CINEMATIC SELECTOR (NO CARD BOXES) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-4">
        {/* Step indicator */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {FLAGSHIP_PROJECTS.map((p, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={p.id}
                onClick={() => setProject(idx)}
                className={`group relative flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {/* Smooth sliding pill cursor */}
                {isSelected && (
                  <motion.div
                    layoutId="activeHorizonPill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${p.accentColor} 0%, #38bdf8 100%)`,
                      boxShadow: `0 0 25px ${p.accentColor}55`,
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{p.number}</span>
                <span className="relative z-10 hidden md:inline">{p.name.split(" ")[0]}</span>
                {isSelected && (
                  <span className="relative z-10 text-[10px] opacity-90 hidden sm:inline">
                    · Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="font-mono text-xs text-slate-500 mr-2">
            {currentIndex + 1} / {FLAGSHIP_PROJECTS.length}
          </span>
          <button
            onClick={prevProject}
            aria-label="Previous project"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-[#00ffd1] hover:text-[#00ffd1]"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextProject}
            aria-label="Next project"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-[#00ffd1] hover:text-[#00ffd1]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 2. THE MAIN STAGE: DE-CARDED FULL-BLEED LIVING THEATER */}
      <div className="relative min-h-[480px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={project.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative"
          >
            {/* Giant Background Number for Editorial Drama */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 -top-16 font-display text-[140px] sm:text-[180px] font-black leading-none select-none text-white/[0.03]"
            >
              {project.number}
            </div>

            <div className="grid gap-10 lg:grid-cols-12 items-center">
              {/* Left Column: Narrative, Architecture Deliverables & CTAs */}
              <div className="lg:col-span-6 space-y-6 relative z-10">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider"
                      style={{
                        background: `${project.accentColor}18`,
                        color: project.accentColor,
                        border: `1px solid ${project.accentColor}40`,
                      }}
                    >
                      {project.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      Role: <span className="text-white font-medium">{project.role}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                    {project.name}
                  </h3>

                  <p
                    className="font-display text-base sm:text-lg font-semibold"
                    style={{ color: project.accentColor }}
                  >
                    {project.tagline}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {project.overview}
                </p>

                {/* Architecture Highlights: Clean light divider list (NO CARD BOX) */}
                <div className="space-y-2.5 border-l-2 pl-4 py-1" style={{ borderColor: `${project.accentColor}60` }}>
                  <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                    <ShieldCheck size={15} style={{ color: project.accentColor }} />
                    <span>Architectural Implementation</span>
                  </h5>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
                    {project.architectureHighlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span style={{ color: project.accentColor }} className="mt-0.5 font-bold">›</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech tags & Actions */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:scale-105 active:scale-95"
                        style={{
                          background: `linear-gradient(135deg, ${project.accentColor} 0%, #38bdf8 100%)`,
                          boxShadow: `0 8px 30px -5px ${project.accentColor}55`,
                        }}
                      >
                        <span>Launch Live System</span>
                        <ExternalLink size={14} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-200 transition-colors hover:border-[#00ffd1]/50 hover:bg-white/10"
                      >
                        <Github size={15} />
                        <span>View Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Free-Floating Visual Stage (Ambient Halo, NO Card Boxes!) */}
              <div className="lg:col-span-6 relative">
                {/* Radial color bloom behind the component */}
                <div
                  className="pointer-events-none absolute -inset-6 rounded-full blur-3xl opacity-20"
                  style={{ background: project.accentColor }}
                />

                <div className="relative z-10">
                  <div className="mb-2 flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full animate-ping"
                        style={{ background: project.accentColor }}
                      />
                      <span className="text-white font-semibold">Active Interactive Stage</span>
                    </span>
                    <span style={{ color: project.accentColor }}>{project.category}</span>
                  </div>

                  {/* Render the interactive component directly */}
                  {project.component === "pipeline" && <CrmPipelineVisualizer />}
                  {project.component === "chart" && <PriceGuardChart />}
                  {project.component === "mobile" && <GebeyaMockup />}
                  {project.component === "spendwise" && <SpendWiseWidget />}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. SECONDARY OPEN-SOURCE ARCHIVE: STREAM LIST (NO CARD BOXES) */}
      <div className="pt-12 border-t border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400">
            // Additional Engineering Repositories & Academic Works
          </h4>
          <span className="font-mono text-xs text-[#00ffd1]">5 Public Systems</span>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {ARCHIVE_PROJECTS.map((item, idx) => (
            <div
              key={idx}
              className="group py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:bg-white/[0.02] px-2 rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase text-[#00ffd1] font-semibold">
                    {item.type}
                  </span>
                  <span className="text-slate-600">·</span>
                  <h5 className="font-display text-base font-bold text-white group-hover:text-[#00ffd1] transition-colors">
                    {item.name}
                  </h5>
                </div>
                <p className="text-xs text-slate-400 max-w-xl">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-1.5 flex-wrap">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pl-2">
                  {item.live && (
                    <a
                      href={item.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-[#00ffd1] hover:text-[#00ffd1]"
                      title="Live link"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-[#00ffd1] hover:text-[#00ffd1]"
                      title="GitHub source"
                    >
                      <Github size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Trophy,
  ExternalLink,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  Star,
  Users,
  Bot,
  Smartphone,
  Globe,
  Copy,
  Check,
  GitCommit,
  Brain,
  ClipboardList,
  Timer,
  Link as LinkIcon,
  BarChart3,
  Lock,
  Code2,
  Terminal,
  Compass,
  Cpu,
  Layers,
  Search,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  FileDown,
  Box,
  Volume2,
  VolumeX,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { sfx } from "@/lib/sound-effects";

import { HeroConsole } from "@/components/portfolio/hero-console";
import { CommandMenu } from "@/components/portfolio/command-menu";
import { InteractiveCube } from "@/components/portfolio/interactive-cube";
import { PriceGuardChart } from "@/components/portfolio/priceguard-chart";
import { CrmPipelineVisualizer } from "@/components/portfolio/crm-pipeline";
import { GebeyaMockup } from "@/components/portfolio/gebeya-mockup";
import { SpendWiseWidget } from "@/components/portfolio/spendwise-widget";
import { NeuralBackground } from "@/components/portfolio/neural-background";
import { TiltCard } from "@/components/portfolio/tilt-card";
import { MarqueeTicker } from "@/components/portfolio/marquee-ticker";
import { ProjectTheater } from "@/components/portfolio/project-theater";
import { SkillsWorkbench } from "@/components/portfolio/skills-workbench";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const TEAL = "#00ffd1";

const NAV = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

type Project = {
  name: string;
  badges: string[];
  type?: string;
  tagline: string;
  description: string;
  stack: string[];
  live?: string;
  github?: string;
  hero?: boolean;
  trophy?: boolean;
  visualComponent?: "pipeline" | "chart" | "mobile" | "spendwise";
};

const TABS = [
  { id: "top", label: "Top Selected", icon: Star },
  { id: "ai", label: "AI & ML", icon: Bot },
  { id: "web", label: "Full-Stack", icon: Globe },
  { id: "mobile", label: "Mobile Apps", icon: Smartphone },
  { id: "group", label: "Team & Hackathons", icon: Users },
] as const;
type TabId = (typeof TABS)[number]["id"];

const PROJECTS: Record<TabId, Project[]> = {
  top: [
    {
      name: "Autonomous CRM Automation Agent",
      badges: ["Internship · Africom Tech", "Tech Lead", "Production Demo"],
      type: "Team Lead · Full-Stack AI Architecture",
      tagline: "AI lead scoring, sentiment detection, and 5-platform social automation",
      description:
        "Led architecture across a 3-engineer team at Africom Tech. Designed the ASP.NET Core Clean Architecture backend, integrated Google Gemini for automated lead scoring and emotion analysis, and independently engineered an n8n webhook layer listening to LinkedIn, Twitter, Facebook, Instagram, and TikTok.",
      stack: ["ASP.NET Core", "React 19", "Google Gemini AI", "n8n Webhooks", "Hangfire", "Clean Architecture"],
      hero: true,
      visualComponent: "pipeline",
    },
    {
      name: "PriceGuard-AI",
      badges: ["🏆 GDG Hackathon Winner", "GDG AASTU Hackathon", "Live App"],
      type: "Team · Machine Learning & Web",
      tagline: "AI price trajectory tracking & purchase recommendation engine",
      description:
        "Built under hackathon conditions and deployed live. Analyzes price histories across retail endpoints with a regression ML model to deliver a definitive signal: buy now or wait for the optimal price drop. Celebrated winner in the GDG AI/ML track.",
      stack: ["TypeScript", "React", "Python ML", "scikit-learn", "Vercel"],
      live: "https://price-guard-ai.vercel.app/",
      github: "https://github.com/Dagim-Tadesse/PriceGuard-AI",
      hero: true,
      trophy: true,
      visualComponent: "chart",
    },
    {
      name: "SpendWise",
      badges: ["Live in Daily Use", "Personal Finance"],
      type: "Solo · Full-Stack Product",
      tagline: "Mobile-first personal finance tracker with live Supabase database",
      description:
        "A fast, mobile-first finance application built with React, TypeScript, and Supabase. Real session authentication, live postgres database, custom category budget tracking, and real-time expense visualization. A genuine daily driver, not a demo.",
      stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
      live: "https://spend-wise-bydagim.vercel.app/",
      visualComponent: "spendwise",
    },
    {
      name: "Gebeya Now",
      badges: ["Mobile · Original UI", "Flutter & Dart"],
      type: "Solo · Mobile Marketplace",
      tagline: "Native mobile marketplace designed & built from scratch",
      description:
        "A complete Flutter mobile e-commerce marketplace with custom-crafted UI design. Gebeya ('market' in Amharic) lets users list, explore, and interact with products in a fluid native mobile experience with Clean Architecture state management.",
      stack: ["Flutter", "Dart", "Clean Architecture", "Figma Design"],
      github: "https://github.com/Dagim-Tadesse/gebeya_now",
      visualComponent: "mobile",
    },
  ],
  ai: [
    {
      name: "Autonomous CRM Automation Agent",
      badges: ["Internship · Africom Tech", "Tech Lead"],
      type: "AI Lead Routing Pipeline",
      tagline: "AI lead scoring, email drafting, and multi-platform social monitoring",
      description:
        "Led architecture across a 3-person team. Built the core ASP.NET Clean Architecture backend, integrated Google Gemini for lead scoring, and independently developed an n8n webhook layer for monitoring LinkedIn, Twitter, Facebook, Instagram, and TikTok data.",
      stack: ["ASP.NET Core", "React", "Gemini AI", "n8n", "Hangfire"],
      hero: true,
      visualComponent: "pipeline",
    },
    {
      name: "PriceGuard-AI",
      badges: ["🏆 GDG Hackathon Winner", "GDG AASTU Hackathon"],
      type: "AI/ML Recommendation Model",
      tagline: "AI price recommendation engine",
      description:
        "Built for the GDG AASTU Hackathon. ML-powered recommendation layer that analyses price histories and advises buyers: buy now, or wait. Live deployment with real data.",
      stack: ["TypeScript", "React", "AI/ML", "Python"],
      live: "https://price-guard-ai.vercel.app/",
      github: "https://github.com/Dagim-Tadesse/PriceGuard-AI",
      trophy: true,
      visualComponent: "chart",
    },
    {
      name: "Ride Price Estimation System",
      badges: ["AI/ML · Data Science"],
      tagline: "ML model for ride fare prediction",
      description:
        "A Jupyter notebook ML project estimating ride prices from route, time, traffic, and demand features. Covers preprocessing, feature engineering, and regression model training — applied ML fundamentals end-to-end.",
      stack: ["Python", "Jupyter", "scikit-learn", "Pandas", "NumPy"],
      github: "https://github.com/Dagim-Tadesse/Ride_Price_Estimation_System",
    },
    {
      name: "Face Auth System",
      badges: ["Computer Vision · Python"],
      tagline: "Facial recognition authentication system",
      description:
        "Python-based biometric face authentication system built collaboratively. Uses computer vision and neural facial embeddings to detect and verify identity in real time.",
      stack: ["Python", "OpenCV", "Face Recognition", "Computer Vision"],
      github: "https://github.com/Dagim-Tadesse/face-auth-system",
    },
    {
      name: "GDSC ML Study Sessions",
      badges: ["Google Developer Groups", "Active"],
      tagline: "GDG AI/ML structured curriculum (50% complete)",
      description:
        "Active participant in Google Developer Groups' structured ML curriculum. Hands-on notebooks covering data handling, statistical analysis, model evaluation, and applied problem-solving.",
      stack: ["Python", "Jupyter", "scikit-learn", "Data Science"],
      github: "https://github.com/Dagim-Tadesse/GDSC_study_session_ML_g1",
    },
  ],
  web: [
    {
      name: "Autonomous CRM Automation Agent",
      badges: ["Internship · Africom Tech", "Tech Lead"],
      tagline: "AI lead scoring, email drafting, and multi-platform social monitoring",
      description:
        "Enterprise clean architecture ASP.NET Core backend with real-time AI scoring, multi-tenant lead pipelines, and automated response drafting.",
      stack: ["ASP.NET Core", "React 19", "Gemini AI", "n8n", "Hangfire"],
      visualComponent: "pipeline",
      hero: true,
    },
    {
      name: "SpendWise",
      badges: ["Live · Full-Stack"],
      tagline: "Mobile-first personal finance tracker",
      description:
        "React + TypeScript + Supabase finance app. Real auth, live database, budget calculations, and expense tracking deployed on Vercel.",
      stack: ["React", "TypeScript", "Supabase", "PostgreSQL"],
      live: "https://spend-wise-bydagim.vercel.app/",
      visualComponent: "spendwise",
    },
    {
      name: "Savory Serve",
      badges: ["Restaurant Platform"],
      tagline: "Interactive restaurant & café ordering platform",
      description:
        "Full restaurant ordering web application — dynamic menu browsing, cart state management, and real-time order status tracking from table to kitchen.",
      stack: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
    },
    {
      name: "Spark Study",
      badges: ["Open Source · 8 GitHub Forks"],
      tagline: "Interactive flashcard learning workspace",
      description:
        "Vite + React + TypeScript study workspace with interactive 3D card flip sessions, live deck creation, and custom card editing. 8 community forks on GitHub.",
      stack: ["Vite", "React", "TypeScript", "CSS3 3D"],
      live: "https://spark-study-vert.vercel.app/",
      github: "https://github.com/Dagim-Tadesse/spark-study",
    },
    {
      name: "Hotel Booking System",
      badges: ["Full-Stack · Java"],
      tagline: "Hotel reservation and management system",
      description:
        "Java-based hotel booking management system with room inventory tracking, guest check-in/out, and database transactional logic. Backend fundamentals and SQL schema design.",
      stack: ["Java", "MySQL", "JDBC", "Desktop UI"],
      github: "https://github.com/Dagim-Tadesse/hotel-booking-system",
    },
  ],
  mobile: [
    {
      name: "Gebeya Now",
      badges: ["⭐ Original Design · Solo", "Flutter Native"],
      tagline: "Mobile marketplace — built from scratch",
      description:
        "A Flutter mobile marketplace designed and built from scratch. Features product browsing, category filtering, cart management, and native performance.",
      stack: ["Flutter", "Dart", "Figma", "Clean Architecture"],
      github: "https://github.com/Dagim-Tadesse/gebeya_now",
      visualComponent: "mobile",
    },
    {
      name: "Flutter Mobile Programming Course",
      badges: ["Academic · AASTU"],
      tagline: "Advanced Flutter coursework & architecture builds",
      description:
        "Curated repository of Flutter applications and architectural patterns built during the university Mobile Programming course (2025–2026).",
      stack: ["Flutter", "Dart", "State Management", "REST APIs"],
      github: "https://github.com/Dagim-Tadesse/Flutter-mobile-programming-course-25-26",
    },
    {
      name: "Flutter Training Lab",
      badges: ["Foundations & Widgets"],
      tagline: "Flutter layouts, gestures, and native bridging",
      description:
        "Hands-on training repository covering Flutter widget trees, reactive layouts, device sensors, and animation controllers before launching production apps.",
      stack: ["Flutter", "Dart", "C++ Engine"],
      github: "https://github.com/Dagim-Tadesse/flutter-training",
    },
  ],
  group: [
    {
      name: "Autonomous CRM Automation Agent",
      badges: ["Africom Tech Lead", "3-Person Team"],
      tagline: "Architected core backend & AI integrations",
      description:
        "Led architecture and coordinated code reviews across our team. Built Clean Architecture backend, resolved Gemini API header authentication, and shipped the n8n social integration.",
      stack: ["ASP.NET Core", "Gemini AI", "n8n", "Hangfire"],
      visualComponent: "pipeline",
      hero: true,
    },
    {
      name: "PriceGuard-AI",
      badges: ["🏆 GDG Hackathon Winner", "GDG AASTU Hackathon"],
      tagline: "AI price recommendation — hackathon team project",
      description:
        "Winner at the GDG AASTU AI/ML Hackathon. Built under competition pressure with live deployment and model inference.",
      stack: ["TypeScript", "React", "AI/ML", "Python"],
      live: "https://price-guard-ai.vercel.app/",
      trophy: true,
      visualComponent: "chart",
    },
    {
      name: "CATs Group 2 — Cardano Blockchain Hackathon",
      badges: ["Blockchain · Hackathon"],
      tagline: "Smart contract development on Cardano",
      description:
        "Participated as a blockchain developer in an intensive Cardano hackathon. Implemented smart contract logic and token handling under competition constraints.",
      stack: ["JavaScript", "Cardano", "Smart Contracts", "Haskell Core"],
      github: "https://github.com/Dagim-Tadesse/CATs-Group-2",
    },
    {
      name: "Face Auth System",
      badges: ["Group · Computer Vision"],
      tagline: "Collaborative facial recognition authentication",
      description:
        "Facial recognition system built collaboratively in Python. Implemented computer vision image capture, landmark alignment, and similarity verification.",
      stack: ["Python", "OpenCV", "NumPy"],
      github: "https://github.com/Dagim-Tadesse/face-auth-system",
    },
    {
      name: "Water Monitoring System",
      badges: ["Academic · AASTU IETP"],
      tagline: "IoT water resource monitoring — university project",
      description:
        "TypeScript-based monitoring system built for AASTU's 4th-year Integrated Engineering Team Project. Solves real utility distribution challenges in Ethiopia.",
      stack: ["TypeScript", "IoT Sensors", "REST"],
      github: "https://github.com/Dagim-Tadesse/Water_Monitoring_System",
    },
  ],
};

const SKILL_CATEGORIES = [
  {
    name: "AI & Applied ML",
    icon: Brain,
    description: "Inference pipelines, prompt engineering, and predictive models",
    skills: [
      { name: "Google Gemini AI API", highlight: true, note: "CRM Agent lead scoring" },
      { name: "Machine Learning (scikit-learn)", highlight: true, note: "PriceGuard & Ride models" },
      { name: "Computer Vision (OpenCV)", highlight: false, note: "Face Auth system" },
      { name: "Data Preprocessing & EDA", highlight: false, note: "Pandas & NumPy" },
      { name: "Model Training & Evaluation", highlight: false, note: "GDG curriculum" },
      { name: "Jupyter Notebooks", highlight: false, note: "Research & experimentation" },
    ],
  },
  {
    name: "Backend & Systems",
    icon: Cpu,
    description: "Robust enterprise architecture, APIs, and background processing",
    skills: [
      { name: "ASP.NET Core", highlight: true, note: "Africom Tech Lead" },
      { name: "Clean Architecture", highlight: true, note: "Domain/App/Infra separation" },
      { name: "Supabase & PostgreSQL", highlight: true, note: "SpendWise production" },
      { name: "SQL Server & MySQL", highlight: false, note: "Schema & indexing" },
      { name: "Hangfire Job Scheduler", highlight: false, note: "Async background queues" },
      { name: "JWT Auth & Security", highlight: false, note: "Role-based authorization" },
      { name: "RESTful API Design", highlight: false, note: "Clean endpoints" },
    ],
  },
  {
    name: "Frontend & UI/UX",
    icon: Layers,
    description: "High-performance web apps, design systems, and micro-interactions",
    skills: [
      { name: "React 19 & TypeScript", highlight: true, note: "Daily framework" },
      { name: "Tailwind CSS & Animations", highlight: true, note: "Modern cyber aesthetics" },
      { name: "Vite & TanStack Start", highlight: false, note: "Modern bundlers" },
      { name: "Figma UI/UX Design", highlight: false, note: "Gebeya Now design" },
      { name: "Responsive & Accessible UI", highlight: false, note: "Mobile-first philosophy" },
    ],
  },
  {
    name: "Mobile Development",
    icon: Smartphone,
    description: "Cross-platform native mobile applications",
    skills: [
      { name: "Flutter", highlight: true, note: "Gebeya Now marketplace" },
      { name: "Dart", highlight: true, note: "Type-safe mobile engineering" },
      { name: "Mobile UI Design", highlight: false, note: "Original e-commerce UI" },
      { name: "State Management", highlight: false, note: "Clean reactive flows" },
    ],
  },
  {
    name: "ERP & Automation",
    icon: Zap,
    description: "Business process automation and enterprise systems",
    skills: [
      { name: "n8n Webhook Automations", highlight: true, note: "5-platform social ingest" },
      { name: "Odoo CRM & Website", highlight: true, note: "ConDigital Inc. contractor" },
      { name: "AI Dataset Structuring", highlight: false, note: "Data funnel design" },
      { name: "Git, GitHub & Vercel CI/CD", highlight: false, note: "Production deployments" },
    ],
  },
];

const TYPING_PHRASES = [
  "Building at the intersection of AI, real-world systems, and human-first UI.",
  "Tech Lead on Autonomous CRM Agent · Google Gemini & ASP.NET Clean Architecture.",
  "🏆 Winner at GDG AASTU AI/ML Hackathon (PriceGuard-AI).",
  "Software Engineering student at AASTU · Open to Internships for 2026/2027.",
];

function useTyping(phrases: string[], typeMs = 34, holdMs = 2200) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(phrases[0]);
      return;
    }
    const phrase = phrases[i % phrases.length];
    if (!del && text === phrase) {
      const t = setTimeout(() => setDel(true), holdMs);
      return () => clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false);
      setI((v) => v + 1);
      return;
    }
    const t = setTimeout(
      () => {
        setText(
          del ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1),
        );
      },
      del ? typeMs / 1.8 : typeMs,
    );
    return () => clearTimeout(t);
  }, [text, del, i, phrases, typeMs, holdMs]);

  return text;
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.background = `radial-gradient(750px circle at ${e.clientX}px ${e.clientY}px, rgba(0,255,209,0.06), rgba(139,92,246,0.03) 40%, transparent 70%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
    />
  );
}

function Counter({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const dur = 1300;
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(to * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="font-mono">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Portfolio() {
  const typed = useTyping(TYPING_PHRASES);
  const active = useScrollSpy(NAV.map((n) => n.id));
  const [showTop, setShowTop] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [heroVisual, setHeroVisual] = useState<"cube" | "console">("cube");
  const [muted, setMuted] = useState(sfx.isMuted());
  const [tab, setTab] = useState<TabId>("top");
  const [skillSearch, setSkillSearch] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.2,
  });

  useEffect(() => {
    return sfx.subscribe(setMuted);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = () => {
    sfx.playSuccess();
    navigator.clipboard.writeText("dagimtadesse25@gmail.com");
    toast.success("Email copied to clipboard!", {
      description: "dagimtadesse25@gmail.com",
    });
  };

  const scrollTo = (id: string) => {
    sfx.playTick(1.2);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredCategories = useMemo(() => {
    if (!skillSearch.trim()) return SKILL_CATEGORIES;
    const q = skillSearch.toLowerCase();
    return SKILL_CATEGORIES.map((cat) => ({
      ...cat,
      skills: cat.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.note?.toLowerCase().includes(q) ||
          cat.name.toLowerCase().includes(q),
      ),
    })).filter((cat) => cat.skills.length > 0);
  }, [skillSearch]);

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-[#00ffd1]/25 selection:text-white noise">
      <CursorSpotlight />
      <NeuralBackground />

      {/* Cmd+K Command Palette */}
      <CommandMenu
        open={cmdOpen}
        setOpen={setCmdOpen}
        onNavigate={scrollTo}
      />

      {/* Top progress line */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-50 h-[2.5px] origin-left bg-gradient-to-r from-[#00ffd1] via-sky-400 to-purple-500"
        aria-hidden
      />

      {/* FLOATING HEADER */}
      <header className="fixed inset-x-0 top-0 z-40 backdrop-blur-xl bg-[#07090e]/75 border-b border-white/[0.07]">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <button
            onClick={() => scrollTo("home")}
            className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#00ffd1]/30 bg-[#0d121c] shadow-[0_0_15px_rgba(0,255,209,0.2)] transition-transform duration-300 group-hover:scale-105">
              <span className="font-black text-sm text-white">DT</span>
            </div>
            <span className="hidden sm:inline">
              Dagim<span className="text-[#00ffd1]">.</span>
            </span>
          </button>

          {/* Desktop Nav Items */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors ${
                    active === n.id
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {n.label}
                  {active === n.id && (
                    <motion.span
                      layoutId="navline"
                      className="absolute -bottom-0.5 left-1/2 h-[2px] w-6 -translate-x-1/2 bg-[#00ffd1]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Quick Action Pill & Search */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* AUDIO SFX TOGGLE */}
            <button
              onClick={() => {
                const nowMuted = sfx.toggle();
                toast(nowMuted ? "Audio muted" : "Audio enabled", {
                  description: nowMuted ? "Synthesized UI sound effects disabled" : "Subtle cyber UI audio enabled",
                });
              }}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-mono transition-all ${
                !muted
                  ? "border-[#00ffd1]/40 bg-[#00ffd1]/10 text-[#00ffd1] shadow-[0_0_12px_rgba(0,255,209,0.2)]"
                  : "border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20"
              }`}
              title={muted ? "Enable futuristic UI sound effects" : "Mute UI sound effects"}
              aria-label="Toggle audio effects"
            >
              {!muted ? (
                <>
                  <Volume2 size={13} className="text-[#00ffd1] animate-pulse" />
                  <span className="hidden xl:inline text-[10px] font-bold">SFX ON</span>
                </>
              ) : (
                <>
                  <VolumeX size={13} />
                  <span className="hidden xl:inline text-[10px]">SFX OFF</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                sfx.playSnap();
                setCmdOpen(true);
              }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-300 transition-colors hover:border-[#00ffd1]/40 hover:text-white"
              title="Press ⌘K or / to open command menu"
            >
              <Search size={13} className="text-[#00ffd1]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-slate-400 border border-white/5">
                ⌘K
              </kbd>
            </button>

            {/* DOWNLOAD CV BUTTON */}
            <a
              href="/Dagim_Tadesse_CV.pdf"
              download="Dagim_Tadesse_CV.pdf"
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => sfx.playSuccess()}
              className="flex items-center gap-1.5 rounded-full border border-[#00ffd1]/30 bg-[#00ffd1]/10 px-3.5 py-1.5 font-mono text-xs font-bold text-[#00ffd1] transition-all hover:border-[#00ffd1] hover:bg-[#00ffd1]/20 hover:scale-105 shadow-[0_0_15px_rgba(0,255,209,0.15)]"
              title="Download Dagim's Curriculum Vitae (PDF)"
            >
              <FileDown size={13} />
              <span>Download CV</span>
            </a>

            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                Open to Internships
              </span>
            </div>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-16"
      >
        {/* Background Atmosphere */}
        <div className="absolute inset-0 radial-glow" aria-hidden />
        <div className="absolute inset-0 radial-glow-violet" aria-hidden />
        <div
          className="absolute -left-48 top-1/4 h-[500px] w-[500px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: "rgba(0,255,209,0.08)" }}
          aria-hidden
        />
        <div
          className="absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: "rgba(139,92,246,0.08)" }}
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-6xl px-5">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Column: Human Story & Identity */}
            <div className="lg:col-span-6 space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-md">
                  <img
                    src="/logo.jpg?v=2"
                    alt="Dagim Tadesse"
                    className="h-5 w-5 rounded-full object-cover ring-1 ring-[#00ffd1]"
                  />
                  <span className="font-mono text-xs text-slate-300">
                    Dagim Tadesse
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-[#00ffd1]">
                    <MapPin size={11} /> Addis Ababa, Ethiopia
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="font-display text-balance text-4xl sm:text-6xl font-bold leading-[1.08] tracking-tight text-white">
                  Engineering <br className="hidden sm:inline" />
                  <span className="text-gradient-cyan">Intelligent Systems</span>
                  <br />
                  that Solve Real Problems<span className="text-[#00ffd1]">.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-xl border border-white/[0.08] bg-black/30 p-3.5 backdrop-blur-md min-h-[4rem] flex items-center">
                  <div className="font-mono text-sm sm:text-base text-slate-300">
                    <span className="text-emerald-400 font-semibold">&gt; </span>
                    <span className="text-white">{typed}</span>
                    <span
                      className="ml-1 inline-block h-4 w-[2px] animate-pulse align-middle bg-[#00ffd1]"
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-sans">
                  Final-year Software Engineering student at AASTU. I bridge
                  <span className="text-white font-medium"> applied AI/ML engineering</span>,
                  <span className="text-white font-medium"> Clean Architecture backends</span>, and
                  <span className="text-white font-medium"> polished modern interfaces</span>.
                  Tech Lead on an autonomous CRM agent at Africom Tech; GDG AI/ML Hackathon Winner.
                </p>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #00ffd1 0%, #38bdf8 100%)",
                      boxShadow: "0 10px 30px -8px rgba(0,255,209,0.45)",
                    }}
                  >
                    <span>Explore Selected Work</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                  <a
                    href="/Dagim_Tadesse_CV.pdf"
                    download="Dagim_Tadesse_CV.pdf"
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => sfx.playSuccess()}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#00ffd1]/40 bg-[#00ffd1]/10 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#00ffd1] transition-all hover:bg-[#00ffd1]/20 hover:border-[#00ffd1] hover:scale-105 shadow-[0_0_20px_rgba(0,255,209,0.15)]"
                    title="Download Curriculum Vitae (PDF)"
                  >
                    <FileDown size={14} className="transition-transform group-hover:-translate-y-0.5" />
                    <span>Download CV</span>
                  </a>

                  <button
                    onClick={() => {
                      sfx.playSnap();
                      setCmdOpen(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-200 transition-colors hover:border-[#00ffd1]/50 hover:bg-white/10"
                  >
                    <Terminal size={14} className="text-[#00ffd1]" />
                    <span>Quick Command ⌘K</span>
                  </button>

                  <a
                    href="https://github.com/Dagim-Tadesse"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-[#00ffd1]/40 hover:text-white"
                    aria-label="GitHub Profile"
                  >
                    <Github size={17} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/dagim-tadesse-ba6b30263/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-[#00ffd1]/40 hover:text-white"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={17} />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="pt-2">
                  <GitHubStrip />
                </div>
              </Reveal>
            </div>

            {/* Right Column: High-Tech Interactive AI Core & 3D Matrix Cube */}
            <div className="lg:col-span-6 space-y-3">
              <Reveal delay={0.18}>
                <div className="flex items-center justify-between pb-1 px-1">
                  <div className="inline-flex rounded-xl border border-white/10 bg-black/40 p-1 backdrop-blur-md">
                    <button
                      onClick={() => {
                        sfx.playSwitch();
                        setHeroVisual("cube");
                      }}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
                        heroVisual === "cube"
                          ? "bg-[#00ffd1]/20 text-[#00ffd1] border border-[#00ffd1]/40 shadow-[0_0_15px_rgba(0,255,209,0.2)]"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Box size={13} />
                      <span>3D Matrix Cube</span>
                    </button>
                    <button
                      onClick={() => {
                        sfx.playSwitch();
                        setHeroVisual("console");
                      }}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
                        heroVisual === "console"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Cpu size={13} />
                      <span>AI Pipeline Console</span>
                    </button>
                  </div>

                  <span className="hidden sm:inline font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    {heroVisual === "cube" ? "Spatial 3D" : "Lead Scoring"}
                  </span>
                </div>

                <div className="mt-2">
                  <AnimatePresence mode="wait">
                    {heroVisual === "cube" ? (
                      <motion.div
                        key="cube"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25 }}
                      >
                        <InteractiveCube
                          onNavigate={(secId) => scrollTo(secId)}
                          onOpenCommandMenu={() => setCmdOpen(true)}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="console"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25 }}
                      >
                        <HeroConsole />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Seamless Kinetic Telemetry Bridge (replaces static lines & black gaps) */}
      <div className="relative py-6 overflow-hidden border-y border-white/[0.05] bg-gradient-to-r from-transparent via-[#00ffd1]/[0.03] to-transparent">
        <MarqueeTicker />
      </div>

      {/* ABOUT & PHILOSOPHY SECTION (COMPLETELY DE-CARDED & EDITORIAL) */}
      <section id="about" className="relative scroll-mt-24 pt-12 pb-24">
        <div className="mx-auto max-w-6xl px-5 space-y-16">
          <SectionHeading kicker="01 // Identity & Manifesto" title="Engineering Systems that Ship" />

          {/* Narrative & Human Story (NO BOXES) */}
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8 space-y-5">
              <Reveal>
                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  I don&apos;t build demo toys. <br />
                  <span className="text-gradient-cyan">I build systems where intelligence is the product.</span>
                </h3>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                  I began programming in January 2022 in Addis Ababa, driven by a deep conviction: software should solve immediate, high-friction human and business problems. Today as a final-year Software Engineering student at AASTU, I bridge applied AI/ML engineering, clean enterprise backends, and responsive mobile architecture.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
                  Most recently as Tech Lead at Africom Tech, I led architecture across a 3-engineer team—designing the ASP.NET Core Clean Architecture backend, integrating Google Gemini for lead scoring, and building an n8n webhook layer spanning 5 social networks. When hackathon pressure hit at GDG AASTU, my team shipped PriceGuard-AI and won the GDG AI/ML Hackathon.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#00ffd1]/30 bg-[#00ffd1]/10 px-4 py-1.5 font-mono text-xs text-[#00ffd1]">
                    <Sparkles size={13} /> Open to Internships (Summer & Fall 2026/2027)
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 font-mono text-xs text-purple-300">
                    <Cpu size={13} /> Tech Lead Experience
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Human Portrait & Status Floating Node */}
            <div className="lg:col-span-4 relative flex justify-center">
              <Reveal delay={0.14}>
                <div className="relative flex flex-col items-center text-center space-y-4">
                  {/* Subtle radial halo */}
                  <div className="absolute -inset-8 rounded-full bg-[#00ffd1]/10 blur-3xl pointer-events-none" />
                  
                  <div className="relative">
                    <img
                      src="/logo.jpg?v=2"
                      alt="Dagim Tadesse"
                      className="h-28 w-28 rounded-full object-cover ring-4 ring-[#00ffd1]/30 shadow-[0_0_40px_rgba(0,255,209,0.25)]"
                    />
                    <span className="absolute bottom-1 right-1 flex h-4 w-4">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-black" />
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold text-white">Dagim Tadesse</h4>
                    <p className="font-mono text-xs text-[#00ffd1]">Software & AI/ML Engineer</p>
                    <p className="font-mono text-[11px] text-slate-400 mt-1">AASTU · Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Open Stats Bar (NO BOXES, glowing numeric meters) */}
          <div className="pt-4 border-t border-b border-white/[0.08] py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-400">AASTU Degree</p>
                <p className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-white">2027</p>
                <p className="font-mono text-[11px] text-[#00ffd1] mt-0.5">B.S. Software Engineering</p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Hackathon</p>
                <p className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-amber-300 flex items-center justify-center sm:justify-start gap-2">
                  <Trophy size={28} /> Winner
                </p>
                <p className="font-mono text-[11px] text-amber-300/80 mt-0.5">GDG AASTU AI/ML Hackathon</p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Open Source</p>
                <p className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-white">
                  <Counter to={10} suffix="+" />
                </p>
                <p className="font-mono text-[11px] text-sky-400 mt-0.5">Verified Public Repos</p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Active Velocity</p>
                <p className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-white">
                  <Counter to={3} suffix="+ Yrs" />
                </p>
                <p className="font-mono text-[11px] text-purple-400 mt-0.5">Continuous Shipping</p>
              </div>
            </div>
          </div>

          {/* 4 Pillars Spectrum (NO CARDS, open vertical illuminated lanes) */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400">
              // Core Engineering Pillars
            </h4>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-2">
              <div className="space-y-2 border-l-2 border-[#00ffd1]/60 pl-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00ffd1]/10 text-[#00ffd1]">
                  <Brain size={18} />
                </div>
                <h5 className="font-display font-bold text-base text-white">AI & Applied ML</h5>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Gemini prompt pipelines, sentiment inference, and price prediction regression models.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-[#38bdf8]/60 pl-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-300">
                  <Cpu size={18} />
                </div>
                <h5 className="font-display font-bold text-base text-white">Clean Backends</h5>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  ASP.NET Core DDD Clean Architecture, Supabase PostgreSQL, and Hangfire async queues.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-[#a855f7]/60 pl-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-300">
                  <Smartphone size={18} />
                </div>
                <h5 className="font-display font-bold text-base text-white">Mobile Native</h5>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Flutter mobile marketplace built from scratch, Dart Clean Architecture, and Figma UX.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-[#fbbf24]/60 pl-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-300">
                  <Zap size={18} />
                </div>
                <h5 className="font-display font-bold text-base text-white">ERP & Automation</h5>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Odoo Website/CRM design for AI datasets at ConDigital Inc; n8n multi-platform webhook pipes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORK SECTION: INTERACTIVE PROJECT THEATER (No more generic card stacks) */}
      <section id="projects" className="relative scroll-mt-24 pt-16 pb-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            kicker="02 // Interactive Project Studio"
            title="Featured Engineering Systems"
          />

          <div className="mt-10">
            <Reveal>
              <ProjectTheater />
            </Reveal>
          </div>
        </div>
      </section>

      {/* TECHNICAL TOOLKIT & WORKBENCH (No more generic card stacks) */}
      <section id="skills" className="relative scroll-mt-24 pt-16 pb-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            kicker="03 // Architecture Workbench"
            title="Technical Capabilities & Production Blueprints"
          />

          <div className="mt-10">
            <Reveal>
              <SkillsWorkbench />
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPERIENCE & ACHIEVEMENTS: ILLUMINATED VERTICAL MILESTONE SPINE (NO CARDS) */}
      <section id="experience" className="relative scroll-mt-24 pt-16 pb-28">
        <div className="mx-auto max-w-5xl px-5 space-y-12">
          <SectionHeading kicker="04 // Career Journey" title="Experience & Proven Milestones" />

          {/* Central Illuminated Chronological Spine */}
          <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-[#00ffd1] before:via-purple-500 before:to-transparent">
            
            {/* MILESTONE 1: AFRICOM TECH LEAD */}
            <div className="relative space-y-3">
              {/* Glowing spine node */}
              <div className="absolute -left-6 sm:-left-10 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#07090e] ring-2 ring-[#00ffd1]">
                <span className="h-2 w-2 rounded-full bg-[#00ffd1] shadow-[0_0_10px_#00ffd1]" />
              </div>

              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="rounded-full bg-[#00ffd1]/15 px-3 py-0.5 font-bold text-[#00ffd1] border border-[#00ffd1]/30">
                  Tech Lead · Internship
                </span>
                <span className="text-slate-400">Africom Tech</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">Addis Ababa, Ethiopia</span>
              </div>

              <h4 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Architect & Team Lead — Autonomous CRM Automation Agent
              </h4>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-3xl">
                Led technical architecture across a 3-engineer team. Built the core ASP.NET Clean Architecture backend, integrated Google Gemini for real-time lead score and emotional valence analysis, and independently developed an n8n webhook ingestion layer listening to LinkedIn, Twitter, Facebook, Instagram, and TikTok data.
              </p>

              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 pt-2 max-w-3xl">
                {[
                  { label: "AI Lead Scoring", desc: "0-100 Gemini evaluation" },
                  { label: "Clean Architecture", desc: "ASP.NET Core DDD layers" },
                  { label: "Social Pipeline", desc: "5-platform n8n listeners" },
                  { label: "Async Hangfire", desc: "Background job scheduling" },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-[#00ffd1]/50 pl-3 py-1">
                    <p className="font-mono text-xs font-semibold text-white">{item.label}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs italic text-slate-400 leading-relaxed max-w-3xl border-l border-white/20 pl-3 pt-1">
                &quot;Led architecture decisions across a team of three as Tech Lead. Owned the core backend and independently built the entire n8n social monitoring layer mid-project. Overcame Gemini API header authentication discrepancies and kept the team focused to deliver a live demo within 4 weeks.&quot;
              </p>
            </div>

            {/* MILESTONE 2: GDG HACKATHON WINNER */}
            <div className="relative space-y-3 pt-4">
              <div className="absolute -left-6 sm:-left-10 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-[#07090e] ring-2 ring-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
              </div>

              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="rounded-full bg-amber-400/15 px-3 py-0.5 font-bold text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                  <Trophy size={12} /> GDG Hackathon Winner
                </span>
                <span className="text-slate-400">Google Developer Groups (GDG) · AASTU</span>
              </div>

              <h4 className="font-display text-2xl font-bold text-white">
                GDG AASTU AI/ML Hackathon Winner — PriceGuard-AI
              </h4>

              <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
                Engineered PriceGuard-AI under competition pressure with a live public deployment on Vercel. Analyzes product price histories across e-commerce retail endpoints using a regression ML model to output a definitive signal: buy now or wait for the optimal price drop window.
              </p>

              <div className="pt-1">
                <a
                  href="https://price-guard-ai.vercel.app/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300 transition-colors hover:text-white"
                >
                  <span>Launch PriceGuard-AI Live System</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* MILESTONE 3: CONDIGITAL ODOO CONTRACTOR */}
            <div className="relative space-y-2 pt-4">
              <div className="absolute -left-6 sm:-left-10 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-[#07090e] ring-2 ring-[#38bdf8]">
                <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />
              </div>

              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-[#38bdf8] font-bold">Contractor · Current</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">ConDigital Inc. · Addis Ababa</span>
              </div>

              <h4 className="font-display text-xl font-bold text-white">
                Odoo Designer — AI Training Datasets & Lead Funnels
              </h4>

              <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-3xl">
                Designing Odoo website content, structured forms, and data funnels for AI training datasets. Specializing in Website and CRM modules — applying SEO optimization, lead-generation tagging, and clean data categorization.
              </p>
            </div>

            {/* MILESTONE 4: ACADEMIC DEGREE */}
            <div className="relative space-y-2 pt-4">
              <div className="absolute -left-6 sm:-left-10 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-[#07090e] ring-2 ring-purple-400">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
              </div>

              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-purple-400 font-bold">Expected June 2027</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">Addis Ababa Science & Technology University</span>
              </div>

              <h4 className="font-display text-xl font-bold text-white">
                Bachelor of Software Engineering (Self-Taught Since Jan 2022)
              </h4>

              <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-3xl">
                Rigorous foundational coursework in algorithms, operating systems, distributed architectures, and machine learning. Combined university curriculum with continuous personal shipping in production web and mobile software.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT & GET IN TOUCH */}
      <section id="contact" className="relative scroll-mt-24 pt-16 pb-28">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <SectionHeading
            kicker="05 // Human Connection"
            title="Let's Build Something Exceptional"
            centered
          />

          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
              I am actively seeking internship and software engineering roles in AI/ML, backend systems, or full-stack engineering. Whether you have an open position, an ambitious project, or just want to talk tech — my inbox is open.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                onClick={copyEmail}
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-mono text-xs sm:text-sm font-semibold text-white transition-all hover:border-[#00ffd1]/60 hover:bg-white/10 hover:scale-105"
              >
                <Mail size={16} className="text-[#00ffd1]" />
                <span>dagimtadesse25@gmail.com</span>
                <Copy size={14} className="text-slate-400 group-hover:text-white" />
              </button>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com/Dagim-Tadesse"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-[#00ffd1]/50 hover:text-white"
                  aria-label="GitHub Profile"
                >
                  <Github size={17} />
                </a>
                <a
                  href="https://www.linkedin.com/in/dagim-tadesse-ba6b30263/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-[#00ffd1]/50 hover:text-white"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={17} />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] py-10 bg-black/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-xs text-slate-400 md:flex-row font-mono">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white">Dagim Tadesse</span>
            <span>·</span>
            <span>Addis Ababa, Ethiopia 🇪🇹</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Crafted with TanStack Start, React 19, Tailwind CSS & Framer Motion.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Dagim-Tadesse"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/dagim-tadesse-ba6b30263/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0b0f19]/90 text-[#00ffd1] backdrop-blur-xl shadow-2xl transition-all hover:scale-110 hover:border-[#00ffd1]"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  centered = false,
}: {
  kicker: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <Reveal>
      <div className={centered ? "text-center" : ""}>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#00ffd1]">
          {kicker}
        </p>
        <h2 className="mt-2.5 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/40 p-3.5 transition-colors hover:border-white/15">
      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-bold text-white">{value}</p>
      {sub && <p className="mt-0.5 text-[11px] text-slate-500 font-mono">{sub}</p>}
    </div>
  );
}

function ProjectBentoCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 280, damping: 24 },
        },
      }}
      className={`h-full ${project.hero ? "md:col-span-2" : ""}`}
    >
      <TiltCard
        hero={project.hero}
        glowColor={project.trophy ? "#fbbf24" : "#00ffd1"}
        className={`group relative flex h-full flex-col justify-between p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${
          project.hero ? "md:p-9" : ""
        }`}
      >
        {/* Top badges & links */}
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                {project.badges.map((b) => (
                  <span
                    key={b}
                    className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                      project.trophy
                        ? "border border-amber-400/40 bg-amber-400/10 text-amber-300"
                        : "border border-white/10 bg-white/5 text-slate-300"
                    }`}
                  >
                    {b}
                  </span>
                ))}
              </div>

              <h3
                className={`font-display font-bold tracking-tight text-white ${
                  project.hero ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                }`}
              >
                {project.name}
              </h3>

              {project.type && (
                <p className="font-mono text-xs text-[#00ffd1]">{project.type}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${project.name} live link`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-[#00ffd1] hover:text-[#00ffd1]"
                  title="View Live App"
                >
                  <ExternalLink size={13} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${project.name} source code on GitHub`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-[#00ffd1] hover:text-[#00ffd1]"
                  title="View Source on GitHub"
                >
                  <Github size={13} />
                </a>
              )}
            </div>
          </div>

          <p className="mt-3 text-sm font-medium text-slate-200">
            {project.tagline}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {project.description}
          </p>

          {/* Embedded Interactive Visual Component */}
          {project.visualComponent && (
            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              {project.visualComponent === "pipeline" && <CrmPipelineVisualizer />}
              {project.visualComponent === "chart" && <PriceGuardChart />}
              {project.visualComponent === "mobile" && <GebeyaMockup />}
              {project.visualComponent === "spendwise" && <SpendWiseWidget />}
            </div>
          )}
        </div>

        {/* Tech stack badges */}
        <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.04]">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/5 bg-black/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400"
            >
              {s}
            </span>
          ))}
        </div>
      </TiltCard>
    </motion.div>
  );
}

function TimelineCard({
  icon,
  title,
  org,
  meta,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  org: string;
  meta: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-md transition-colors hover:border-white/20">
      <div className="flex items-start gap-3.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#00ffd1] shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-display font-bold text-base text-white">{title}</h4>
          <p className="text-xs text-slate-300 font-medium">{org}</p>
          <p className="mt-0.5 font-mono text-[10px] text-slate-400">{meta}</p>
          <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  );
}

type GhEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: { commits?: { message: string }[] };
};

function GitHubStrip() {
  const [event, setEvent] = useState<GhEvent | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/users/Dagim-Tadesse/events/public?per_page=10")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((events: GhEvent[]) => {
        if (cancelled) return;
        const push =
          events.find((e) => e.type === "PushEvent" && e.payload?.commits?.length) ??
          events[0];
        if (push) setEvent(push);
      })
      .catch(() => !cancelled && setErr(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const message = useMemo(() => {
    if (!event) return null;
    const commits = event.payload?.commits;
    return commits && commits.length
      ? commits[commits.length - 1].message.split("\n")[0]
      : event.type.replace("Event", "");
  }, [event]);

  if (err) return null;

  return (
    <a
      href="https://github.com/Dagim-Tadesse"
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-[#00ffd1]/40 hover:text-white"
    >
      <GitCommit size={13} className="text-[#00ffd1] shrink-0" />
      {event && message ? (
        <>
          <span className="hidden sm:inline text-white truncate max-w-[240px]">
            {message}
          </span>
          <span className="text-slate-400 truncate max-w-[160px]">
            {event.repo.name}
          </span>
          <span className="text-slate-500 shrink-0">· {timeAgo(event.created_at)}</span>
        </>
      ) : (
        <span>Loading latest verified GitHub telemetry…</span>
      )}
    </a>
  );
}

function timeAgo(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return `${Math.floor(s)}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function ContactForm() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${data.name || "Engineering Colleague"}`,
    );
    const body = encodeURIComponent(
      `${data.message}\n\n— Best regards,\n${data.name} (${data.email})`,
    );
    window.location.href = `mailto:dagimtadesse25@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    toast.success("Opening your mail client...", {
      description: "Looking forward to connecting with you!",
    });
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-10 grid max-w-xl gap-3 text-left font-sans"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Your name"
          className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs sm:text-sm text-white outline-none transition-colors focus:border-[#00ffd1]/60"
        />
        <input
          required
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Your email"
          className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs sm:text-sm text-white outline-none transition-colors focus:border-[#00ffd1]/60"
        />
      </div>
      <textarea
        required
        rows={4}
        value={data.message}
        onChange={(e) => setData({ ...data, message: e.target.value })}
        placeholder="Tell me about your team, internship opportunity, or project..."
        className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs sm:text-sm text-white outline-none transition-colors focus:border-[#00ffd1]/60"
      />
      <div className="flex items-center justify-between pt-1">
        <p className="font-mono text-[11px] text-slate-500">
          Direct dispatch to dagimtadesse25@gmail.com
        </p>
        <button
          type="submit"
          className="rounded-full px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #00ffd1 0%, #38bdf8 100%)",
          }}
        >
          {submitted ? "Opening Mail..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}

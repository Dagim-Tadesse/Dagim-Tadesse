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
  Link,
  BarChart,
  Lock,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const TEAL = "#00FFD1";

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
};

const TABS = [
  { id: "top", label: "Top", icon: Star },
  { id: "ai", label: "AI / ML", icon: Bot },
  { id: "group", label: "Group", icon: Users },
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "web", label: "Web / Full-Stack", icon: Globe },
] as const;
type TabId = (typeof TABS)[number]["id"];

const PROJECTS: Record<TabId, Project[]> = {
  top: [
    {
      name: "Autonomous CRM Automation Agent",
      badges: ["Internship · Africom Tech", "Tech Lead"],
      type: "Group · Full-Stack AI",
      tagline: "AI lead scoring, email drafting, and multi-platform social monitoring",
      description:
        "Led architecture across a 3-person team. Built the core ASP.NET Clean Architecture backend, integrated Google Gemini for lead scoring, and independently developed an n8n webhook layer for monitoring LinkedIn, Twitter, Facebook, Instagram, and TikTok data.",
      stack: ["ASP.NET Core", "React", "Gemini AI", "n8n", "Hangfire"],
      hero: true,
    },
    {
      name: "PriceGuard-AI",
      badges: ["🏆 2nd Place — GDG AASTU Hackathon"],
      type: "Group · AI/ML Hackathon",
      tagline: "AI-powered price recommendation engine",
      description:
        "Built under hackathon pressure with a team and deployed live. Tracks product prices over time and delivers a clear AI-backed recommendation — buy now or wait. Combines price-history inspection with an ML recommendation layer. 2nd place in the AI/ML track.",
      stack: ["TypeScript", "React", "AI/ML", "Vercel"],
      live: "https://price-guard-ai.vercel.app/",
      github: "https://github.com/Dagim-Tadesse/PriceGuard-AI",
      hero: true,
      trophy: true,
    },
    {
      name: "SpendWise",
      badges: ["Live · In Personal Use"],
      type: "Solo · Full-Stack",
      tagline: "Mobile-first personal finance tracker",
      description:
        "A fast, mobile-first finance app built with React, TypeScript and Supabase. Real authentication, live database, budget tracking and spending visualisation. A complete production product I actively use — not a demo.",
      stack: ["React", "TypeScript", "Supabase", "Vercel"],
      live: "https://spend-wise-bydagim.vercel.app/",
    },
    {
      name: "Savory Serve",
      badges: ["Web App"],
      type: "Solo · Full-Stack",
      tagline: "Restaurant & café ordering platform",
      description:
        "A full restaurant and café web experience — browse menus, place orders and manage the flow from table to kitchen. Showcases real-world UI complexity and state management for a hospitality use case.",
      stack: ["TypeScript", "React", "Vercel"],
    },
    {
      name: "Gebeya Now",
      badges: ["Mobile · Original Design"],
      type: "Solo · Mobile",
      tagline: "Mobile marketplace app — built from scratch",
      description:
        "A Flutter mobile marketplace I designed entirely from scratch. Gebeya (\"market\" in Amharic) lets users browse, list and interact with products in a clean native experience. A personal design challenge that became a full product.",
      stack: ["Flutter", "Dart", "Mobile"],
      github: "https://github.com/Dagim-Tadesse/gebeya_now",
    },
  ],
  ai: [
    {
      name: "Autonomous CRM Automation Agent",
      badges: ["Internship · Africom Tech", "Tech Lead"],
      tagline: "AI lead scoring, email drafting, and multi-platform social monitoring",
      description:
        "Led architecture across a 3-person team. Built the core ASP.NET Clean Architecture backend, integrated Google Gemini for lead scoring, and independently developed an n8n webhook layer for monitoring LinkedIn, Twitter, Facebook, Instagram, and TikTok data.",
      stack: ["ASP.NET Core", "React", "Gemini AI", "n8n", "Hangfire"],
    },
    {
      name: "PriceGuard-AI",
      badges: ["🏆 2nd Place", "Group"],
      tagline: "AI price recommendation engine",
      description:
        "Built for the GDG AASTU Hackathon. ML-powered recommendation layer that analyses price histories and advises buyers: buy now, or wait. Live deployment with real data.",
      stack: ["TypeScript", "React", "AI/ML", "Python"],
      live: "https://price-guard-ai.vercel.app/",
      github: "https://github.com/Dagim-Tadesse/PriceGuard-AI",
      trophy: true,
    },
    {
      name: "Ride Price Estimation System",
      badges: ["AI/ML · Data Science"],
      tagline: "ML model for ride fare prediction",
      description:
        "A Jupyter notebook ML project estimating ride prices from route, time and demand features. Covers preprocessing, feature engineering and regression model training — applied ML fundamentals end-to-end.",
      stack: ["Python", "Jupyter", "scikit-learn"],
      github: "https://github.com/Dagim-Tadesse/Ride_Price_Estimation_System",
    },
    {
      name: "Face Auth System",
      badges: ["AI · Group · Python"],
      tagline: "Facial recognition authentication system",
      description:
        "Python-based face authentication system built as a group project. Uses computer vision to detect and verify identity — applied AI working directly with image processing and model inference.",
      stack: ["Python", "OpenCV", "Computer Vision"],
      github: "https://github.com/Dagim-Tadesse/face-auth-system",
    },
    {
      name: "GDSC ML Study Sessions",
      badges: ["Learning · Active"],
      tagline: "GDG AI/ML structured curriculum (50% complete)",
      description:
        "Active participant in Google Developer Groups' structured ML curriculum. Hands-on notebooks covering data handling, ML fundamentals, model training and Python-based applied problem-solving.",
      stack: ["Python", "Jupyter", "scikit-learn"],
      github: "https://github.com/Dagim-Tadesse/GDSC_study_session_ML_g1",
    },
  ],
  group: [
    {
      name: "PriceGuard-AI",
      badges: ["🏆 2nd Place — GDG Hackathon"],
      tagline: "AI price recommendation — hackathon team project",
      description:
        "The project that won 2nd place at the GDG AASTU AI/ML Hackathon. Built as a team under competition pressure with a live deployment.",
      stack: ["TypeScript", "React", "AI/ML"],
      live: "https://price-guard-ai.vercel.app/",
      trophy: true,
    },
    {
      name: "CATs Group 2 — Cardano Hackathon",
      badges: ["Blockchain · Hackathon"],
      tagline: "Smart contract development on Cardano",
      description:
        "Participated as a blockchain developer in a Cardano-focused hackathon. Worked on smart contract concepts and blockchain application logic under real-world constraints — an early signal of picking up unfamiliar stacks fast.",
      stack: ["JavaScript", "Cardano", "Smart Contracts"],
      github: "https://github.com/Dagim-Tadesse/CATs-Group-2",
    },
    {
      name: "Face Auth System",
      badges: ["Group · AI"],
      tagline: "Team-built facial recognition system",
      description:
        "Facial recognition authentication system built collaboratively in Python. Demonstrates team coordination on a computer vision problem.",
      stack: ["Python", "OpenCV"],
      github: "https://github.com/Dagim-Tadesse/face-auth-system",
    },
    {
      name: "Water Monitoring System",
      badges: ["Academic · AASTU IETP"],
      tagline: "IoT water monitoring — 4th-year university project",
      description:
        "A TypeScript-based water monitoring system built for AASTU's 4th-year Integrated Engineering Team Project. Real-world utility in a developing-country context.",
      stack: ["TypeScript", "IoT"],
      github: "https://github.com/Dagim-Tadesse/Water_Monitoring_System",
    },
  ],
  mobile: [
    {
      name: "Gebeya Now",
      badges: ["⭐ Original Design · Solo"],
      tagline: "Mobile marketplace — built from scratch",
      description:
        "A Flutter mobile marketplace I designed from scratch. Browse, list and interact with products in a clean native UI. A personal design challenge turned full product — UI design plus Dart/Flutter development.",
      stack: ["Flutter", "Dart"],
      github: "https://github.com/Dagim-Tadesse/gebeya_now",
    },
    {
      name: "Flutter Mobile Programming Course",
      badges: ["Academic · Coursework"],
      tagline: "Mobile programming coursework",
      description:
        "Repository of Flutter projects built during the university Mobile Programming course (2025–2026). Growing proficiency in Flutter widget architecture, navigation and state management.",
      stack: ["Flutter", "Dart"],
      github: "https://github.com/Dagim-Tadesse/Flutter-mobile-programming-course-25-26",
    },
    {
      name: "Flutter Training",
      badges: ["Learning · Practice"],
      tagline: "Flutter fundamentals and practice builds",
      description:
        "Hands-on Flutter training repository covering layouts, widgets, gestures, state and routing — used to build a solid mobile foundation before shipping production apps.",
      stack: ["Flutter", "Dart", "C++"],
      github: "https://github.com/Dagim-Tadesse/flutter-training",
    },
  ],
  web: [
    {
      name: "Autonomous CRM Automation Agent",
      badges: ["Internship · Africom Tech", "Tech Lead"],
      tagline: "AI lead scoring, email drafting, and multi-platform social monitoring",
      description:
        "Led architecture across a 3-person team. Built the core ASP.NET Clean Architecture backend, integrated Google Gemini for lead scoring, and independently developed an n8n webhook layer for monitoring LinkedIn, Twitter, Facebook, Instagram, and TikTok data.",
      stack: ["ASP.NET Core", "React", "Gemini AI", "n8n", "Hangfire"],
    },
    {
      name: "SpendWise",
      badges: ["Live · Full-Stack"],
      tagline: "Mobile-first personal finance tracker",
      description:
        "React + TypeScript + Supabase finance app. Real auth, live database, production deployment — and I use it daily.",
      stack: ["React", "TypeScript", "Supabase"],
      live: "https://spend-wise-bydagim.vercel.app/",
    },
    {
      name: "Savory Serve",
      badges: ["Web App"],
      tagline: "Restaurant & café ordering platform",
      description:
        "Full restaurant ordering web app — menu browsing, order placement and a kitchen management flow.",
      stack: ["TypeScript", "React"],
    },
    {
      name: "Spark Study",
      badges: ["Live · Open Source · 8 forks"],
      tagline: "Flashcard learning workspace",
      description:
        "Vite + React + TypeScript flashcard app with deck management, a card editor with live preview and a study/flip session flow. 8 forks on GitHub shows real adoption.",
      stack: ["Vite", "React", "TypeScript"],
      live: "https://spark-study-vert.vercel.app/",
      github: "https://github.com/Dagim-Tadesse/spark-study",
    },
    {
      name: "Hotel Booking System",
      badges: ["Full-Stack · Java"],
      tagline: "Hotel reservation and management system",
      description:
        "Java-based hotel booking system with reservation management, room tracking and booking logic. One of my earliest full-stack projects — backend fundamentals, database design and CRUD.",
      stack: ["Java", "MySQL"],
      github: "https://github.com/Dagim-Tadesse/hotel-booking-system",
    },
  ],
};

const SKILLS: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "TypeScript", "JavaScript", "C++", "Dart", "PHP"] },
  { group: "Frontend", items: ["React", "Vite", "HTML/CSS", "Tailwind CSS", "Responsive Design"] },
  { group: "Mobile", items: ["Flutter", "Dart", "Mobile UI Design"] },
  { group: "AI / Data", items: ["Machine Learning", "Google Gemini AI", "Data Preprocessing", "Model Training", "Computer Vision", "Jupyter"] },
  { group: "Backend / DB", items: ["ASP.NET Core", "Clean Architecture", "Supabase", "SQL Server", "MySQL", "MS SQL Server", "REST APIs", "JWT", "Hangfire"] },
  { group: "ERP / Odoo", items: ["Odoo Website", "Odoo CRM", "AI Dataset Design", "Lead Generation"] },
  { group: "Tools", items: ["n8n", "Git", "GitHub", "Vercel", "VS Code", "Figma"] },
];

const TYPING_PHRASES = [
  "Building at the intersection of AI, data, and real software.",
  "Software Engineering Student. AI/ML enthusiast. Odoo Specialist.",
  "Open to internships.",
];

function useTyping(phrases: string[], typeMs = 38, holdMs = 1600) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setText(phrases[0]); return; }
    const phrase = phrases[i % phrases.length];
    if (!del && text === phrase) { const t = setTimeout(() => setDel(true), holdMs); return () => clearTimeout(t); }
    if (del && text === "") { setDel(false); setI((v) => v + 1); return; }
    const t = setTimeout(() => {
      setText(del ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1));
    }, del ? typeMs / 1.6 : typeMs);
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
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
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
      ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(0,255,209,0.07), transparent 60%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-30" />;
}

function Counter({ to, suffix = "", prefix = "", decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
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
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<TabId>("top");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText("dagimtadesse25@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground font-mono selection:bg-[color:var(--color-teal)]/30">
      <CursorSpotlight />
      <motion.div style={{ scaleX: progress }} className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left" aria-hidden>
        <div className="h-full w-full" style={{ background: TEAL }} />
      </motion.div>

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <button onClick={() => scrollTo("home")} className="font-display text-lg font-bold tracking-tight">
            DT<span style={{ color: TEAL }}>.</span>
          </button>
          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className={`relative px-3 py-1.5 text-xs uppercase tracking-widest transition-colors ${active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {n.label}
                  {active === n.id && (
                    <motion.span layoutId="navdot" className="absolute -bottom-0.5 left-1/2 h-[2px] w-6 -translate-x-1/2" style={{ background: TEAL }} />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/90">Open to Internships</span>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="absolute inset-0 radial-glow" aria-hidden />
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full blur-[120px]" style={{ background: "rgba(0,255,209,0.08)" }} aria-hidden />
        <div className="relative mx-auto w-full max-w-6xl px-5">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <MapPin size={12} style={{ color: TEAL }} /> Addis Ababa, Ethiopia
            </p>
          </Reveal>
          <h1 className="font-display text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Dagim<br />
            Tadesse<span style={{ color: TEAL }}>.</span>
          </h1>
          <div className="mt-8 max-w-3xl text-lg text-muted-foreground md:text-xl min-h-[3.5rem]">
            <span className="text-foreground">{typed}</span>
            <span className="ml-1 inline-block h-5 w-[2px] animate-pulse align-middle" style={{ background: TEAL }} />
          </div>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Software Engineering student at AASTU · ML/AI enthusiast · Odoo ERP specialist
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              style={{ background: TEAL, boxShadow: "0 10px 40px -10px rgba(0,255,209,0.5)" }}
            >
              View Projects
              <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="https://github.com/Dagim-Tadesse"
              target="_blank" rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-[color:var(--color-teal)]/60"
            >
              <Github size={16} /> GitHub →
            </a>
          </div>
          <div className="mt-12">
            <GitHubStrip />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative scroll-mt-20 py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading kicker="01" title="About" />
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Final-year Software Engineering student at AASTU. I build software that ships — ML systems, full-stack web apps, and mobile products that are live and used by real people.
                <br /><br />
                Most recently I led the technical architecture of an Autonomous CRM Automation Agent at Africom Tech — owning the backend, AI integration with Google Gemini, and a social media monitoring layer built with n8n across five platforms. I also train actively in the GDG ML curriculum and have shipped production projects in React, TypeScript, Flutter, and Python.
                <br /><br />
                I work across the full stack but my focus is AI engineering — building systems where the intelligence is the product.
              </p>
              <p className="mt-6 inline-flex items-center gap-2 rounded-md border border-[color:var(--color-teal)]/30 bg-[color:var(--color-teal)]/5 px-3 py-2 text-xs uppercase tracking-widest" style={{ color: TEAL }}>
                <Sparkles size={14} /> Currently open to internships in AI/ML or Full-Stack
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Graduation" value="2027" />
                <StatCard label="Public Repos" value={<><Counter to={10} />+</>} />
                <StatCard label="Hackathon" value={<span className="inline-flex items-center gap-1.5"><Trophy size={20} style={{ color: "#FFD66E" }} /> 2nd</span>} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative scroll-mt-20 py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading kicker="02" title="Selected Work" />
          <div className="sticky top-20 z-20 mt-10 -mx-5 overflow-x-auto px-5 pb-2">
            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card/80 p-1 backdrop-blur-md">
              {TABS.map((t) => {
                const Icon = t.icon;
                const isActive = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {isActive && (
                      <motion.span layoutId="tabpill" className="absolute inset-0 rounded-full" style={{ background: TEAL }} transition={{ type: "spring", stiffness: 400, damping: 35 }} />
                    )}
                    <span className="relative flex items-center gap-1.5"><Icon size={13} /> {t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="grid gap-5 md:grid-cols-2"
              >
                {PROJECTS[tab].map((p, i) => (
                  <ProjectCard key={p.name + i} project={p} hero={!!p.hero} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative scroll-mt-20 py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading kicker="03" title="Toolkit" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SKILLS.map((s, idx) => (
              <Reveal key={s.group} delay={idx * 0.05}>
                <div className="rounded-2xl border border-[color:var(--color-teal)]/20 bg-[color:var(--color-teal)]/10 backdrop-blur-md p-6 shadow-lg transition-colors hover:bg-[color:var(--color-teal)]/15 hover:border-[color:var(--color-teal)]/40">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display text-xl">{s.group}</h3>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.items.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((t) => (
                      <span key={t} className="group relative overflow-hidden rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-[color:var(--color-teal)]/50 hover:text-foreground">
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[color:var(--color-teal)]/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="relative scroll-mt-20 py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading kicker="04" title="Experience & Achievements" />
          <Reveal>
            <div className="mt-12 mb-10 group relative overflow-hidden rounded-2xl border border-[color:var(--color-teal)]/20 bg-[color:var(--color-teal)]/10 backdrop-blur-md p-8 md:p-10 transition-all hover:border-[color:var(--color-teal)]/50 hover:bg-[color:var(--color-teal)]/15 hover:shadow-[0_0_30px_-5px_rgba(0,255,209,0.15)] border-l-4"
              style={{ borderLeftColor: TEAL, boxShadow: "0 4px 20px -2px rgba(0,0,0,0.4), 0 1px 0 rgba(0,255,209,0.15) inset" }}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Africom Tech</h3>
                  <p className="mt-2 text-lg font-medium text-foreground">Software Engineering Intern — Tech Lead</p>
                  <p className="mt-1 text-sm text-muted-foreground">Internship · 2 Months · Addis Ababa, Ethiopia</p>
                </div>
                <div>
                  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-widest uppercase" style={{ borderColor: TEAL, color: TEAL }}>Tech Lead</span>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-display text-2xl font-bold">Autonomous CRM Automation Agent</h4>
                <p className="mt-2 text-base text-muted-foreground">AI-powered lead scoring, email drafting, and social media monitoring — built on ASP.NET Core Clean Architecture with a React frontend.</p>
                
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: Brain, label: "AI Lead Scoring & Emotion Detection" },
                    { icon: Mail, label: "Automated Email Drafting" },
                    { icon: ClipboardList, label: "Kanban Pipeline Management" },
                    { icon: Timer, label: "Background Job Scheduling" },
                    { icon: Link, label: "Social Media Monitoring" },
                    { icon: BarChart, label: "Social Analytics Dashboard" },
                    { icon: Lock, label: "Auth System" },
                    { icon: Globe, label: "Multi-Platform Mock Data" },
                  ].map((chip, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-2 text-xs font-medium text-muted-foreground">
                      <chip.icon size={14} className="shrink-0" style={{ color: TEAL }} />
                      <span>{chip.label}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-sm italic leading-relaxed text-muted-foreground">
                  "Led architecture decisions across a team of three as Tech Lead. Owned the core backend (Clean Architecture, JWT auth, Gemini AI integration, Lead ingestion API) and independently built the entire n8n social monitoring layer — a new integration slice added mid-project to extend the system's reach across LinkedIn, Twitter, Facebook, Instagram, and TikTok. Resolved a critical Gemini API authentication issue (header vs query param format) and kept the project on track to a live demo in 4 weeks."
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <div className="space-y-5">
                <TimelineItem
                  icon={<Briefcase size={16} />}
                  title="Odoo Designer — AI Training Datasets"
                  org="ConDigital Inc."
                  meta="Contractor · Current · Addis Ababa"
                  body="Designing Odoo website content and data funnels for AI training datasets. Specializing in Website and CRM modules — applying SEO optimization, lead-generation tagging and data-driven content strategy across multiple client builds."
                />
                <TimelineItem
                  icon={<Award size={16} />}
                  title="AI/ML Student — GDG Program"
                  org="Google Developer Groups · AASTU"
                  meta="Nov 2025 – Present · 50% complete"
                  body="Structured ML curriculum covering data handling, ML fundamentals, model training and applied problem-solving in Python."
                />
                <TimelineItem
                  icon={<Award size={16} />}
                  title="Cardano Blockchain Hackathon"
                  org="Team CATs Group 2"
                  meta="Blockchain Developer"
                  body="Smart contracts and blockchain application logic under competition conditions."
                />
              </div>
              <div className="mt-8">
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Certifications</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md border border-border bg-card/50 px-3 py-1.5 text-xs">C++ — SoloLearn</span>
                  <span className="rounded-md border border-border bg-card/50 px-3 py-1.5 text-xs">Web Development — FreeCodeCamp</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl border p-6" style={{ borderColor: "rgba(255,214,110,0.4)", background: "linear-gradient(160deg, rgba(255,214,110,0.08), transparent 70%)" }}>
                <Trophy size={36} style={{ color: "#FFD66E" }} />
                <p className="mt-3 text-[10px] uppercase tracking-widest" style={{ color: "#FFD66E" }}>Highlighted Achievement</p>
                <h3 className="mt-1 font-display text-2xl leading-tight">2nd Place — GDG AASTU AI/ML Hackathon</h3>
                <p className="mt-3 text-sm text-muted-foreground">Built and deployed PriceGuard-AI, an ML-powered price recommendation tool, placing 2nd in the AI/ML track. 2025.</p>
                <a href="https://price-guard-ai.vercel.app/" target="_blank" rel="noreferrer noopener" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest transition-colors hover:text-foreground" style={{ color: "#FFD66E" }}>
                  See project <ExternalLink size={12} />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Education */}
          <div className="mt-10">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card/50 p-6 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl border border-border bg-background p-3"><GraduationCap size={20} style={{ color: TEAL }} /></div>
                  <div>
                    <h3 className="font-display text-xl">Bachelor of Software Engineering</h3>
                    <p className="text-sm text-muted-foreground">Addis Ababa Science and Technology University (AASTU)</p>
                    <p className="mt-1 text-xs text-muted-foreground">Self-taught developer since January 2022.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: "rgba(0,255,209,0.4)", color: TEAL }}>Expected June 2027</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative scroll-mt-20 py-28">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <SectionHeading kicker="05" title="Let's build something" centered />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              I'm actively looking for internship opportunities in AI/ML or full-stack engineering. Let's talk.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <button
                onClick={copyEmail}
                className="group inline-flex items-center gap-3 rounded-full border bg-card/60 px-6 py-3 text-sm font-semibold transition-colors hover:border-[color:var(--color-teal)]/60"
                style={{ borderColor: "rgba(0,255,209,0.3)" }}
              >
                <Mail size={16} style={{ color: TEAL }} />
                dagimtadesse25@gmail.com
                {copied ? <Check size={14} style={{ color: TEAL }} /> : <Copy size={14} className="text-muted-foreground group-hover:text-foreground" />}
              </button>
              {copied && <span className="text-xs" style={{ color: TEAL }}>Copied to clipboard</span>}
              <div className="mt-2 flex items-center gap-3">
                <a href="https://github.com/Dagim-Tadesse" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="rounded-full border border-border bg-card/40 p-3 transition-colors hover:border-[color:var(--color-teal)]/60 hover:text-foreground"><Github size={18} /></a>
                <a href="https://www.linkedin.com/in/dagim-tadesse-ba6b30263/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="rounded-full border border-border bg-card/40 p-3 transition-colors hover:border-[color:var(--color-teal)]/60 hover:text-foreground"><Linkedin size={18} /></a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-xs text-muted-foreground md:flex-row">
          <p>Dagim Tadesse · Built in Addis Ababa 🇪🇹</p>
          <div className="flex items-center gap-3">
            <a href="https://github.com/Dagim-Tadesse" target="_blank" rel="noreferrer noopener" aria-label="GitHub"><Github size={16} /></a>
            <a href="https://www.linkedin.com/in/dagim-tadesse-ba6b30263/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn"><Linkedin size={16} /></a>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 rounded-full border border-border bg-card/80 p-3 backdrop-blur-md transition-colors hover:border-[color:var(--color-teal)]/60"
          >
            <ArrowUp size={16} style={{ color: TEAL }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionHeading({ kicker, title, centered = false }: { kicker: string; title: string; centered?: boolean }) {
  return (
    <Reveal>
      <div className={centered ? "text-center" : ""}>
        <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: TEAL }}>/ {kicker}</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      </div>
    </Reveal>
  );
}

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-teal)]/20 bg-[color:var(--color-teal)]/10 backdrop-blur-md p-5 transition-all hover:border-[color:var(--color-teal)]/40 hover:bg-[color:var(--color-teal)]/15 hover:shadow-lg hover:shadow-[color:var(--color-teal)]/10">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}

function ProjectCard({ project, hero }: { project: Project; hero?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative overflow-hidden rounded-2xl border border-[color:var(--color-teal)]/20 bg-[color:var(--color-teal)]/10 backdrop-blur-md p-6 transition-all hover:border-[color:var(--color-teal)]/50 hover:bg-[color:var(--color-teal)]/15 hover:shadow-xl hover:shadow-[color:var(--color-teal)]/20 ${hero ? "md:col-span-2 md:p-8" : ""}`}
      style={{ boxShadow: "0 4px 20px -2px rgba(0,0,0,0.4), 0 1px 0 rgba(0,255,209,0.15) inset" }}
    >
      <div aria-hidden className="pointer-events-none absolute -inset-x-10 -top-32 h-64 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(closest-side, rgba(0,255,209,0.18), transparent)" }} />
      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {project.badges.map((b) => (
                <span key={b} className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-widest ${project.trophy ? "" : "border-border text-muted-foreground"}`}
                  style={project.trophy ? { borderColor: "rgba(255,214,110,0.5)", color: "#FFD66E" } : undefined}>
                  {b}
                </span>
              ))}
            </div>
            <h3 className={`mt-3 font-display font-bold tracking-tight ${hero ? "text-4xl md:text-5xl" : "text-2xl"}`}>{project.name}</h3>
            {project.type && <p className="mt-1 text-xs text-muted-foreground">{project.type}</p>}
          </div>
          <div className="flex items-center gap-2">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer noopener" aria-label={`${project.name} live`}
                className="rounded-full border border-border bg-background/50 p-2 transition-colors hover:border-[color:var(--color-teal)]/60 hover:text-foreground">
                <ExternalLink size={14} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer noopener" aria-label={`${project.name} github`}
                className="rounded-full border border-border bg-background/50 p-2 transition-colors hover:border-[color:var(--color-teal)]/60 hover:text-foreground">
                <Github size={14} />
              </a>
            )}
          </div>
        </div>
        <p className={`mt-4 font-display ${hero ? "text-xl" : "text-base"}`} style={{ color: TEAL }}>{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="rounded-md border border-border bg-background/50 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">{s}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function TimelineItem({ icon, title, org, meta, body }: { icon: React.ReactNode; title: string; org: string; meta: string; body: string }) {
  return (
    <div className="relative rounded-2xl border border-[color:var(--color-teal)]/20 bg-[color:var(--color-teal)]/10 backdrop-blur-md p-6 shadow-lg transition-colors hover:bg-[color:var(--color-teal)]/15 hover:border-[color:var(--color-teal)]/40">
      <div className="flex items-start gap-4">
        <div className="rounded-xl border border-border bg-background p-2.5" style={{ color: TEAL }}>{icon}</div>
        <div className="flex-1">
          <h3 className="font-display text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{org}</p>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground/80">{meta}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
        </div>
      </div>
    </div>
  );
}

type GhEvent = { id: string; type: string; created_at: string; repo: { name: string }; payload: { commits?: { message: string }[] } };

function GitHubStrip() {
  const [event, setEvent] = useState<GhEvent | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/users/Dagim-Tadesse/events/public?per_page=10")
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then((events: GhEvent[]) => {
        if (cancelled) return;
        const push = events.find((e) => e.type === "PushEvent" && e.payload?.commits?.length) ?? events[0];
        if (push) setEvent(push);
      })
      .catch(() => !cancelled && setErr(true));
    return () => { cancelled = true; };
  }, []);

  const message = useMemo(() => {
    if (!event) return null;
    const commits = event.payload?.commits;
    return commits && commits.length ? commits[commits.length - 1].message.split("\n")[0] : event.type.replace("Event", "");
  }, [event]);

  if (err) return null;
  return (
    <a href="https://github.com/Dagim-Tadesse" target="_blank" rel="noreferrer noopener"
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-border bg-card/40 px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-[color:var(--color-teal)]/50 hover:text-foreground">
      <GitCommit size={14} style={{ color: TEAL }} />
      {event && message ? (
        <>
          <span className="hidden sm:inline text-foreground/90 truncate max-w-[280px]">{message}</span>
          <span className="text-muted-foreground/80 truncate max-w-[180px]">{event.repo.name}</span>
          <span className="text-muted-foreground/60">· {timeAgo(event.created_at)}</span>
        </>
      ) : (
        <span>Loading latest GitHub activity…</span>
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
  const [state, setState] = useState<"idle" | "ok">("idle");
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.name || "Anonymous"}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    window.location.href = `mailto:dagimtadesse25@gmail.com?subject=${subject}&body=${body}`;
    setState("ok");
  };
  return (
    <form onSubmit={submit} className="mx-auto mt-12 grid max-w-xl gap-3 text-left">
      <div className="grid gap-3 sm:grid-cols-2">
        <input required value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Your name"
          className="rounded-lg border border-border bg-card/50 px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--color-teal)]/60" />
        <input required type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email"
          className="rounded-lg border border-border bg-card/50 px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--color-teal)]/60" />
      </div>
      <textarea required rows={4} value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} placeholder="Tell me about the role or project…"
        className="rounded-lg border border-border bg-card/50 px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--color-teal)]/60" />
      <button type="submit" className="self-end rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        style={{ background: TEAL }}>
        {state === "ok" ? "Opening mail…" : "Send message"}
      </button>
    </form>
  );
}

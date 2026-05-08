import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
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
  Code2,
  Database,
  Cpu,
  Wrench,
  Layers,
  Globe,
  Download,
} from "lucide-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Portfolio, prerender: true,
}    </ClientOnly>
  );

const NAV = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    name: "PriceGuard-AI",
    tagline: "AI-powered price recommendation engine",
    description:
      "Built under hackathon pressure and deployed live. Helps buyers, sellers, and admins track product prices over time and delivers an AI-backed recommendation: buy now, or wait. Combines price-history inspection with an ML recommendation layer.",
    tech: ["Python", "React", "AI/ML", "Vercel"],
    live: "https://price-guard-ai.vercel.app/",
    github: "https://github.com/Dagim-Tadesse",
    hero: true,
  },
  {
    name: "SpendWise",
    tagline: "Mobile-first personal finance tracker",
    description:
      "Fast, mobile-first React & TypeScript finance app powered by Supabase. Log expenses, visualize spending, and track budgets in real time. Real auth, live database — a complete full-stack product.",
    tech: ["React", "TypeScript", "Supabase", "Mobile-first"],
    live: "https://spend-wise-bydagim.vercel.app/",
  },
  {
    name: "Spark Study",
    tagline: "Flashcard learning workspace",
    description:
      "A Vite + React + TypeScript flashcard app with full deck management — create decks, edit cards with live preview, flip through study sessions. Clean component architecture and intuitive UX built from scratch.",
    tech: ["Vite", "React", "TypeScript"],
    live: "https://spark-study-vert.vercel.app/",
  },
  {
    name: "Cardano Blockchain Hackathon",
    badge: "Hackathon",
    tagline: "Smart contract developer — Team CATs Group 2",
    description:
      "Participated as a blockchain developer in a Cardano-focused hackathon. Worked with smart contracts and blockchain application logic under real-world team constraints and deadlines.",
    tech: ["Cardano", "Blockchain", "Smart Contracts"],
    github: "https://github.com/Dagim-Tadesse/CATs-Group-2",
  },
];

const SKILLS = [
  { label: "Languages", icon: Code2, items: ["Python", "Java", "C++", "TypeScript", "JavaScript", "PHP"] },
  { label: "Frontend", icon: Layers, items: ["React", "Vite", "HTML/CSS", "Responsive Design"] },
  { label: "AI / Data", icon: Cpu, items: ["Machine Learning", "Data Preprocessing", "Model Training", "Python (AI/ML)"] },
  { label: "Backend / DB", icon: Database, items: ["Supabase", "MySQL", "Microsoft SQL Server", "REST APIs"] },
  { label: "ERP / Odoo", icon: Globe, items: ["Odoo Website", "Odoo CRM", "AI Dataset Design"] },
  { label: "Tools", icon: Wrench, items: ["Git", "GitHub", "Vercel", "VS Code", "Cardano"] },
];

const CV_HTML = `<!doctype html><html><head><meta charset="utf-8"/><title>Dagim Tadesse — CV</title>
<style>
*{box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,sans-serif;color:#0a0a0f;max-width:780px;margin:32px auto;padding:0 32px;line-height:1.45;font-size:13px}
h1{font-size:28px;margin:0 0 4px;letter-spacing:-0.02em}
h2{font-size:13px;text-transform:uppercase;letter-spacing:.18em;color:#0a8a8a;margin:22px 0 8px;border-bottom:1px solid #ddd;padding-bottom:4px}
h3{font-size:14px;margin:10px 0 2px}
.meta{color:#555;font-size:12px;margin-bottom:6px}
.row{display:flex;justify-content:space-between;gap:12px;margin-top:8px}
.muted{color:#666;font-size:12px}
ul{margin:6px 0 0;padding-left:18px}
li{margin:2px 0}
.tags{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#444}
a{color:#0a8a8a;text-decoration:none}
@media print{body{margin:0;padding:18px 24px}}
</style></head><body>
<header>
  <h1>Dagim Tadesse</h1>
  <div class="meta">Software Engineer · AI/ML Developer · Addis Ababa, Ethiopia</div>
  <div class="meta">dagimtadesse25@gmail.com · github.com/Dagim-Tadesse · linkedin.com/in/dagim-tadesse-ba6b30263</div>
</header>
<h2>Summary</h2>
<p>Final-year Software Engineering student at AASTU (CGPA 3.56). Build live, full-stack and AI/ML products. Currently contracted as Odoo Designer for AI training datasets at ConDigital Inc. Open to internships in AI/ML or full-stack engineering.</p>
<h2>Experience</h2>
<h3>Odoo Designer — AI Training Datasets · ConDigital Inc.</h3>
<div class="muted">Contractor · Current · Addis Ababa, Ethiopia</div>
<ul><li>Designing Odoo Website &amp; CRM content and data funnels for AI training datasets.</li>
<li>SEO optimization, lead-gen tagging, data-driven content across multiple client builds.</li></ul>
<h3>AI/ML Student — GDG Program · Google Developer Groups, AASTU Chapter</h3>
<div class="muted">Nov 2025 – Present (50% complete)</div>
<ul><li>Structured AI/ML curriculum: data handling, ML fundamentals, model training, applied Python.</li></ul>
<h2>Selected Projects</h2>
<h3>PriceGuard-AI <span class="muted">— price-guard-ai.vercel.app</span></h3>
<p>AI-powered price recommendation engine. Tracks product prices over time and recommends buy-now or wait. <span class="tags">Python · React · AI/ML · Vercel</span></p>
<h3>SpendWise <span class="muted">— spend-wise-bydagim.vercel.app</span></h3>
<p>Mobile-first React + TypeScript finance app on Supabase with real auth and live database. <span class="tags">React · TypeScript · Supabase</span></p>
<h3>Spark Study <span class="muted">— spark-study-vert.vercel.app</span></h3>
<p>Vite + React + TypeScript flashcard workspace with full deck management and live preview. <span class="tags">Vite · React · TypeScript</span></p>
<h3>Cardano Blockchain Hackathon — CATs Group 2</h3>
<p>Smart contract developer working on Cardano blockchain application logic. <span class="tags">Cardano · Smart Contracts</span></p>
<h2>Skills</h2>
<ul>
<li><b>Languages:</b> Python, Java, C++, TypeScript, JavaScript, PHP</li>
<li><b>Frontend:</b> React, Vite, HTML/CSS, Responsive Design</li>
<li><b>AI / Data:</b> Machine Learning, Data Preprocessing, Model Training</li>
<li><b>Backend / DB:</b> Supabase, MySQL, MS SQL Server, REST APIs</li>
<li><b>ERP / Odoo:</b> Odoo Website, Odoo CRM, AI Dataset Design</li>
<li><b>Tools:</b> Git, GitHub, Vercel, VS Code, Cardano</li>
</ul>
<h2>Education</h2>
<h3>B.Sc. Software Engineering — AASTU</h3>
<div class="muted">Expected June 2027 · CGPA 3.56</div>
<h2>Certifications</h2>
<ul><li>C++ Programming — SoloLearn</li><li>Web Development — FreeCodeCamp</li></ul>
<script>window.onload=()=>setTimeout(()=>window.print(),300)</script>
</body></html>`;

function Nav() {
  const exportCV = () => {
    const html = CV_HTML;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Dagim-Tadesse-CV.html";
    a.click();
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return (
    <ClientOnly>) => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 delay-100 ${
        scrolled ? "backdrop-blur-xl bg-background/40 border-b border-border/30" : ""
      }`}
      style={{ WebkitBackdropFilter: scrolled ? "blur(10px)" : undefined }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-xl font-bold tracking-tight inline-flex items-center">
          <img src="/logo.jpg" alt="Dagim Tadesse" className="h-8 w-auto rounded-sm" />
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono text-muted-foreground">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">
              {n.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportCV}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/40 bg-primary/10 hover:bg-primary/20 text-xs font-mono text-primary transition"
            aria-label="Export CV as PDF"
          >
            <Download className="h-3 w-3" />
            Export CV
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
            <span className="relative rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="hidden sm:inline text-foreground/90">Open to Internships</span>
          <span className="sm:hidden text-foreground/90">Open</span>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <section id="top" ref={ref} className="relative min-h-screen flex items-center overflow-hidden noise">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 radial-glow" />
      <motion.div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 font-mono text-xs text-muted-foreground mb-8"
        >
          <span className="h-px w-10 bg-primary" />
          <MapPin className="h-3 w-3" />
          Addis Ababa, Ethiopia · ET
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-balance max-w-5xl"
        >
          Building at the intersection of{" "}
          <span className="italic text-primary">AI, data,</span> and real software.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 max-w-2xl font-mono text-sm md:text-base text-muted-foreground leading-relaxed"
        >
          Software Engineering student at AASTU · ML/AI enthusiast · Odoo ERP specialist · Open to internships
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-sm font-semibold px-6 py-3.5 rounded-full hover:shadow-[0_0_40px_-8px_oklch(0.88_0.18_180/0.6)] transition-all"
          >
            View Projects
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="https://github.com/Dagim-Tadesse"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 border border-border hover:border-primary/50 font-mono text-sm font-semibold px-6 py-3.5 rounded-full transition-all hover:bg-surface"
          >
            <Github className="h-4 w-4" />
            GitHub Profile
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-10 right-6 lg:right-10 hidden md:flex flex-col items-end gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span>scroll</span>
          <span className="h-12 w-px bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ tag, title }: { tag: string; title: string }) {
  return (
    <Reveal>
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-3 font-mono text-xs text-primary uppercase tracking-[0.3em] mb-4">
          <span className="h-px w-8 bg-primary" />
          {tag}
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}

function About() {
  const stats = [
    { v: "3.56", l: "CGPA" },
    { v: "Final", l: "Year (2 mo to 5th)" },
    { v: "5+", l: "Live Projects" },
    { v: "AI/ML", l: "Focus Track" },
  ];
  return (
    <section id="about" className="relative py-28 md:py-40 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading tag="01 / About" title="A serious young engineer, not a student template." />
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
              <Reveal className="lg:col-span-3">
                <div className="space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm a final-year Software Engineering student at{" "}
                <span className="text-foreground">Addis Ababa Science and Technology University</span> (CGPA 3.56),
                currently working as a contracted{" "}
                <span className="text-foreground">Odoo Designer for AI training datasets at ConDigital Inc.</span>
              </p>
              <p>
                I build things that are <span className="text-primary">live and usable</span> — finance trackers, AI
                price tools, flashcard apps — and compete in AI/ML hackathons. I'm 50% through the GDG structured ML
                curriculum and shipping projects every month.
              </p>
              <p>
                Driven by curiosity, disciplined by habit, and looking for an internship where I can work on real
                problems in <span className="text-foreground">AI, data, or full-stack engineering.</span>
              </p>
              <div className="pt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 font-mono text-xs text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Currently open to internships in AI/ML or Full-Stack
              </div>
            </div>
          </Reveal>
              <Reveal delay={0.15} className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.l}
                  className="relative p-6 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-colors group overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition" />
                  <div className="relative">
                    <div className="font-display text-4xl md:text-5xl font-bold text-primary">{s.v}</div>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {s.l}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  p,
  large = false,
  index,
}: {
  p: (typeof PROJECTS)[number];
  large?: boolean;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`group relative rounded-3xl border border-border bg-surface p-7 md:p-9 overflow-hidden accent-glow transition-all duration-500 hover:-translate-y-1 ${
          large ? "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2" : ""
        }`} 
    >
      {large && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      )}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative flex flex-col h-full">
        {p.badge && (
          <div className="inline-flex self-start items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 font-mono text-[11px] text-primary">
            <Trophy className="h-3 w-3" />
            {p.badge}
          </div>
        )}
        <h3 className={`font-display font-bold leading-tight ${large ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
          {p.name}
        </h3>
        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-primary">{p.tagline}</p>
        <p className={`mt-5 text-muted-foreground leading-relaxed ${large ? "text-base md:text-lg" : "text-sm"}`}>
          {p.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full border border-border bg-background/40 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-8 flex items-center gap-3">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.name} live site`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-mono text-xs font-semibold hover:shadow-[0_0_30px_-8px_oklch(0.88_0.18_180/0.6)] transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </a>
          )}
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.name} GitHub`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary/50 font-mono text-xs font-semibold transition"
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </a>
          )}
          <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-40 px-6 lg:px-10 bg-gradient-to-b from-transparent via-surface/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeading tag="02 / Selected Work" title="Live products. Real users. Hackathon-tested." />
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 auto-rows-fr">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-40 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading tag="03 / Stack" title="The tools I reach for." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((group, i) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.label} delay={i * 0.05}>
                <div className="h-full p-6 rounded-2xl border border-border bg-surface hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {group.label}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 rounded-full bg-background border border-border font-mono text-[12px] text-foreground/90 hover:border-primary/50 hover:text-primary transition"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    {
      icon: Briefcase,
      role: "Odoo Designer — AI Training Datasets",
      org: "ConDigital Inc.",
      period: "Contractor · Current",
      loc: "Addis Ababa, Ethiopia",
      desc:
        "Designing Odoo website content and data funnels for AI training datasets. Specializing in Website and CRM modules — applying SEO optimization, lead-gen tagging, and data-driven content strategy across multiple industry client builds.",
    },
    {
      icon: Cpu,
      role: "AI/ML Student — GDG Program",
      org: "Google Developer Groups · AASTU Chapter",
      period: "Nov 2025 – Present (50% complete)",
      desc:
        "Active participant in a structured AI/ML curriculum covering data handling, ML fundamentals, model training, and applied problem-solving in Python.",
    },
  ];
  const achievements = [
    {
      icon: Award,
      title: "Cardano Blockchain Hackathon Participant",
      sub: "Blockchain Developer · Team CATs Group 2",
      desc: "Worked on smart contracts and blockchain application logic under competition conditions.",
      featured: true,
    },
  ];
  return (
    <section id="experience" className="relative py-28 md:py-40 px-6 lg:px-10 bg-gradient-to-b from-transparent via-surface/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeading tag="04 / Experience & Wins" title="Shipped, contracted, and competed." />

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">
            {items.map((e, i) => {
              const Icon = e.icon;
              return (
                <Reveal key={e.role} delay={i * 0.08}>
                  <div className="relative p-6 md:p-8 rounded-2xl border border-border bg-surface hover:border-primary/40 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl md:text-2xl font-semibold leading-tight">
                          {e.role}
                        </h3>
                        <div className="mt-1.5 font-mono text-xs text-primary">{e.org}</div>
                        <div className="mt-1 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                          {e.period} {e.loc && `· ${e.loc}`}
                        </div>
                        <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                          {e.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="lg:col-span-2 space-y-5">
            {achievements.map((a, i) => {
              const Icon = a.icon;
              return (
                <Reveal key={a.title} delay={i * 0.08}>
                  <div
                    className={`relative p-6 rounded-2xl border overflow-hidden ${
                      a.featured
                        ? "border-primary/40 bg-gradient-to-br from-primary/15 via-surface to-surface"
                        : "border-border bg-surface"
                    }`}
                  >
                    {a.featured && (
                      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
                    )}
                    <div className="relative">
                      <div
                        className={`inline-flex p-2.5 rounded-xl mb-4 ${
                          a.featured ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-lg font-semibold leading-tight">{a.title}</h3>
                      <div className="mt-1 font-mono text-[11px] text-primary uppercase tracking-wider">
                        {a.sub}
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
            <Reveal>
              <div className="p-6 rounded-2xl border border-border bg-surface">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Certifications
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" /> C++ Programming — SoloLearn
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" /> Web Development — FreeCodeCamp
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="relative py-20 md:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="relative p-8 md:p-12 rounded-3xl border border-border bg-surface overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
            <div className="relative grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 font-mono text-xs text-primary uppercase tracking-[0.3em] mb-4">
                  <GraduationCap className="h-4 w-4" />
                  05 / Education
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                  Bachelor of Software Engineering
                </h3>
                <p className="mt-3 font-mono text-sm text-muted-foreground">
                  Addis Ababa Science and Technology University (AASTU) · Expected June 2027
                </p>
                <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                  Self-taught developer since January 2022 — built C++/Java programs, static web apps, and relational
                  database systems independently before entering formal ML training.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3">
                <div className="px-5 py-3 rounded-2xl border border-primary/40 bg-primary/10">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-primary">CGPA</div>
                  <div className="font-display text-4xl font-bold text-primary">3.56</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 radial-glow" />
      <div className="relative max-w-5xl mx-auto text-center">
        <Reveal>
          <div className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-6">
            06 / Contact
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-balance">
            Let's build <span className="italic text-primary">something real.</span>
          </h2>
          <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed">
            I'm actively looking for internship opportunities in AI/ML or full-stack engineering. If you're hiring or
            collaborating, my inbox is open.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:dagimtadesse25@gmail.com"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-sm font-semibold px-7 py-4 rounded-full hover:shadow-[0_0_50px_-8px_oklch(0.88_0.18_180/0.7)] transition-all"
            >
              <Mail className="h-4 w-4" />
              dagimtadesse25@gmail.com
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://github.com/Dagim-Tadesse"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full border border-border hover:border-primary/50 hover:text-primary transition"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/dagim-tadesse-ba6b30263/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full border border-border hover:border-primary/50 hover:text-primary transition"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 lg:px-10 py-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Dagim Tadesse · Built with{" "}
          <span className="text-primary">♥</span> in Addis Ababa
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Dagim-Tadesse"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-primary transition"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/dagim-tadesse-ba6b30263/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary transition"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}


function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? <>{children}</> : <div className="min-h-screen bg-background flex items-center justify-center font-mono text-xs text-muted-foreground animate-pulse">Loading experience...</div>;
}

function Portfolio() {
  return (
    <ClientOnly>
    <main className="relative bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  
    </ClientOnly>);
}

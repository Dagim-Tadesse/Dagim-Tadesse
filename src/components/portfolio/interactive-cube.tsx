import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Compass,
  Cpu,
  Trophy,
  Briefcase,
  Layers,
  FileDown,
  Terminal,
  ExternalLink,
  RotateCw,
  Eye,
  CheckCircle2,
  Code2,
  Users,
} from "lucide-react";
import { sfx } from "@/lib/sound-effects";

interface InteractiveCubeProps {
  onNavigate: (sectionId: string) => void;
  onOpenCommandMenu?: () => void;
}

type FaceKey = "front" | "right" | "back" | "left" | "top" | "bottom";

interface FaceConfig {
  key: FaceKey;
  label: string;
  badge: string;
  sectionId: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  highlights: string[];
  actionLabel: string;
  rotX: number;
  rotY: number;
  accent: string;
  isCV?: boolean;
}

const FACES: FaceConfig[] = [
  {
    key: "front",
    label: "01 · Identity",
    badge: "Core Systems",
    sectionId: "about",
    icon: Cpu,
    title: "Software Engineer & AI Builder",
    subtitle: "Final-year AASTU · Bridging Applied AI & Clean Architecture",
    highlights: ["ASP.NET Core Clean Arch", "Applied Gemini & Python ML", "Human-First Interface Design"],
    actionLabel: "Explore Identity & Manifesto",
    rotX: -12,
    rotY: 15,
    accent: "#00ffd1",
  },
  {
    key: "right",
    label: "02 · Projects",
    badge: "Production Code",
    sectionId: "projects",
    icon: Code2,
    title: "Production AI & Live Systems",
    subtitle: "Enterprise Autonomous CRM · PriceGuard-AI · SpendWise",
    highlights: ["GDG Hackathon Winner", "n8n 5-Platform Social Mesh", "Live Supabase Daily Drivers"],
    actionLabel: "Launch Project Theater",
    rotX: -12,
    rotY: -75,
    accent: "#38bdf8",
  },
  {
    key: "back",
    label: "03 · Stack",
    badge: "Architecture",
    sectionId: "skills",
    icon: Layers,
    title: "Systems & Technical Depth",
    subtitle: "Clean Architecture · Distributed Backends · Modern Web",
    highlights: ["C# / ASP.NET Core & Hangfire", "React 19 & TypeScript", "Flutter Native & Figma UI"],
    actionLabel: "Open Skills Workbench",
    rotX: -12,
    rotY: -165,
    accent: "#a855f7",
  },
  {
    key: "left",
    label: "04 · Milestones",
    badge: "Tech Lead",
    sectionId: "experience",
    icon: Trophy,
    title: "Leadership & Track Record",
    subtitle: "Tech Lead @ Africom Tech · GDG Hackathon Champion",
    highlights: ["Lead Architect on 3-Eng Team", "GDG AASTU AI Hackathon Winner", "AASTU High Standing 3.84/4.0"],
    actionLabel: "View Career Milestones",
    rotX: -12,
    rotY: 105,
    accent: "#f59e0b",
  },
  {
    key: "top",
    label: "05 · Open Roles",
    badge: "Available Now",
    sectionId: "contact",
    icon: Briefcase,
    title: "Ready for Internships & Teams",
    subtitle: "Available immediately for SWE / AI Engineering roles",
    highlights: ["Addis Ababa & Remote Global", "Rapid Engineering Impact", "Production-Ready Mindset"],
    actionLabel: "Start Direct Conversation",
    rotX: -85,
    rotY: 0,
    accent: "#10b981",
  },
  {
    key: "bottom",
    label: "06 · Resume & ⌘K",
    badge: "Verified Docs",
    sectionId: "cv",
    icon: FileDown,
    title: "Official CV & Quick Terminal",
    subtitle: "Download official PDF resume or run keyboard commands",
    highlights: ["Dagim_Tadesse_CV.pdf", "Full Education & Work History", "Instant Command Menu (⌘K)"],
    actionLabel: "Download Official CV (PDF)",
    rotX: 85,
    rotY: 0,
    accent: "#00ffd1",
    isCV: true,
  },
];

export function InteractiveCube({ onNavigate, onOpenCommandMenu }: InteractiveCubeProps) {
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: -16, y: 24 });
  const [activeFace, setActiveFace] = useState<FaceKey>("front");
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const dragStartRef = useRef<{ clientX: number; clientY: number; rotX: number; rotY: number }>({
    clientX: 0,
    clientY: 0,
    rotX: -16,
    rotY: 24,
  });
  const dragDistanceRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Gentle auto-rotation when user is not dragging
  useEffect(() => {
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (autoRotate && !isDragging) {
        setRotation((prev) => ({
          x: prev.x + Math.sin(now * 0.001) * 0.04,
          y: (prev.y + 12 * dt) % 360,
        }));
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [autoRotate, isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setAutoRotate(false);
    setIsDragging(true);
    setHasInteracted(true);
    dragDistanceRef.current = 0;
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;
    dragDistanceRef.current += Math.hypot(e.movementX, e.movementY);

    const sensitivity = 0.55;
    const newRotY = dragStartRef.current.rotY + dx * sensitivity;
    const newRotX = Math.max(-88, Math.min(88, dragStartRef.current.rotX - dy * sensitivity));

    // Subtle audio tick on rotation milestones
    if (Math.floor(dragDistanceRef.current / 40) > Math.floor((dragDistanceRef.current - Math.hypot(e.movementX, e.movementY)) / 40)) {
      sfx.playTick(1.1);
    }

    setRotation({ x: newRotX, y: newRotY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const snapToFace = (face: FaceConfig) => {
    sfx.playSnap();
    setAutoRotate(false);
    setActiveFace(face.key);
    setHasInteracted(true);
    setRotation({ x: face.rotX, y: face.rotY });
  };

  const handleFaceClick = (face: FaceConfig) => {
    if (dragDistanceRef.current > 8) {
      // User was dragging, not clicking
      return;
    }
    setActiveFace(face.key);
    if (face.isCV) {
      sfx.playSuccess();
      const link = document.createElement("a");
      link.href = "/Dagim_Tadesse_CV.pdf";
      link.download = "Dagim_Tadesse_CV.pdf";
      link.target = "_blank";
      link.rel = "noreferrer noopener";
      link.click();
    } else {
      sfx.playSnap();
      onNavigate(face.sectionId);
    }
  };

  const currentFaceConfig = FACES.find((f) => f.key === activeFace) || FACES[0];

  return (
    <div className="relative flex flex-col rounded-2xl border border-white/10 bg-[#0c101a]/90 backdrop-blur-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden select-none">
      {/* Top Holographic Header & Spatial Coordinates */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#00ffd1]/30 bg-[#00ffd1]/10 text-[#00ffd1] shadow-[0_0_12px_rgba(0,255,209,0.2)]">
            <Compass size={14} className={autoRotate ? "animate-spin" : ""} style={{ animationDuration: "12s" }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                3D Spatial Matrix
              </span>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-emerald-400 border border-emerald-500/30">
                Live 6-DOF
              </span>
            </div>
            <div className="font-mono text-[10px] text-slate-400">
              Drag anywhere to orbit · Click face to jump
            </div>
          </div>
        </div>

        {/* Spatial Gyro Telemetry */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-slate-400 bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
          <span>X: {Math.round(rotation.x)}°</span>
          <span className="text-slate-600">|</span>
          <span>Y: {Math.round(((rotation.y % 360) + 360) % 360)}°</span>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`ml-1 p-0.5 rounded transition-colors ${autoRotate ? "text-[#00ffd1]" : "text-slate-500 hover:text-white"}`}
            title={autoRotate ? "Pause orbit" : "Resume auto orbit"}
          >
            <RotateCw size={11} className={autoRotate ? "animate-spin" : ""} style={{ animationDuration: "6s" }} />
          </button>
        </div>
      </div>

      {/* 3D CUBE STAGE */}
      <div
        className="relative my-2 sm:my-4 flex h-[250px] sm:h-[310px] w-full items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ perspective: "1100px" }}
      >
        {/* Subtle Depth Ring and Hologram Floor */}
        <div
          className="absolute inset-x-8 bottom-3 h-28 rounded-full pointer-events-none opacity-40 blur-xl"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,255,209,0.25) 0%, rgba(56,189,248,0.1) 45%, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="absolute h-48 w-48 rounded-full border border-dashed border-[#00ffd1]/20 pointer-events-none"
          style={{
            transform: "rotateX(75deg) translateY(70px)",
          }}
          aria-hidden
        />

        {/* 3D Cube Object */}
        <div
          className="relative h-48 w-48 transition-transform"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {/* FACE 1: FRONT (Identity) */}
          <CubeFace
            face={FACES[0]}
            transform="translateZ(96px)"
            onClick={() => handleFaceClick(FACES[0])}
          />

          {/* FACE 2: RIGHT (Projects) */}
          <CubeFace
            face={FACES[1]}
            transform="rotateY(90deg) translateZ(96px)"
            onClick={() => handleFaceClick(FACES[1])}
          />

          {/* FACE 3: BACK (Skills / Architecture) */}
          <CubeFace
            face={FACES[2]}
            transform="rotateY(180deg) translateZ(96px)"
            onClick={() => handleFaceClick(FACES[2])}
          />

          {/* FACE 4: LEFT (Leadership / Milestones) */}
          <CubeFace
            face={FACES[3]}
            transform="rotateY(-90deg) translateZ(96px)"
            onClick={() => handleFaceClick(FACES[3])}
          />

          {/* FACE 5: TOP (Open to Internships) */}
          <CubeFace
            face={FACES[4]}
            transform="rotateX(90deg) translateZ(96px)"
            onClick={() => handleFaceClick(FACES[4])}
          />

          {/* FACE 6: BOTTOM (CV & ⌘K) */}
          <CubeFace
            face={FACES[5]}
            transform="rotateX(-90deg) translateZ(96px)"
            onClick={() => handleFaceClick(FACES[5])}
          />
        </div>
      </div>

      {/* QUICK FACE SNAPPING DOCK */}
      <div className="flex flex-col gap-2.5 pt-1 border-t border-white/[0.06]">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00ffd1]" />
            Active Face: <span className="font-semibold text-white">{currentFaceConfig.title}</span>
          </span>
          <button
            onClick={() => handleFaceClick(currentFaceConfig)}
            className="flex items-center gap-1 text-[#00ffd1] hover:underline font-semibold"
          >
            <span>{currentFaceConfig.actionLabel}</span>
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Snap Buttons Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {FACES.map((f) => {
            const isActive = activeFace === f.key;
            const Icon = f.icon;
            return (
              <button
                key={f.key}
                onClick={() => snapToFace(f)}
                className={`flex flex-col items-center justify-center gap-1 rounded-lg border py-2 px-1 text-center transition-all ${
                  isActive
                    ? "border-[#00ffd1] bg-[#00ffd1]/15 text-white shadow-[0_0_12px_rgba(0,255,209,0.25)]"
                    : "border-white/10 bg-black/30 text-slate-400 hover:border-white/20 hover:text-slate-200"
                }`}
              >
                <Icon size={13} className={isActive ? "text-[#00ffd1]" : "text-slate-400"} />
                <span className="font-mono text-[9px] uppercase tracking-wider truncate w-full">
                  {f.label.split("·")[1]?.trim() || f.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CubeFace({
  face,
  transform,
  onClick,
}: {
  face: FaceConfig;
  transform: string;
  onClick: () => void;
}) {
  const Icon = face.icon;
  return (
    <div
      onClick={onClick}
      className="absolute inset-0 flex flex-col justify-between rounded-xl border border-white/20 p-3.5 transition-all duration-200 hover:border-[#00ffd1] hover:shadow-[0_0_20px_rgba(0,255,209,0.3)] cursor-pointer"
      style={{
        transform,
        backfaceVisibility: "hidden",
        backgroundColor: "rgba(10, 15, 26, 0.92)",
        boxShadow: "inset 0 0 25px rgba(0, 255, 209, 0.08)",
      }}
    >
      {/* Face Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <div
            className="flex h-5 w-5 items-center justify-center rounded-md border"
            style={{
              borderColor: `${face.accent}55`,
              backgroundColor: `${face.accent}20`,
              color: face.accent,
            }}
          >
            <Icon size={11} />
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white truncate">
            {face.label}
          </span>
        </div>
        <span
          className="rounded px-1.5 py-0.2 font-mono text-[8px] font-bold uppercase tracking-wider"
          style={{
            backgroundColor: `${face.accent}15`,
            color: face.accent,
            border: `1px solid ${face.accent}40`,
          }}
        >
          {face.badge}
        </span>
      </div>

      {/* Face Body */}
      <div className="py-1">
        <h4 className="font-display text-xs font-bold text-white line-clamp-1 leading-snug">
          {face.title}
        </h4>
        <p className="mt-0.5 text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
          {face.subtitle}
        </p>
        <div className="mt-2 flex flex-col gap-1">
          {face.highlights.slice(0, 2).map((h, i) => (
            <div key={i} className="flex items-center gap-1 font-mono text-[9px] text-slate-300 truncate">
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: face.accent }} />
              <span className="truncate">{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Face Footer / Action hint */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.08] text-[9px] font-mono text-slate-400">
        <span className="truncate" style={{ color: face.accent }}>
          {face.actionLabel}
        </span>
        <ArrowRight size={10} style={{ color: face.accent }} />
      </div>
    </div>
  );
}

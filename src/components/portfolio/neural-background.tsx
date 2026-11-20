import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Eye, Compass, Activity } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface TrailPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
  color: string;
}

type TerrainMode = "cyber" | "subtle" | "off";

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [terrainMode, setTerrainMode] = useState<TerrainMode>("cyber");
  const [fps, setFps] = useState<number>(60);
  const [showHud, setShowHud] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking with elastic physics
    const mouse = {
      x: width / 2,
      y: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      speed: 0,
      isActive: false,
      pulse: 0,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouseTrail: TrailPoint[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;

      const dx = mouse.targetX - mouse.prevX;
      const dy = mouse.targetY - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.prevX = mouse.targetX;
      mouse.prevY = mouse.targetY;

      // Spawn trailing stardust micro-particles on mouse movement
      if (mouse.speed > 3 && mouseTrail.length < 25) {
        mouseTrail.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          alpha: 0.85,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.4 ? "#00ffd1" : "#a855f7",
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const COLORS = ["#00ffd1", "#38bdf8", "#8b5cf6", "#a855f7", "#34d399"];

    // Initialize 3D particles with bold depth
    const PARTICLE_COUNT = Math.min(95, Math.floor((width * height) / 13000));
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.6,
        y: (Math.random() - 0.5) * height * 1.6,
        z: Math.random() * 750 + 80,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2.2 + 1.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        baseAlpha: Math.random() * 0.45 + 0.35,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const FOCAL_LENGTH = 450;
    let scrollY = window.scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let time = 0;
    let lastFpsUpdate = performance.now();
    let frameCount = 0;

    // 3D Terrain Grid Configuration (Perspective Cyber Horizon)
    const GRID_COLS = 32; // Longitudinal lines
    const GRID_ROWS = 22; // Latitudinal depth rings
    const Z_NEAR = 80;
    const Z_FAR = 760;

    const render = (now: number) => {
      time += 0.018;
      frameCount++;

      if (now - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
      mouse.pulse = (Math.sin(time * 3) + 1) * 0.5;

      ctx.clearRect(0, 0, width, height);

      // Deep ambient space illumination
      const ambientGlow = ctx.createRadialGradient(
        mouse.isActive ? mouse.x : width * 0.5,
        mouse.isActive ? mouse.y : height * 0.3,
        40,
        width * 0.5,
        height * 0.5,
        width * 0.75,
      );
      ambientGlow.addColorStop(0, "rgba(0, 255, 209, 0.05)");
      ambientGlow.addColorStop(0.35, "rgba(139, 92, 246, 0.03)");
      ambientGlow.addColorStop(1, "rgba(7, 9, 14, 0)");
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // =========================================================================
      // LAYER 1: 3D UNDULATING PERSPECTIVE WIREFRAME GRID (CYBER HORIZON TERRAIN)
      // =========================================================================
      if (terrainMode !== "off") {
        const horizonY = height * 0.56;
        const groundOffset = 140;
        const intensityMul = terrainMode === "cyber" ? 1.0 : 0.5;

        // 1. HORIZON CORE ATMOSPHERE & GLOWING HORIZON LINE
        const horizonGrad = ctx.createLinearGradient(0, horizonY, width, horizonY);
        horizonGrad.addColorStop(0, "rgba(0, 255, 209, 0)");
        horizonGrad.addColorStop(0.2, `rgba(0, 255, 209, ${0.45 * intensityMul})`);
        horizonGrad.addColorStop(0.5, `rgba(0, 255, 209, ${0.85 * intensityMul})`);
        horizonGrad.addColorStop(0.8, `rgba(168, 85, 247, ${0.45 * intensityMul})`);
        horizonGrad.addColorStop(1, "rgba(168, 85, 247, 0)");

        ctx.beginPath();
        ctx.moveTo(0, horizonY);
        ctx.lineTo(width, horizonY);
        ctx.strokeStyle = horizonGrad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Soft ambient horizon sun arc
        const sunGrad = ctx.createRadialGradient(width * 0.5, horizonY, 5, width * 0.5, horizonY, 220);
        sunGrad.addColorStop(0, `rgba(0, 255, 209, ${0.18 * intensityMul})`);
        sunGrad.addColorStop(0.4, `rgba(139, 92, 246, ${0.1 * intensityMul})`);
        sunGrad.addColorStop(1, "rgba(7, 9, 14, 0)");
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(width * 0.5, horizonY, 220, Math.PI, Math.PI * 2);
        ctx.fill();

        // 2. COMPUTE 3D PERSPECTIVE VERTEX MATRIX [row][col]
        const gridVertices: {
          x: number;
          y: number;
          z: number;
          elevation: number;
          alpha: number;
        }[][] = [];

        const terrainWidth = width * 1.95;
        const stepX = terrainWidth / (GRID_COLS - 1);

        for (let r = 0; r < GRID_ROWS; r++) {
          const rowVertices: {
            x: number;
            y: number;
            z: number;
            elevation: number;
            alpha: number;
          }[] = [];

          const depthRatio = r / (GRID_ROWS - 1);
          const z = Z_NEAR + Math.pow(depthRatio, 1.3) * (Z_FAR - Z_NEAR);
          const scale = FOCAL_LENGTH / z;
          const fogAlpha = Math.pow(1 - depthRatio, 1.25) * intensityMul;

          for (let c = 0; c < GRID_COLS; c++) {
            const worldX = -terrainWidth / 2 + c * stepX;

            // Dual harmonic wave elevation function
            const wave1 = Math.sin(worldX * 0.005 + time * 1.3) * Math.cos(z * 0.007 + time * 1.0) * 32;
            const wave2 = Math.sin((worldX * 0.009 - z * 0.008) + time * 1.7) * 16;
            let elevation = wave1 + wave2;

            // Interactive mouse deflection ripple
            const approxProjX = width / 2 + worldX * scale;
            const approxProjY = horizonY + (groundOffset - scrollY * 0.08) * scale;
            if (mouse.isActive) {
              const dMouse = Math.hypot(approxProjX - mouse.x, approxProjY - mouse.y);
              if (dMouse < 260) {
                const influence = Math.pow(1 - dMouse / 260, 2);
                elevation += Math.sin(time * 6 - dMouse * 0.055) * 44 * influence;
              }
            }

            const projX = width / 2 + worldX * scale;
            const projY = horizonY + (groundOffset + elevation - scrollY * 0.08 * (1 - depthRatio * 0.5)) * scale;

            rowVertices.push({
              x: projX,
              y: projY,
              z,
              elevation,
              alpha: Math.max(0, Math.min(1, fogAlpha * 0.65)),
            });
          }
          gridVertices.push(rowVertices);
        }

        // 3. DRAW LONGITUDINAL WIRES (Connecting foreground to horizon)
        ctx.lineWidth = 1.1;
        for (let c = 0; c < GRID_COLS; c++) {
          ctx.beginPath();
          for (let r = 0; r < GRID_ROWS; r++) {
            const v = gridVertices[r][c];
            if (r === 0) ctx.moveTo(v.x, v.y);
            else ctx.lineTo(v.x, v.y);
          }
          const startV = gridVertices[0][c];
          const endV = gridVertices[GRID_ROWS - 1][c];
          const grad = ctx.createLinearGradient(startV.x, startV.y, endV.x, endV.y);
          grad.addColorStop(0, `rgba(0, 255, 209, ${0.72 * intensityMul})`);
          grad.addColorStop(0.35, `rgba(56, 189, 248, ${0.45 * intensityMul})`);
          grad.addColorStop(0.75, `rgba(168, 85, 247, ${0.2 * intensityMul})`);
          grad.addColorStop(1, "rgba(139, 92, 246, 0)");
          ctx.strokeStyle = grad;
          ctx.stroke();
        }

        // 4. DRAW LATERAL CONTOUR RINGS
        for (let r = 0; r < GRID_ROWS; r++) {
          const row = gridVertices[r];
          const alpha = row[0].alpha;
          if (alpha < 0.02) continue;

          ctx.beginPath();
          for (let c = 0; c < GRID_COLS; c++) {
            const v = row[c];
            if (c === 0) ctx.moveTo(v.x, v.y);
            else ctx.lineTo(v.x, v.y);
          }
          ctx.strokeStyle = `rgba(0, 255, 209, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }

        // 5. LUMINOUS VERTEX BEACON MICRO-DIAMONDS
        if (terrainMode === "cyber") {
          for (let r = 0; r < GRID_ROWS - 2; r += 2) {
            for (let c = 0; c < GRID_COLS; c += 2) {
              const v = gridVertices[r][c];
              if (v.elevation > 14 && v.alpha > 0.12) {
                // Diamond beacon
                ctx.beginPath();
                ctx.moveTo(v.x, v.y - 2);
                ctx.lineTo(v.x + 2, v.y);
                ctx.lineTo(v.x, v.y + 2);
                ctx.lineTo(v.x - 2, v.y);
                ctx.closePath();
                ctx.fillStyle = "#ffffff";
                ctx.globalAlpha = v.alpha * 1.5;
                ctx.fill();

                // Cyan halo ring
                ctx.beginPath();
                ctx.arc(v.x, v.y, 3.5, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(0, 255, 209, 0.4)";
                ctx.lineWidth = 0.6;
                ctx.stroke();
              }
            }
          }
          ctx.globalAlpha = 1.0;
        }
      }

      // =========================================================================
      // LAYER 2: MOUSE ENERGY AURA & CONCENTRIC PULSES
      // =========================================================================
      if (mouse.isActive) {
        // Outer pulsing ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 45 + mouse.pulse * 15, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 255, 209, 0.22)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner core halo
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 16 + mouse.pulse * 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 209, 0.12)";
        ctx.fill();

        // Secondary violet aura
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 85 + mouse.pulse * 25, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(168, 85, 247, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Update & render mouse trail particles
      for (let i = mouseTrail.length - 1; i >= 0; i--) {
        const tp = mouseTrail[i];
        tp.x += tp.vx;
        tp.y += tp.vy;
        tp.alpha *= 0.92;
        tp.radius *= 0.96;

        if (tp.alpha < 0.05) {
          mouseTrail.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(tp.x, tp.y, tp.radius, 0, Math.PI * 2);
        ctx.fillStyle = tp.color;
        ctx.globalAlpha = tp.alpha;
        ctx.fill();
      }

      // =========================================================================
      // LAYER 3: 3D FLOATING PARTICLES & CONSTELLATION WEB
      // =========================================================================
      const projected: {
        x: number;
        y: number;
        size: number;
        p: Particle;
        alpha: number;
        distToMouse: number;
      }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Orbit velocity
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.pulsePhase += p.pulseSpeed;

        // Current 2D projected coordinate
        const scale = FOCAL_LENGTH / p.z;
        const projX = width / 2 + p.x * scale;
        const projY = height / 2 + (p.y - scrollY * 0.12 * (1 - p.z / 850)) * scale;

        const dx = mouse.x - projX;
        const dy = mouse.y - projY;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        // BOLD MOUSE GRAVITATION: Elastic attraction & vortex swirl
        if (mouse.isActive && distToMouse < 280) {
          const force = (280 - distToMouse) / 280;
          p.vx += (dx / distToMouse) * force * 0.18;
          p.vy += (dy / distToMouse) * force * 0.18;
          p.vx += (-dy / distToMouse) * force * 0.08;
          p.vy += (dx / distToMouse) * force * 0.08;
        }

        // Dampen velocity to prevent runaway acceleration
        p.vx *= 0.975;
        p.vy *= 0.975;

        // Wrap boundaries
        const maxBound = width * 0.9;
        if (p.x < -maxBound) p.x = maxBound;
        if (p.x > maxBound) p.x = -maxBound;
        if (p.y < -maxBound) p.y = maxBound;
        if (p.y > maxBound) p.y = -maxBound;
        if (p.z < 70) p.z = 820;
        if (p.z > 820) p.z = 70;

        const dynamicPulse = Math.sin(p.pulsePhase) * 0.2;
        const depthAlpha = Math.min(
          1,
          Math.max(0.12, (1 - p.z / 850) * p.baseAlpha + dynamicPulse),
        );
        const size = p.radius * scale;

        projected.push({
          x: projX,
          y: projY,
          size,
          p,
          alpha: depthAlpha,
          distToMouse,
        });
      }

      // LASER CONNECTIONS FROM MOUSE TO CLOSEST PARTICLES
      if (mouse.isActive) {
        const nearbyToMouse = projected
          .filter((pt) => pt.distToMouse < 260)
          .sort((a, b) => a.distToMouse - b.distToMouse)
          .slice(0, 10);

        for (const pt of nearbyToMouse) {
          const lineAlpha = (1 - pt.distToMouse / 260) * 0.75;
          const laserGrad = ctx.createLinearGradient(mouse.x, mouse.y, pt.x, pt.y);
          laserGrad.addColorStop(0, `rgba(0, 255, 209, ${lineAlpha})`);
          laserGrad.addColorStop(0.6, `rgba(168, 85, 247, ${lineAlpha * 0.8})`);
          laserGrad.addColorStop(1, `rgba(0, 255, 209, ${lineAlpha * 0.3})`);

          ctx.strokeStyle = laserGrad;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(pt.x, pt.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * 2.8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 255, 209, ${lineAlpha * 0.8})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // CONSTELLATION WEB LINKS BETWEEN PARTICLES
      ctx.lineWidth = 0.85;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          const maxDist = 145;
          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * Math.min(a.alpha, b.alpha) * 0.7;
            ctx.strokeStyle = `rgba(0, 255, 209, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // DRAW GLOWING PARTICLE NODES
      for (let i = 0; i < projected.length; i++) {
        const { x, y, size, p, alpha, distToMouse } = projected[i];

        if (x < -60 || x > width + 60 || y < -60 || y > height + 60) continue;

        const isNearMouse = mouse.isActive && distToMouse < 220;
        const boost = isNearMouse ? (1 - distToMouse / 220) * 1.5 : 0;
        const effectiveSize = Math.max(0.8, size * (1 + boost * 0.5));
        const effectiveAlpha = Math.min(1, alpha + boost * 0.4);

        // Radiant glow halo
        ctx.beginPath();
        ctx.arc(x, y, effectiveSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = effectiveAlpha * 0.3;
        ctx.fill();

        // Intense core dot
        ctx.beginPath();
        ctx.arc(x, y, effectiveSize, 0, Math.PI * 2);
        ctx.fillStyle = isNearMouse ? "#ffffff" : p.color;
        ctx.globalAlpha = effectiveAlpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [terrainMode]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90 transition-opacity duration-700"
      />

      {/* FLOATING REAL-TIME GRAPHICS ENGINE TELEMETRY DOCK */}
      <div className="fixed bottom-4 right-4 z-40 hidden sm:flex flex-col items-end gap-1.5 pointer-events-auto select-none">
        {showHud && (
          <div className="rounded-xl border border-white/10 bg-[#07090e]/90 backdrop-blur-xl p-3 shadow-2xl space-y-2 text-xs font-mono text-slate-300 w-64 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Compass size={13} className="text-[#00ffd1]" />
                3D Graphics Pipeline
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">{fps} FPS</span>
            </div>

            <div className="space-y-1 text-[11px] text-slate-400">
              <div className="flex justify-between">
                <span>Projection:</span>
                <span className="text-white">Perspective 3D</span>
              </div>
              <div className="flex justify-between">
                <span>Terrain Mesh:</span>
                <span className="text-[#00ffd1]">468 Active Vertices</span>
              </div>
              <div className="flex justify-between">
                <span>Shader Logic:</span>
                <span className="text-purple-400">Trig Displacement</span>
              </div>
              <div className="flex justify-between">
                <span>Mouse Deflection:</span>
                <span className="text-emerald-400">Interactive Wave</span>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="pt-1.5 border-t border-white/[0.08] flex items-center justify-between gap-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Mode:</span>
              <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5">
                <button
                  onClick={() => setTerrainMode("cyber")}
                  className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                    terrainMode === "cyber"
                      ? "bg-[#00ffd1]/20 text-[#00ffd1] font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Cyber
                </button>
                <button
                  onClick={() => setTerrainMode("subtle")}
                  className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                    terrainMode === "subtle"
                      ? "bg-[#00ffd1]/20 text-[#00ffd1] font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Subtle
                </button>
                <button
                  onClick={() => setTerrainMode("off")}
                  className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                    terrainMode === "off"
                      ? "bg-red-500/20 text-red-400 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Off
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Minimalist Toggle Pill */}
        <button
          onClick={() => setShowHud(!showHud)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-[#07090e]/80 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-slate-400 hover:text-white hover:border-[#00ffd1]/40 transition-all shadow-lg"
          title="Toggle 3D Graphics Engine Telemetry"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00ffd1] animate-pulse" />
          <span>3D Graphics</span>
          <span className="text-[10px] text-slate-500 bg-white/5 px-1.5 py-0.2 rounded border border-white/5">
            {fps} FPS
          </span>
        </button>
      </div>
    </>
  );
}

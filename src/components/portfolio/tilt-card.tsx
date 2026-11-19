import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hero?: boolean;
}

export function TiltCard({
  children,
  className = "",
  glowColor = "#00ffd1",
  hero = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate values normalized [-0.5, 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const springConfig = { damping: 20, stiffness: 260 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  // Spotlight coordinates on card
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spotX.set(x);
    spotY.set(y);

    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.012 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${
        isHovered
          ? "border-white/25 bg-[#0e1424] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8),0_0_35px_-5px_rgba(0,255,209,0.18)]"
          : "border-white/[0.08] bg-[#0c101a]/90 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.7)]"
      } ${className}`}
    >
      {/* Specular Glare / Flash on hover */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-10 rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${spotX.get()}px ${spotY.get()}px, rgba(255, 255, 255, 0.08), transparent 70%), radial-gradient(300px circle at ${spotX.get()}px ${spotY.get()}px, ${glowColor}18, transparent 60%)`,
          }}
        />
      )}

      {/* Top subtle border neon line when hovered */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-[1.5px] transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${glowColor} 50%, transparent 100%)`,
        }}
      />

      <div className="relative z-0 h-full">{children}</div>
    </motion.div>
  );
}

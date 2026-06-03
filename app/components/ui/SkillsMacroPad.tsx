"use client";

import React, { useState, useEffect, useRef } from "react";
import { SKILLS_DATA, Skill } from "@/lib/constants";

export default function SkillsMacroPad() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse move parallax tilt
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cX = rect.left + rect.width / 2;
      const cY = rect.top + rect.height / 2;

      // Normalized coordinates (-1 to 1) relative to center of macro-pad
      const x = (e.clientX - cX) / (window.innerWidth / 2);
      const y = (e.clientY - cY) / (window.innerHeight / 2);

      // Max tilt: 15 degrees, combining default tilt with mouse offset
      const defaultRotateX = 12;
      const defaultRotateY = -15;
      
      const rotateX = defaultRotateX - y * 12;
      const rotateY = defaultRotateY + x * 15;

      container.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(-2deg)`;
    };

    const handleMouseLeave = () => {
      // Return to default premium isometric state
      container.style.transform = `perspective(1200px) rotateX(12deg) rotateY(-15deg) rotateZ(-2deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Split skills into a 5-row, 6-column keypad grid
  const rowSize = 6;
  const rows: Skill[][] = [];
  for (let i = 0; i < SKILLS_DATA.length; i += rowSize) {
    rows.push(SKILLS_DATA.slice(i, i + rowSize));
  }

  // Handle manual click simulation
  const handleKeyPress = (idx: number) => {
    setActiveKey(idx);
    setTimeout(() => setActiveKey(null), 150);
  };

  return (
    <div className="relative w-full min-h-[500px] flex flex-col items-center justify-center py-6 select-none">
      {/* 3D Perspective Rotation Frame (inherits animate-float for passive hover floating) */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[580px] p-6 rounded-3xl bg-[#0e1322]/80 border border-white/5 shadow-2xl transition-transform duration-300 ease-out will-change-transform animate-float"
        style={{
          transform: "perspective(1200px) rotateX(12deg) rotateY(-15deg) rotateZ(-2deg)",
          transformStyle: "preserve-3d",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.05), 0 0 40px -10px rgba(0,229,255,0.08)",
        }}
      >
        {/* Top Trim: Keypad status/OLED HUD */}
        <div 
          className="flex items-center justify-between mb-6 px-4 py-3 rounded-xl bg-black/60 border border-white/5 font-mono text-[9px] text-white/50"
          style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFC8] animate-ping" />
            <span className="font-semibold text-primary tracking-wider">SKILLS_ARSENAL // V1.0</span>
          </div>
          <div className="flex gap-4">
            <span>MEM_BANK: <span className="text-[#00FFC8] font-bold">READY</span></span>
            <span>SYSTEM_CORE: <span className="text-[#00E5FF] font-bold">ONLINE</span></span>
          </div>
        </div>

        {/* The Key Grid Matrix */}
        <div 
          className="grid grid-rows-5 gap-3.5"
          style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
        >
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-6 gap-3.5">
              {row.map((skill, colIndex) => {
                const globalIndex = rowIndex * rowSize + colIndex;
                const isHovered = hoveredIndex === globalIndex;
                const isActive = activeKey === globalIndex;

                return (
                  <div
                    key={skill.name}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(globalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleKeyPress(globalIndex)}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "500px",
                    }}
                  >
                    {/* Key Cap Base / Socket Glow (Underneath LED) */}
                    <div
                      className="absolute inset-0 rounded-lg blur-md transition-opacity duration-300 opacity-20 group-hover:opacity-60"
                      style={{
                        backgroundColor: skill.color,
                        boxShadow: `0 0 15px ${skill.color}`,
                      }}
                    />

                    {/* Outer Key Socket border */}
                    <div className="absolute inset-0 rounded-lg bg-[#070b15] border border-white/5" />

                    {/* Keycap (3D button) */}
                    <div
                      className={`relative w-full aspect-square flex flex-col items-center justify-center p-1 rounded-lg border text-center transition-all duration-200 select-none
                        ${isHovered 
                          ? "bg-white/[0.04]" 
                          : "bg-white/[0.01]"
                        }
                      `}
                      style={{
                        borderColor: isHovered ? skill.color : "rgba(255,255,255,0.06)",
                        boxShadow: isHovered 
                          ? `0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.05), 0 0 10px -2px ${skill.color}` 
                          : "0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.02)",
                        transform: isActive 
                          ? "translateZ(2px)" 
                          : isHovered 
                            ? "translateZ(12px) translateY(-2px)" 
                            : "translateZ(8px)",
                        transition: "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.2s, box-shadow 0.2s",
                      }}
                    >
                      {/* Sub-LED color bar inside keycap */}
                      <div
                        className="w-4 h-1 rounded-full mb-1.5 transition-all duration-300"
                        style={{
                          backgroundColor: skill.color,
                          boxShadow: isHovered ? `0 0 8px ${skill.color}` : "none",
                        }}
                      />

                      {/* Keycap main text */}
                      <span 
                        className="text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-tight font-display transition-colors duration-200"
                        style={{ color: isHovered ? "#FFFFFF" : "rgba(255,255,255,0.6)" }}
                      >
                        {skill.name}
                      </span>
                    </div>

                    {/* Embedded floating tooltip (only displays on hover) */}
                    {isHovered && (
                      <div
                        className="absolute z-50 pointer-events-none rounded-xl border border-white/10 bg-[#0B0F19]/95 backdrop-blur-md p-4 shadow-2xl w-[220px]"
                        style={{
                          left: "50%",
                          top: "-150%",
                          transform: "translate(-50%, -20px) translateZ(40px)",
                          boxShadow: `0 15px 30px rgba(0,0,0,0.9), 0 0 15px -3px ${skill.color}30`,
                        }}
                      >
                        {/* Tooltip glow indicator */}
                        <div
                          className="w-1.5 h-1.5 rounded-full mb-1.5 animate-pulse"
                          style={{ backgroundColor: skill.color }}
                        />
                        {/* Tooltip Title */}
                        <p className="text-[11px] font-bold font-display text-white tracking-wide uppercase">
                          {skill.name}
                        </p>
                        {/* Tooltip Category */}
                        <p className="text-[7.5px] font-mono uppercase tracking-widest mb-1.5" style={{ color: skill.color }}>
                          {skill.category}
                        </p>
                        {/* Tooltip Description */}
                        <p className="text-[9px] text-white/50 leading-relaxed font-mono font-medium">
                          {skill.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Keypad Base Plate Trim details */}
        <div 
          className="mt-6 flex items-center justify-between px-2 text-[8px] font-mono text-white/20"
          style={{ transform: "translateZ(8px)", transformStyle: "preserve-3d" }}
        >
          <span>KEYPAD_MATRIX: [5x6]</span>
          <span>CALIBRATED: OK</span>
          <span>DEV_GROUP: GENAI_OPS</span>
        </div>
      </div>
    </div>
  );
}

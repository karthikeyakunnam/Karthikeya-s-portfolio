"use client";

import React, { useState, useEffect, useRef } from "react";

interface NodeData {
  id: number;
  label: string;
  role: string;
  x: number; // base isometric x (shifted for viewBox)
  y: number; // base isometric y (shifted for viewBox)
  color: string;
  glowColor: string;
  icon: React.ReactNode;
}

export default function AICore() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Direct DOM parallax effect on mouse move
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cX = rect.left + rect.width / 2;
      const cY = rect.top + rect.height / 2;

      // Normalised offset from the center of the AI Core component (-1 to 1)
      const x = (e.clientX - cX) / (window.innerWidth / 2);
      const y = (e.clientY - cY) / (window.innerHeight / 2);

      // Subtle tilt: max 12 degrees
      const rotateX = -y * 12;
      const rotateY = x * 12;

      // Apply style directly for maximum performance (60+ FPS)
      container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      // Reset tilt smoothly when mouse leaves
      container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // 6 nodes arranged in an isometric hexagon around central (250, 250)
  // Radius = 150
  // X = R * cos(a), Y = R * sin(a)
  // Projected: x_screen = (X - Y) * cos(30deg) = (X - Y) * 0.866
  //            y_screen = (X + Y) * sin(30deg) = (X + Y) * 0.5
  // Screen center at (250, 250)
  const nodes: NodeData[] = [
    {
      id: 0,
      label: "Planner",
      role: "Orchestrator",
      x: 379.9,
      y: 325.0,
      color: "#00E5FF",
      glowColor: "rgba(0, 229, 255, 0.4)",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-[#00E5FF] fill-none stroke-current"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      ),
    },
    {
      id: 1,
      label: "Research",
      role: "Intelligence",
      x: 202.5,
      y: 352.5,
      color: "#7C3AED",
      glowColor: "rgba(124, 58, 237, 0.4)",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-[#7C3AED] fill-none stroke-current"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      ),
    },
    {
      id: 2,
      label: "Retriever",
      role: "Memory Access",
      x: 72.5,
      y: 277.5,
      color: "#00FFC8",
      glowColor: "rgba(0, 255, 200, 0.4)",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-[#00FFC8] fill-none stroke-current"
          strokeWidth="2"
        >
          <path d="M20 20a2 2 0 0 0 .5-3.5L13 10V3H9v7L2.5 16.5A2 2 0 0 0 3 20h17Z" />
        </svg>
      ),
    },
    {
      id: 3,
      label: "Memory",
      role: "State",
      x: 120.1,
      y: 175.0,
      color: "#7C3AED",
      glowColor: "rgba(124, 58, 237, 0.4)",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-[#7C3AED] fill-none stroke-current"
          strokeWidth="2"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      id: 4,
      label: "Critic",
      role: "Quality Assurance",
      x: 297.5,
      y: 147.5,
      color: "#00FFC8",
      glowColor: "rgba(0, 255, 200, 0.4)",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-[#00FFC8] fill-none stroke-current"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 5,
      label: "Executor",
      role: "Action Engine",
      x: 427.5,
      y: 222.5,
      color: "#00E5FF",
      glowColor: "rgba(0, 229, 255, 0.4)",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-[#00E5FF] fill-none stroke-current"
          strokeWidth="2"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      ),
    },
  ];

  // Hexagonal loop transitions (Planner -> Research -> Retriever -> Memory -> Critic -> Executor -> Planner)
  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 0 },
  ];

  return (
    <div className="relative w-full h-[520px] flex items-center justify-center select-none animate-float">
      {/* 3D Perspective Rotation Box */}
      <div
        ref={containerRef}
        className="relative w-[500px] h-[500px] transition-transform duration-500 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Core SVG Canvas (connections, energy grid, flowing particles) */}
        <svg
          viewBox="0 0 500 500"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            {/* Core Neural Radial Gradients */}
            <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="60%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#0B0F19" />
            </radialGradient>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#7C3AED" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>

            {/* Drop Shadow and Neon Glow Filters */}
            <filter
              id="glowFilter"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="blurFilter"
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* BACKGROUND ENERGY FIELD (Isometric Grid lines) */}
          <g
            opacity="0.08"
            stroke="#00E5FF"
            strokeWidth="0.5"
            className="animate-pulse"
          >
            <path
              d="M 250,50 L 450,250 L 250,450 L 50,250 Z"
              fill="none"
              strokeWidth="1"
            />
            <path
              d="M 250,100 L 400,250 L 250,400 L 100,250 Z"
              fill="none"
              strokeWidth="0.75"
            />
            <path
              d="M 250,150 L 350,250 L 250,350 L 150,250 Z"
              fill="none"
              strokeWidth="0.5"
            />

            {/* Axis grid wires */}
            <line x1="50" y1="250" x2="450" y2="250" />
            <line x1="250" y1="50" x2="250" y2="450" />
          </g>

          {/* RADIATING DATA PATHS (Core <-> Agent Nodes) */}
          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            return (
              <g key={`core-beam-${node.id}`}>
                {/* Visual Connection Wire */}
                <line
                  x1="250"
                  y1="250"
                  x2={node.x}
                  y2={node.y}
                  stroke={node.color}
                  strokeWidth={isHovered ? "2.5" : "1"}
                  opacity={isHovered ? "0.6" : "0.15"}
                  className="transition-all duration-300"
                />

                {/* Traveling Packets outwards */}
                <circle r="2.5" fill="#00FFC8" filter="url(#blurFilter)">
                  <animateMotion
                    dur="3.2s"
                    repeatCount="indefinite"
                    path={`M 250,250 L ${node.x},${node.y}`}
                    begin={`${node.id * 0.5}s`}
                  />
                </circle>
              </g>
            );
          })}

          {/* INTER-AGENT WORKFLOW PIPELINES (Workflow Connections) */}
          {connections.map((conn, idx) => {
            const fromNode = nodes[conn.from];
            const toNode = nodes[conn.to];
            const isFromHovered = hoveredNode === conn.from;
            const isToHovered = hoveredNode === conn.to;
            const isActive = isFromHovered || isToHovered;

            return (
              <g key={`workflow-beam-${idx}`}>
                {/* Background energy beam wire */}
                <path
                  d={`M ${fromNode.x},${fromNode.y} L ${toNode.x},${toNode.y}`}
                  fill="none"
                  stroke={isActive ? "#00FFC8" : "#7C3AED"}
                  strokeWidth={isActive ? "2.5" : "1"}
                  strokeDasharray={isActive ? "none" : "5 5"}
                  opacity={isActive ? "0.8" : "0.22"}
                  className="transition-all duration-300"
                />

                {/* Moving active energy pulse */}
                <path
                  d={`M ${fromNode.x},${fromNode.y} L ${toNode.x},${toNode.y}`}
                  fill="none"
                  stroke="#00FFC8"
                  strokeWidth="1.5"
                  strokeDasharray="25 80"
                  opacity={isActive ? "0.9" : "0.35"}
                  className="animate-scan-line"
                  style={{ animationDuration: "2.8s" }}
                />

                {/* Workflow Data Packets */}
                <circle r="3" fill="#00E5FF" filter="url(#blurFilter)">
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    path={`M ${fromNode.x},${fromNode.y} L ${toNode.x},${toNode.y}`}
                    begin={`${idx * 0.4}s`}
                  />
                </circle>
              </g>
            );
          })}

          {/* CENTER COGNITIVE NEURAL SPHERE (The living Core) */}
          <g>
            {/* Dynamic Radial Aura */}
            <circle
              cx="250"
              cy="250"
              r="64"
              fill="url(#coreGlow)"
              className="animate-pulse-glow"
              style={{ animationDuration: "4s" }}
            />

            {/* Tech Constellation Rings */}
            <circle
              cx="250"
              cy="250"
              r="48"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="1"
              strokeDasharray="15 30"
              opacity="0.3"
              className="animate-spin"
              style={{ animationDuration: "18s" }}
            />
            <circle
              cx="250"
              cy="250"
              r="40"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="0.8"
              strokeDasharray="8 16"
              opacity="0.45"
              className="animate-spin"
              style={{
                animationDuration: "12s",
                animationDirection: "reverse",
              }}
            />

            {/* Glowing Core Sphere */}
            <circle
              cx="250"
              cy="250"
              r="24"
              fill="url(#coreGradient)"
              filter="url(#glowFilter)"
              className="animate-pulse"
              style={{ animationDuration: "3.5s" }}
            />

            {/* White core reflection highlight */}
            <circle
              cx="244"
              cy="244"
              r="8"
              fill="#FFFFFF"
              opacity="0.3"
              filter="url(#blurFilter)"
            />
          </g>
        </svg>

        {/* STAND-UP BILLBOARD LABELS & NODES */}
        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id;

          return (
            <div
              key={`node-overlay-${node.id}`}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: "translate(-50%, -50%)",
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Stand Stem wire linking base circle to standing label */}
              <div
                className="absolute w-[1px] h-[36px] origin-bottom transition-all duration-300"
                style={{
                  bottom: "0px",
                  left: "0px",
                  backgroundImage: `linear-gradient(to top, ${node.color}30, ${node.color}FF)`,
                  transform: "translateY(-10px)",
                  boxShadow: isHovered ? `0 0 10px ${node.color}` : "none",
                }}
              />

              {/* Base Interactive Ring on Isometric Plane */}
              <div className="relative flex items-center justify-center w-6 h-6">
                <div
                  className="absolute w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: node.color,
                    boxShadow: isHovered
                      ? `0 0 20px 6px ${node.color}`
                      : `0 0 8px ${node.color}90`,
                  }}
                />
                <div
                  className={`absolute w-4 h-4 rounded-full border border-current opacity-40 ${
                    isHovered ? "animate-ping" : "animate-pulse"
                  }`}
                  style={{ color: node.color, animationDuration: "2s" }}
                />
              </div>

              {/* Stand-up Label Card */}
              <div
                className="absolute transition-all duration-300 ease-out"
                style={{
                  transform: `translate(-50%, -48px) scale(${isHovered ? 1.08 : 1})`,
                  transformStyle: "preserve-3d",
                  zIndex: isHovered ? 50 : 10,
                }}
              >
                <div
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md border font-mono text-xs shadow-2xl transition-all duration-300 whitespace-nowrap bg-[#0B0F19]/90 backdrop-blur-md ${
                    isHovered
                      ? "border-primary/80 shadow-primary/20"
                      : "border-white/10 shadow-black/85"
                  }`}
                  style={{
                    boxShadow: isHovered
                      ? `0 0 20px -5px ${node.color}60`
                      : "0 10px 25px -10px rgba(0,0,0,0.8)",
                  }}
                >
                  {/* Custom Graphic Icon */}
                  <span className="flex items-center justify-center w-4 h-4 opacity-80">
                    {node.icon}
                  </span>

                  {/* Text labels */}
                  <div className="flex flex-col select-none">
                    <span className="text-[10px] text-white font-semibold font-display tracking-wide">
                      {node.label}
                    </span>
                    <span className="text-[7.5px] text-white/40 tracking-wider">
                      {node.role}
                    </span>
                  </div>

                  {/* Pulsing indicator light */}
                  <span className="relative flex h-1.5 w-1.5">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: node.color }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-1.5 w-1.5"
                      style={{ backgroundColor: node.color }}
                    />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

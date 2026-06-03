"use client";

import React, { useEffect, useState } from "react";

interface Challenge {
  title: string;
  challenge: string;
  solution: string;
}

interface ProjectData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  architecture: string;
  highlights: string[];
  metrics: Record<string, string | number>;
  technologies: string[];
  impact: string;
  color: string;
  resumeSummary: string;
  businessProblem: string;
  solutionArchitecture: string;
  challenges: Challenge[];
  achievements: string[];
  recruiterHighlights: string[];
  learnings: string;
  github: string;
}

interface ProjectModalProps {
  project: ProjectData;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Animate open on mount
  useEffect(() => {
    const t = setTimeout(() => setIsOpened(true), 20);

    // Close on escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsOpened(false);
    setTimeout(() => onClose(), 300); // wait for fade transition
  };

  // ─── 1. DIAGRAM RENDERER: PatchForge AI (LangGraph) ───
  const renderLangGraph = () => {
    const nodes = [
      {
        id: "start",
        label: "START",
        x: 60,
        y: 150,
        desc: "Triggers on GitHub Issue Hook",
        tools: [],
      },
      {
        id: "planner",
        label: "Planner",
        x: 160,
        y: 150,
        desc: "Decomposes complex issues into sub-tasks",
        tools: ["State Manager", "Task Parser"],
      },
      {
        id: "research",
        label: "Research",
        x: 280,
        y: 80,
        desc: "Analyzes code context & semantic logs",
        tools: ["Pinecone RAG", "Tavily Search"],
      },
      {
        id: "critic",
        label: "Critic",
        x: 280,
        y: 220,
        desc: "Evaluates proposed code changes for safety",
        tools: ["LLM Judge", "Schema Validation"],
      },
      {
        id: "executor",
        label: "Executor",
        x: 400,
        y: 150,
        desc: "Applies code patches in dynamic sandbox",
        tools: ["Docker Exec", "FastAPI Sandbox"],
      },
      {
        id: "verifier",
        label: "Verifier",
        x: 400,
        y: 280,
        desc: "Runs unit tests and codebase validation",
        tools: ["Pytest Runner", "LangSmith Traces"],
      },
    ];

    const edges = [
      { from: "start", to: "planner" },
      { from: "planner", to: "research" },
      { from: "planner", to: "critic" },
      { from: "research", to: "critic" },
      { from: "critic", to: "executor" },
      { from: "executor", to: "verifier" },
      { from: "verifier", to: "planner", loop: true }, // Loop back on failure
    ];

    return (
      <div className="relative w-full overflow-hidden bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col items-center">
        <h4 className="text-xs font-mono text-white/40 mb-4 self-start">
          ▸ INTERACTIVE LANGGRAPH WORKFLOW (HOVER TO EXPLORE)
        </h4>

        <svg
          viewBox="0 0 500 350"
          className="w-full max-w-lg h-auto select-none"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.2)" />
            </marker>
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00E5FF" />
            </marker>
          </defs>

          {/* Connection Lines (Edges) */}
          {edges.map((edge, idx) => {
            const fromNode = nodes.find((n) => n.id === edge.from)!;
            const toNode = nodes.find((n) => n.id === edge.to)!;
            const isActive =
              hoveredNode === edge.from || hoveredNode === edge.to;

            if (edge.loop) {
              // Draw custom loop path back to planner
              const pathD = `M ${fromNode.x} ${fromNode.y} C 250 360, 200 340, ${toNode.x} ${toNode.y + 12}`;
              return (
                <g key={`edge-${idx}`}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isActive ? "#00E5FF" : "rgba(255,255,255,0.15)"}
                    strokeWidth={isActive ? "2" : "1"}
                    strokeDasharray={edge.loop ? "4 4" : "none"}
                    markerEnd={isActive ? "url(#arrow-active)" : "url(#arrow)"}
                    className="transition-all duration-300"
                  />
                  {isActive && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#00E5FF"
                      strokeWidth="1.5"
                      strokeDasharray="15 50"
                      className="animate-scan-line"
                      style={{ animationDuration: "2s" }}
                    />
                  )}
                </g>
              );
            }

            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isActive ? "#00E5FF" : "rgba(255,255,255,0.15)"}
                  strokeWidth={isActive ? "2" : "1"}
                  markerEnd={isActive ? "url(#arrow-active)" : "url(#arrow)"}
                  className="transition-all duration-300"
                />
                {isActive && (
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#00FFC8"
                    strokeWidth="1.5"
                    strokeDasharray="10 30"
                    className="animate-scan-line"
                    style={{ animationDuration: "1.5s" }}
                  />
                )}
              </g>
            );
          })}

          {/* Workflow nodes */}
          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Glow ring */}
                <circle
                  r={isHovered ? "22" : "14"}
                  fill="none"
                  stroke={node.id === "start" ? "#FF6B6B" : "#00E5FF"}
                  strokeWidth="1.5"
                  className={`transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                  style={{ filter: "blur(3px)" }}
                />

                {/* Node circle */}
                <circle
                  r="14"
                  fill="#0B0F19"
                  stroke={
                    isHovered
                      ? "#00E5FF"
                      : node.id === "start"
                        ? "#FF6B6B"
                        : "rgba(255,255,255,0.3)"
                  }
                  strokeWidth={isHovered ? "2" : "1.5"}
                  className="transition-colors duration-300"
                />

                {/* Text Label */}
                <text
                  y="26"
                  textAnchor="middle"
                  className={`font-mono text-[9px] font-bold fill-current transition-all duration-300 ${
                    isHovered ? "text-primary text-[10px]" : "text-white/60"
                  }`}
                >
                  {node.label}
                </text>

                {/* Inner dot */}
                <circle
                  r="4"
                  fill={node.id === "start" ? "#FF6B6B" : "#00E5FF"}
                  className={isHovered ? "animate-ping" : ""}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover details display */}
        <div className="mt-4 w-full min-h-[64px] p-3 rounded-lg bg-white/[0.02] border border-white/5 font-mono text-[11px] text-white/70">
          {hoveredNode ? (
            <div>
              <p className="text-primary font-bold mb-1">
                ▸ {nodes.find((n) => n.id === hoveredNode)!.label.toUpperCase()}{" "}
                NODE
              </p>
              <p className="text-white/90 mb-1.5">
                {nodes.find((n) => n.id === hoveredNode)!.desc}
              </p>
              {nodes.find((n) => n.id === hoveredNode)!.tools.length > 0 && (
                <p className="text-white/40">
                  Tool Stack:{" "}
                  <span className="text-accent">
                    {nodes.find((n) => n.id === hoveredNode)!.tools.join(", ")}
                  </span>
                </p>
              )}
            </div>
          ) : (
            <p className="text-white/30 text-center py-2">
              Hover over graph nodes to audit agent operations
            </p>
          )}
        </div>
      </div>
    );
  };

  // ─── 2. DIAGRAM RENDERER: BOWA AI Agent (Multi-Agent Orchestrator) ───
  const renderMultiAgent = () => {
    const nodes = [
      {
        id: "orchestrator",
        label: "Orchestrator",
        x: 250,
        y: 150,
        isHub: true,
        desc: "Manager LLM coordinating task distribution and plans",
        tools: ["State DAG Planner", "Re-planning Engine"],
      },
      {
        id: "user",
        label: "User Proxy",
        x: 90,
        y: 70,
        desc: "Ingests enterprise triggers & requirements",
        tools: ["Slack API", "JSON Schema Loader"],
      },
      {
        id: "planning",
        label: "Planning Agent",
        x: 410,
        y: 70,
        desc: "Decomposes instructions into sub-plans",
        tools: ["Few-Shot Prompts", "Graph Parser"],
      },
      {
        id: "coding",
        label: "Coding Worker",
        x: 90,
        y: 230,
        desc: "Generates custom business execution scripts",
        tools: ["Python Sandbox", "LLaMA-3-Coder"],
      },
      {
        id: "research",
        label: "Research Agent",
        x: 410,
        y: 230,
        desc: "Queries unstructured docs and vector stores",
        tools: ["Tavily API", "Redis Semantic Store"],
      },
      {
        id: "database",
        label: "DB Worker",
        x: 250,
        y: 270,
        desc: "Fetches schemas & generates optimized SQL",
        tools: ["Postgres API", "Explain SQL Analyzer"],
      },
    ];

    return (
      <div className="relative w-full overflow-hidden bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col items-center">
        <h4 className="text-xs font-mono text-white/40 mb-4 self-start">
          ▸ INTERACTIVE ORCHESTRATION GRAPH (HOVER TO EXPLORE)
        </h4>

        <svg
          viewBox="0 0 500 350"
          className="w-full max-w-lg h-auto select-none"
        >
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Communication paths (spokes) */}
          {nodes
            .filter((n) => !n.isHub)
            .map((node, idx) => {
              const isActive =
                hoveredNode === "orchestrator" || hoveredNode === node.id;
              return (
                <g key={`spoke-${idx}`}>
                  <line
                    x1="250"
                    y1="150"
                    x2={node.x}
                    y2={node.y}
                    stroke={isActive ? "#7C3AED" : "rgba(255,255,255,0.12)"}
                    strokeWidth={isActive ? "2" : "1"}
                    className="transition-all duration-300"
                  />
                  {isActive && (
                    <circle r="3" fill="#00FFC8">
                      <animateMotion
                        dur="1.8s"
                        repeatCount="indefinite"
                        path={`M 250 150 L ${node.x} ${node.y}`}
                        begin={`${idx * 0.2}s`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

          {/* Central Hub Glow */}
          <circle
            cx="250"
            cy="150"
            r="45"
            fill="url(#hubGlow)"
            className="animate-pulse"
          />

          {/* Render node circles */}
          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node Ring */}
                <circle
                  r={
                    node.isHub
                      ? isHovered
                        ? "28"
                        : "24"
                      : isHovered
                        ? "20"
                        : "15"
                  }
                  fill="#0B0F19"
                  stroke={
                    isHovered
                      ? "#7C3AED"
                      : node.isHub
                        ? "#7C3AED"
                        : "rgba(255,255,255,0.2)"
                  }
                  strokeWidth={isHovered ? "2" : "1"}
                  className="transition-all duration-300"
                />

                {/* Text inside node */}
                <text
                  textAnchor="middle"
                  y="4"
                  className={`font-mono font-bold fill-current pointer-events-none transition-all duration-300 ${
                    node.isHub
                      ? "text-[8.5px] text-[#7C3AED]"
                      : isHovered
                        ? "text-[7.5px] text-white"
                        : "text-[6px] text-white/50"
                  }`}
                >
                  {node.isHub
                    ? "MANAGER"
                    : node.label.split(" ")[0].toUpperCase()}
                </text>

                {/* Standing Label below spoke nodes */}
                {!node.isHub && (
                  <text
                    y="24"
                    textAnchor="middle"
                    className={`font-mono text-[8px] fill-current transition-all duration-300 ${
                      isHovered
                        ? "text-primary text-[9px] font-bold"
                        : "text-white/40"
                    }`}
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip display */}
        <div className="mt-4 w-full min-h-[64px] p-3 rounded-lg bg-white/[0.02] border border-white/5 font-mono text-[11px] text-white/70">
          {hoveredNode ? (
            <div>
              <p className="text-secondary font-bold mb-1">
                ▸ {nodes.find((n) => n.id === hoveredNode)!.label.toUpperCase()}
              </p>
              <p className="text-white/95 mb-1.5">
                {nodes.find((n) => n.id === hoveredNode)!.desc}
              </p>
              {nodes.find((n) => n.id === hoveredNode)!.tools.length > 0 && (
                <p className="text-white/40">
                  Capabilities/Tools:{" "}
                  <span className="text-accent">
                    {nodes.find((n) => n.id === hoveredNode)!.tools.join(", ")}
                  </span>
                </p>
              )}
            </div>
          ) : (
            <p className="text-white/30 text-center py-2">
              Hover over manager or workers to inspect tasks and agent
              capabilities
            </p>
          )}
        </div>
      </div>
    );
  };

  // ─── 3. DIAGRAM RENDERER: QueryForge AI (Hybrid RAG) ───
  const renderRAGPipeline = () => {
    const nodes = [
      {
        id: "query",
        label: "User Query",
        x: 45,
        y: 150,
        desc: "User inputs semantic query or search phrase",
      },
      {
        id: "router",
        label: "Router & Guard",
        x: 120,
        y: 150,
        desc: "Evaluates query for prompt injections via LlamaGuard",
      },
      {
        id: "dense",
        label: "Dense Retriever",
        x: 215,
        y: 80,
        desc: "Pinecone semantic search on raw text chunks",
      },
      {
        id: "sparse",
        label: "Sparse Retriever",
        x: 215,
        y: 220,
        desc: "BM25 keyword search on catalog index",
      },
      {
        id: "rerank",
        label: "Reranker",
        x: 310,
        y: 150,
        desc: "Cohere cross-encoder evaluates chunk relevance scores",
      },
      {
        id: "llm",
        label: "LLM Gen",
        x: 395,
        y: 150,
        desc: "LLM synthesis with retrieved text citation indexes",
      },
      {
        id: "output",
        label: "Output Validation",
        x: 470,
        y: 150,
        desc: "Self-correcting validation runs outputs against source facts",
      },
    ];

    const steps = [
      { from: "query", to: "router" },
      { from: "router", to: "dense" },
      { from: "router", to: "sparse" },
      { from: "dense", to: "rerank" },
      { from: "sparse", to: "rerank" },
      { from: "rerank", to: "llm" },
      { from: "llm", to: "output" },
    ];

    return (
      <div className="relative w-full overflow-hidden bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col items-center">
        <h4 className="text-xs font-mono text-white/40 mb-4 self-start">
          ▸ INTERACTIVE HYBRID RAG ARCHITECTURE (HOVER TO EXPLORE)
        </h4>

        <svg
          viewBox="0 0 520 320"
          className="w-full max-w-xl h-auto select-none"
        >
          <defs>
            <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FFC8" stopOpacity="0" />
              <stop offset="50%" stopColor="#00FFC8" stopOpacity="1" />
              <stop offset="100%" stopColor="#00FFC8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Pipelines connection beams */}
          {steps.map((step, idx) => {
            const fromNode = nodes.find((n) => n.id === step.from)!;
            const toNode = nodes.find((n) => n.id === step.to)!;
            const isActive =
              hoveredNode === step.from || hoveredNode === step.to;

            return (
              <g key={`pipe-${idx}`}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isActive ? "#00FFC8" : "rgba(255,255,255,0.12)"}
                  strokeWidth={isActive ? "2" : "1"}
                  className="transition-all duration-300"
                />
                {isActive && (
                  <circle r="3" fill="#00FFC8">
                    <animateMotion
                      dur="1.4s"
                      repeatCount="indefinite"
                      path={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Pipeline elements */}
          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Square layout for steps */}
                <rect
                  x="-25"
                  y="-16"
                  width="50"
                  height="32"
                  rx="4"
                  fill="#0B0F19"
                  stroke={isHovered ? "#00FFC8" : "rgba(255,255,255,0.2)"}
                  strokeWidth={isHovered ? "2" : "1"}
                  className="transition-all duration-300"
                />

                {/* Text Label inside card */}
                <text
                  textAnchor="middle"
                  y="-2"
                  className="font-mono font-bold text-[5.5px] fill-current text-white/80 pointer-events-none"
                >
                  {node.label.split(" ")[0].toUpperCase()}
                </text>
                {node.label.split(" ")[1] && (
                  <text
                    textAnchor="middle"
                    y="6"
                    className="font-mono font-bold text-[5.5px] fill-current text-white/50 pointer-events-none"
                  >
                    {node.label.split(" ")[1].toUpperCase()}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Dynamic description info */}
        <div className="mt-4 w-full min-h-[64px] p-3 rounded-lg bg-white/[0.02] border border-white/5 font-mono text-[11px] text-white/70">
          {hoveredNode ? (
            <div>
              <p className="text-accent font-bold mb-1">
                ▸ {nodes.find((n) => n.id === hoveredNode)!.label.toUpperCase()}{" "}
                PIPELINE STEP
              </p>
              <p className="text-white/95">
                {nodes.find((n) => n.id === hoveredNode)!.desc}
              </p>
            </div>
          ) : (
            <p className="text-white/30 text-center py-2">
              Hover over pipeline components to inspect hybrid retrieval
              dataflow
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderSystemDiagram = () => {
    switch (project.id) {
      case 1:
        return renderLangGraph();
      case 2:
        return renderMultiAgent();
      case 3:
        return renderRAGPipeline();
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 transition-opacity duration-300 bg-black/75 backdrop-blur-xl ${
        isOpened ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-6xl h-[85vh] bg-[#0B0F19]/95 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${
          isOpened ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()} // stop close on modal content click
      >
        {/* Sticky Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 w-9 h-9 rounded-full transition-all duration-200 z-50 flex items-center justify-center cursor-pointer border border-white/5"
          aria-label="Close case study panel"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-none stroke-current"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* STICKY HEADER */}
        <div className="px-6 py-5 md:px-8 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-md z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="text-[9px] font-mono font-bold tracking-widest uppercase border px-2 py-0.5 rounded"
                style={{
                  color: project.color,
                  borderColor: `${project.color}33`,
                  backgroundColor: `${project.color}08`,
                }}
              >
                ◈ {project.architecture}
              </span>
            </div>
            <h3
              id="modal-title"
              className="text-2xl md:text-3xl font-bold font-display"
              style={{ color: project.color }}
            >
              {project.title}
            </h3>
            <p className="text-white/40 text-xs md:text-sm font-mono">
              {project.subtitle}
            </p>
          </div>

          {/* GitHub Repo Button */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="md:self-center flex items-center gap-2 text-xs font-mono text-white/50 hover:text-primary border border-white/10 hover:border-primary/30 px-4 py-2.5 rounded-lg bg-white/[0.02] hover:bg-primary/[0.04] transition-all duration-300 w-fit"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
                stroke="none"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
              <span>Audit Source Code</span>
            </a>
          )}
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN - Immersive Case Study */}
            <div className="lg:col-span-7 space-y-8">
              {/* ATS Highlight */}
              <div className="p-4 bg-white/[0.01] border-l-2 rounded-r-lg border-primary/50">
                <h4 className="text-[10px] font-mono text-primary/60 uppercase tracking-widest mb-1.5">
                  ▸ ATS-FRIENDLY SUMMARY
                </h4>
                <p className="text-white/90 text-sm leading-relaxed font-sans font-medium italic">
                  "{project.resumeSummary}"
                </p>
              </div>

              {/* Business Problem */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  ▸ BUSINESS PROBLEM & GAP
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  {project.businessProblem}
                </p>
              </div>

              {/* Solution Architecture */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  ▸ SOLUTION ARCHITECTURE
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  {project.solutionArchitecture}
                </p>
              </div>

              {/* System Diagram Section */}
              <div className="space-y-3">{renderSystemDiagram()}</div>

              {/* Deep Engineering Challenges (Recruiter / Manager audit) */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  ▸ DEEP ENGINEERING CHALLENGES
                </h4>
                <div className="space-y-4">
                  {project.challenges.map((challenge, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white/[0.02] border border-white/5 rounded-lg space-y-2"
                    >
                      <h5 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                        <span className="text-danger">⚠</span> CHALLENGE{" "}
                        {idx + 1}: {challenge.title}
                      </h5>
                      <p className="text-[12px] text-white/50 leading-relaxed font-sans">
                        <strong className="text-white/60">Problem:</strong>{" "}
                        {challenge.challenge}
                      </p>
                      <p className="text-[12px] text-white/70 leading-relaxed font-sans">
                        <strong className="text-accent/90">
                          Mitigation & Solution:
                        </strong>{" "}
                        {challenge.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Learnings */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  ▸ PRODUCTION TAKEAWAYS & SYSTEM LEARNINGS
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  {project.learnings}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN - Stats, Tech Tag groups, Recruiter Index */}
            <div className="lg:col-span-5 space-y-6">
              {/* Performance Metrics Card */}
              <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl space-y-4 shadow-xl">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  ▸ KEY PERFORMANCE METRICS
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-3 bg-black/40 border border-white/5 rounded-lg text-center flex flex-col justify-center"
                    >
                      <span
                        className="text-xl font-bold font-mono"
                        style={{ color: project.color }}
                      >
                        {value}
                      </span>
                      <span className="text-[8px] font-mono text-white/30 uppercase tracking-wider mt-1">
                        {key}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recruiter Focus Index */}
              <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl space-y-3">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  ▸ RECRUITER HIGHLIGHT INDEX
                </h4>
                <ul className="space-y-2">
                  {project.recruiterHighlights.map((hl, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-white/75 font-mono"
                    >
                      <span className="text-accent">✔</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Technology Stack */}
              <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl space-y-3">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  ▸ COMPLETE SYSTEM TECH STACK
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10px] font-mono rounded bg-white/[0.03] border border-white/5 text-white/75 hover:border-primary/30 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements summary */}
              <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl space-y-3">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  ▸ SYSTEM IMPACT ACHIEVEMENTS
                </h4>
                <ul className="space-y-2.5">
                  {project.achievements.map((ach, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-[11px] text-white/60 leading-relaxed font-sans"
                    >
                      <span
                        className="text-[9px] mt-0.5"
                        style={{ color: project.color }}
                      >
                        ◈
                      </span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

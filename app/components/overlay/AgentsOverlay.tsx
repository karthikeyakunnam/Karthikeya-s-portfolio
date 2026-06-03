"use client";

import React from "react";
import GlassCard from "@/app/components/ui/GlassCard";
import GradientText from "@/app/components/ui/GradientText";
import { AGENTS } from "@/lib/constants";
import { usePortfolioStore } from "@/app/store/usePortfolioStore";

export default function AgentsOverlay() {
  const hoveredAgent = usePortfolioStore((s) => s.hoveredAgent);
  const setHoveredAgent = usePortfolioStore((s) => s.setHoveredAgent);

  return (
    <section
      id="agents"
      className="section-overlay"
      aria-label="Agent Architecture section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-primary/60 tracking-widest uppercase mb-3">
            ▸ MULTI-AGENT SYSTEM
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-display">
            Agent <GradientText>Architecture</GradientText>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            A living LangGraph-inspired multi-agent workflow
          </p>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {AGENTS.map((agent) => (
            <GlassCard
              key={agent.id}
              hover
              className="agent-node p-5 cursor-pointer"
              style={{ "--agent-color": agent.color } as React.CSSProperties}
            >
              <div
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
                className="space-y-3"
              >
                {/* Agent header */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full animate-pulse-glow"
                    style={{ backgroundColor: agent.color }}
                  />
                  <div>
                    <h3
                      className="text-sm font-bold font-display"
                      style={{ color: agent.color }}
                    >
                      {agent.name} Agent
                    </h3>
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
                      {agent.role}
                    </p>
                  </div>
                </div>

                {/* Purpose */}
                <p className="text-xs text-white/40 leading-relaxed">
                  {agent.purpose}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5">
                  {agent.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[9px] rounded-full bg-white/[0.03] border border-white/10 text-white/50 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Expanded details on hover */}
                {hoveredAgent === agent.id && (
                  <div className="space-y-2 pt-2 border-t border-white/5 animate-fade-in-up">
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
                      Capabilities
                    </p>
                    {agent.capabilities.map((cap) => (
                      <div
                        key={cap}
                        className="flex items-start gap-1.5 text-xs"
                      >
                        <span
                          style={{ color: agent.color }}
                          className="text-[8px] mt-0.5"
                        >
                          ●
                        </span>
                        <span className="text-white/50">{cap}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

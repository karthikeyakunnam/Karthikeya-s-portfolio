"use client";

import React from "react";
import GradientText from "@/app/components/ui/GradientText";
import GlassCard from "@/app/components/ui/GlassCard";
import SkillsMacroPad from "@/app/components/ui/SkillsMacroPad";
import { EDUCATION } from "@/lib/constants";

export default function EducationOverlay() {
  return (
    <section
      id="timeline"
      className="section-overlay min-h-screen py-24 px-4 sm:px-6 lg:px-8 flex items-center"
      aria-label="Skills and Education section"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-primary/60 tracking-widest uppercase mb-3 animate-pulse">
            ▸ COGNITIVE ENGINE
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-display">
            Capability <GradientText>Matrix</GradientText>
          </h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto font-mono">
            Bridging foundational engineering theory with state-of-the-art agent architecture.
          </p>
        </div>

        {/* Split Screen Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: Education Cards (30% visual weight) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="mb-2">
              <span className="font-mono text-[10px] text-primary/50 tracking-widest uppercase">
                {"// SYSTEM_EDUCATION"}
              </span>
              <h3 className="text-xl font-bold text-white font-display mt-1">
                Academic Foundation
              </h3>
            </div>

            {EDUCATION.map((edu, idx) => (
              <GlassCard
                key={edu.institution}
                hover
                variant="default"
                className="p-5 border border-white/5 bg-[#0e1322]/50 hover:bg-[#12192c]/60 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Decorative neon edge glow matching index */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{
                    backgroundColor: idx === 0 ? "#00E5FF" : idx === 1 ? "#7C3AED" : "#00FFC8",
                    boxShadow: `0 0 10px ${idx === 0 ? "#00E5FF" : idx === 1 ? "#7C3AED" : "#00FFC8"}`
                  }}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start gap-3 mb-2.5">
                    <span 
                      className="font-mono text-[9px] font-bold px-2 py-0.5 rounded border"
                      style={{
                        color: idx === 0 ? "#00E5FF" : idx === 1 ? "#7C3AED" : "#00FFC8",
                        borderColor: idx === 0 ? "#00E5FF33" : idx === 1 ? "#7C3AED33" : "#00FFC833",
                        backgroundColor: idx === 0 ? "#00E5FF08" : idx === 1 ? "#7C3AED08" : "#00FFC808"
                      }}
                    >
                      {edu.period}
                    </span>
                    <span className="text-[8px] font-mono text-white/20">
                      SEC_00{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-wide font-display group-hover:text-primary transition-colors duration-200">
                    {edu.institution}
                  </h4>

                  <p className="text-xs text-white/50 font-mono mt-1">
                    {edu.degree || edu.qualification}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* RIGHT COLUMN: Skills Arsenal Keyboard (70% visual weight) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center">
            <div className="w-full text-left mb-2 pl-4">
              <span className="font-mono text-[10px] text-[#00FFC8]/70 tracking-widest uppercase">
                {"// SKILLS_ARSENAL"}
              </span>
              <h3 className="text-xl font-bold text-white font-display mt-1">
                Mechanical Interface
              </h3>
            </div>
            
            <SkillsMacroPad />
          </div>
          
        </div>
      </div>
    </section>
  );
}

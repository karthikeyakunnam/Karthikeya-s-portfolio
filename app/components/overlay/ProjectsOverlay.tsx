"use client";

import React, { useState } from "react";
import GlassCard from "@/app/components/ui/GlassCard";
import GradientText from "@/app/components/ui/GradientText";
import { PROJECTS } from "@/lib/constants";
import { usePortfolioStore } from "@/app/store/usePortfolioStore";
import ProjectModal from "@/app/components/ui/ProjectModal";

export default function ProjectsOverlay() {
  const setActiveProject = usePortfolioStore((s) => s.setActiveProject);
  const [activeModalProject, setActiveModalProject] = useState<any | null>(
    null,
  );

  return (
    <>
      <section
        id="projects"
        className="section-overlay"
        aria-label="Projects section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-primary/60 tracking-widest uppercase mb-3">
              ▸ PRODUCTION SYSTEMS
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-display">
              Project <GradientText>Ecosystem</GradientText>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Autonomous AI systems solving real-world problems
            </p>
            <p className="text-[10px] font-mono text-primary/50 mt-2">
              (CLICK ANY CARD FOR AN IMMERSIVE ENGINEERING CASE STUDY)
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <GlassCard
                key={project.id}
                hover
                className="p-6 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => setActiveModalProject(project)}
              >
                <div
                  className="space-y-4"
                  onMouseEnter={() => setActiveProject(i)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  {/* Architecture badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono border"
                    style={{
                      color: project.color,
                      borderColor: `${project.color}33`,
                      backgroundColor: `${project.color}08`,
                    }}
                  >
                    ◈ {project.architecture}
                  </div>

                  {/* Title */}
                  <div>
                    <h3
                      className="text-xl font-bold font-display"
                      style={{ color: project.color }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-sm mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(project.metrics)
                      .slice(0, 4)
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="px-2.5 py-2 rounded-lg bg-white/[0.02] border border-white/5"
                        >
                          <p
                            className="text-sm font-bold font-mono"
                            style={{ color: project.color }}
                          >
                            {String(value)}
                          </p>
                          <p className="text-[9px] text-white/30 uppercase tracking-wider font-mono">
                            {key}
                          </p>
                        </div>
                      ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.03] border border-white/10 text-white/50 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.03] border border-white/10 text-white/30 font-mono">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Impact */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <p
                      className="text-xs font-medium"
                      style={{ color: `${project.color}BB` }}
                    >
                      ↗ {project.impact}
                    </p>
                    <span className="text-[9px] font-mono text-white/30 tracking-wider">
                      READ STUDY →
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Immersive Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HudButton from "@/app/components/ui/HudButton";
import AICore from "@/app/components/ui/AICore";

export default function HeroOverlay() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll("[data-animate]");

    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 3.5, // After preloader boot sequence finishes
        ease: "power3.out",
      }
    );
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="section-overlay bg-[#0B0F19]/40"
      aria-label="Hero section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Column - Hero Content */}
          <div ref={contentRef} className="space-y-6 pt-24 lg:pt-0">
            {/* Terminal-style badge */}
            <div data-animate>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-primary/70 tracking-widest uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Hi, I am
              </span>
            </div>

            {/* Owner Name */}
            <div data-animate>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] font-display text-white">
                UNNAM
                <br />
                <span className="text-gradient">KARTHIKEYA</span>
              </h1>
            </div>

            {/* Subtitles / Headings */}
            <div data-animate className="flex flex-col gap-1.5">
              <span className="text-lg sm:text-xl font-mono text-primary tracking-wider uppercase font-semibold">
                GenAI Engineer
              </span>
              <p className="text-xl sm:text-2xl font-medium text-white/90 tracking-wide font-display neon-text">
                Building Autonomous AI Systems
              </p>
            </div>

            {/* Tagline / Professional Description */}
            <p
              data-animate
              className="text-base sm:text-lg text-white/50 max-w-lg leading-relaxed font-sans"
            >
              I design and deploy production-grade multi-agent systems, autonomous workflows, and AI-powered applications using LangGraph, RAG, and modern LLM infrastructure.
            </p>

            {/* Action Buttons */}
            <div data-animate className="flex flex-col sm:flex-row gap-4 pt-2">
              <HudButton
                variant="primary"
                size="lg"
                onClick={() => scrollToSection("#agents")}
              >
                Explore Systems
              </HudButton>
              <HudButton
                variant="ghost"
                size="lg"
                href="/resume/Unnam_karthikeya_resume@123.pdf"
                download="Unnam_karthikeya_resume@123.pdf"
              >
                Download Resume
              </HudButton>
            </div>

            {/* Micro-animated Social Links */}
            <div
              data-animate
              className="flex items-center gap-3 pt-6 border-t border-white/5 max-w-md"
            >
              <a
                href="https://github.com/karthikeyakunnam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 hover:text-primary transition-all duration-300 text-xs px-3.5 py-2 rounded border border-white/5 bg-white/[0.01] hover:border-primary/30 hover:bg-primary/[0.03] font-mono flex items-center gap-2 hover:shadow-lg hover:shadow-primary/5"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" stroke="none">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
                </svg>
                <span>GitHub</span>
              </a>
              
              <a
                href="https://linkedin.com/in/unnam-karthikeya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 hover:text-primary transition-all duration-300 text-xs px-3.5 py-2 rounded border border-white/5 bg-white/[0.01] hover:border-primary/30 hover:bg-primary/[0.03] font-mono flex items-center gap-2 hover:shadow-lg hover:shadow-primary/5"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" stroke="none">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="mailto:karthikeyaunnam1364@gmail.com"
                className="text-white/45 hover:text-primary transition-all duration-300 text-xs px-3.5 py-2 rounded border border-white/5 bg-white/[0.01] hover:border-primary/30 hover:bg-primary/[0.03] font-mono flex items-center gap-2 hover:shadow-lg hover:shadow-primary/5"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column - 3D Autonomous AI Core */}
          <div className="hidden lg:flex items-center justify-center pointer-events-auto">
            <AICore />
          </div>

        </div>
      </div>
    </section>
  );
}

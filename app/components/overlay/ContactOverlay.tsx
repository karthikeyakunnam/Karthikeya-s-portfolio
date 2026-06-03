"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientText from "@/app/components/ui/GradientText";
import HudButton from "@/app/components/ui/HudButton";
import GlassCard from "@/app/components/ui/GlassCard";
import { PORTFOLIO_DATA, SOCIAL_LINKS } from "@/lib/constants";

// Dynamically import ReactorScene to prevent SSR compilation crashes with Canvas
const ReactorScene = dynamic(() => import("../ui/ReactorScene"), {
  ssr: false,
});

interface AgentData {
  id: number;
  name: string;
  purpose: string;
  capability: string;
  color: string;
}

export default function ContactOverlay() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
    budget: "",
    timeline: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredAgent, setHoveredAgent] = useState<AgentData | null>(null);

  // GSAP Viewport reveal animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Left Form Side slide-in
    gsap.fromTo(
      "#contact-form-side",
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
        },
      },
    );

    // Right Reactor Side fade/scale-up
    gsap.fromTo(
      "#contact-reactor-side",
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
        },
      },
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Transmission sent:", formState);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({
        name: "",
        email: "",
        company: "",
        projectType: "",
        message: "",
        budget: "",
        timeline: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const inputClasses =
    "w-full px-4 py-3 bg-white/[0.01] border border-white/8 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-primary/40 focus:bg-white/[0.03] transition-all text-sm font-mono";

  return (
    <section
      id="contact"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Contact section"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-primary/60 tracking-widest uppercase mb-3 animate-pulse">
            ▸ INITIATE COLLABORATION
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-display">
            Connect with <GradientText>Core Reactor</GradientText>
          </h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto font-mono">
            Let&apos;s build intelligent systems together.
          </p>
        </div>

        {/* Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* LEFT SIDE: Contact Card (5 Columns) */}
          <div id="contact-form-side" className="lg:col-span-5 flex opacity-0">
            <GlassCard
              variant="strong"
              className="w-full p-8 sm:p-10 border border-white/5 bg-[#090d1a]/85 backdrop-blur-md rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between gap-8"
            >
              {/* Top border neon sweep gradient */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              {/* Card Header Content */}
              <div>
                <span className="font-mono text-[9px] text-primary/60 tracking-widest uppercase">
                  {"// SEC_COMMUNICATION_LINK"}
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-2 leading-tight tracking-tight">
                  INITIATE
                  <br />
                  COLLABORATION.
                </h3>
                <p className="text-xs text-white/45 leading-relaxed font-mono mt-4">
                  Interested in building autonomous AI systems, agentic
                  workflows, production-grade RAG architectures, or intelligent
                  automation?
                  <br />
                  <br />
                  Let&apos;s discuss your project.
                </p>
              </div>

              {/* Form Element */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 relative z-10 flex-1 py-4"
              >
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="form-name"
                      className="block text-[8px] font-mono text-primary/45 mb-1.5 uppercase tracking-wider"
                    >
                      &gt; NAME
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="form-email"
                      className="block text-[8px] font-mono text-primary/45 mb-1.5 uppercase tracking-wider"
                    >
                      &gt; EMAIL
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Row 2: Company & Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="form-company"
                      className="block text-[8px] font-mono text-primary/45 mb-1.5 uppercase tracking-wider"
                    >
                      &gt; COMPANY (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      id="form-company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="form-project-type"
                      className="block text-[8px] font-mono text-primary/45 mb-1.5 uppercase tracking-wider"
                    >
                      &gt; PROJECT TYPE
                    </label>
                    <input
                      type="text"
                      id="form-project-type"
                      name="projectType"
                      value={formState.projectType}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="AI Platform, Agent System..."
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="form-message"
                    className="block text-[8px] font-mono text-primary/45 mb-1.5 uppercase tracking-wider"
                  >
                    &gt; PROJECT_BRIEF
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Row 3: Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="form-budget"
                      className="block text-[8px] font-mono text-primary/45 mb-1.5 uppercase tracking-wider"
                    >
                      &gt; BUDGET
                    </label>
                    <select
                      id="form-budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none cursor-pointer bg-[#0c101c]`}
                    >
                      <option value="" className="bg-[#0c101c]">
                        Select budget (optional)
                      </option>
                      <option value="<5k" className="bg-[#0c101c]">
                        &lt; $5,000
                      </option>
                      <option value="5k-15k" className="bg-[#0c101c]">
                        $5,000 - $15,000
                      </option>
                      <option value="15k-50k" className="bg-[#0c101c]">
                        $15,000 - $50,000
                      </option>
                      <option value="50k+" className="bg-[#0c101c]">
                        $50,000+
                      </option>
                      <option value="open" className="bg-[#0c101c]">
                        Open / Flexible
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="form-timeline"
                      className="block text-[8px] font-mono text-primary/45 mb-1.5 uppercase tracking-wider"
                    >
                      &gt; TIMELINE
                    </label>
                    <select
                      id="form-timeline"
                      name="timeline"
                      value={formState.timeline}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none cursor-pointer bg-[#0c101c]`}
                    >
                      <option value="" className="bg-[#0c101c]">
                        Select timeline (optional)
                      </option>
                      <option value="1-2w" className="bg-[#0c101c]">
                        1 - 2 weeks
                      </option>
                      <option value="1m" className="bg-[#0c101c]">
                        1 month
                      </option>
                      <option value="1-3m" className="bg-[#0c101c]">
                        1 - 3 months
                      </option>
                      <option value="3m+" className="bg-[#0c101c]">
                        3+ months
                      </option>
                      <option value="ongoing" className="bg-[#0c101c]">
                        Ongoing
                      </option>
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <HudButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full relative overflow-hidden group/btn"
                  >
                    {isSubmitted ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FFC8] animate-ping" />
                        TRANSMISSION_SENT
                      </span>
                    ) : (
                      "⟫ Launch Conversation"
                    )}
                  </HudButton>
                </div>

                {isSubmitted && (
                  <p className="text-[10px] text-[#00FFC8] text-center animate-pulse font-mono mt-2">
                    {"// SIGNAL RECEIVED. RESPONSE INCOMING."}
                  </p>
                )}
              </form>

              {/* Clickable Social Cards (inside form card at bottom) */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
                {SOCIAL_LINKS.map((link, idx) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-3 rounded-xl border border-white/5 bg-[#0e1322]/20 hover:bg-[#12192c]/50 transition-all duration-300 relative overflow-hidden"
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 opacity-20 group-hover:opacity-100"
                      style={{
                        backgroundColor: idx % 2 === 0 ? "#00E5FF" : "#7C3AED",
                      }}
                    />
                    <span className="font-mono text-[7px] text-white/30 uppercase tracking-widest">
                      {link.label}
                    </span>
                    <span className="text-[9px] font-mono text-white/70 font-semibold truncate group-hover:text-primary transition-colors mt-1">
                      {link.label === "Phone"
                        ? "+91 86880 84787"
                        : link.href
                            .replace(/^https?:\/\/(www\.)?/, "")
                            .replace(/^mailto:/, "")}
                    </span>
                  </a>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* RIGHT SIDE: AI Core Reactor (7 Columns, floating freely) */}
          <div
            id="contact-reactor-side"
            className="lg:col-span-7 flex flex-col justify-center items-center opacity-0 h-full min-h-[500px]"
          >
            {/* Free-floating Reactor Scene Container (No Bounding Glass Box) */}
            <div className="w-full relative select-none">
              <ReactorScene onHoverAgent={setHoveredAgent} />
            </div>

            {/* Holographic Diagnostic HUD Display Overlay (Floating Transparent diagnostics) */}
            <div
              className="w-full max-w-[500px] mt-6 border border-white/5 bg-[#0e1322]/30 backdrop-blur-sm p-5 font-mono rounded-2xl relative z-10 transition-all duration-300 shadow-2xl"
              style={{
                boxShadow: hoveredAgent
                  ? `0 10px 30px -10px ${hoveredAgent.color}15`
                  : "0 10px 25px -10px rgba(0,0,0,0.5)",
              }}
            >
              {/* Diagnostic title bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3 text-[9px]">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      hoveredAgent
                        ? "animate-pulse"
                        : "bg-[#00E5FF] animate-ping"
                    }`}
                    style={{
                      backgroundColor: hoveredAgent
                        ? hoveredAgent.color
                        : undefined,
                    }}
                  />
                  <span className="font-semibold text-white/40 tracking-wider">
                    {hoveredAgent
                      ? `REACTOR_NODE // STATE_DIAGNOSTIC`
                      : "REACTOR_STATUS // MONITOR_ACTIVE"}
                  </span>
                </div>
                <span className="text-white/20">SYS_EFF: 100%</span>
              </div>

              {/* Dynamic diagnostics data */}
              {hoveredAgent ? (
                <div className="space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/40">NODE_ID:</span>
                    <span
                      className="text-xs font-bold font-display uppercase"
                      style={{ color: hoveredAgent.color }}
                    >
                      {hoveredAgent.name}
                    </span>
                  </div>
                  <div>
                    <p className="text-[8px] text-white/35 uppercase tracking-wider mb-0.5">
                      &gt; ROLE_PURPOSE
                    </p>
                    <p className="text-[10px] text-white/70 leading-relaxed font-mono">
                      {hoveredAgent.purpose}
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] text-white/35 uppercase tracking-wider mb-0.5">
                      &gt; SYSTEM_CAPABILITY
                    </p>
                    <p className="text-[10px] text-[#00FFC8] leading-relaxed font-mono font-medium">
                      {hoveredAgent.capability}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 py-2 text-[10px] text-white/40">
                  <p className="animate-pulse">
                    &gt;&gt; SYSTEM IS STABLE. ALL 6 COGNITIVE AGENTS ACTIVE.
                  </p>
                  <p className="text-[9px] text-white/20 font-medium">
                    &gt;&gt; HOVER OVER ANY ORBITAL AGENT NODE TO PROBE
                    OPERATIONAL CORE SPECS.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

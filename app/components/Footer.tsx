"use client";

import React from "react";
import { PORTFOLIO_DATA, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 bg-[#0B0F19]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2 font-display">K.</h3>
            <p className="text-white/30 text-sm">
              GenAI Engineer | Agentic AI Systems Builder
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white/60 mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Projects", href: "#projects" },
                { label: "Skills & Education", href: "#timeline" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/30 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume/Unnam_karthikeya_resume@123.pdf"
                  download="Unnam_karthikeya_resume@123.pdf"
                  className="text-white/30 hover:text-primary transition-colors text-sm"
                >
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white/60 mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-primary transition-colors text-sm px-3 py-1.5 rounded-md glass hover:border-primary/20"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/20 text-xs font-mono">
          <p>&copy; {currentYear} {PORTFOLIO_DATA.name}. All rights reserved.</p>
          <p>Built with Next.js, Three.js, GSAP | Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}

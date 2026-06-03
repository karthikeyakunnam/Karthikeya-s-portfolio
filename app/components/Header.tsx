"use client";

import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "@/app/store/usePortfolioStore";

const NAVIGATION = [
  { label: "Home", href: "#" },
  { label: "Agents", href: "#agents" },
  { label: "Projects", href: "#projects" },
  { label: "Skills & Education", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-strong"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-primary font-display">
          K.
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {NAVIGATION.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-primary transition-colors font-display"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/resume/Unnam_karthikeya_resume@123.pdf"
            download="Unnam_karthikeya_resume@123.pdf"
            className="px-4 py-2 text-sm font-medium text-white/60 hover:text-primary transition-colors font-display border border-primary/20 rounded bg-primary/5 ml-2"
          >
            Resume
          </a>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-24 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-white/30">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        } glass-strong`}
      >
        <div className="px-4 py-4 flex flex-col gap-2">
          {NAVIGATION.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/resume/Unnam_karthikeya_resume@123.pdf"
            download="Unnam_karthikeya_resume@123.pdf"
            className="px-4 py-2 text-sm font-medium text-primary hover:text-white transition-colors border border-primary/20 rounded bg-primary/5 text-center mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioStore } from "@/app/store/usePortfolioStore";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      usePortfolioStore.getState().setMouse(x, y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Main scroll trigger - maps entire page scroll to 0→1 progress
    const scrollContainer = document.querySelector("#scroll-container");
    if (scrollContainer) {
      ScrollTrigger.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // 1.5 second smooth lag
        onUpdate: (self) => {
          usePortfolioStore.getState().setScrollProgress(self.progress);
        },
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null; // This component just sets up the scroll engine
}

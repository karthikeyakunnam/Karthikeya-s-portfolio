"use client";

import React, { useEffect, useState } from "react";
import BikeSVG from "./BikeSVG";
import {
  PRELOADER_DURATION,
  PRELOADER_FADE_OUT_DURATION,
  calculatePercentage,
  getBootMessage,
} from "@/lib/preloader";

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percentage, setPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [bootMessage, setBootMessage] = useState("Initializing Core");

  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = PRELOADER_DURATION;

    const animationInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newPercentage = calculatePercentage(elapsed, totalDuration);

      setPercentage(newPercentage);
      setBootMessage(getBootMessage(newPercentage));

      if (newPercentage >= 100) {
        clearInterval(animationInterval);

        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 600);
        }, PRELOADER_FADE_OUT_DURATION);
      }
    }, 16);

    return () => clearInterval(animationInterval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-[#0B0F19] transition-opacity duration-600 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="0.5"
                opacity="0.1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-12 px-6">
        {/* Terminal Window */}
        <div className="w-full max-w-md">
          {/* Terminal Header */}
          <div
            className="flex items-center gap-2 px-4 py-3 bg-[#0A0F1A] border border-primary/30 border-b-0 rounded-t-lg"
            style={{ boxShadow: "0 0 20px rgba(0, 229, 255, 0.1)" }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
              <div className="w-3 h-3 rounded-full bg-[#FFD93D]" />
              <div className="w-3 h-3 rounded-full bg-[#6BCB77]" />
            </div>
            <span className="flex-1 text-xs font-mono text-primary/60 text-center">
              MISSION_INIT.exe
            </span>
          </div>

          {/* Terminal Body */}
          <div
            className="px-6 py-8 bg-[#0A0F1A] border border-t-0 border-primary/30 rounded-b-lg"
            style={{ boxShadow: "0 0 30px rgba(0, 229, 255, 0.15)" }}
          >
            {/* Boot Message */}
            <div className="mb-8 h-6 flex items-center">
              <div className="font-mono text-sm text-primary whitespace-nowrap overflow-hidden">
                <span className="text-white/30">&gt;</span>{" "}
                <span className="font-semibold">{bootMessage}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-white/30">
                  PROGRESS:
                </span>
                <span className="font-mono text-lg font-bold text-primary">
                  {percentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary rounded-full transition-all duration-100"
                  style={{
                    width: `${percentage}%`,
                    boxShadow:
                      "0 0 20px rgba(0, 229, 255, 0.8), inset 0 0 10px rgba(0, 229, 255, 0.6)",
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                  style={{ left: `${percentage}%` }}
                >
                  <BikeSVG x={percentage} size={24} />
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-white/20">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Loading Dots */}
            <div
              className="mt-6 flex justify-center gap-1.5"
              aria-hidden="true"
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center text-xs font-mono text-white/30 animate-pulse">
          <p>
            Initializing GenAI Engine <span className="text-primary">»</span>
          </p>
        </div>
      </div>

      {/* Accessibility */}
      <div className="sr-only" role="status" aria-live="polite">
        Loading {percentage}%
      </div>
    </div>
  );
};

export default Preloader;

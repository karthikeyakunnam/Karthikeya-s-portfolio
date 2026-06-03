"use client";

import React from "react";

interface BikeSVGProps {
  x: number; // Position along the progress bar (0-100)
  size?: number;
}

/**
 * Adventure Bike SVG Component
 * Renders a minimalist bike icon for the preloader
 * Designed to move along the progress bar
 */
export const BikeSVG: React.FC<BikeSVGProps> = ({ x, size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
      style={{
        filter: "drop-shadow(0 0 8px rgba(0, 229, 255, 0.6))",
      }}
      aria-label="Loading bike indicator"
    >
      {/* Back Wheel */}
      <circle
        cx="16"
        cy="40"
        r="12"
        stroke="#00E5FF"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="16"
        cy="40"
        r="8"
        stroke="#00E5FF"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />

      {/* Front Wheel */}
      <circle
        cx="48"
        cy="40"
        r="12"
        stroke="#00E5FF"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="48"
        cy="40"
        r="8"
        stroke="#00E5FF"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />

      {/* Frame - Triangle */}
      <polyline
        points="16,40 28,24 48,40"
        stroke="#00E5FF"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Seat Post */}
      <line x1="28" y1="24" x2="32" y2="16" stroke="#00E5FF" strokeWidth="2" />

      {/* Seat */}
      <line x1="30" y1="15" x2="36" y2="15" stroke="#00E5FF" strokeWidth="2" />

      {/* Handlebars */}
      <polyline
        points="48,35 52,30 56,32"
        stroke="#00E5FF"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pedal */}
      <circle
        cx="32"
        cy="35"
        r="2"
        fill="#00E5FF"
        opacity="0.8"
      />

      {/* Glow Effect */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="#00E5FF"
        opacity="0.05"
        filter="url(#glow)"
      />

      {/* Gradient Definitions */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default BikeSVG;

"use client";

import React from "react";

interface HudBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function HudBadge({ children, className = "" }: HudBadgeProps) {
  return (
    <span
      className={`inline-block px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/30 text-primary text-[11px] font-semibold tracking-[0.15em] uppercase ${className}`}
    >
      {children}
    </span>
  );
}

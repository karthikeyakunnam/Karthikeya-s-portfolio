"use client";

import React from "react";
import classnames from "classnames";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "strong" | "subtle";
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  style,
  variant = "default",
  hover = false,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={classnames(
        "rounded-2xl transition-all duration-500",
        {
          "glass-card": variant === "default",
          "glass-strong": variant === "strong",
          glass: variant === "subtle",
          "hover:border-primary/20 hover:shadow-[0_0_30px_rgba(0,229,255,0.08)]": hover,
        },
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

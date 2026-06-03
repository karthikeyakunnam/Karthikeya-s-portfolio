"use client";

import React from "react";
import classnames from "classnames";

interface HudButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  download?: string;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function HudButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  download,
  className,
  type = "button",
  disabled = false,
}: HudButtonProps) {
  const baseClasses = classnames(
    "relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-lg group overflow-hidden",
    {
      // Sizes
      "px-4 py-2 text-sm": size === "sm",
      "px-6 py-3 text-sm": size === "md",
      "px-8 py-3.5 text-base": size === "lg",
      // Primary variant
      "bg-primary/10 border border-primary/40 text-primary hover:bg-primary/20 hover:border-primary/70 hover:shadow-[0_0_25px_rgba(0,229,255,0.15)]":
        variant === "primary",
      // Ghost variant
      "bg-white/[0.03] border border-white/10 text-white/80 hover:bg-white/[0.06] hover:border-white/20 hover:text-white":
        variant === "ghost",
      "opacity-50 cursor-not-allowed": disabled,
    },
    className,
  );

  if (href) {
    return (
      <a href={href} download={download} className={baseClasses}>
        {/* Hover scan line effect */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-hud-scan" />
        </span>
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-hud-scan" />
      </span>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

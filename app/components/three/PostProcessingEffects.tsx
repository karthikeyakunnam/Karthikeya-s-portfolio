"use client";

import React from "react";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { usePortfolioStore } from "@/app/store/usePortfolioStore";

export default function PostProcessingEffects() {
  const viewport = usePortfolioStore((s) => s.viewport);
  const isMobile = viewport.width > 0 && viewport.width < 768;

  // Skip post-processing on mobile for performance
  if (isMobile) return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        intensity={0.7}
        mipmapBlur
      />
      <Noise opacity={0.015} />
      <Vignette offset={0.3} darkness={0.5} eskil={false} />
    </EffectComposer>
  );
}

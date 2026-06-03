"use client";

import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import SceneManager from "./SceneManager";
import ParticleField from "./ParticleField";
import PostProcessingEffects from "./PostProcessingEffects";
import { usePortfolioStore } from "@/app/store/usePortfolioStore";

function SceneContent() {
  return (
    <>
      <SceneManager />
      <ParticleField />
      <PostProcessingEffects />
      <Preload all />
    </>
  );
}

export default function SceneCanvas() {
  const setViewport = usePortfolioStore((s) => s.setViewport);
  const setPrefersReducedMotion = usePortfolioStore((s) => s.setPrefersReducedMotion);

  useEffect(() => {
    const handleResize = () => {
      setViewport(window.innerWidth, window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Check reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    return () => {
      window.removeEventListener("resize", handleResize);
      mq.removeEventListener("change", handler);
    };
  }, [setViewport, setPrefersReducedMotion]);

  return (
    <div id="scene-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}

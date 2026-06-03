"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/app/store/usePortfolioStore";

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const viewport = usePortfolioStore((s) => s.viewport);
  const isMobile = viewport.width > 0 && viewport.width < 768;
  const isTablet = viewport.width >= 768 && viewport.width < 1024;

  const particleCount = isMobile ? 1000 : isTablet ? 1500 : 3000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a large volume
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      speeds[i] = 0.001 + Math.random() * 0.003;
      opacities[i] = 0.2 + Math.random() * 0.6;
    }

    return { positions, speeds, opacities };
  }, [particleCount]);

  useFrame((state) => {
    const { mouse, prefersReducedMotion } = usePortfolioStore.getState();

    if (!pointsRef.current || prefersReducedMotion) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Slow drift
      positions[i3 + 1] += particles.speeds[i] * 0.3;

      // Subtle sine wave motion
      positions[i3] += Math.sin(time * 0.1 + i * 0.01) * 0.001;

      // Wrap around boundaries
      if (positions[i3 + 1] > 25) positions[i3 + 1] = -25;
      if (positions[i3 + 1] < -25) positions[i3 + 1] = 25;
    }

    // Subtle mouse influence on nearest particles (parallax-like)
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      mouse.x * 0.02,
      0.01
    );
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      mouse.y * 0.01,
      0.01
    );

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#FFFFFF"
        transparent
        opacity={0.4}
        sizeAttenuation
        toneMapped={false}
        depthWrite={false}
      />
    </points>
  );
}

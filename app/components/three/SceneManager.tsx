"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/app/store/usePortfolioStore";
import HeroUniverse from "./scenes/HeroUniverse";
import AgentWorkflow from "./scenes/AgentWorkflow";
import ProjectConstellation from "./scenes/ProjectConstellation";
import SkillsNeuralNetwork from "./scenes/SkillsNeuralNetwork";
import ContactField from "./scenes/ContactField";

// Camera positions for 5 scenes
const CAMERA_STATES = [
  { pos: new THREE.Vector3(0, 0, 8), rot: new THREE.Euler(0, 0, 0) }, // 0: Hero
  { pos: new THREE.Vector3(0, 0, 16), rot: new THREE.Euler(0, 0, 0) }, // 1: Agents
  { pos: new THREE.Vector3(0, 2, 18), rot: new THREE.Euler(-0.05, 0, 0) }, // 2: Projects
  { pos: new THREE.Vector3(0, 6, 12), rot: new THREE.Euler(-0.2, 0, 0) }, // 3: Skills & Education (Timeline)
  { pos: new THREE.Vector3(0, 0, 10), rot: new THREE.Euler(0, 0, 0) }, // 4: Contact
];

export default function SceneManager() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetRot = useRef(new THREE.Euler(0, 0, 0));

  useFrame(() => {
    const { scrollProgress, mouse, prefersReducedMotion } =
      usePortfolioStore.getState();

    // Calculate blended camera position based on scroll progress
    const totalProgress = scrollProgress * (CAMERA_STATES.length - 1);
    const fromIndex = Math.min(
      Math.floor(totalProgress),
      CAMERA_STATES.length - 2,
    );
    const toIndex = fromIndex + 1;
    const t = totalProgress - fromIndex;

    // Smoothstep ease
    const easeT = t * t * (3 - 2 * t);

    // Interpolate target position
    targetPos.current.lerpVectors(
      CAMERA_STATES[fromIndex].pos,
      CAMERA_STATES[toIndex].pos,
      easeT,
    );

    // Interpolate target rotation
    targetRot.current.x = THREE.MathUtils.lerp(
      CAMERA_STATES[fromIndex].rot.x,
      CAMERA_STATES[toIndex].rot.x,
      easeT,
    );
    targetRot.current.y = THREE.MathUtils.lerp(
      CAMERA_STATES[fromIndex].rot.y,
      CAMERA_STATES[toIndex].rot.y,
      easeT,
    );

    // Lerp camera toward target
    const lerpSpeed = prefersReducedMotion ? 1 : 0.04;
    camera.position.lerp(targetPos.current, lerpSpeed);
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      targetRot.current.x,
      lerpSpeed,
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      targetRot.current.y,
      lerpSpeed,
    );

    // Subtle mouse parallax
    if (!prefersReducedMotion) {
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        targetPos.current.x + mouse.x * 0.15,
        0.03,
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        targetPos.current.y + mouse.y * 0.1,
        0.03,
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#00E5FF" />
      <pointLight position={[-10, -10, -5]} intensity={0.15} color="#7C3AED" />

      {/* Fog for depth */}
      <fog attach="fog" args={["#0B0F19", 15, 55]} />

      {/* All scenes — visibility controlled internally by scroll progress */}
      <HeroUniverse />
      <AgentWorkflow />
      <ProjectConstellation />
      <SkillsNeuralNetwork />
      <ContactField />
    </group>
  );
}

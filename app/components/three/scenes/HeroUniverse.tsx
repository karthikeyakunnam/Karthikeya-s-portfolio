"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/app/store/usePortfolioStore";

// Generate node positions inside a sphere
function generateNetworkNodes(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.3 + Math.random() * 0.7);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

// Generate connection lines between nearby nodes
function generateConnections(
  positions: Float32Array,
  count: number,
  maxDist: number,
): Float32Array {
  const lines: number[] = [];
  for (let i = 0; i < count && lines.length < 600; i++) {
    for (let j = i + 1; j < count && lines.length < 600; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < maxDist) {
        lines.push(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2],
          positions[j * 3],
          positions[j * 3 + 1],
          positions[j * 3 + 2],
        );
      }
    }
  }
  return new Float32Array(lines);
}

export default function HeroUniverse() {
  const groupRef = useRef<THREE.Group>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const innerIcoRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const connectionsRef = useRef<THREE.LineSegments>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const nodeCount = 150;

  const nodePositions = useMemo(() => generateNetworkNodes(nodeCount, 2.5), []);
  const connectionPositions = useMemo(
    () => generateConnections(nodePositions, nodeCount, 1.2),
    [nodePositions],
  );

  useFrame((state) => {
    const { scrollProgress, mouse, prefersReducedMotion } =
      usePortfolioStore.getState();
    const time = state.clock.elapsedTime;

    // Hero visible from 0 to ~0.2
    const visibility = Math.max(0, 1 - scrollProgress * 6);

    // Background decoration visibility: fades in as we scroll to the Agents Architecture section (active at scrollProgress ~0.16)
    // and fades out as we scroll to Projects (above 0.25)
    const bgFadeIn = THREE.MathUtils.smoothstep(scrollProgress, 0.0, 0.12);
    const bgFadeOut =
      1 - THREE.MathUtils.smoothstep(scrollProgress, 0.25, 0.38);
    const bgVisibility = bgFadeIn * bgFadeOut;

    // Show group if either core hero objects or scrolling background meshes are active
    const groupVisible = visibility > 0.01 || bgVisibility > 0.01;
    if (groupRef.current) {
      groupRef.current.visible = groupVisible;
    }
    if (!groupRef.current?.visible) return;

    // Rotate and set opacity for outer icosphere (large wireframe neural sphere)
    if (icoRef.current) {
      if (!prefersReducedMotion) {
        icoRef.current.rotation.y += 0.001;
        icoRef.current.rotation.x += 0.0005;
        icoRef.current.rotation.y += mouse.x * 0.0003;
        icoRef.current.rotation.x += mouse.y * 0.0002;
      }
      const mat = icoRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = bgVisibility * 0.25;
    }

    // Counter-rotate and set opacity for inner icosphere (purple energy node)
    if (innerIcoRef.current) {
      if (!prefersReducedMotion) {
        innerIcoRef.current.rotation.y -= 0.0015;
        innerIcoRef.current.rotation.z += 0.001;
      }
      const mat = innerIcoRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = visibility * 0.12;
    }

    // Pulsate and set opacity for core
    if (coreRef.current) {
      if (!prefersReducedMotion) {
        const pulse = 1 + Math.sin(time * 2) * 0.15;
        coreRef.current.scale.setScalar(pulse);
      }
      const mat = coreRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = visibility * 0.95;
    }

    // Core glow
    if (coreGlowRef.current) {
      if (!prefersReducedMotion) {
        const pulse = 1 + Math.sin(time * 1.5) * 0.2;
        coreGlowRef.current.scale.setScalar(pulse);
      }
      const mat = coreGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = visibility * 0.08;
    }

    // Rotate and set opacity for nodes
    if (nodesRef.current) {
      if (!prefersReducedMotion) {
        nodesRef.current.rotation.y += 0.0008;
        nodesRef.current.rotation.x += 0.0004;
      }
      const mat = nodesRef.current.material as THREE.PointsMaterial;
      mat.opacity = visibility * 0.8;
    }

    // Rotate and set opacity for connections
    if (connectionsRef.current) {
      if (!prefersReducedMotion) {
        connectionsRef.current.rotation.y += 0.0008;
        connectionsRef.current.rotation.x += 0.0004;
      }
      const mat = connectionsRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = visibility * 0.12;
    }

    // Rotate and set opacity for agent connection rings (orbital rings)
    const rings = [ring1Ref.current, ring2Ref.current, ring3Ref.current];
    rings.forEach((ring, i) => {
      if (ring) {
        if (!prefersReducedMotion) {
          ring.rotation.z += 0.002 * (1 + i * 0.5);
          ring.rotation.x = Math.sin(time * 0.3 + i * 2) * 0.1;
        }
        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = bgVisibility * 0.06;
      }
    });

    // Mouse parallax on entire group
    if (groupRef.current && !prefersReducedMotion) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.05,
        0.02,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.03,
        0.02,
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Icosphere Shell */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[3.2, 2]} />
        <meshBasicMaterial
          color="#00E5FF"
          wireframe
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>

      {/* Inner Icosphere (counter-rotating) */}
      <mesh ref={innerIcoRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color="#7C3AED"
          wireframe
          transparent
          opacity={0.12}
          toneMapped={false}
        />
      </mesh>

      {/* Pulsating AI Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </mesh>

      {/* Core Glow */}
      <mesh ref={coreGlowRef}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.08}
          toneMapped={false}
        />
      </mesh>

      {/* Network Nodes inside the sphere */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#00FFC8"
          transparent
          opacity={0.8}
          sizeAttenuation
          toneMapped={false}
        />
      </points>

      {/* Data Stream Connections */}
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connectionPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.12}
          toneMapped={false}
        />
      </lineSegments>

      {/* Agent Connection Rings */}
      <mesh ref={ring1Ref} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[3.5, 0.008, 8, 128]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.06}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ring2Ref} rotation={[1.2, 0.5, 0]}>
        <torusGeometry args={[3.8, 0.006, 8, 128]} />
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.06}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0.8, 1.3, 0.4]}>
        <torusGeometry args={[4.1, 0.005, 8, 128]} />
        <meshBasicMaterial
          color="#00FFC8"
          transparent
          opacity={0.06}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

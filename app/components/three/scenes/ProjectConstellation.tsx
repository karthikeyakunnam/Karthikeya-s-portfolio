"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/app/store/usePortfolioStore";

const PROJECT_COLORS = ["#00E5FF", "#7C3AED", "#00FFC8"];
const CLUSTER_CENTERS: [number, number, number][] = [
  [-4, 0, 0],
  [0, 0, 1],
  [4, 0, 0],
];

// Generate a cluster of nodes around a center
function generateCluster(
  center: [number, number, number],
  nodeCount: number,
  spread: number
): Float32Array {
  const positions = new Float32Array(nodeCount * 3);
  for (let i = 0; i < nodeCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = spread * (0.3 + Math.random() * 0.7);
    positions[i * 3] = center[0] + r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = center[1] + r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = center[2] + r * Math.cos(phi);
  }
  return positions;
}

function ClusterNetwork({
  center,
  color,
  index,
}: {
  center: [number, number, number];
  color: string;
  index: number;
}) {
  const clusterRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const nodeCount = 7;
  const positions = useMemo(() => generateCluster(center, nodeCount, 1.5), [center]);

  // Generate connection lines within the cluster
  const connectionPositions = useMemo(() => {
    const lines: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.0) {
          lines.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    return new Float32Array(lines);
  }, [positions]);

  useFrame((state) => {
    const { activeProject, prefersReducedMotion } = usePortfolioStore.getState();
    const time = state.clock.elapsedTime;

    if (prefersReducedMotion) return;

    const isActive = activeProject === index;

    // Pulsate core
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 2 + index * 1.5) * 0.2;
      const scale = isActive ? 1.5 * pulse : pulse;
      coreRef.current.scale.setScalar(scale);
      const mat = coreRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = isActive ? 0.9 : 0.7;
    }

    // Slow rotation
    if (clusterRef.current) {
      clusterRef.current.rotation.y += 0.001 + index * 0.0005;
    }
  });

  return (
    <group ref={clusterRef}>
      {/* Central core node */}
      <mesh ref={coreRef} position={center}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} toneMapped={false} />
      </mesh>

      {/* Core glow */}
      <mesh position={center}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.04} toneMapped={false} />
      </mesh>

      {/* Cluster nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={color}
          transparent
          opacity={0.8}
          sizeAttenuation
          toneMapped={false}
        />
      </points>

      {/* Internal connections */}
      {connectionPositions.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[connectionPositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={color} transparent opacity={0.1} toneMapped={false} />
        </lineSegments>
      )}
    </group>
  );
}

// Long-range connection beams between clusters
function InterClusterBeam({
  from,
  to,
  color,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
}) {
  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...from),
      new THREE.Vector3(...to),
    ]);
  }, [from, to]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.06} toneMapped={false} />
    </lineSegments>
  );
}

export default function ProjectConstellation() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const { scrollProgress } = usePortfolioStore.getState();

    // Visible during scene 2 (0.28 - 0.5)
    const fadeIn = THREE.MathUtils.smoothstep(scrollProgress, 0.28, 0.35);
    const fadeOut = 1 - THREE.MathUtils.smoothstep(scrollProgress, 0.45, 0.55);
    const visibility = fadeIn * fadeOut;

    if (groupRef.current) {
      groupRef.current.visible = visibility > 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, 2, -3]}>
      {/* Project Clusters */}
      {CLUSTER_CENTERS.map((center, i) => (
        <ClusterNetwork
          key={i}
          center={center}
          color={PROJECT_COLORS[i]}
          index={i}
        />
      ))}

      {/* Inter-cluster beams */}
      <InterClusterBeam from={CLUSTER_CENTERS[0]} to={CLUSTER_CENTERS[1]} color="#00E5FF" />
      <InterClusterBeam from={CLUSTER_CENTERS[1]} to={CLUSTER_CENTERS[2]} color="#7C3AED" />
      <InterClusterBeam from={CLUSTER_CENTERS[2]} to={CLUSTER_CENTERS[0]} color="#00FFC8" />
    </group>
  );
}

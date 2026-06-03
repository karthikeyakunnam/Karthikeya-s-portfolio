"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/app/store/usePortfolioStore";
import { AGENTS, AGENT_CONNECTIONS } from "@/lib/constants";

// Layout positions for 7 agents in a directed-graph formation
const AGENT_POSITIONS: [number, number, number][] = [
  [0, 2.5, 0], // 0: Planner (top center)
  [-3, 0.8, 0.5], // 1: Research (left)
  [3, 0.8, -0.5], // 2: Retriever (right)
  [0, -0.5, 0], // 3: Critic (center)
  [-2, -2.5, 0.3], // 4: Memory (bottom left)
  [2, -2.5, -0.3], // 5: Execution (bottom right)
  [0, -4.5, 0], // 6: Verifier (bottom center)
];

// Data packet traveling along a connection edge
interface DataPacket {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

export default function AgentWorkflow() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const coreRefs = useRef<(THREE.Mesh | null)[]>([]);
  const packetMeshRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Create connection line geometries
  const connectionGeometries = useMemo(() => {
    return AGENT_CONNECTIONS.map(([from, to]) => {
      const points = [
        new THREE.Vector3(...AGENT_POSITIONS[from]),
        new THREE.Vector3(...AGENT_POSITIONS[to]),
      ];
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, []);

  // Initialize data packets (one per connection)
  const packets = useRef<DataPacket[]>(
    AGENT_CONNECTIONS.map(([from, to], i) => ({
      fromIdx: from,
      toIdx: to,
      progress: (i * 0.15) % 1,
      speed: 0.003 + Math.random() * 0.004,
    })),
  );

  useFrame((state) => {
    const { scrollProgress, hoveredAgent, prefersReducedMotion } =
      usePortfolioStore.getState();
    const time = state.clock.elapsedTime;

    // Visible during scene 1 (approx 0.12 - 0.35)
    const fadeIn = THREE.MathUtils.smoothstep(scrollProgress, 0.1, 0.18);
    const fadeOut = 1 - THREE.MathUtils.smoothstep(scrollProgress, 0.28, 0.38);
    const visibility = fadeIn * fadeOut;

    if (groupRef.current) {
      groupRef.current.visible = visibility > 0.01;
    }
    if (!groupRef.current?.visible) return;

    // Animate agent nodes
    coreRefs.current.forEach((core, i) => {
      if (!core || prefersReducedMotion) return;

      const isHovered = hoveredAgent === i;
      const targetScale = isHovered ? 1.6 : 1;
      const pulse = 1 + Math.sin(time * 2 + i * 0.9) * 0.12;

      core.scale.lerp(
        new THREE.Vector3(
          targetScale * pulse,
          targetScale * pulse,
          targetScale * pulse,
        ),
        0.08,
      );

      // Adjust glow
      const mat = core.material as THREE.MeshBasicMaterial;
      mat.opacity = (isHovered ? 0.95 : 0.8) * visibility;
    });

    // Rotate individual node groups slightly
    nodeRefs.current.forEach((node, i) => {
      if (node && !prefersReducedMotion) {
        node.rotation.y += 0.002 + i * 0.0005;
      }
    });

    // Animate data packets along connections
    if (packetMeshRef.current && !prefersReducedMotion) {
      packets.current.forEach((packet, i) => {
        packet.progress += packet.speed;
        if (packet.progress > 1) packet.progress = 0;

        const from = new THREE.Vector3(...AGENT_POSITIONS[packet.fromIdx]);
        const to = new THREE.Vector3(...AGENT_POSITIONS[packet.toIdx]);

        dummy.position.lerpVectors(from, to, packet.progress);
        dummy.scale.setScalar(0.06);
        dummy.updateMatrix();
        packetMeshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      packetMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1, -4]}>
      {/* Agent Nodes */}
      {AGENTS.map((agent, i) => (
        <group
          key={agent.id}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          position={AGENT_POSITIONS[i]}
        >
          {/* Wireframe shell */}
          <mesh>
            <icosahedronGeometry args={[0.5, 1]} />
            <meshBasicMaterial
              color={agent.color}
              wireframe
              transparent
              opacity={0.15}
              toneMapped={false}
            />
          </mesh>

          {/* Glowing core */}
          <mesh
            ref={(el) => {
              coreRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshBasicMaterial
              color={agent.color}
              transparent
              opacity={0.8}
              toneMapped={false}
            />
          </mesh>

          {/* Outer glow */}
          <mesh>
            <sphereGeometry args={[0.35, 8, 8]} />
            <meshBasicMaterial
              color={agent.color}
              transparent
              opacity={0.04}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* Connection Lines */}
      {connectionGeometries.map((geo, i) => (
        <lineSegments key={i} geometry={geo}>
          <lineBasicMaterial
            color="#00E5FF"
            transparent
            opacity={0.1}
            toneMapped={false}
          />
        </lineSegments>
      ))}

      {/* Data Packets (instanced) */}
      <instancedMesh
        ref={packetMeshRef}
        args={[undefined, undefined, AGENT_CONNECTIONS.length]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

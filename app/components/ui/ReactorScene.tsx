"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AgentNode {
  id: number;
  name: string;
  purpose: string;
  capability: string;
  color: string;
}

export const AGENT_NODES: AgentNode[] = [
  {
    id: 0,
    name: "Planner",
    purpose: "Decomposes complex user requests into sequential execution plans.",
    capability: "Task decomposition, dynamic DAG routing, and error recovery.",
    color: "#00E5FF", // Cyan
  },
  {
    id: 1,
    name: "Research",
    purpose: "Gathers external web information and synthesizes high-quality findings.",
    capability: "Deep web queries, multi-source compilation, and citation tracking.",
    color: "#7C3AED", // Purple
  },
  {
    id: 2,
    name: "Retriever",
    purpose: "Queries vector stores and databases for semantic context retrieval.",
    capability: "Vector embeddings matching, hybrid dense/sparse search, and RAG.",
    color: "#00FFC8", // Green
  },
  {
    id: 3,
    name: "Memory",
    purpose: "Maintains session chat logs and short-term state persistence.",
    capability: "Context summarization, state caching, and SQLite system logging.",
    color: "#7C3AED", // Purple
  },
  {
    id: 4,
    name: "Critic",
    purpose: "Validates output quality, security, and checks for model hallucinations.",
    capability: "LlamaGuard safety filtering, facts verification, and self-correction loops.",
    color: "#00FFC8", // Green
  },
  {
    id: 5,
    name: "Executor",
    purpose: "Executes deterministic code, actions, and API integrations.",
    capability: "Python sandboxed runtimes, Git integrations, and filesystem edits.",
    color: "#00E5FF", // Cyan
  },
];

// Inner 3D scene logic inside Canvas context
function ReactorCore({ onHoverAgent }: { onHoverAgent: (agent: AgentNode | null) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  const packetsRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Spacing out 6 nodes in a circle on X-Z plane with a radius of 1.8
  const nodeRadius = 1.8;
  const nodes = useMemo(() => {
    return AGENT_NODES.map((node, i) => {
      const angle = (i / 6) * Math.PI * 2;
      return {
        ...node,
        angle,
        basePos: new THREE.Vector3(
          Math.cos(angle) * nodeRadius,
          0,
          Math.sin(angle) * nodeRadius
        ),
      };
    });
  }, []);

  // Generate 200 random star particle points for core atmosphere
  const particleCount = 200;
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.0 + Math.random() * 2.5; // distance from core
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x: pointerX, y: pointerY } = state.pointer;

    // 1. Core Pulsing Scale
    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(time * 3) * 0.12;
      coreRef.current.scale.setScalar(pulse);
    }

    // 2. Slow rotation of outer cage
    if (cageRef.current) {
      cageRef.current.rotation.y = -time * 0.15;
      cageRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }

    // 3. Mouse Tilt Parallax + Constant Rotation of Main System
    if (groupRef.current) {
      const targetRotX = -pointerY * 0.2;
      const targetRotY = pointerX * 0.25;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      // Continuous slow background rotation combined with mouse tilt
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY + time * 0.08, 0.05);
    }

    // 4. Animate Data Packets traveling outwards from Core (0,0,0) to Nodes
    if (packetsRef.current) {
      const packetChildren = packetsRef.current.children;
      nodes.forEach((node, i) => {
        const mesh = packetChildren[i] as THREE.Mesh;
        if (mesh) {
          // Flow speed cycle (0 to 1 progress)
          const speed = 0.8;
          const progress = ((time * speed) + (i * 0.15)) % 1.0;
          
          // Hover state: node floats dynamically
          const hoverOffset = hoveredNode === node.id ? Math.sin(time * 4) * 0.1 : 0;
          const nodeY = Math.sin(time * 1.5 + i) * 0.15 + hoverOffset;
          const targetPos = new THREE.Vector3(node.basePos.x, nodeY, node.basePos.z);
          
          // Lerp packet from center to node position
          mesh.position.lerpVectors(new THREE.Vector3(0, 0, 0), targetPos, progress);
          
          // Pulse packet scale
          mesh.scale.setScalar(0.7 + Math.sin(time * 5 + i) * 0.3);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Pulsing Core Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" toneMapped={false} />
      </mesh>

      {/* Core Radial Glow */}
      <mesh>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.06} toneMapped={false} />
      </mesh>

      {/* 2. Outer Rotating Wireframe Cage */}
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#7C3AED"
          wireframe
          transparent
          opacity={0.15}
          toneMapped={false}
        />
      </mesh>

      {/* 3. Floating Star Particles Cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#00FFC8"
          transparent
          opacity={0.6}
          sizeAttenuation
          toneMapped={false}
        />
      </points>

      {/* 4. Connection Beams (Lines linking center to nodes) */}
      <group>
        {nodes.map((node, i) => {
          const isHovered = hoveredNode === node.id;
          return (
            <group key={`line-${node.id}`}>
              {/* Core wire link */}
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    args={[
                      new Float32Array([
                        0, 0, 0,
                        node.basePos.x, 0, node.basePos.z
                      ]),
                      3
                    ]}
                  />
                </bufferGeometry>
                <lineBasicMaterial
                  color={node.color}
                  transparent
                  opacity={isHovered ? 0.7 : 0.12}
                  toneMapped={false}
                  linewidth={isHovered ? 2 : 1}
                />
              </line>
            </group>
          );
        })}
      </group>

      {/* 5. Traveling Data Packets */}
      <group ref={packetsRef}>
        {nodes.map((node) => (
          <mesh key={`packet-${node.id}`}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color="#00FFC8" toneMapped={false} />
          </mesh>
        ))}
      </group>

      {/* 6. Orbiting Interactive Agent Nodes */}
      {nodes.map((node, i) => {
        const isHovered = hoveredNode === node.id;
        
        // Compute dynamic float position
        return (
          <group key={node.id}>
            <NodeMesh
              node={node}
              index={i}
              isHovered={isHovered}
              onHoverChange={(hover) => {
                if (hover) {
                  setHoveredNode(node.id);
                  onHoverAgent(node);
                } else {
                  setHoveredNode(null);
                  onHoverAgent(null);
                }
              }}
            />
          </group>
        );
      })}
    </group>
  );
}

// Sub-component to manage local animations per node
function NodeMesh({
  node,
  index,
  isHovered,
  onHoverChange,
}: {
  node: any;
  index: number;
  isHovered: boolean;
  onHoverChange: (hover: boolean) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Float position oscillation (Y axis)
      const hoverOffset = isHovered ? Math.sin(time * 4) * 0.1 : 0;
      meshRef.current.position.set(
        node.basePos.x,
        Math.sin(time * 1.5 + index) * 0.15 + hoverOffset,
        node.basePos.z
      );

      // Node pulse size
      const pulse = 1.0 + Math.sin(time * 2.5 + index) * 0.08;
      meshRef.current.scale.setScalar(
        (isHovered ? 1.4 : 1.0) * pulse
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHoverChange(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHoverChange(false);
      }}
    >
      <sphereGeometry args={[0.13, 16, 16]} />
      <meshBasicMaterial
        color={isHovered ? "#00FFC8" : node.color}
        toneMapped={false}
        transparent
        opacity={isHovered ? 1.0 : 0.85}
      />
    </mesh>
  );
}

export default function ReactorScene({ onHoverAgent }: { onHoverAgent: (agent: AgentNode | null) => void }) {
  return (
    <div className="w-full h-full min-h-[420px] md:min-h-[500px] relative select-none">
      <Canvas
        camera={{ position: [0, 0.2, 4.4], fov: 48, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ReactorCore onHoverAgent={onHoverAgent} />
      </Canvas>
    </div>
  );
}

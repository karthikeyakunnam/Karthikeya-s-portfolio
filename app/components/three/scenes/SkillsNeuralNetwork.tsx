"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/app/store/usePortfolioStore";
import { KNOWLEDGE_NODES } from "@/lib/constants";

// Fibonacci sphere positions
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    points.push(
      new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * radius,
        Math.sin(phi) * Math.sin(theta) * radius,
        Math.cos(phi) * radius
      )
    );
  }
  return points;
}

export default function SkillsNeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const connectionsRef = useRef<THREE.Group>(null);
  const packetsRef = useRef<THREE.InstancedMesh>(null);

  const nodePositions = useMemo(() => fibonacciSphere(KNOWLEDGE_NODES.length, 4), []);

  // k-nearest connections (k=3)
  const connections = useMemo(() => {
    const conns: [number, number][] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      const distances = nodePositions
        .map((p, j) => ({ j, dist: nodePositions[i].distanceTo(p) }))
        .filter((d) => d.j !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3);

      distances.forEach(({ j }) => {
        const key = Math.min(i, j) * 1000 + Math.max(i, j);
        if (!conns.find((c) => Math.min(c[0], c[1]) * 1000 + Math.max(c[0], c[1]) === key)) {
          conns.push([i, j]);
        }
      });
    }
    return conns;
  }, [nodePositions]);

  const connectionGeometries = useMemo(() => {
    return connections.map(([from, to]) => {
      return new THREE.BufferGeometry().setFromPoints([nodePositions[from], nodePositions[to]]);
    });
  }, [connections, nodePositions]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const { scrollProgress, hoveredSkill, prefersReducedMotion } = usePortfolioStore.getState();
    const time = state.clock.elapsedTime;

    // Visible during scene 3 (0.65 - 0.85)
    const fadeIn = THREE.MathUtils.smoothstep(scrollProgress, 0.65, 0.73);
    const fadeOut = 1 - THREE.MathUtils.smoothstep(scrollProgress, 0.78, 0.85);
    const visibility = fadeIn * fadeOut;

    if (groupRef.current) {
      groupRef.current.visible = visibility > 0.01;
    }
    if (!groupRef.current?.visible) return;

    // Slow rotation
    if (groupRef.current && !prefersReducedMotion) {
      groupRef.current.rotation.y += 0.001;
    }

    // Update instanced node positions
    if (nodesRef.current) {
      for (let i = 0; i < KNOWLEDGE_NODES.length; i++) {
        const pos = nodePositions[i];
        const isHovered = hoveredSkill === i;
        const pulse = prefersReducedMotion ? 1 : 1 + Math.sin(time * 2 + i * 0.5) * 0.1;
        const scale = isHovered ? 0.18 * pulse : 0.12 * pulse;

        dummy.position.copy(pos);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(i, dummy.matrix);

        const color = new THREE.Color(KNOWLEDGE_NODES[i].color);
        nodesRef.current.setColorAt(i, color);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
      if (nodesRef.current.instanceColor) {
        nodesRef.current.instanceColor.needsUpdate = true;
      }
    }

    // Animate data packets
    if (packetsRef.current && !prefersReducedMotion) {
      for (let i = 0; i < connections.length; i++) {
        const [from, to] = connections[i];
        const t = (Math.sin(time * 0.6 + i * 1.2) + 1) / 2;

        dummy.position.lerpVectors(nodePositions[from], nodePositions[to], t);
        dummy.scale.setScalar(0.03);
        dummy.updateMatrix();
        packetsRef.current.setMatrixAt(i, dummy.matrix);
      }
      packetsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 4, -3]}>
      {/* Skill nodes (instanced) */}
      <instancedMesh ref={nodesRef} args={[undefined, undefined, KNOWLEDGE_NODES.length]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial toneMapped={false} transparent opacity={0.9} />
      </instancedMesh>

      {/* Connection lines */}
      <group ref={connectionsRef}>
        {connectionGeometries.map((geo, i) => (
          <lineSegments key={i} geometry={geo}>
            <lineBasicMaterial
              color="#00E5FF"
              transparent
              opacity={0.08}
              toneMapped={false}
            />
          </lineSegments>
        ))}
      </group>

      {/* Data packets (instanced) */}
      <instancedMesh ref={packetsRef} args={[undefined, undefined, connections.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" toneMapped={false} transparent opacity={0.8} />
      </instancedMesh>
    </group>
  );
}

"use client";

/*
  SceneSphere.tsx
  - 3D sphere with distortion material
  - Fully typed, compliant with React 19 + R3F v9
*/

import React, { useRef } from "react";
import { useFrame, ThreeElements } from "@react-three/fiber";
import { Mesh } from "three";
import { MeshDistortMaterial } from "@react-three/drei";

const SceneSphere: React.FC<ThreeElements["mesh"]> = (props) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta: number): void => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.12 * delta;
    meshRef.current.rotation.x += 0.04 * delta;
  });

  return (
    <mesh ref={meshRef} {...props}>
      <sphereGeometry args={[1.6, 128, 128]} />
      <MeshDistortMaterial
        color="#ff4edd"
        emissive="#6f0077"
        emissiveIntensity={0.25}
        distort={0.35}
        speed={1.0}
        roughness={0.85}
        metalness={0.6}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

export default SceneSphere;

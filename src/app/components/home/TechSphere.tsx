"use client";

import { Float } from "@react-three/drei";

const TechSphere = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#ff4edd"
          wireframe
          emissive="#ff4edd"
          emissiveIntensity={0.3}
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

export default TechSphere;

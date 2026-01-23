// BinaryBackground.tsx - Versión corregida
"use client";

import * as THREE from "three";
import { useMemo } from "react";

const BinaryBackground = () => {
  const count = 200;

  // Crear las posiciones usando useMemo
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        {/* <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        /> */}
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00f3ff" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
};

export default BinaryBackground;

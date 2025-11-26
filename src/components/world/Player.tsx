"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Color } from "three";
import { useAuth } from "@/contexts/AuthProvider";

export default function Player({
  position = [0, 1, 0],
  color = "#4F46E5",
}: {
  position?: [number, number, number];
  color?: string;
}) {
  const { user } = useAuth();
  const ref = useRef<any>();

  // Simple idle floating animation
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Capsule shape */}
      <mesh castShadow>
        <capsuleGeometry args={[0.3, 1, 4, 8]} />
        <meshStandardMaterial color={new Color(color)} />
      </mesh>

      {/* Username label */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {user?.email?.split("@")[0] || "Player"}
      </Text>
    </group>
  );
}

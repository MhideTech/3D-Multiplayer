"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import ProtectedRoute from "../ProtectedRoute";

export default function WorldLayout() {
  return (
    <ProtectedRoute>
      <div className="w-screen h-screen bg-black">
        <Canvas shadows camera={{ position: [5, 5, 10], fov: 50 }}>
          {/* 🌤 Beautiful sky environment */}
          <Sky sunPosition={[100, 20, 100]} />

          {/* 💡 Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />

          {/* ⛰ Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial color="#222" />
          </mesh>

          {/* 🧭 Camera Controls */}
          <OrbitControls />
        </Canvas>
      </div>
    </ProtectedRoute>
  );
}

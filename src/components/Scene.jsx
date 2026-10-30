import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import Avatar from './Avatar.jsx';

function LightBeam() {
  return <mesh position={[0, 2.4, -1.7]} rotation={[0, 0, 0]}>
    <coneGeometry args={[2.8, 6.5, 48, 1, true]} />
    <meshBasicMaterial color="#d9d5ff" transparent opacity={0.035} side={2} depthWrite={false} />
  </mesh>;
}

export default function Scene() {
  return <div className="scene-wrap" aria-hidden="true">
    <Canvas camera={{ position: [0, 0.15, 5.4], fov: 36 }} dpr={[1, 1.7]} gl={{ alpha: true, antialias: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.85} />
        <spotLight position={[0, 5, 3]} angle={0.48} penumbra={0.9} intensity={95} color="#e8e4ff" />
        <pointLight position={[-2.2, 0.2, 2]} intensity={18} color="#a45cff" />
        <pointLight position={[2.4, -0.3, 1]} intensity={12} color="#557cff" />
        <LightBeam />
        <Stars radius={36} depth={22} count={1100} factor={2.2} saturation={0} fade speed={0.35} />
        <Sparkles count={85} scale={[7, 5, 3]} size={1.5} speed={0.25} opacity={0.42} color="#c8b5ff" />
        <Float speed={1.25} rotationIntensity={0.035} floatIntensity={0.18}>
          <Avatar />
        </Float>
      </Suspense>
    </Canvas>
  </div>;
}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Eye({ position }) {
  return <group position={position}>
    <mesh><sphereGeometry args={[0.075, 24, 24]} /><meshStandardMaterial color="#fff5e9" /></mesh>
    <mesh position={[0, 0, 0.058]}><sphereGeometry args={[0.039, 20, 20]} /><meshStandardMaterial color="#17131b" /></mesh>
    <mesh position={[-0.012, 0.018, 0.09]}><sphereGeometry args={[0.012, 12, 12]} /><meshBasicMaterial color="white" /></mesh>
  </group>;
}

export default function Avatar() {
  const root = useRef();
  const head = useRef();
  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime;
    if (root.current) {
      root.current.position.y = -0.52 + Math.sin(t * 1.15) * 0.045;
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, pointer.x * 0.22, 0.035);
    }
    if (head.current) {
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -pointer.y * 0.12, 0.04);
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, pointer.x * 0.17, 0.04);
    }
  });
  return <group ref={root}>
    {/* shoulders and hoodie */}
    <mesh position={[0, -0.72, 0]} scale={[0.78, 0.68, 0.48]}>
      <sphereGeometry args={[1, 48, 32]} /><meshStandardMaterial color="#171820" roughness={0.88} />
    </mesh>
    <mesh position={[0, -0.33, 0.04]} scale={[0.29, 0.22, 0.28]}>
      <sphereGeometry args={[1, 32, 24]} /><meshStandardMaterial color="#252633" roughness={0.9} />
    </mesh>
    {/* neck */}
    <mesh position={[0, -0.13, 0]}><cylinderGeometry args={[0.19, 0.22, 0.36, 32]} /><meshStandardMaterial color="#a96f55" /></mesh>
    <group ref={head} position={[0, 0.48, 0]}>
      {/* ears */}
      {[-1, 1].map((side) => <group key={side} position={[side * 0.48, -0.03, 0]}>
        <mesh scale={[0.16, 0.2, 0.11]}><sphereGeometry args={[1, 24, 20]} /><meshStandardMaterial color="#a96b52" /></mesh>
        <mesh position={[0, 0, 0.075]} scale={[0.075, 0.11, 0.04]}><sphereGeometry args={[1, 20, 16]} /><meshStandardMaterial color="#754737" /></mesh>
      </group>)}
      {/* face */}
      <mesh scale={[0.49, 0.62, 0.43]}><sphereGeometry args={[1, 48, 40]} /><meshStandardMaterial color="#bd8062" roughness={0.78} /></mesh>
      {/* cheeks */}
      {[-1, 1].map((s) => <mesh key={s} position={[s * 0.28, -0.19, 0.31]} scale={[0.16, 0.105, 0.075]}><sphereGeometry args={[1, 24, 20]} /><meshStandardMaterial color="#c8896e" /></mesh>)}
      <Eye position={[-0.19, 0.08, 0.382]} /><Eye position={[0.19, 0.08, 0.382]} />
      {/* eyebrows */}
      {[-1, 1].map((s) => <mesh key={s} position={[s * 0.19, 0.205, 0.39]} rotation={[0, 0, -s * 0.08]} scale={[0.15, 0.035, 0.045]}><sphereGeometry args={[1, 24, 16]} /><meshStandardMaterial color="#28202a" /></mesh>)}
      {/* nose */}
      <mesh position={[0, -0.06, 0.43]} scale={[0.09, 0.13, 0.11]}><sphereGeometry args={[1, 24, 20]} /><meshStandardMaterial color="#a96d55" /></mesh>
      {/* smile */}
      <mesh position={[0, -0.29, 0.382]} scale={[0.22, 0.07, 0.035]}><sphereGeometry args={[1, 32, 20]} /><meshStandardMaterial color="#49252a" /></mesh>
      <mesh position={[0, -0.265, 0.414]} scale={[0.17, 0.025, 0.018]}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#fff0e5" /></mesh>
      {/* hair */}
      <mesh position={[0, 0.43, -0.015]} scale={[0.51, 0.26, 0.45]}><sphereGeometry args={[1, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.63]} /><meshStandardMaterial color="#17151c" roughness={0.92} /></mesh>
      {/* cap */}
      <group position={[0, 0.48, 0.015]} rotation={[0.08, 0, -0.06]}>
        <mesh position={[0, 0.03, 0]} scale={[0.51, 0.22, 0.46]}><sphereGeometry args={[1, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.58]} /><meshStandardMaterial color="#b8b4c5" metalness={0.18} roughness={0.55} /></mesh>
        <mesh position={[0, -0.055, 0.31]} rotation={[-0.12, 0, 0]} scale={[0.48, 0.035, 0.2]}><sphereGeometry args={[1, 32, 20]} /><meshStandardMaterial color="#8e8a9e" /></mesh>
        <mesh position={[0, 0.12, -0.05]} scale={[0.2, 0.035, 0.12]}><sphereGeometry args={[1, 24, 16]} /><meshStandardMaterial color="#e3dfec" /></mesh>
      </group>
    </group>
  </group>;
}

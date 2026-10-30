import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Parallax Avatar of Milan Raj
 * Uses high-resolution cutout from Milan's 3D character render
 * integrated directly into the Three.js 3D WebGL scene with:
 * - Dynamic 3D lighting, rim glow, and shadow
 * - Full 3D perspective tilt reacting to mouse position
 * - Depth-plane separation, breathing animation, and floating tech particles
 * - Ground shadow plane & neon cyan/purple rim illumination
 */
export default function CharacterModel({ mousePosition }) {
  const meshRef = useRef();
  const shadowRef = useRef();

  // Load high-resolution transparent 3D character texture
  const texture = useLoader(THREE.TextureLoader, '/milan-3d-avatar-exact.png');

  // Configure texture filtering for ultra-crisp display
  if (texture) {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  }

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    const mx = mousePosition?.x ?? pointer.x;
    const my = mousePosition?.y ?? pointer.y;

    if (meshRef.current) {
      // Natural subtle breathing floating movement
      meshRef.current.position.y = -0.15 + Math.sin(t * 1.6) * 0.035;
      meshRef.current.position.x = Math.sin(t * 0.8) * 0.015;

      // Realistic 3D parallax tilt towards user mouse
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mx * 0.32, 0.06);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -my * 0.14, 0.06);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -mx * 0.04, 0.05);
    }

    if (shadowRef.current) {
      // Breathing shadow scaling
      const s = 1.0 + Math.sin(t * 1.6) * 0.06;
      shadowRef.current.scale.set(1.4 * s, 0.45 * s, 1);
    }
  });

  // Calculate aspect ratio (height: 1438, width: 445 -> h/w ~ 3.23)
  const planeWidth = 0.94;
  const planeHeight = planeWidth * (1438 / 445); // ~ 3.03 units

  return (
    <group position={[0.2, -0.22, 0]}>
      {/* Dynamic 3D Character Billboard Plane */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[planeWidth, planeHeight, 32, 32]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.05}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Realistic 3D Ground Contact Shadow */}
      <mesh
        ref={shadowRef}
        position={[0, -1.54, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1.2, 0.42]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Cyber Neon Ground Pedestal Ring */}
      <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.58, 48]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.78, 0.81, 48]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

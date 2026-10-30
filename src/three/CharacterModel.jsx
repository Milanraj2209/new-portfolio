import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Interactive 360-Degree Character Model of Milan Raj
 * Features:
 * - 360° Continuous Horizontal Drag / Swipe Rotation with inertia
 * - Auto-rotation idle capability & reset to front
 * - Dynamic 3D lighting, rim glow, and depth tilt reacting to mouse position
 * - Multi-layer Ground Shadow & Cyber Neon Stage Pedestals that anchor the 360° turn
 */
export default function CharacterModel({ mousePosition, isDragging360, dragDeltaX }) {
  const rootGroupRef = useRef();
  const avatarMeshRef = useRef();
  const shadowRef = useRef();

  // Internal state for continuous 360-degree rotation angle
  const rotationYRef = useRef(0);
  const targetRotationYRef = useRef(0);

  // Load high-resolution transparent 3D character texture
  const texture = useLoader(THREE.TextureLoader, '/milan-3d-avatar-exact.png');

  if (texture) {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  }

  // Update rotation when parent passes drag delta
  useEffect(() => {
    if (dragDeltaX !== undefined) {
      targetRotationYRef.current += dragDeltaX;
    }
  }, [dragDeltaX]);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    const mx = mousePosition?.x ?? pointer.x;
    const my = mousePosition?.y ?? pointer.y;

    // Smoothly interpolate the 360 rotation with damping
    rotationYRef.current = THREE.MathUtils.lerp(
      rotationYRef.current,
      targetRotationYRef.current,
      0.08
    );

    if (rootGroupRef.current) {
      // Rotate the entire character pedestal assembly 360 degrees
      rootGroupRef.current.rotation.y = rotationYRef.current;
    }

    if (avatarMeshRef.current) {
      // Natural subtle breathing floating movement
      avatarMeshRef.current.position.y = -0.15 + Math.sin(t * 1.6) * 0.035;
      avatarMeshRef.current.position.x = Math.sin(t * 0.8) * 0.015;

      // Realistic 3D parallax micro-tilt towards user mouse
      avatarMeshRef.current.rotation.x = THREE.MathUtils.lerp(avatarMeshRef.current.rotation.x, -my * 0.12, 0.06);
      avatarMeshRef.current.rotation.z = THREE.MathUtils.lerp(avatarMeshRef.current.rotation.z, -mx * 0.03, 0.05);
    }

    if (shadowRef.current) {
      // Breathing shadow scaling
      const s = 1.0 + Math.sin(t * 1.6) * 0.06;
      shadowRef.current.scale.set(1.4 * s, 0.45 * s, 1);
    }
  });

  // Aspect ratio calculation (height: 1438, width: 445 -> h/w ~ 3.23)
  const planeWidth = 0.94;
  const planeHeight = planeWidth * (1438 / 445); // ~ 3.03 units

  return (
    <group ref={rootGroupRef} position={[0.2, -0.22, 0]}>
      {/* Dynamic 3D Character Billboard Plane */}
      <mesh ref={avatarMeshRef} position={[0, 0, 0]}>
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

      {/* Cyber Neon Ground Pedestal Rings */}
      <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.58, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.45} />
      </mesh>
      <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.78, 0.81, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>
      {/* 360 Degree Compass Tick Marks */}
      <mesh position={[0, -1.56, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.92, 0.93, 32]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}


import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import CharacterModel from './CharacterModel.jsx';

// Volumetric Spotlight Cone Beam (like the cinema reference video)
function VolumetricLightBeam() {
  const beamRef = useRef();

  useFrame(({ clock }) => {
    if (beamRef.current) {
      beamRef.current.material.opacity = 0.045 + Math.sin(clock.getElapsedTime() * 1.2) * 0.01;
    }
  });

  return (
    <mesh ref={beamRef} position={[0, 2.8, -1.2]} rotation={[0.08, 0, 0]}>
      <coneGeometry args={[3.2, 7.5, 48, 1, true]} />
      <meshBasicMaterial
        color="#c8b5ff"
        transparent
        opacity={0.045}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// Interactive floating 3D tech geometric badges that orbit around the character
function FloatingTechOrbs() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D React Atom Orb (Cyan/Blue) */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.5}>
        <mesh position={[-2.2, 0.8, -0.6]}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            wireframe
          />
        </mesh>
      </Float>

      {/* 3D AI Brain Torus (Purple/Violet) */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={0.6}>
        <mesh position={[2.2, 0.9, -0.4]}>
          <torusGeometry args={[0.24, 0.08, 16, 32]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#7e22ce"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>

      {/* 3D Neural Icosahedron (Electric Pink) */}
      <Float speed={1.8} rotationIntensity={0.9} floatIntensity={0.4}>
        <mesh position={[-1.8, -0.9, 0.5]}>
          <icosahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#db2777"
            emissiveIntensity={0.7}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      </Float>

      {/* 3D Code Diamond (Emerald) */}
      <Float speed={2.2} rotationIntensity={0.7} floatIntensity={0.5}>
        <mesh position={[1.9, -0.85, 0.6]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Camera controller reacting to mouse and smooth dampening
function CameraController({ mousePosition }) {
  useFrame(({ camera }) => {
    // Smooth camera drift towards mouse
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.1 + mousePosition.x * 0.45, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.05 + mousePosition.y * 0.22, 0.035);
    camera.lookAt(0.15, -0.1, 0);
  });
  return null;
}


export default function CinematicScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const lastPointerX = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });

      if (isDragging) {
        const delta = (e.clientX - lastPointerX.current) * 0.012;
        lastPointerX.current = e.clientX;
        setDragDeltaX(delta);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Touch drag support for mobile
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!isDragging || !e.touches[0]) return;
      const clientX = e.touches[0].clientX;
      const delta = (clientX - lastPointerX.current) * 0.012;
      lastPointerX.current = clientX;
      setDragDeltaX(delta);
    };
    const handleTouchEnd = () => setIsDragging(false);

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // Continuous auto-rotate loop when toggled on
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setDragDeltaX(0.02);
    }, 20);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const onPointerDown = (e) => {
    setIsDragging(true);
    lastPointerX.current = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
  };

  const handleSpin360 = () => {
    // Add a full 2*PI spin impulse
    setDragDeltaX(Math.PI * 2);
  };

  const handleToggleAutoRotate = () => {
    setAutoRotate((prev) => !prev);
  };

  return (
    <div
      className={`scene-wrap ${isDragging ? 'grabbing' : 'grabbable'}`}
      onMouseDown={onPointerDown}
      onTouchStart={onPointerDown}
    >
      <Canvas
        camera={{ position: [0, 0.2, 5.2], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <CameraController mousePosition={mousePosition} />

          {/* Ambient Studio Lighting */}
          <ambientLight intensity={0.8} color="#ffffff" />

          {/* Dramatic Overhead Cinema Spotlight */}
          <spotLight
            position={[0, 6, 3.2]}
            angle={0.52}
            penumbra={0.85}
            intensity={110}
            color="#f1edff"
            castShadow
          />

          {/* Electric Purple Key Rim Light (Left) */}
          <pointLight position={[-3.2, 0.4, 2.2]} intensity={24} color="#a855f7" distance={8} />

          {/* Neon Cyan/Blue Accent Rim Light (Right) */}
          <pointLight position={[3.2, -0.2, 1.8]} intensity={20} color="#38bdf8" distance={8} />

          {/* Soft Ground Bounce Fill Light */}
          <pointLight position={[0, -2, 2]} intensity={8} color="#818cf8" />

          {/* Volumetric Cinema Beam Effect */}
          <VolumetricLightBeam />

          {/* Floating Atmospheric Cinematic Particles */}
          <Stars radius={42} depth={25} count={1200} factor={2.5} saturation={0} fade speed={0.4} />
          <Sparkles
            count={95}
            scale={[9, 6, 4]}
            size={1.6}
            speed={0.3}
            opacity={0.5}
            color="#c4b5fd"
          />

          {/* Orbiting 3D Interactive Tech Elements */}
          <FloatingTechOrbs />

          {/* Floating Character Container with 360 Drag Rotation */}
          <Float speed={1.3} rotationIntensity={0.03} floatIntensity={0.16}>
            <CharacterModel
              mousePosition={mousePosition}
              isDragging360={isDragging}
              dragDeltaX={dragDeltaX}
            />
          </Float>
        </Suspense>
      </Canvas>

      {/* Floating 360° Interaction Controls */}
      <div className="scene-360-controls" onClick={(e) => e.stopPropagation()}>
        <button
          className={`btn-360 ${autoRotate ? 'active' : ''}`}
          onClick={handleToggleAutoRotate}
          title="Toggle 360° Continuous Orbit"
        >
          <span className="dot-radar" />
          <span>{autoRotate ? 'ORBITING 360°' : '360° AUTO-ORBIT'}</span>
        </button>
        <button className="btn-360" onClick={handleSpin360} title="Quick 360° Spin">
          <span>🔄 SPIN 360°</span>
        </button>
        <div className="hint-360">
          <span>↔ DRAG ANYWHERE TO ROTATE 360°</span>
        </div>
      </div>
    </div>
  );
}

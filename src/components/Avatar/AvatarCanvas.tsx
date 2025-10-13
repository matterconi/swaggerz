'use client';
import React, { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { AvatarMan } from './AvatarMan';
import { AvatarGirl } from './AvatarGirl';
import { PerspectiveCamera } from 'three';


interface AvatarCanvasProps {
  avatarType?: 'man' | 'girl';
  animation?: 'idle' | 'victory' | 'dance';
  className?: string;
  enableZoom?: boolean;
  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;
}

export default function AvatarCanvas({
  avatarType = 'man',
  animation = 'idle',
  className = '',
  enableZoom = false,
  minAzimuthAngle = -Math.PI / 2,
  maxAzimuthAngle = Math.PI / 2,
}: AvatarCanvasProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, -0.2, 2.5], fov: 57 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>          
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
          
          {/* Avatar Model */}
          {avatarType === 'man' ? (
            <AvatarMan
              animation={animation}
              position={[0, -1.2, 0]}
              scale={1.2}
            />
          ) : (
            <AvatarGirl
              animation={animation}
              position={[0, -1.2, 0]}
              scale={1.2}
            />
          )}
          
          {/* Contact Shadows */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={3}
          />
          
          {/* Additional Lighting */}
          <hemisphereLight intensity={0.5} groundColor="#000000" />
          <spotLight
            position={[0, 5, 0]}
            angle={0.5}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
          
          {/* Orbit Controls */}
          <OrbitControls
            enableZoom={enableZoom}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={minAzimuthAngle}
            maxAzimuthAngle={maxAzimuthAngle}
            target={[0, -0.3, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
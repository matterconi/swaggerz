'use client';

import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export function AvatarModelSimple(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('/models/avatar/avatar-full.glb');

  useEffect(() => {
    // Debug: log per vedere cosa viene caricato
    console.log('Avatar scene loaded:', scene);

    // Assicura che i materiali siano configurati correttamente
    scene.traverse((child: any) => {
      if (child.isMesh) {
        console.log('Mesh found:', child.name, 'Material:', child.material);

        // Abilita le ombre
        child.castShadow = true;
        child.receiveShadow = true;

        // Assicura che i materiali abbiano le texture corrette
        if (child.material) {
          child.material.needsUpdate = true;

          // Se ha una texture map, forzala ad aggiornarsi
          if (child.material.map) {
            child.material.map.needsUpdate = true;
          }
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload('/models/avatar/avatar-full.glb');

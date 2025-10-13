'use client';

import React, { useRef, useEffect } from 'react';
import { useFBX, useGLTF, useAnimations } from '@react-three/drei';
import { useGraph } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';
import type { Group } from 'three';
import * as THREE from 'three';

type AnimationName = 'idle' | 'victory' | 'dance';

interface AvatarModelProps {
  animation?: AnimationName;
  position?: [number, number, number];
  scale?: number;
}

export function AvatarModel({ animation = 'idle', ...props }: AvatarModelProps) {
  const group = useRef<Group>(null);

  // ✅ Carica il modello GLTF
  const { scene } = useGLTF('/models/avatar/avatar-full.glb');

  // ✅ Clona lo scheletro usando SkeletonUtils (importante!)
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as any;

  // ✅ Carica tutte le animazioni FBX (usando quelle di developer come test)
  const { animations: idleAnimation } = useFBX('/models/developer/idle.fbx');
  const { animations: victoryAnimation } = useFBX('/models/developer/victory.fbx');
  const { animations: danceAnimation } = useFBX('/models/developer/clapping.fbx');

  // ✅ Retarget delle animazioni per rimuovere il prefisso "mixamorig"
  const retargetedAnimations = React.useMemo(() => {
    const retarget = (clip: THREE.AnimationClip, name: string) => {
      const tracks = clip.tracks.map((track) => {
        const newTrack = track.clone();
        // Rimuovi tutti i possibili prefissi Mixamo
        newTrack.name = newTrack.name
          .replace(/^mixamorig:/, '')
          .replace(/^mixamorig/, '')
          .replace(/^mixamorig\./, '');
        return newTrack;
      });
      return new THREE.AnimationClip(name, clip.duration, tracks);
    };

    return [
      retarget(idleAnimation[0], 'idle'),
      retarget(victoryAnimation[0], 'victory'),
      retarget(danceAnimation[0], 'dance'),
    ];
  }, [idleAnimation, victoryAnimation, danceAnimation]);

  // ✅ Usa useAnimations per gestire le animazioni con le clip retargetate
  const { actions } = useAnimations(retargetedAnimations, group);

  // ✅ Cambia animazione quando cambia la prop
  useEffect(() => {
    console.log('🔍 Available actions:', Object.keys(actions));

    if (actions[animation]) {
      console.log(`🎬 Playing animation: ${animation}`);

      // Ferma tutte le altre animazioni
      Object.keys(actions).forEach((key) => {
        if (key !== animation && actions[key]) {
          actions[key]?.fadeOut(0.5);
        }
      });

      actions[animation]?.reset().fadeIn(0.5).play();

      return () => {
        actions[animation]?.fadeOut(0.5);
      };
    } else {
      console.warn(`⚠️ Animation "${animation}" not found in actions`);
    }
  }, [animation, actions]);

  // Log dei nodi disponibili per debug (solo una volta)
  React.useEffect(() => {
    console.log('🔍 Available nodes in Avatar:', Object.keys(nodes));
    console.log('🎨 Available materials in Avatar:', Object.keys(materials));
  }, [nodes, materials]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}

// ✅ Preload tutti gli asset
useGLTF.preload('/models/avatar/avatar-full.glb');
useFBX.preload('/models/developer/idle.fbx');
useFBX.preload('/models/developer/victory.fbx');
useFBX.preload('/models/developer/clapping.fbx');

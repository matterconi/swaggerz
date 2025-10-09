"use client";

import React, { useRef, useEffect, useState } from 'react';
import ShaderText from '@/components/ShaderText';
import CircularDiagram from './CircularDiagram';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '@/constants/shaders';

export default function UnlockDesignsSection() {
  const [shaderDataUrls, setShaderDataUrls] = useState<string[]>(['', '', '']);
  const canvasRefs = [
    useRef<HTMLCanvasElement>(null),
    useRef<HTMLCanvasElement>(null),
    useRef<HTMLCanvasElement>(null)
  ];
  const renderersRef = useRef<THREE.WebGLRenderer[]>([]);
  const materialsRef = useRef<THREE.ShaderMaterial[]>([]);
  const animationRef = useRef<number | null>(null);

  // Setup Three.js shader per tutti i cerchi con offset diversi
  useEffect(() => {
    const scenes: THREE.Scene[] = [];
    const geometries: THREE.PlaneGeometry[] = [];
    const timeOffsets = [0, 1000, 2000]; // Offset diversi per ogni shader

    // Setup per ogni canvas
    canvasRefs.forEach((canvasRef, index) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (renderersRef.current[index]) {
        renderersRef.current[index].dispose();
      }

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        preserveDrawingBuffer: true,
        antialias: true
      });

      renderer.setSize(48, 48);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: timeOffsets[index] }
        },
        transparent: true
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderersRef.current[index] = renderer;
      scenes.push(scene);
      materialsRef.current[index] = material;
      geometries.push(geometry);
    });

    const animate = (time: number): void => {
      const newDataUrls: string[] = [];

      canvasRefs.forEach((canvasRef, index) => {
        const material = materialsRef.current[index];
        const renderer = renderersRef.current[index];
        const scene = scenes[index];
        const canvas = canvasRef.current;

        if (material && renderer && scene && canvas) {
          material.uniforms.uTime.value = time * 0.001 + timeOffsets[index];
          renderer.render(scene, new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1));
          newDataUrls[index] = canvas.toDataURL();
        }
      });

      setShaderDataUrls(newDataUrls);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderersRef.current.forEach(renderer => renderer?.dispose());
      geometries.forEach(geometry => geometry?.dispose());
      materialsRef.current.forEach(material => material?.dispose());
    };
  }, []);

  return (
    <section className="w-full min-h-screen py-20">
      {/* Canvas nascosti per generare gli shader */}
      {canvasRefs.map((ref, index) => (
        <canvas
          key={index}
          ref={ref}
          style={{
            display: 'none',
            position: 'absolute'
          }}
          width={48}
          height={48}
        />
      ))}

      {/* Layout a schermo intero */}
      <div className="relative grid xl:grid-cols-2 gap-12 xl:gap-16 items-center max-w-7xl mx-auto px-4">
        {/* Colonna 1: Header */}
        <div className="xl:order-2">
          <div className="mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Sblocca Design
            </h2>
            <ShaderText fontSize="48px" fontWeight="900">
              Esclusivi
            </ShaderText>
          </div>
          <p className="text-zinc-400 text-lg">
            Possiedi l&apos;NFT, stampa il design. Solo tu puoi indossarlo finché non decidi di rivenderlo.
          </p>
        </div>

        {/* Colonna 2: Diagramma Circolare */}
        <CircularDiagram shaderDataUrls={shaderDataUrls} />
      </div>
    </section>
  );
}
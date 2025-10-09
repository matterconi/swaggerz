"use client";

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '@/constants/shaders';

export default function ShaderCircle() {
  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationRef = useRef<number | null>(null);
  const [shaderDataUrl, setShaderDataUrl] = useState<string>('');

  useEffect(() => {
    const canvas = shaderCanvasRef.current;
    if (!canvas) return;

    if (rendererRef.current) {
      rendererRef.current.dispose();
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
        uTime: { value: 0.0 }
      },
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    rendererRef.current = renderer;
    sceneRef.current = scene;
    materialRef.current = material;

    const animate = (time: number): void => {
      if (!materialRef.current || !rendererRef.current || !sceneRef.current) return;

      materialRef.current.uniforms.uTime.value = time * 0.001;
      rendererRef.current.render(sceneRef.current, camera);

      if (canvas) {
        setShaderDataUrl(canvas.toDataURL());
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (renderer) {
        renderer.dispose();
      }
      if (geometry) {
        geometry.dispose();
      }
      if (material) {
        material.dispose();
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={shaderCanvasRef}
        style={{
          display: 'none',
          position: 'absolute'
        }}
        width={48}
        height={48}
      />
      {shaderDataUrl && (
        <div className="shader-data" data-shader-url={shaderDataUrl} />
      )}
    </>
  );
}

export function useShaderDataUrl() {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const shaderData = document.querySelector('.shader-data');
      if (shaderData) {
        const url = shaderData.getAttribute('data-shader-url');
        if (url) setDataUrl(url);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return dataUrl;
}

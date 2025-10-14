"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders/liquidShader';

interface LiquidVideoShaderProps {
  videoSrc: string;
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

const LiquidVideoShader: React.FC<LiquidVideoShaderProps> = ({
  videoSrc,
  className = "",
  containerRef: externalContainerRef
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const internalContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouseRef = useRef(new THREE.Vector2(-10, -10));
  const animationIdRef = useRef<number | null>(null);

  // Use external container ref if provided, otherwise use internal
  const containerRef = externalContainerRef || internalContainerRef;

  // Main Three.js setup
  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const parentElement = canvas.parentElement;
    if (!parentElement) return;

    let isSetup = false;

    const setupScene = () => {
      if (isSetup) return;
      isSetup = true;

      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      cameraRef.current = camera;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
      });
      renderer.setClearColor(0x000000, 1);
      rendererRef.current = renderer;

      // Video texture
      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBAFormat;

      // Shader material
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uMouse: { value: mouseRef.current },
          uTime: { value: 0 },
          uTexture: { value: videoTexture },
          uResolution: { value: new THREE.Vector2(1, 1) },
        },
        vertexShader,
        fragmentShader,
      });
      materialRef.current = material;

      // Mesh
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Resize
      const handleResize = () => {
        const width = parentElement.clientWidth;
        const height = parentElement.clientHeight;
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        material.uniforms.uResolution.value.set(width, height);
      };
      handleResize();

      // Animation
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        if (material.uniforms.uTime) {
          material.uniforms.uTime.value += 0.016;
        }
        renderer.render(scene, camera);
      };
      animate();

      // Resize observer
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(parentElement);
      window.addEventListener('resize', handleResize);

      // Mouse events
      const container = containerRef.current;
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        mouseRef.current.set(x, y);
      };

      const handleMouseLeave = () => {
        mouseRef.current.set(-10, -10);
      };

      if (container) {
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
      }

      // Set ready immediately after setup
      setIsReady(true);

      // Cleanup
      return () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        resizeObserver.disconnect();
        window.removeEventListener('resize', handleResize);

        if (container) {
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mouseleave', handleMouseLeave);
        }

        geometry.dispose();
        material.dispose();
        renderer.dispose();
        videoTexture.dispose();
      };
    };

    // Setup immediately if video is ready, otherwise wait
    if (video.readyState >= 2) {
      return setupScene();
    }

    const handleCanPlay = () => {
      setupScene();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
    };
  }, [containerRef, videoSrc]);

  const content = (
    <>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute opacity-0 pointer-events-none w-1 h-1"
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        style={{ pointerEvents: 'none' }}
      />
      {!isReady && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-zinc-900 to-black animate-pulse pointer-events-none" />
      )}
    </>
  );

  if (externalContainerRef) {
    return content;
  }

  return (
    <div ref={internalContainerRef} className="absolute inset-0">
      {content}
    </div>
  );
};

export default LiquidVideoShader;

"use client"

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '@/constants/shaders';

interface ShaderTextProps {
  children?: string;
  className?: string;
  fontSize?: string;
  fontWeight?: string | number;
}

interface TextDimensions {
  width: number;
  height: number;
}

const ShaderText: React.FC<ShaderTextProps> = ({ 
  children = "TEST",
  className = "",
  fontSize = "72px",
  fontWeight = "900"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hiddenTextRef = useRef<SVGTextElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [textDimensions, setTextDimensions] = useState<TextDimensions>({ 
    width: 0, 
    height: 0 
  });
  const [isReady, setIsReady] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);

  // Misura le dimensioni del testo nascosto
  const measureText = useCallback(() => {
    if (!hiddenTextRef.current) return;
    
    const bbox = hiddenTextRef.current.getBBox();
    
    // Aggiungi un piccolo buffer per sicurezza
    const buffer = 4;
    const newDimensions = {
      width: Math.ceil(bbox.width + buffer),
      height: Math.ceil(bbox.height + buffer)
    };

    console.log(newDimensions)
    

      setTextDimensions(newDimensions);
      setIsReady(true);
    
  }, []);

  // Misura il testo al mount e quando cambia il contenuto
  useEffect(() => {
    // Usa un piccolo timeout per assicurarsi che il DOM sia pronto
    const timer = setTimeout(() => {
      measureText();
    }, 10);
    
    return () => clearTimeout(timer);
  }, [children, fontSize, fontWeight, measureText]);

  // Setup Three.js
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isReady || textDimensions.width === 0 || textDimensions.height === 0) return;

    // Cleanup precedente
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }

    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas,
      alpha: true,
      preserveDrawingBuffer: true,
      antialias: true 
    });
    
    renderer.setSize(textDimensions.width, textDimensions.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limita per performance
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

    // Salva i riferimenti
    rendererRef.current = renderer;
    sceneRef.current = scene;
    materialRef.current = material;

    const animate = (time: number): void => {
      if (!materialRef.current || !rendererRef.current || !sceneRef.current) return;
      
      materialRef.current.uniforms.uTime.value = time * 0.001;
      rendererRef.current.render(sceneRef.current, camera);
      
      // Converti il canvas in data URL per usarlo come pattern
      if (canvas) {
        setDataUrl(canvas.toDataURL());
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
  }, [textDimensions, isReady]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      measureText();
      
      if (rendererRef.current && textDimensions.width > 0 && textDimensions.height > 0) {
        rendererRef.current.setSize(textDimensions.width, textDimensions.height);
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [measureText, textDimensions]);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Canvas nascosto per generare lo shader */}
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: isReady ? 'none' : 'none', // Sempre nascosto
          position: 'absolute'
        }}
        width={textDimensions.width || 1}
        height={textDimensions.height || 1}
      />
      
      {/* SVG con il testo che usa lo shader come pattern */}
      <svg 
        ref={svgRef}
        width={textDimensions.width || 'auto'} 
        height={textDimensions.height || 'auto'}
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          display: 'block',
          overflow: 'visible' // Permette di vedere il testo anche durante il calcolo
        }}
      >
        <defs>
          <pattern 
            id="shaderPattern" 
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={textDimensions.width || 1} 
            height={textDimensions.height || 1}
          >
            {dataUrl && isReady && (
              <image 
                href={dataUrl} 
                x="0"
                y="0"
                width={textDimensions.width}
                height={textDimensions.height}
                preserveAspectRatio="none"
              />
            )}
          </pattern>
        </defs>
        
        {/* Testo nascosto per il calcolo delle dimensioni */}
        <text
          ref={hiddenTextRef}
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily="Jost, sans-serif"
          fill="transparent"
          stroke="none"
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          {children}
        </text>

        {/* Testo visibile con pattern shader applicato */}
        {isReady && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize}
            fontWeight={fontWeight}
            fontFamily="Jost, sans-serif"
            fill="url(#shaderPattern)"
          >
            {children}
          </text>
        )}
      </svg>
    </div>
  );
};

export default ShaderText;
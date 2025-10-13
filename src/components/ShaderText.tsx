"use client"

import React, { useRef, useEffect, useState, useCallback, useId } from 'react';
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
  const uniqueId = useId();
  const patternId = `shader-pattern-${uniqueId.replace(/:/g, '-')}`;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hiddenTextRef = useRef<SVGTextElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [textDimensions, setTextDimensions] = useState<TextDimensions>({ 
    width: 0, 
    height: 0 
  });
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const animationRef = useRef<number | null>(null);
  
  // Traccia il tempo accumulato e quando è stata messa in pausa
  const accumulatedTimeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  // Misura le dimensioni del testo nascosto
  const measureText = useCallback(() => {
    if (!hiddenTextRef.current) return;
    
    try {
      const bbox = hiddenTextRef.current.getBBox();
      
      if (bbox.width === 0 || bbox.height === 0) {
        console.warn(`[${patternId}] BBox has zero dimensions, retrying...`);
        setTimeout(measureText, 50);
        return;
      }
      
      const buffer = 0;
      const newDimensions = {
        width: Math.ceil(bbox.width + buffer),
        height: Math.ceil(bbox.height + buffer)
      };

      console.log(`[${patternId}] ✅ Dimensions measured:, children: ${children}`, newDimensions);
      
      setTextDimensions(newDimensions);
      setIsReady(true);
    } catch (error) {
      console.error(`[${patternId}] ❌ Error measuring text:`, error);
    }
  }, [children, patternId]);

  // Misura il testo al mount e quando cambia il contenuto
  useEffect(() => {
    setIsReady(false);
    const timer = setTimeout(() => {
      measureText();
    }, 50);
    
    return () => clearTimeout(timer);
  }, [children, fontSize, fontWeight, measureText]);

  // Funzione di animazione con gestione continua del tempo
  const animate = useCallback((time: number): void => {
    if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    
    // Se è la prima volta o stiamo riprendendo dopo una pausa
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = time;
      console.log(`[${patternId}] 🎬 Animation starting/resuming at time: ${time.toFixed(2)}ms`);
    }
    
    // Calcola il delta time dalla ultima frame
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    
    // Accumula solo il tempo quando l'animazione è attiva
    const oldAccumulatedTime = accumulatedTimeRef.current;
    accumulatedTimeRef.current += deltaTime;
    
    // Log ogni 60 frame (circa 1 secondo)
    frameCountRef.current++;
    if (frameCountRef.current % 60 === 0) {
      console.log(`[${patternId}] 🎞️ Frame ${frameCountRef.current} | deltaTime: ${deltaTime.toFixed(2)}ms | accumulatedTime: ${accumulatedTimeRef.current.toFixed(2)}ms | uTime: ${(accumulatedTimeRef.current * 0.001).toFixed(3)}s`);
    }
    
    // Usa il tempo accumulato invece del tempo assoluto
    materialRef.current.uniforms.uTime.value = accumulatedTimeRef.current * 0.001;
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    
    // Converti il canvas in data URL per usarlo come pattern
    try {
      if (canvasRef.current) {
        const newDataUrl = canvasRef.current.toDataURL('image/png');
        setDataUrl(newDataUrl);
      }
    } catch (error) {
      console.error(`[${patternId}] ❌ Error creating data URL:`, error);
    }
    
    // Continua l'animazione solo se visibile
    if (isVisible) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Reset lastTimeRef quando ci fermiamo per evitare salti
      lastTimeRef.current = 0;
      console.log(`[${patternId}] ⏸️ Animation paused at accumulatedTime: ${accumulatedTimeRef.current.toFixed(2)}ms`);
    }
  }, [isVisible, patternId]);

  // Setup Three.js
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isReady || textDimensions.width === 0 || textDimensions.height === 0) return;

    console.log(`[${patternId}] 🔧 Setting up Three.js...`);

    // Cleanup precedente
    if (rendererRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      rendererRef.current.dispose();
      rendererRef.current = null;
      console.log(`[${patternId}] 🧹 Cleaned up previous renderer`);
    }

    // Reset dei timer
    accumulatedTimeRef.current = 0;
    lastTimeRef.current = 0;
    frameCountRef.current = 0;
    console.log(`[${patternId}] 🔄 Reset time counters`);

    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas,
      alpha: true,
      preserveDrawingBuffer: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setSize(textDimensions.width, textDimensions.height);
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

    // Salva i riferimenti
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    materialRef.current = material;
    geometryRef.current = geometry;

    console.log(`[${patternId}] ✅ Three.js setup complete`);

    // Rendering iniziale IMMEDIATO per mostrare lo shader
    material.uniforms.uTime.value = 0.0;
    renderer.render(scene, camera);
    
    try {
      const initialDataUrl = canvas.toDataURL('image/png');
      setDataUrl(initialDataUrl);
      console.log(`[${patternId}] 🖼️ Initial render complete, dataUrl length: ${initialDataUrl.length}`);
    } catch (error) {
      console.error(`[${patternId}] ❌ Error creating initial data URL:`, error);
    }

    // Poi avvia l'animazione
    console.log(`[${patternId}] ▶️ Starting animation loop...`);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      console.log(`[${patternId}] 🛑 Cleanup: stopping animation and disposing resources`);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
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
  }, [textDimensions, isReady, animate, patternId]);

  // Intersection Observer per pausare/riprendere l'animazione
  useEffect(() => {
    if (!containerRef.current) return;

    console.log(`[${patternId}] 👁️ Setting up Intersection Observer...`);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        const nowVisible = entry.isIntersecting;
        
        console.log(`[${patternId}] 👁️ Visibility changed: ${wasVisible ? 'visible' : 'hidden'} → ${nowVisible ? 'visible' : 'hidden'} | intersectionRatio: ${entry.intersectionRatio.toFixed(2)}`);
        
        setIsVisible(nowVisible);
        
        // Se diventa visibile e l'animazione non è attiva, riavviala
        if (nowVisible && !wasVisible && !animationRef.current && rendererRef.current) {
          // Reset lastTimeRef per evitare salti quando riprende
          lastTimeRef.current = 0;
          const pauseDuration = performance.now() - pauseTimeRef.current;
          console.log(`[${patternId}] ▶️ Resuming animation after ${pauseDuration.toFixed(2)}ms pause`);
          animationRef.current = requestAnimationFrame(animate);
        }
        // Se diventa invisibile, ferma l'animazione
        else if (!nowVisible && animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
          // Salva il momento della pausa
          pauseTimeRef.current = performance.now();
          console.log(`[${patternId}] ⏸️ Paused animation | Total frames rendered: ${frameCountRef.current}`);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    observer.observe(containerRef.current);

    return () => {
      console.log(`[${patternId}] 👁️ Disconnecting Intersection Observer`);
      observer.disconnect();
    };
  }, [patternId, animate, isVisible]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      console.log(`[${patternId}] 📐 Window resized, remeasuring...`);
      measureText();
      
      if (rendererRef.current && textDimensions.width > 0 && textDimensions.height > 0) {
        rendererRef.current.setSize(textDimensions.width, textDimensions.height);
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        console.log(`[${patternId}] 📐 Renderer resized to ${textDimensions.width}x${textDimensions.height}`);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [measureText, textDimensions, patternId]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Canvas nascosto per generare lo shader */}
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'none',
          position: 'absolute',
          pointerEvents: 'none'
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
          overflow: 'visible'
        }}
      >
        <defs>
          <pattern 
            id={patternId}
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={textDimensions.width || 1} 
            height={textDimensions.height || 1}
            patternContentUnits="userSpaceOnUse"
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
          style={{ opacity: 0, pointerEvents: 'none', position: 'absolute' }}
        >
          {children}
        </text>

        {/* Testo visibile con pattern shader applicato */}
        {isReady && dataUrl && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize}
            fontWeight={fontWeight}
            fontFamily="Jost, sans-serif"
            fill={`url(#${patternId})`}
            style={{ isolation: 'isolate' }}
          >
            {children}
          </text>
        )}
      </svg>
    </div>
  );
};

export default ShaderText;
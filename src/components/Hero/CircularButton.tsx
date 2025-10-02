import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { vertexShader, darkFragmentShader } from '@/constants/shaders';

interface CircularButtonProps {
  text?: string;
  onClick?: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  isHovered?: boolean;
  setIsHovered?: (hovered: boolean) => void;
}

const CircularButton: React.FC<CircularButtonProps> = ({
  text = "SCOPRI LA GALLERIA",
  onClick,
  buttonRef,
  isHovered = false,
  setIsHovered
}) => {
  const size = 128;
  const center = size / 2;
  const textRadius = 46;

  // Shader background refs
  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationRef = useRef<number | null>(null);
  const [shaderDataUrl, setShaderDataUrl] = useState<string>('');

  // Setup Three.js shader
  useEffect(() => {
    const canvas = shaderCanvasRef.current;
    if (!canvas) return;

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

    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: darkFragmentShader,
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

      // Converti il canvas in data URL
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
  }, [size]);

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Canvas nascosto per generare lo shader */}
      <canvas
        ref={shaderCanvasRef}
        style={{
          display: 'none',
          position: 'absolute'
        }}
        width={size}
        height={size}
      />

      {/* Anello di glow esterno per transizione morbida */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size + 40,
          height: size + 40,
          left: -20,
          top: -20,
          backgroundImage: `radial-gradient(circle,
            rgba(249, 115, 22, 0.3) 0%,
            rgba(239, 68, 68, 0.2) 40%,
            rgba(234, 179, 8, 0.1) 60%,
            transparent 80%
          )`,
          filter: 'blur(12px)',
          opacity: isHovered ? 0.8 : 0.5
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      <motion.button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={() => setIsHovered?.(true)}
        onMouseLeave={() => setIsHovered?.(false)}
        className="absolute group/btn focus:outline-none rounded-full p-0 overflow-hidden cursor-pointer"
        style={{
          width: size,
          height: size,
          left: 0,
          top: 0,
          backgroundImage: shaderDataUrl
            ? `url(${shaderDataUrl})`
            : 'linear-gradient(to bottom right, rgb(239, 68, 68), rgb(249, 115, 22), rgb(234, 179, 8))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: `
            0 0 20px rgba(249, 115, 22, 0.4),
            0 0 40px rgba(239, 68, 68, 0.3),
            0 8px 32px rgba(0, 0, 0, 0.3)
          `
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `
            0 0 30px rgba(249, 115, 22, 0.6),
            0 0 60px rgba(239, 68, 68, 0.4),
            0 12px 48px rgba(0, 0, 0, 0.4)
          `
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
      {/* SVG per il testo rotante */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: 'visible', pointerEvents: 'none' }}
      >
        <defs>
          <path
            id="textCircle"
            d={`
              M ${center}, ${center}
              m -${textRadius}, 0
              a ${textRadius},${textRadius} 0 1,1 ${textRadius * 2},0
              a ${textRadius},${textRadius} 0 1,1 -${textRadius * 2},0
            `}
            fill="none"
          />
        </defs>
        
        <motion.g
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            transformOrigin: `${center}px ${center}px`
          }}
        >
          <text
            className="text-[9px] font-bold tracking-[0.15em] uppercase fill-white"
            style={{ 
              letterSpacing: '0.15em',
              fontWeight: 700
            }}
          >
            <textPath
              href="#textCircle"
              startOffset="0%"
              textAnchor="start"
            >
              {text} • {text} •
            </textPath>
          </text>
        </motion.g>
      </svg>

      {/* Cerchio centrale con freccia statica */}
      <div className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-transparent flex items-center justify-center">
        <ArrowRight className="size-12 text-white font-bold" style={{ rotate: '-45deg' }} />
      </div>
    </motion.button>
    </div>
  );
};

export default CircularButton;
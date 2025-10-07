"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Shirt, ArrowLeftRight, Lock, Unlock } from 'lucide-react';
import ShaderText from '@/components/ShaderText';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '@/constants/shaders';

export default function UnlockDesignsSection() {
  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationRef = useRef<number | null>(null);
  const [shaderDataUrl, setShaderDataUrl] = useState<string>('');

  // Setup Three.js shader per i cerchi
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

    renderer.setSize(48, 48); // Dimensione del cerchio
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

  const steps = [
    {
      icon: Wallet,
      number: "1",
      title: "Acquista NFT",
      description: "Possiedi l'arte digitale esclusiva",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Shirt,
      number: "2",
      title: "Stampa su Capo",
      description: "Trasforma l'NFT in streetwear unico",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: ArrowLeftRight,
      number: "3",
      title: "Rivendi Licenza",
      description: "Trasferisci i diritti di stampa ad altri",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  // Calcolo posizioni simmetriche in cerchio (distribuzione ottimale a 120°)
  const getPosition = (index: any) => {
    // Posizionamento simmetrico: top (0°), bottom-right (120°), bottom-left (240°)
    const angles = [-90, 30, 150]; // Perfettamente simmetrici
    const angleRad = (angles[index] * Math.PI) / 180;
    const radius = 38; // percentuale del container - aumentato per più spazio
    const cardOffsetX = -15; // Offset solo per le card (50% verso sinistra)
    const cardOffsetY = -5

    return {
      x: 50 + radius * Math.cos(angleRad) + cardOffsetX,
      y: 50 + radius * Math.sin(angleRad) + cardOffsetY
    };
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Canvas nascosto per generare lo shader */}
        <canvas
          ref={shaderCanvasRef}
          style={{
            display: 'none',
            position: 'absolute'
          }}
          width={48}
          height={48}
        />

        {/* Container con bordi e gradient */}
        <div className="relative rounded-3xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/50 via-zinc-900/30 to-zinc-950/50 p-8 lg:p-12 backdrop-blur-sm">
          {/* Gradient glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

          {/* Layout Desktop a Due Colonne / Mobile Stack */}
          <div className="relative grid xl:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* Colonna 1 (Desktop: Sinistra, Mobile: Sopra): Header */}
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

          {/* Colonna 2 (Desktop: Destra, Mobile: Sotto): Diagramma Circolare */}
          <div className="relative w-full max-w-xl mx-auto xl:mx-0 aspect-square xl:order-1">

            {/* SVG per il cerchio statico */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Cerchio principale più visibile */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="0.3"
                strokeDasharray="3 3"
              />

              {/* Cerchio interno decorativo */}
              <circle
                cx="50"
                cy="50"
                r="28"
                fill="none"
                stroke="rgba(139, 92, 246, 0.1)"
                strokeWidth="0.2"
              />
            </svg>

            {/* Container con overflow per la scia (stile ExploreButton) */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                clipPath: 'circle(38% at 50% 50%)'
              }}
            >
              {/* Scia luminosa che scorre */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  width: '50%',
                  height: '100%',
                  filter: 'blur(8px)'
                }}
              />
            </div>

            {/* Centro con lucchetto animato */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="relative"
              >
                {/* Glow effect multipli */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-3xl"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, rgba(239, 68, 68, 0.3) 50%, transparent 100%)',
                      'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(234, 179, 8, 0.3) 50%, transparent 100%)',
                      'radial-gradient(circle, rgba(234, 179, 8, 0.4) 0%, rgba(249, 115, 22, 0.3) 50%, transparent 100%)',
                    ],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Secondo layer glow */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-2xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, rgba(239, 68, 68, 0.4) 40%, transparent 70%)'
                  }}
                />

                {/* Container lucchetto */}
                <motion.div
                  className="relative w-32 h-32 rounded-full border-2 flex items-center justify-center shadow-2xl"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(39, 39, 42, 1) 0%, rgba(24, 24, 27, 1) 100%)',
                    borderColor: 'rgba(249, 115, 22, 0.3)',
                    boxShadow: `
                      0 0 30px rgba(249, 115, 22, 0.3),
                      0 0 60px rgba(239, 68, 68, 0.2),
                      inset 0 2px 10px rgba(255, 255, 255, 0.1),
                      inset 0 -2px 10px rgba(0, 0, 0, 0.5)
                    `
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 30px rgba(249, 115, 22, 0.3), 0 0 60px rgba(239, 68, 68, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.1), inset 0 -2px 10px rgba(0, 0, 0, 0.5)',
                      '0 0 40px rgba(239, 68, 68, 0.4), 0 0 80px rgba(249, 115, 22, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.1), inset 0 -2px 10px rgba(0, 0, 0, 0.5)',
                      '0 0 30px rgba(249, 115, 22, 0.3), 0 0 60px rgba(239, 68, 68, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.1), inset 0 -2px 10px rgba(0, 0, 0, 0.5)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Animazione lock/unlock con rotazione 3D */}
                  <motion.div
                    className="relative w-14 h-14"
                    animate={{ rotateY: [0, 180, 180, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      times: [0, 0.4, 0.6, 1],
                      ease: "easeInOut"
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Lock - fronte */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <Lock className="w-14 h-14 text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]" />
                    </div>

                    {/* Unlock - retro */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <Unlock className="w-14 h-14 text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Cards posizionate simmetricamente nel cerchio */}
            {steps.map((step, index) => {
              const position = getPosition(index);

              // Prima card alzata di 100px (circa 50% dell'altezza della card)
              const topOffset = index === 0 ? -50 : 0;

              return (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${position.x}%`,
                    top: `calc(${position.y}% + ${topOffset}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.15,
                    type: "spring"
                  }}
                >
                  {/* Card compatta per il diagramma */}
                  <div className="relative">
                    {/* Linea di connessione verso il centro */}
                    <div className="absolute inset-0 -z-10">
                      <div
                        className="absolute top-1/2 left-1/2 w-[1px] bg-gradient-to-b from-zinc-700 to-transparent"
                        style={{
                          height: '80px',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    </div>

                    <div className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-800 rounded-xl p-5 w-52 hover:border-zinc-600 hover:shadow-lg hover:shadow-purple-500/10 transition-all group">
                      {/* Header compatto */}
                      <div className="flex items-center justify-between mb-4">
                        {/* Numero con cerchio shader e glow esterno */}
                        <div className="relative w-12 h-12">
                          {/* Anello di glow esterno - colori shader (arancione/rosso/giallo) */}
                          <div
                            className="absolute rounded-full pointer-events-none"
                            style={{
                              width: 60,
                              height: 60,
                              left: -6,
                              top: -6,
                              backgroundImage: `radial-gradient(circle,
                                rgba(249, 115, 22, 0.3) 0%,
                                rgba(239, 68, 68, 0.2) 40%,
                                rgba(234, 179, 8, 0.1) 60%,
                                transparent 80%
                              )`,
                              filter: 'blur(8px)',
                              opacity: 0.6
                            }}
                          />

                          {/* Cerchio shader */}
                          <div
                            className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
                            style={{
                              backgroundImage: shaderDataUrl
                                ? `url(${shaderDataUrl})`
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              boxShadow: `
                                0 0 15px rgba(249, 115, 22, 0.4),
                                0 0 30px rgba(239, 68, 68, 0.3),
                                0 4px 20px rgba(0, 0, 0, 0.3)
                              `
                            }}
                          >
                            {/* Numero in bianco sopra */}
                            <span className="relative z-10 text-white font-black text-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                              {step.number}
                            </span>
                          </div>
                        </div>

                        {/* Icona */}
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                          <step.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Titolo e descrizione */}
                      <h3 className="text-white font-bold text-base mb-2">
                        {step.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          </div>
        </div>
      </div>
    </section>
  );
}
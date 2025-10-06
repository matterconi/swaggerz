"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Shirt, ArrowLeftRight, Lock, Unlock } from 'lucide-react';

export default function UnlockDesignsSection() {
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

  // Calcolo posizioni in cerchio perfetto (120 gradi di distanza)
  const getPosition = (index) => {
    const angle = (index * 120) - 90; // Inizia dal top (-90°) e aggiungi 120° per ogni step
    const angleRad = (angle * Math.PI) / 180;
    const radius = 35; // percentuale del container
    
    return {
      x: 50 + radius * Math.cos(angleRad),
      y: 50 + radius * Math.sin(angleRad)
    };
  };

  return (
    <section className="w-full py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sblocca Design Esclusivi
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Possiedi l'NFT, stampa il design. Solo tu puoi indossarlo finché non decidi di rivenderlo.
          </p>
        </div>

        {/* Diagramma Circolare */}
        <div className="relative w-full max-w-3xl mx-auto aspect-square">
          
          {/* SVG per il percorso circolare con frecce */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Cerchio principale */}
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />
            
            {/* Frecce direzionali tra i punti */}
            {[0, 1, 2].map((index) => {
              const start = getPosition(index);
              const end = getPosition((index + 1) % 3);
              const midAngle = ((index * 120) - 90 + 60) * Math.PI / 180;
              const midRadius = 35;
              const midX = 50 + midRadius * Math.cos(midAngle);
              const midY = 50 + midRadius * Math.sin(midAngle);
              
              return (
                <g key={index}>
                  <motion.path
                    d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`}
                    fill="none"
                    stroke="rgba(168, 85, 247, 0.3)"
                    strokeWidth="0.5"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                      duration: 1,
                      delay: 0.5 + index * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                </g>
              );
            })}
            
            {/* Definizione freccia */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 6 3, 0 6"
                  fill="rgba(168, 85, 247, 0.5)"
                />
              </marker>
            </defs>
          </svg>

          {/* Centro con lucchetto animato */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl" />
              
              {/* Container lucchetto */}
              <div className="relative w-24 h-24 bg-zinc-900 rounded-full border border-zinc-700 flex items-center justify-center">
                {/* Animazione lock/unlock */}
                <motion.div
                  animate={{ rotateY: [0, 180, 180, 0] }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.6, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative">
                    <Lock className="w-10 h-10 text-purple-400 absolute" style={{ backfaceVisibility: 'hidden' }} />
                    <Unlock className="w-10 h-10 text-pink-400" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Cards posizionate nel cerchio */}
          {steps.map((step, index) => {
            const position = getPosition(index);
            
            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
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
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-56 hover:border-zinc-700 transition-colors group">
                  {/* Header con icona e numero */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-zinc-500">{step.number}</span>
                      <div className="w-8 h-[2px] bg-zinc-800" />
                    </div>
                  </div>
                  
                  {/* Contenuto */}
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
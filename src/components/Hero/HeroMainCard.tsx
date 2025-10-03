"use client"

import React, { useEffect, useRef, useState } from 'react';
import ShaderText from '@/components/ShaderText';
import { motion } from 'framer-motion';
import CircularGallery from './CircularGallery';
import CircularButton from './CircularButton';
import { Flame } from 'lucide-react';

interface HeroMainCardProps {
  onHover: () => void;
  onLeave: () => void;
}

const HeroMainCard: React.FC<HeroMainCardProps> = ({ onHover, onLeave }) => {
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const [titleFontSize, setTitleFontSize] = useState('5rem');

  // Calcola dinamicamente la dimensione del titolo
  useEffect(() => {
    const calculateFontSize = () => {
      if (!titleContainerRef.current) return;

      const container = titleContainerRef.current;
      const availableWidth = container.clientWidth;

      // "SWAGGERZ" ha 9 caratteri + icona flame (circa 1.5 caratteri)
      // Stima: larghezza carattere ≈ 0.6 × fontSize per font bold
      const charCount = 10.5;
      const charWidthRatio = 0.6;

      // Calcola fontSize ideale con margine del 10%
      const idealFontSize = (availableWidth * 0.9) / (charCount * charWidthRatio);

      // Limiti min/max in px
      const minSize = 40;
      const maxSize = 120;
      const fontSize = Math.max(minSize, Math.min(maxSize, idealFontSize));

      setTitleFontSize(`${fontSize}px`);
    };

    calculateFontSize();

    const resizeObserver = new ResizeObserver(calculateFontSize);
    if (titleContainerRef.current) {
      resizeObserver.observe(titleContainerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <motion.div
      className="group relative md:bg-gradient-to-br md:from-zinc-900 md:via-zinc-900 md:to-black md:rounded-3xl p-6 lg:p-8 md:border md:border-zinc-700/50 overflow-hidden h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ 
        borderColor: 'rgba(251, 146, 60, 0.5)',
        scale: 1.01
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-600/15 via-red-600/10 to-pink-600/15"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-orange-500/25 via-red-500/15 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-600/25 via-pink-500/15 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Center accent glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-yellow-400/10 via-orange-500/12 to-red-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative h-full flex flex-col mx-auto">
        {/* Header Section */}
        <div className="mb-4">
          {/* Title with ShaderText preserved */}
          <motion.div
            ref={titleContainerRef}
            className="space-y-2 md:space-y-4 mb-3 md:my-8 flex flex-col justify-center items-center max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ShaderText
                className="block leading-none"
                fontSize={titleFontSize}
                fontWeight="900"
              >
                SWAGGERZ 🔥
              </ShaderText>
            </motion.div>

          {/* Gallery Preview - visible only on mobile (up to md), above subtitle */}
          <div className='w-full flex justify-center my-6 md:hidden'>
            <div className="h-[140px] max-w-[600px] w-full">
              <CircularGallery />
            </div>
          </div>

          <div className='w-full flex justify-center'>
            <div className="flex flex-row justify-start lg:justify-between items-center pt-4 gap-4 md:gap-8 w-full max-w-[600px] px-4">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-zinc-100 text-2xl lg:text-3xl font-bold leading-tight max-w-xl">
                  Dove l&apos;arte digitale
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
                    diventa streetwear
                  </span>
                </h2>
                <p className="text-zinc-400 text-sm lg:text-base mt-3 max-w-lg">
                  NFT che indossi, non solo che possiedi
                </p>
              </motion.div>

              {/* Circular Button - always visible */}
              <motion.div 
                className="flex shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <CircularButton />
              </motion.div>
            </div>
          </div>
          </motion.div>
        </div>

        {/* Gallery Preview - visible only on desktop, at the bottom */}
        <div className='w-full justify-center hidden md:flex flex-1 items-center'>
          <motion.div 
            className="h-[200px] max-w-[600px] w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <CircularGallery />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroMainCard;
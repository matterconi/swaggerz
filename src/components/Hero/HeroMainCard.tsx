"use client"

import React, { useEffect, useRef, useState } from 'react';
import ShaderText from '@/components/ShaderText';
import { motion } from 'framer-motion';
import CircularGallery from './CircularGallery';
import CircularButton from './CircularButton'

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

      // "SWAGGERZ" ha 9 caratteri
      // Stima: larghezza carattere ≈ 0.6 × fontSize per font bold
      const charCount = 9;
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
      className="group relative md:bg-gradient-to-br md:from-zinc-900 md:to-zinc-950 md:rounded-3xl p-6 lg:p-8 md:border md:border-zinc-800/50 overflow-hidden h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ borderColor: 'rgba(113, 113, 122, 0.5)' }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Animated background elements */}
      <motion.div 
        className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
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
            <ShaderText
              className="block leading-none"
              fontSize={titleFontSize}
              fontWeight="900"
            >
              SWAGGERZ
            </ShaderText>

          {/* Gallery Preview - visible only on mobile (up to md), above subtitle */}
          <div className='w-full flex justify-center my-6 md:hidden'>
            <div className="h-[140px] max-w-[600px] w-full">
              <CircularGallery />
            </div>
          </div>

          <div className='w-full flex justify-center'>
            <div className="flex flex-row justify-start lg:justify-between items-center pt-4 gap-4 md:gap-8 w-full max-w-[600px] px-4">
              <div className="relative">
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
              </div>

              {/* Circular Button - always visible */}
              <div className="flex shrink-0">
                <CircularButton />
              </div>
            </div>
          </div>
          </motion.div>
        </div>

        {/* Gallery Preview - visible only on desktop, at the bottom */}
        <div className='w-full justify-center hidden md:flex flex-1 items-center'>
          <div className="h-[200px] max-w-[600px] w-full">
            <CircularGallery />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroMainCard;
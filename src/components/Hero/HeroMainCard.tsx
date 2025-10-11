"use client"

import React, { useEffect, useRef, useState } from 'react';
import ShaderText from '@/components/ShaderText';
import { motion } from 'framer-motion';
import CircularGallery from './CircularGallery';
import RectangularButton from './RectangularButton';
import { Flame } from 'lucide-react';

interface HeroMainCardProps {
  onHover: () => void;
  onLeave: () => void;
}

const HeroMainCard: React.FC<HeroMainCardProps> = ({ onHover, onLeave }) => {
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const [titleFontSize, setTitleFontSize] = useState('2rem');

  // Calcola dinamicamente la dimensione del titolo
  useEffect(() => {
    const calculateFontSize = () => {
      if (!titleContainerRef.current) return;

      const container = titleContainerRef.current;
      const availableWidth = container.clientWidth;

      // "Colleziona." è la parola più lunga (11 caratteri + punto)
      // Stima: larghezza carattere ≈ 0.6 × fontSize per font bold
      const charCount = 12;
      const charWidthRatio = 0.6;

      // Calcola fontSize ideale con margine del 10%
      const idealFontSize = (availableWidth * 0.9) / (charCount * charWidthRatio);

      // Limiti min/max in px
      const minSize = 40;
      const maxSize = 50;
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
      className="group relative p-8 lg:p-10 overflow-hidden"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{
        scale: 1.01
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Layout responsive: colonna singola su mobile, due colonne su desktop */}
      <div className="relative h-full flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">

        {/* Left Column - Text Content */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Title with ShaderText preserved */}
          <motion.div
            ref={titleContainerRef}
            className="flex flex-col justify-center items-center lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Main Title - "Colleziona. Stampa." normale, "Indossa." con ShaderText */}
            <div className="text-center lg:text-left font-jost">
              <div
                className="text-zinc-100 leading-none"
                style={{ fontSize: titleFontSize, fontWeight: 900 }}
              >
                Colleziona. Stampa.
              </div>
              <ShaderText
                className="block leading-none"
                fontSize={titleFontSize}
                fontWeight="900"
              >
                Indossa.
              </ShaderText>
            </div>

            {/* Brand Description */}
            <motion.p
              className="text-zinc-300 text-base md:text-lg text-center lg:text-left max-w-md mt-4 lg:mt-6 px-4 lg:px-0 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Trasforma le tue NFT in prodotti fisici unici. Design esclusivi, stampa on-demand, stile senza limiti.
            </motion.p>
          </motion.div>

          {/* Rectangular Button */}
          <div className='flex justify-center lg:justify-start mt-6 lg:mt-8'>
            <RectangularButton />
          </div>
        </div>

        {/* Right Column - Gallery */}
        <div className="flex-1 flex items-center justify-center">
          {/* Gallery Preview - mobile */}
          <div className='w-full flex justify-center lg:hidden'>
            <div className="h-[140px] max-w-[600px] w-full">
              <CircularGallery />
            </div>
          </div>

          {/* Gallery Preview - desktop (lg+) */}
          <motion.div
            className="h-[280px] w-full hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
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
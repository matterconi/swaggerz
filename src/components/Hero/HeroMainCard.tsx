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
      className="group relative p-6 lg:p-8 overflow-hidden h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{
        scale: 1.01
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >

      <div className="relative h-full flex flex-col mx-auto">
        {/* Header Section */}
        <div className="mb-4">
          {/* Title with ShaderText preserved */}
          <motion.div
            ref={titleContainerRef}
            className=" md:my-4 flex flex-col justify-center items-center max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Main Title - "Colleziona. Stampa." normale, "Indossa." con ShaderText */}
            <div className="text-center font-jost">
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
              className="text-zinc-300 text-base md:text-lg text-center max-w-md px-4 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Trasforma le tue NFT in prodotti fisici unici. Design esclusivi, stampa on-demand, stile senza limiti.
            </motion.p>

          </motion.div>
        </div>

        {/* Gallery Preview + Button Section */}
        <div className='w-full flex flex-col items-center gap-8 md:gap-10 flex-1 justify-center mt-6 md:mt-8'>
          {/* Rectangular Button - sopra gallery fino a lg, sotto su schermi grandi */}
          <div className='flex shrink-0 order-1 lg:order-2'>
            <RectangularButton />
          </div>

          {/* Gallery Preview - mobile/tablet */}
          <div className='w-full flex justify-center lg:hidden order-2 lg:order-1'>
            <div className="h-[140px] max-w-[600px] w-full">
              <CircularGallery />
            </div>
          </div>

          {/* Gallery Preview - desktop (lg+) */}
          <motion.div
            className="h-[200px] max-w-[600px] w-full hidden lg:block order-2 lg:order-1"
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
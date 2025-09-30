"use client"

import React from 'react';
import { Sparkles, Eye, ArrowRight } from 'lucide-react';
import ShaderText from '@/components/ShaderText';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import CardStack from './CardStack';
import ArrowCTA from './ArrowCTA'

interface HeroMainCardProps {
  onHover: () => void;
  onLeave: () => void;
}

const HeroMainCard: React.FC<HeroMainCardProps> = ({ onHover, onLeave }) => {
  const artPreviews = [
    { id: 1, image: '/DigitalArtDrop.webp', title: 'Digital Art Collection' },
    { id: 2, image: '/VintageDrop.webp', title: 'Vintage Series' },
    { id: 3, image: '/trending-1.png', title: 'Abstract Works' },
    { id: 4, image: '/DigitalArtDrop.webp', title: 'Digital Art Collection' },
    { id: 5, image: '/VintageDrop.webp', title: 'Vintage Series' },
    { id: 6, image: '/trending-1.png', title: 'Abstract Works' }
  ];

  const [isButtonHovered, setIsButtonHovered] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Magnetic effect with Framer Motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const buttonX = useSpring(mouseX, springConfig);
  const buttonY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || isButtonHovered) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < 120 && distance > 50) {
      const strength = 0.15;
      mouseX.set(distanceX * strength);
      mouseY.set(distanceY * strength);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 lg:p-8 border border-zinc-800/50 md:col-span-2 md:row-span-3 overflow-hidden"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
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

      <div className="relative h-full flex flex-col">
        {/* Header Section */}
        <div className="mb-8">
          <motion.div 
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
            </motion.div>
            <span className="text-zinc-400 tracking-[0.2em] uppercase text-xs font-medium">NFT × Streetwear</span>
          </motion.div>

          {/* Title with ShaderText preserved */}
          <motion.div 
            className="space-y-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ShaderText
              className="block leading-none"
              fontSize="clamp(2.8rem, 6vw, 4.5rem)"
              fontWeight="900"
            >
              SWAGGERZ
            </ShaderText>

            <div className="relative">
              <h2 className="text-zinc-100 text-2xl lg:text-3xl font-bold leading-tight max-w-xl">
                Dove l'arte digitale
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
                  diventa streetwear
                </span>
              </h2>
              <p className="text-zinc-400 text-sm lg:text-base mt-3 max-w-lg">
                NFT che indossi, non solo che possiedi
              </p>
            </div>
          </motion.div>
        </div>

        {/* Floating Gallery Preview with CTA */}
<div className="flex-1 mb-8 flex flex-col">
  <div className="relative flex-1 flex flex-col">
    <div className="flex flex-1 items-center justify-between gap-8 ">
      {/* Gallery Cards */}
      <div className="flex-1 min-h-0 h-full">
        <CardStack 
          cards={artPreviews}
          showMoreCard={true}
          moreCount={100}
        />
      </div>

      {/* Arrow CTA */}
      <div className="flex-shrink-0">
        <ArrowCTA />
      </div>
    </div>
  </div>
</div>
      </div>
    </motion.div>
  );
};

export default HeroMainCard;
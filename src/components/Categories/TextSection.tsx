// components/Categories/FixedTextSection.tsx
"use client"

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { VideoDataItem } from '@/types/video.types';
import { ExploreButton } from './ExploreButton';
import ShaderText from '@/components/ShaderText';
import { ArrowRight, Sparkles, Package, Users, Star, TrendingUp, Palette, Clock } from 'lucide-react';

interface FixedTextSectionProps {
  item: VideoDataItem;
  index: number;
  isActive: boolean;
}

import type { Variants } from 'framer-motion';

// Animazione principale del container - VELOCIZZATA
const textVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.08,
      delayChildren: 0
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.03,
      staggerDirection: -1
    }
  }
};

// Variante per elementi più sottili - VELOCIZZATA
const subtleRevealVariants: Variants = {
  hidden: {
    y: 40,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Variante per i badge/stats
const statsVariants: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

export const FixedTextSection: React.FC<FixedTextSectionProps> = ({
  item,
  index,
  isActive
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.1
  });
  
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [hasBeenActivated, setHasBeenActivated] = useState(false);
  
  useEffect(() => {
    if (!isActive) {
      setShouldAnimate(false);
      return;
    }

    if (index === 0) {
      if (!hasBeenActivated && isInView) {
        setShouldAnimate(true);
        setHasBeenActivated(true);
      } else if (hasBeenActivated) {
        setShouldAnimate(true);
      }
    } else {
      setShouldAnimate(true);
    }
  }, [isActive, isInView, index, hasBeenActivated]);

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          ref={containerRef}
          key={`slide-${index}-${item.title}`}
          variants={textVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          exit="exit"
          className="absolute inset-0 flex items-center px-6 lg:px-12 pt-24 pb-12"
        >
          <div className="max-w-3xl w-full">
            {/* Badge categoria */}
            <motion.div variants={subtleRevealVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm rounded-full border border-zinc-700/50">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
                  {item.badge}
                </span>
              </div>
            </motion.div>
            
            {/* Titolo principale con shader text */}
            <motion.div variants={subtleRevealVariants} className="mb-6">
              <ShaderText
                className="block"
                fontSize="clamp(2.5rem, 6vw, 4.5rem)"
                fontWeight="800"
              >
                {item.title}
              </ShaderText>
            </motion.div>
            
            {/* Descrizione principale */}
            <motion.div
              variants={subtleRevealVariants}
              className="mb-8"
            >
              <p className="text-xl lg:text-2xl text-zinc-200 leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
            
            {/* Stats Grid - Info quantitative */}
            <motion.div 
              variants={subtleRevealVariants} 
              className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
            >
              {item.stats.map((stat, idx) => {
                // Funzione helper per renderizzare l'icona corretta
                const renderIcon = () => {
                  const iconClass = `w-5 h-5 text-${stat.iconColor}-500`;
                  switch(stat.iconType) {
                    case 'package':
                      return <Package className={iconClass} />;
                    case 'users':
                      return <Users className={iconClass} />;
                    case 'star':
                      return <Star className={iconClass} />;
                    case 'trending':
                      return <TrendingUp className={iconClass} />;
                    case 'palette':
                      return <Palette className={iconClass} />;
                    case 'clock':
                      return <Clock className={iconClass} />;
                    default:
                      return <Package className={iconClass} />;
                  }
                };

                return (
                  <motion.div
                    key={idx}
                    variants={statsVariants}
                    className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 border border-zinc-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-lg">
                        {renderIcon()}
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {stat.value}
                        </p>
                        <p className="text-xs text-zinc-400 uppercase tracking-wide">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Highlight Features */}
            <motion.div variants={subtleRevealVariants} className="mb-10">
              <div className="flex flex-wrap gap-3">
                {item.highlights.map((highlight, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 bg-zinc-800/50 backdrop-blur-sm rounded-full text-sm text-zinc-300 border border-zinc-700/50"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </motion.div>
            
            {/* CTA Section con info aggiuntive */}
            <motion.div variants={subtleRevealVariants} className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span>Spedizione gratuita disponibile</span>
                </div>
                {item.hasNewArrivals && (
                  <>
                    <div className="w-px h-4 bg-zinc-700" />
                    <span className="text-yellow-500 font-medium">Nuovi arrivi</span>
                  </>
                )}
              </div>
              
              <ExploreButton title={item.title} />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const scrollConfig = {
  snapConfig: {
    scrollDuration: {
      mobile: 800,
      tablet: 600,
      desktop: 400
    },
    threshold: {
      mobile: 100,
      tablet: 75,
      desktop: 50
    }
  },
  navbarHeight: 80,
  bannerHeight: 128,
  totalOffset: 208,
};
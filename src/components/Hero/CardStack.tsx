"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

interface Card {
  id: number;
  image: string;
  title: string;
}

interface CircularGalleryProps {
  cards?: Card[];
}

// Carte di esempio per testare l'effetto
const defaultCards: Card[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', title: 'Mountain Vista' },
  { id: 2, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', title: 'Forest Path' },
  { id: 3, image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449', title: 'Ocean Waves' },
  { id: 4, image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', title: 'Sunset Sky' },
  { id: 5, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', title: 'Wild Nature' },
  { id: 6, image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', title: 'Desert Dunes' },
  { id: 7, image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f', title: 'Glacier Lake' },
  { id: 8, image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1', title: 'Canyon View' },
];

const CircularGallery: React.FC<CircularGalleryProps> = ({ cards = defaultCards }) => {
  const quantity = cards.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [rotation, setRotation] = useState(0);
  
  const motionRotation = useMotionValue(0);
  const springRotation = useSpring(motionRotation, {
    stiffness: 100,
    damping: 30
  });

  // Auto-rotazione
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev - 0.5);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Sincronizza motion value con state
  useEffect(() => {
    motionRotation.set(rotation);
  }, [rotation, motionRotation]);
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const calculateOptimalParameters = useCallback(() => {
    if (dimensions.width === 0 || dimensions.height === 0) {
      return { radius: 300, cardWidth: 140, cardHeight: 200, perspective: 1200 };
    }

    const baseCardWidth = Math.min(dimensions.width * 0.12, 160);
    const cardWidth = Math.max(100, baseCardWidth);
    const cardHeight = cardWidth * 1.43;
    
    const safeMargin = cardWidth * 2;
    const maxRadiusX = (dimensions.width / 2) - safeMargin;
    const maxRadiusY = (dimensions.height / 2) - (cardHeight / 2) - 60;
    
    let optimalRadius = Math.min(maxRadiusX, maxRadiusY * 0.9);
    
    const minRadiusForCards = (quantity * cardWidth) / (2 * Math.PI) * 1.5;
    optimalRadius = Math.max(optimalRadius, minRadiusForCards);
    
    const perspective = Math.max(1000, optimalRadius * 2.5);
    
    return {
      radius: optimalRadius,
      cardWidth,
      cardHeight,
      perspective
    };
  }, [dimensions.width, dimensions.height, quantity]);

  const { radius, cardWidth, cardHeight, perspective } = useMemo(
    () => calculateOptimalParameters(),
    [calculateOptimalParameters]
  );

  // Calcola quali immagini sono visibili (davanti)
  const getVisibleCards = useCallback(() => {
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    return cards.map((_, index) => {
      const cardAngle = (index * 360) / quantity;
      const relativeAngle = ((cardAngle - normalizedRotation) % 360 + 360) % 360;
      // Le carte tra -90 e 90 gradi sono visibili
      return relativeAngle < 90 || relativeAngle > 270;
    });
  }, [rotation, cards, quantity]);

  const visibleCards = useMemo(() => getVisibleCards(), [getVisibleCards]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: '50% 50%'
        }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            rotateY: springRotation
          }}
        >
          {cards.map((item, index) => {
            const angle = (index * 2 * Math.PI) / quantity;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;
            const cardRotation = (index * 360) / quantity;
            const isVisible = visibleCards[index];

            return (
              <div
                key={item.id}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${cardRotation}deg)`,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={`${Math.round(cardWidth)}px`}
                    quality={85}
                    loading={isVisible ? 'eager' : 'lazy'}
                    className="object-cover"
                    style={{
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent pointer-events-none z-10" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default CircularGallery;
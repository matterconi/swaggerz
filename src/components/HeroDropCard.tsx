"use client"

import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRandomDirections } from "@/hooks/useRandomDirections"

interface Collection {
  id: number;
  name: string;
  image: string;
  badge: string;
  description: string;
  price: string;
  category: string;
}

interface HeroDropCardProps {
  currentCollection: number;
  collections: Collection[];
  onCollectionChange: (index: number) => void;
}

const HeroDropCard: React.FC<HeroDropCardProps> = ({
  currentCollection,
  collections,
  onCollectionChange
}) => {
  const { getTransitionConfigs } = useRandomDirections();
  const previousIndexRef = useRef<number | null>(null);
  const [forcedDirection, setForcedDirection] = useState<'left' | 'right' | 'top' | 'bottom' | undefined>(undefined);
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Ottieni le configurazioni per la transizione corrente
  const configs = getTransitionConfigs(currentCollection, previousIndexRef.current, forcedDirection);

  // Reset forced direction dopo l'uso
  useEffect(() => {
    if (forcedDirection) {
      setForcedDirection(undefined);
    }
  }, [currentCollection, forcedDirection]);

  // Aggiorna l'indice precedente dopo il cambio
  useEffect(() => {
    if (!isFirstRender) {
      previousIndexRef.current = currentCollection;
    } else {
      setIsFirstRender(false);
    }
  }, [currentCollection, isFirstRender]);

  // Gestione click sui pulsanti con direzione basata sulla posizione
  const handleDotClick = (index: number) => {
    if (index === currentCollection) return;
    
    // Determina la direzione basata sulla posizione relativa
    if (index < currentCollection) {
      // Navigazione verso sinistra
      setForcedDirection('right'); // Carta esce a destra
    } else {
      // Navigazione verso destra
      setForcedDirection('left'); // Carta esce a sinistra
    }
    
    onCollectionChange(index);
  };

  return (
    <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto max-sm:w-[80vw]">
      <motion.div 
        className="relative aspect-[4/5] group max-h-[50vh]"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Crosshair unificato - Con animazione */}
        <motion.div 
          className="absolute -inset-3 z-30 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative w-full h-full">
            {/* Angoli crosshair con stagger animation */}
            {[
              { position: "top-0 left-0", corners: "border-l-3 border-t-3 rounded-tl-lg", delay: 0 },
              { position: "top-0 right-0", corners: "border-r-3 border-t-3 rounded-tr-lg", delay: 0.1 },
              { position: "bottom-0 left-0", corners: "border-l-3 border-b-3 rounded-bl-lg", delay: 0.3 },
              { position: "bottom-0 right-0", corners: "border-r-3 border-b-3 rounded-br-lg", delay: 0.2 }
            ].map((corner, index) => (
              <motion.div
                key={index}
                className={`absolute ${corner.position} w-6 h-6 ${corner.corners} border-red-500`}
                style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.8))' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: corner.delay + 0.4, 
                  ease: [0.23, 1, 0.320, 1] 
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Contenitore immagine con animazioni avanzate */}
        <motion.div 
          className="relative w-full h-full rounded-3xl shadow-2xl shadow-black/50 z-20 overflow-hidden max-h-[50vh]"
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
            y: -5 
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Collection Images Carousel con direzioni randomiche corrette */}
          <div className="relative w-full h-full">
            <AnimatePresence mode="sync">
              {collections.map((collection, index) => {
                if (index !== currentCollection) return null;
                
                return (
                  <motion.div
                    key={`image-${collection.id}`}
                    className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden max-h-[50vh]"
                    initial={isFirstRender && index === 0 ? false : { 
                      x: configs.enter.initial.x,
                      y: configs.enter.initial.y,
                      scale: 1.05,
                      filter: "blur(4px)"
                    }}
                    animate={{ 
                      x: configs.enter.animate.x,
                      y: configs.enter.animate.y,
                      scale: 1,
                      filter: "blur(0px)"
                    }}
                    exit={{ 
                      x: configs.exit.exit.x,
                      y: configs.exit.exit.y,
                      scale: 0.98,
                      filter: "blur(6px)"
                    }}
                    transition={{ 
                      duration: 0.7, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      scale: { duration: 0.5 }
                    }}
                  >
                    {/* Layer immagine con effetto parallasse */}
                    <motion.div
                      className="relative w-full h-full"
                      initial={isFirstRender && index === 0 ? false : { 
                        x: configs.enter.parallax.initial.x,
                        y: configs.enter.parallax.initial.y
                      }}
                      animate={{ 
                        x: configs.enter.parallax.animate.x,
                        y: configs.enter.parallax.animate.y
                      }}
                      exit={{ 
                        x: configs.exit.parallax.exit.x,
                        y: configs.exit.parallax.exit.y
                      }}
                      transition={{ 
                        duration: 0.9, 
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.4 }
                      }}
                    >
                      <Image
                        src={collection.image}
                        alt={`${collection.name} - Swaggerz Collection`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 600px"
                        priority={index === currentCollection}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Enhanced gradient overlay con animazione */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Dynamic glow effect animato - VELOCIZZATO */}
          <AnimatePresence>
            <motion.div 
              key={`glow-${currentCollection}`}
              className={`absolute inset-0 opacity-40 ${
                currentCollection === 0 ? 'bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10' :
                currentCollection === 1 ? 'bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10' :
                'bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/10'
              }`}
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </AnimatePresence>

          {/* Subtle texture overlay */}
          <motion.div 
            className="absolute inset-0 bg-black/10 mix-blend-multiply"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Collection Info Overlay - ANIMAZIONI VELOCIZZATE */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`overlay-${currentCollection}`}
              className="absolute inset-0 flex flex-col justify-between p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Top: Category Badge - VELOCIZZATO */}
              <motion.div 
                className="text-right"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.23, 1, 0.320, 1] }}
              >
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-zinc-900/90 to-black/90 backdrop-blur-md border border-orange-500/60 rounded-lg shadow-xl"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(249, 115, 22, 0.4)",
                    borderColor: "rgba(249, 115, 22, 0.8)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="text-white text-xs font-bold tracking-widest uppercase">
                    {collections[currentCollection].category}
                  </span>
                </motion.div>
              </motion.div>

              {/* Bottom: Drop Info - ANIMAZIONI VELOCIZZATE */}
              <motion.div 
                className="space-y-4 py-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.23, 1, 0.320, 1] }}
              >
                {/* Drop Name and Explore Button */}
                <div className="flex items-end justify-between">
                  <div className="space-y-2 flex-1">
                    <motion.span 
                      className="block text-3xl font-black text-white drop-shadow-2xl tracking-tight leading-none"
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4, ease: [0.23, 1, 0.320, 1] }}
                    >
                      {collections[currentCollection].name}
                    </motion.span>
                    <motion.span 
                      className="block text-zinc-300 text-sm font-medium leading-relaxed max-w-[70%]"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5, ease: [0.23, 1, 0.320, 1] }}
                    >
                      {collections[currentCollection].description}
                    </motion.span>
                  </div>

                  {/* BOTTONE ESPLORA OTTIMIZZATO - SENZA LAG */}
                  <motion.button
                    className="group relative px-3 py-2 bg-white/10 backdrop-blur-md text-white text-sm font-medium rounded-lg border border-white/30 transition-all duration-200 overflow-hidden"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6, ease: [0.23, 1, 0.320, 1] }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative flex items-center gap-2 z-10">
                      Esplora
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Collection navigation dots - MIGLIORATI */}
          <motion.div 
            className="absolute bottom-4 left-6 flex gap-3 z-30"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
          >
            {collections.map((_, index) => (
              <motion.button
                key={index}
                className={`relative transition-all duration-300 cursor-pointer ${
                  index === currentCollection
                    ? 'w-8 h-2'
                    : 'w-2 h-2 hover:scale-125'
                }`}
                onClick={() => handleDotClick(index)}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.9 + index * 0.05,
                  ease: [0.23, 1, 0.320, 1]
                }}
              >
                {/* Background del pulsante */}
                <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                  index === currentCollection
                    ? 'bg-gradient-to-r from-orange-400 to-red-400 shadow-lg shadow-orange-500/50'
                    : 'bg-white/30 hover:bg-white/50'
                }`} />
                
                {/* Animazione pulse per il pulsante attivo */}
                <AnimatePresence>
                  {index === currentCollection && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroDropCard;
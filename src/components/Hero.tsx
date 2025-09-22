"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { collections } from '@/constants/heroCollections';
import HeroDropCard from './HeroDropImage/HeroDropCard';
import ShaderText from '@/components/ShaderText';

const RebkonHero = () => {
  const [currentCollection, setCurrentCollection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Funzione per resettare e riavviare il timer
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentCollection((prev) => (prev + 1) % collections.length);
    }, 6000);
  };

  // Auto-rotate collections
  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handler per il cambio di collezione che resetta il timer
  const handleCollectionChange = (index: number) => {
    setCurrentCollection(index);
    resetTimer(); // Reset del timer quando si clicca manualmente
  };

  return (
    <section
      className="relative bg-zinc-950 font-jost pt-20 overflow-hidden"
    >
      {/* Refined background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black opacity-90"
      />
      <div
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500/3 to-orange-500/3 rounded-full blur-3xl"
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 max-lg:py-16">
        <div
          className="grid lg:grid-cols-12 gap-4 lg:gap-12 xl:gap-16 items-center w-full"
        >

          {/* Text Content (senza CTA) */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-10 relative z-20 order-1 lg:py-24">
            {/* Top indicator */}
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-px bg-gradient-to-r from-red-500 to-orange-500"
                />
                <span className="text-zinc-400 tracking-[0.25em] uppercase text-xs font-medium">
                  Made in Firenze
                </span>
            </div>

            {/* Main Title with subtle glitch */}
            <div>
              <ShaderText 
                className="block"
                fontSize="clamp(2.5rem, 6vw, 5.5rem)"
                fontWeight="800"
              >
                SWAGGERZ
              </ShaderText>
              <h1
                className="relative z-30"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  lineHeight: '0.9',
                  fontWeight: '800'
                }}
              >
                
                <span className="block text-white mt-1 lg:mt-2 font-light tracking-tight">
                  Streetwear Culture
                </span>
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-4 lg:space-y-6 relative z-30">
              <p
                className="text-lg text-zinc-300 max-w-lg leading-relaxed"
              >
                Dove <span className="text-orange-400 font-medium">streetwear</span> incontra <span className="text-red-400 font-medium">arte digitale</span>.
                <span className="block text-white font-medium mt-2">
                  Ogni pezzo racconta una storia urbana.
                </span>
              </p>

              {/* Cleaner stats */}
              <div
                className="flex items-center gap-6 text-sm text-zinc-400"
              >
                <div
                  className="text-center group cursor-default"
                >
                  <span className="block text-white text-xl font-bold">
                    500+
                  </span>
                  <span className="text-xs uppercase tracking-wider opacity-70">
                    Drops
                  </span>
                </div>

                <div className="w-px h-6 bg-zinc-700/50"></div>

                <div
                  className="text-center group cursor-default"
                >
                  <span className="block text-white text-lg font-semibold">
                    2020
                  </span>
                  <span className="text-xs uppercase tracking-wider opacity-70">
                    Firenze
                  </span>
                </div>
              </div>
            </div>

            {/* Main CTA - visibile solo su desktop */}
            <div className="relative z-30 hidden lg:block">
              <button
                className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold tracking-wide text-lg cursor-pointer rounded-2xl shadow-xl shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                />
                <span className="relative flex items-center gap-3 text-md lg:text-lg">
                  <Flame className="w-[1.4em] h-[1.4em] lg:w-[1.2em] lg:h-[1.2em] text-yellow-300" />
                  Esplora le collezioni
                  <ArrowRight className="w-[1.4em] h-[1.4em] lg:w-[1.2em] lg:h-[1.2em] group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
            </div>
          </div>

          {/* Enhanced Visual Content with Collection Showcase */}
          <div className="lg:col-span-5 relative z-10 flex items-center justify-center order-2">
            <HeroDropCard
              currentCollection={currentCollection}
              collections={collections}
              onCollectionChange={handleCollectionChange}
            />
          </div>

          {/* Main CTA - visibile solo su mobile e posizionata dopo l'immagine */}
          <div className="relative z-30 lg:hidden order-3 flex justify-center mt-12">
            <button
              className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold tracking-wide text-lg cursor-pointer rounded-2xl shadow-xl shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300"
            >
              <div
                className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              />
              <span className="relative flex items-center gap-3 text-md lg:text-lg">
                <Flame className="w-[1.4em] h-[1.4em] lg:w-[1.2em] lg:h-[1.2em] text-yellow-300" />
                Esplora le collezioni
                <ArrowRight className="w-[1.4em] h-[1.4em] lg:w-[1.2em] lg:h-[1.2em] group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RebkonHero;
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { collections } from '@/constants/heroCollections';
import HeroDropCard from './HeroDropCard';

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
      className="relative min-h-screen bg-zinc-950 font-jost max-lg:py-10"
    >
      {/* Refined background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black opacity-90"
      />
      <div
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500/3 to-orange-500/3 rounded-full blur-3xl"
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-20 flex items-center min-h-screen">
        <div
          className="grid lg:grid-cols-2 gap-12 xl:gap-20 2xl:gap-24 items-center justify-center w-full"
        >

          {/* Text Content */}
          <div className="space-y-8 lg:space-y-10 relative z-20">
            {/* Top indicator */}
            <div className="pt-8 lg:pt-12">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-px bg-gradient-to-r from-red-500 to-orange-500"
                />
                <span className="text-zinc-400 tracking-[0.25em] uppercase text-xs font-medium">
                  Made in Firenze
                </span>
              </div>
            </div>

            {/* Main Title with subtle glitch */}
            <h1
              className="relative z-30"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                lineHeight: '0.9',
                fontWeight: '800'
              }}
            >
              <span
                className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent py-2 lg:py-4"
              >
                SWAGGERZ
              </span>
              <span className="block text-white mt-1 lg:mt-2 font-light tracking-tight">
                Streetwear Culture
              </span>
            </h1>

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

            {/* Main CTA */}
            <div className="relative z-30">
              <button
                className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold tracking-wide text-lg cursor-pointer rounded-2xl shadow-xl shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                />
                <span className="relative flex items-center gap-3">
                  <Flame size={16} className="text-yellow-300" />
                  Scopri i drop
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
            </div>
          </div>

          {/* Enhanced Visual Content with Collection Showcase */}
          <div className="relative z-10 flex justify-center lg:justify-end lg:pt-12 xl:pt-16">
            <HeroDropCard
              currentCollection={currentCollection}
              collections={collections}
              onCollectionChange={handleCollectionChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RebkonHero;
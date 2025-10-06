"use client"

import React, { useState, useEffect } from 'react';
import { Package, Palette, Zap } from 'lucide-react';
import { collections } from '@/constants/heroCollections';
import HeroDropCard from './HeroDropImage/HeroDropCard';
import HeroMainCard from './Hero/HeroMainCard';
import HeroServiceCard from './Hero/HeroServiceCard';
import HeroTrustCard from './Hero/HeroTrustCard';
import HeroCategoriesCard from './Hero/HeroCategoriesCard';

const BentoHero = () => {
  const [currentCollection, setCurrentCollection] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [justExitedHover, setJustExitedHover] = useState(false);

  // Auto-rotate collections (pause on hover)
  useEffect(() => {
    if (hoveredCard === 'drops') {
      setJustExitedHover(false);
      return; // Stop rotation when hovering drop card
    }

    // Se appena uscito dall'hover, aspetta 2.5s poi cambia immagine
    if (justExitedHover) {
      const quickTimeout = setTimeout(() => {
        setCurrentCollection((prev) => (prev + 1) % collections.length);
        setJustExitedHover(false);
      }, 2500);

      return () => clearTimeout(quickTimeout);
    }

    // Rotazione normale
    const interval = setInterval(() => {
      setCurrentCollection((prev) => (prev + 1) % collections.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [hoveredCard, justExitedHover]);


  return (
    <section className="relative bg-zinc-950 font-jost pt-16 lg:pt-20 min-h-screen overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Bento Grid Container - Unica grid per tutto */}
        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 auto-rows-auto xl:auto-rows-[200px]">

          {/* Main Title & CTA - Full width on mobile, 1 column on lg, 2 columns on xl+ */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-3 xl:col-span-2">
            <HeroMainCard
              onHover={() => setHoveredCard('main')}
              onLeave={() => setHoveredCard(null)}
            />
          </div>

          {/* HeroDropCard - 1 column on lg, 2 columns on xl */}
          <div
            className="col-span-2 lg:col-span-1 lg:row-span-2 xl:col-span-2 overflow-hidden min-h-[400px] xl:min-h-0"
            onMouseEnter={() => setHoveredCard('drops')}
            onMouseLeave={() => {
              setHoveredCard(null);
              setJustExitedHover(true);
            }}
          >
            <HeroDropCard
              currentCollection={currentCollection}
              collections={collections}
              onCollectionChange={setCurrentCollection}
            />
          </div>

          {/* Featured Categories - Under HeroDropImage, 2 rows */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-2 xl:col-span-2">
            <HeroCategoriesCard
              onHover={() => setHoveredCard('categories')}
              onLeave={() => setHoveredCard(null)}
            />
          </div>

          {/* Services Grid - 2 cards in una riga sempre */}
          <div className="col-span-1 lg:row-span-1 xl:col-span-1">
            <HeroServiceCard
              icon={Zap}
              iconColor="text-orange-500"
              gradientColors="bg-gradient-to-br from-orange-500/5 to-amber-500/5"
              title="Fast Delivery"
              description="Spedizione in 48h in tutta Italia"
              cardId="service3"
              onHover={setHoveredCard}
              onLeave={() => setHoveredCard(null)}
            />
          </div>

          <div className="col-span-1 lg:row-span-1 xl:col-span-1">
            <HeroTrustCard
              onHover={() => setHoveredCard('trust')}
              onLeave={() => setHoveredCard(null)}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoHero;
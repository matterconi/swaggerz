"use client"

import React, { useState, useEffect } from 'react';
import { collections } from '@/constants/heroCollections';
import HeroDropCard from './HeroDropImage/HeroDropCard';
import HeroMainCard from './Hero/HeroMainCard';
import HeroCategoriesCard from './Hero/HeroCategoriesCard';
import HeroGradientShader from './Hero/HeroGradientShader';
import FeaturedCollectionBanner from './NFTCollections/FeaturedCollectionBanner';

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
    <section className="relative bg-zinc-950 font-jost pt-16 lg:pt-20 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Main card emphasis gradient with shader */}
        <HeroGradientShader />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Unified Bento Grid - Everything in one grid */}
        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 auto-rows-auto xl:auto-rows-[200px]">

          {/* Main Title & CTA */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-3 xl:col-span-2 xl:row-span-3">
            <HeroMainCard
              onHover={() => setHoveredCard('main')}
              onLeave={() => setHoveredCard(null)}
            />
          </div>

          {/* HeroDropCard */}
          <div
            className="col-span-2 lg:col-span-1 lg:row-span-2 xl:col-span-2 xl:row-span-2 overflow-hidden min-h-[400px] xl:min-h-0"
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

          {/* Streetwear Card - extends down for 2 rows */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-1 xl:col-span-2 xl:row-span-2">
            <HeroCategoriesCard
              onHover={() => setHoveredCard('categories')}
              onLeave={() => setHoveredCard(null)}
            />
          </div>

          {/* Banner Section 1: 2 columns × 3 rows (Z shape top) */}
          <div className="col-span-2 lg:col-span-2 xl:col-span-2 xl:row-span-3
   xl:border-l xl:border-b xl:border-zinc-700/50
  xl:rounded-l-3xl xl:overflow-visible xl:relative

  before:xl:content-[''] before:xl:absolute before:xl:w-[calc(100%-1px)] before:xl:h-[20px]
  before:xl:border-r before:xl:border-t before:xl:border-zinc-700/50
  before:xl:rounded-t-3xl before:xl:-top-[0] before:xl:right-[0px] before:xl:z-10
  before:xl:bg-transparent

  after:xl:content-[''] after:xl:absolute after:xl:w-5 after:xl:h-[201px]
  after:xl:border-l after:xl:border-b after:xl:border-zinc-700/50
  after:xl:rounded-bl-3xl after:xl:-right-[19px] after:xl:top-[20px] after:xl:z-10
  after:xl:bg-transparent"
>

            <div className="xl:overflow-hidden xl:rounded-t-3xl xl:rounded-bl-3xl h-full">
              <FeaturedCollectionBanner section="upper" />
            </div>
          </div>

          {/* Banner Section 2: 2 columns × 2 rows (right side bottom of L) */}
          <div className="col-span-2 lg:col-span-2 xl:col-span-2 xl:row-span-2 xl:relative xl:border xl:border-l-0 xl:border-zinc-700/50 xl:rounded-tr-3xl xl:rounded-br-3xl xl:overflow-hidden xl:-ml-[1px] before:xl:content-[''] before:xl:absolute before:xl:w-[200px] before:xl:h-5 before:xl:bg-zinc-950 before:xl:border-t before:xl:border-r before:xl:border-zinc-700/50 before:xl:rounded-tr-3xl before:xl:-left-[1px] before:xl:-top-[1px] before:xl:z-10">
            <FeaturedCollectionBanner section="lower" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoHero;
"use client"

import React, { useState, useEffect } from 'react';
import { collections } from '@/constants/heroCollections';
import HeroDropCard from './HeroDropImage/HeroDropCard';
import HeroMainCard from './Hero/HeroMainCard';
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
     <section className="relative bg-zinc-950 font-jost pt-16 lg:pt-20 min-h-screen overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 z-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Main card emphasis gradient with shader */}
        <HeroGradientShader />
      </div>

      <div className="relative z-50 container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Unified Bento Grid - Everything in one grid */}
        <div className="relative grid grid-cols-2  lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-auto lg:auto-rows-[200px] z-50">

          {/* Main Title & CTA - Extended to 4 rows */}
          <div className="col-span-2 lg:col-span-2 lg:row-span-4">
            <HeroMainCard
              onHover={() => setHoveredCard('main')}
              onLeave={() => setHoveredCard(null)}
            />
          </div>

          {/* HeroDropCard - Extended to 4 rows */}
          <div
            className="col-span-2 lg:col-span-2 lg:row-span-4 overflow-hidden min-h-[400px] lg:min-h-0"
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

          {/* Banner Section 1 - Extended to 4 rows */}
         <div className="relative bg-black col-span-2 lg:col-span-2 lg:row-span-4
            lg:border-l lg:border-b lg:border-zinc-700/50
            lg:rounded-l-3xl rounded-tr-3xl lg:overflow-visible

            before:lg:content-[''] before:lg:absolute before:lg:w-[calc(100%-1px)] before:lg:h-[20px]
            before:lg:border-r before:lg:border-t before:lg:border-zinc-700/50
            before:lg:rounded-t-3xl before:lg:-top-[0] before:lg:-right-0
            before:lg:z-10

            after:lg:content-[''] after:lg:absolute after:lg:w-[21px] after:lg:h-[201px]
            after:lg:border-l after:lg:border-b after:lg:border-zinc-700/50
            after:lg:rounded-bl-3xl after:lg:-right-[20px] after:lg:top-[20px] after:lg:z-10
            after:lg:bg-transparent
            "
          >
{/* Gradient Background UP - Adjusted for 4-row layout */}
          <div className="hidden lg:block absolute left-0 top-0 w-full h-[50%] pointer-events-none z-20">
            <div
              className="absolute inset-0 rounded-t-3xl"
              style={{
                background: `
                  radial-gradient(ellipse 130% 110% at 28% 18%, rgba(168, 85, 247, 0.22), transparent 58%),
                  radial-gradient(ellipse 115% 95% at 72% 28%, rgba(139, 92, 246, 0.18), transparent 62%),
                  radial-gradient(ellipse 90% 75% at 50% 45%, rgba(147, 51, 234, 0.12), transparent 68%),
                  linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.04) 50%, transparent 85%)
                `
              }}
            />
            <div
              className="absolute inset-0 rounded-t-3xl"
              style={{
                background: `
                  radial-gradient(ellipse 105% 88% at 35% 22%, rgba(168, 85, 247, 0.25), transparent 60%),
                  radial-gradient(ellipse 98% 80% at 68% 38%, rgba(139, 92, 246, 0.2), transparent 65%)
                `,
                filter: 'blur(70px)',
                opacity: 0.35
              }}
            />
          </div>

          {/* Gradient Background DOWN - Adjusted for 4-row layout */}
          <div className="hidden lg:block absolute left-0 top-[50%] w-[calc(200%+20px)] h-[50%] pointer-events-none z-20">
            <div
              className="absolute inset-0 rounded-r-3xl rounded-bl-3xl"
              style={{
                background: `
                  radial-gradient(ellipse 90% 60% at 30% 40%, rgba(168, 85, 247, 0.11), transparent 65%),
                  radial-gradient(ellipse 80% 65% at 60% 55%, rgba(192, 132, 252, 0.09), transparent 70%),
                  radial-gradient(ellipse 70% 55% at 48% 70%, rgba(147, 51, 234, 0.08), transparent 68%),
                  radial-gradient(ellipse 95% 50% at 70% 45%, rgba(139, 92, 246, 0.06), transparent 72%)
                `
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 85% 55% at 35% 42%, rgba(168, 85, 247, 0.13), transparent 68%),
                  radial-gradient(ellipse 88% 58% at 62% 58%, rgba(192, 132, 252, 0.1), transparent 72%),
                  radial-gradient(ellipse 75% 48% at 50% 68%, rgba(147, 51, 234, 0.09), transparent 70%)
                `,
                filter: 'blur(65px)',
                opacity: 0.28
              }}
            />
          </div>

            <div className="lg:overflow-hidden lg:rounded-t-3xl lg:rounded-bl-3xl h-full relative">
              <FeaturedCollectionBanner section="left" />
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default BentoHero;
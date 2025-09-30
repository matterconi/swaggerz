"use client"

import React, { useState, useEffect } from 'react';
import { Package, Palette, Zap } from 'lucide-react';
import { collections } from '@/constants/heroCollections';
import HeroDropCard from './HeroDropImage/HeroDropCard';
import HeroMainCard from './Hero/HeroMainCard';
import HeroServiceCard from './Hero/HeroServiceCard';
import HeroTrustCard from './Hero/HeroTrustCard';
import HeroCategoriesCard from './Hero/HeroCategoriesCard';
import HeroNewsletterCard from './Hero/HeroNewsletterCard';

const BentoHero = () => {
  const [currentCollection, setCurrentCollection] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Auto-rotate collections
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCollection((prev) => (prev + 1) % collections.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  return (
    <section className="relative bg-zinc-950 font-jost pt-16 lg:pt-20 min-h-screen overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Bento Grid Container - Unica grid per tutto */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-[160px] lg:auto-rows-[200px]">
          
          {/* Main Title & CTA - Large card spanning 2 columns */}
          <HeroMainCard
            onHover={() => setHoveredCard('main')}
            onLeave={() => setHoveredCard(null)}
          />

          {/* HeroDropCard - 2 columns, 3 rows */}
          <div 
            className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-4 lg:p-6 border border-zinc-800/50 md:col-span-2 md:row-span-2 overflow-hidden hover:border-zinc-700/50 transition-all duration-500"
            onMouseEnter={() => setHoveredCard('drops')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative h-full w-full flex items-center justify-center">
              <HeroDropCard
                currentCollection={currentCollection}
                collections={collections}
                onCollectionChange={setCurrentCollection}
              />
            </div>
          </div>

          {/* Services Grid - 4 cards in una riga */}
          <HeroServiceCard
            icon={Package}
            iconColor="text-green-500"
            gradientColors="bg-gradient-to-br from-green-500/5 to-emerald-500/5"
            title="Print on Demand"
            description="Stampa premium su materiali di alta qualità"
            cardId="service1"
            onHover={setHoveredCard}
            onLeave={() => setHoveredCard(null)}
          />

          <HeroServiceCard
            icon={Palette}
            iconColor="text-purple-500"
            gradientColors="bg-gradient-to-br from-purple-500/5 to-violet-500/5"
            title="Artist Collab"
            description="Collabora con artisti internazionali"
            cardId="service2"
            onHover={setHoveredCard}
            onLeave={() => setHoveredCard(null)}
          />

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

          <HeroTrustCard
            onHover={() => setHoveredCard('trust')}
            onLeave={() => setHoveredCard(null)}
          />

          {/* Featured Categories */}
          <HeroCategoriesCard
            onHover={() => setHoveredCard('categories')}
            onLeave={() => setHoveredCard(null)}
          />

          {/* Newsletter CTA */}
          <HeroNewsletterCard
            onHover={() => setHoveredCard('newsletter')}
            onLeave={() => setHoveredCard(null)}
          />

        </div>
      </div>
    </section>
  );
};

export default BentoHero;
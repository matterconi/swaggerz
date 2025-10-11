"use client"

import React from 'react';
import { collections } from '@/constants/heroCollections';
import { useCollectionRotation } from '@/hooks/useCollectionRotation';
import HeroBackground from './Hero/HeroBackground';
import HeroMainCard from './Hero/HeroMainCard';
import BannerSectionLeft from './Hero/BannerSectionLeft';
import BannerSectionRight from './Hero/BannerSectionRight';
import HeroSliderSection from './Hero/HeroSliderSection';
import BaseLSection from './Hero/BaseLSection';
import HeroDropSection from './Hero/HeroDropSection';
import FeaturedArtist from './FeaturedArtist';
import TopCollections from './Hero/TopCollections';

const BentoHero = () => {
  const {
    currentCollection,
    setCurrentCollection,
    hoveredCard,
    setHoveredCard,
    setJustExitedHover
  } = useCollectionRotation({
    totalCollections: collections.length,
    rotationInterval: 4000,
    pauseAfterHoverDuration: 2500
  });


  return (
    <section className="relative bg-zinc-950 font-jost pt-20 min-h-screen overflow-hidden">
      {/* Background with animated gradients */}
      <HeroBackground />

      {/* Main content container */}
      <div className="relative z-50 container mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        {/* Unified Bento Grid */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-auto z-50">

          {/* Main Title & CTA */}
          <div className="col-span-2 lg:col-span-4 lg:row-span-2">
            <HeroMainCard
              onHover={() => setHoveredCard('main')}
              onLeave={() => setHoveredCard(null)}
            />
          </div>

          {/* New Slider Section - 2cols, 2rows */}
          <div className="col-span-2 lg:col-span-4 lg:row-span-2 min-h-[400px] ">
            <HeroSliderSection />
          </div>


          {/* Banner Section Left - Latest Collections (L-shape) */}
          <BannerSectionLeft />

                              {/* Base L Section - 1col, 1row (foundation for L-structure) */}
          <div className="col-span-2 lg:col-span-2 lg:row-span-1 min-h-[200px]">
            <BaseLSection />
          </div>


          {/* Banner Section Right */}
          <BannerSectionRight />

          {/* NFT Drops Section */}
          <HeroDropSection
            currentCollection={currentCollection}
            onCollectionChange={setCurrentCollection}
            onMouseEnter={() => setHoveredCard('drops')}
            onMouseLeave={() => {
              setHoveredCard(null);
              setJustExitedHover(true);
            }}
          />

          {/* Top Collections Sidebar */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-2 min-h-[300px] lg:min-h-0">
            <TopCollections />
          </div>

                    {/* Featured Artist - moved to bottom */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-2 min-h-[400px] lg:min-h-0">
            <FeaturedArtist
              name="Beeple"
              avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
              backgroundImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop"
              verified={true}
              followers="2.1M"
              galleryCards={collections.map((col, idx) => ({
                id: idx + 1,
                image: col.image,
                title: col.name
              }))}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoHero;
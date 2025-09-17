"use client"

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

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
  return (
    <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto max-sm:w-[80vw]">
      <div className="relative aspect-[4/5] group">
        {/* Crosshair unificato - Solo angoli eleganti */}
        <div className="absolute -inset-3 z-30 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Angoli crosshair */}
            <div
              className="absolute top-0 left-0 w-6 h-6 border-l-3 border-t-3 border-red-500 rounded-tl-lg"
              style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.8))' }}
            />
            <div
              className="absolute top-0 right-0 w-6 h-6 border-r-3 border-t-3 border-red-500 rounded-tr-lg"
              style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.8))' }}
            />
            <div
              className="absolute bottom-0 left-0 w-6 h-6 border-l-3 border-b-3 border-red-500 rounded-bl-lg"
              style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.8))' }}
            />
            <div
              className="absolute bottom-0 right-0 w-6 h-6 border-r-3 border-b-3 border-red-500 rounded-br-lg"
              style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.8))' }}
            />
          </div>
        </div>

        {/* Contenitore immagine senza bordi */}
        <div className="relative w-full h-full rounded-3xl shadow-2xl shadow-black/50 z-20">
          {/* Collection Images Carousel */}
          <div
            key={`image-${currentCollection}`}
            className="relative w-full h-full rounded-3xl overflow-hidden"
          >
            <Image
              src={collections[currentCollection].image}
              alt={`${collections[currentCollection].name} - Swaggerz Collection`}
              fill
              className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-105"
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 600px"
            />
          </div>

          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Dynamic glow effect based on collection */}
          <div className={`absolute inset-0 opacity-40 ${
            currentCollection === 0 ? 'bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10' :
            currentCollection === 1 ? 'bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10' :
            'bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/10'
          }`} />

          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />

          {/* Collection Info Overlay - Enhanced Layout */}
          <div
            key={`overlay-${currentCollection}`}
            className="absolute inset-0 flex flex-col justify-between p-6"
          >
            {/* Top: Category Badge */}
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-zinc-900/90 to-black/90 backdrop-blur-md border border-orange-500/60 rounded-lg shadow-xl">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full" />
                <span className="text-white text-xs font-bold tracking-widest uppercase">
                  {collections[currentCollection].category}
                </span>
              </div>
            </div>

            {/* Bottom: Drop Info */}
            <div className="space-y-4 py-4">
              {/* Drop Name and Explore Button */}
              <div className="flex items-end justify-between">
                <div className="space-y-2 flex-1">
                  <span className="block text-3xl font-black text-white drop-shadow-2xl tracking-tight leading-none">
                    {collections[currentCollection].name}
                  </span>
                  <span className="block text-zinc-300 text-sm font-medium leading-relaxed max-w-[70%]">
                    {collections[currentCollection].description}
                  </span>
                </div>

                <button
                  className="group relative px-3 py-2 bg-white/10 backdrop-blur-md text-white text-sm font-medium rounded-lg border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  <span className="relative flex items-center gap-2">
                    Esplora
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </span>
                </button>
              </div>

            </div>
          </div>

          {/* Collection navigation dots - Enhanced */}
          <div className="absolute bottom-4 left-6 flex gap-3">
            {collections.map((_, index) => (
              <button
                key={index}
                className={`relative transition-all duration-300 ${
                  index === currentCollection
                    ? 'w-8 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full scale-110 shadow-lg shadow-orange-500/50'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80 rounded-full hover:scale-125'
                }`}
                onClick={() => onCollectionChange(index)}
              >
                {index === currentCollection && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDropCard;
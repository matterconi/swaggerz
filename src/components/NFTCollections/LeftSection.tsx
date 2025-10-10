"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Collection } from './types';
import CollectionBadge from './CollectionBadge';
import ShaderText from '@/components/ShaderText';
import ExploreButton from '@/components/HeroDropImage/ExploreButton';

interface LeftSectionProps {
  collection: Collection;
}

const colorMap = {
  emerald: {
    shadow: 'rgba(16, 185, 129, 0.6)',
    gradient: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(16, 185, 129, 0.4), transparent 60%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(52, 211, 153, 0.3), transparent 70%)'
  },
  cyan: {
    shadow: 'rgba(6, 182, 212, 0.6)',
    gradient: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(6, 182, 212, 0.4), transparent 60%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(34, 211, 238, 0.3), transparent 70%)'
  },
  orange: {
    shadow: 'rgba(249, 115, 22, 0.6)',
    gradient: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(249, 115, 22, 0.4), transparent 60%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(251, 146, 60, 0.3), transparent 70%)'
  },
  purple: {
    shadow: 'rgba(168, 85, 247, 0.6)',
    gradient: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(168, 85, 247, 0.4), transparent 60%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(192, 132, 252, 0.3), transparent 70%)'
  }
};

export default function LeftSection({ collection }: LeftSectionProps) {
  const [hoveredImg, setHoveredImg] = useState<number | null>(null);
  const colors = colorMap[collection.badgeColor];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative flex flex-col h-full px-4 lg:px-8 py-6 lg:py-8 gap-4 lg:gap-6 z-50">

        {/* Badge + Title - Flexible height */}
        <div className="relative z-50 flex-shrink-0 space-y-2 lg:space-y-3">
          <div className="relative z-50">
            <CollectionBadge badge={collection.badge} badgeColor={collection.badgeColor} />
          </div>

          <h2 className="relative z-50 text-2xl lg:text-4xl xl:text-5xl font-black text-white leading-none tracking-tight">
            {collection.title}
          </h2>
        </div>

        {/* Description - Flexible height */}
        <p className="relative z-50 flex-shrink-0 text-sm lg:text-base text-zinc-400 leading-relaxed">
          {collection.description}
        </p>

        {/* Image Gallery Grid - Takes remaining space */}
        <div className="relative z-50 flex-1 min-h-0 grid grid-cols-2 gap-3 lg:gap-4">
          {collection.images.map((img, idx) => (
            <motion.div
              key={idx}
              className="relative z-50 w-full h-full rounded-lg lg:rounded-xl overflow-hidden border-2 border-zinc-800 group cursor-pointer"
              onMouseEnter={() => setHoveredImg(idx)}
              onMouseLeave={() => setHoveredImg(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-2 rounded-xl blur-xl"
                style={{ background: `radial-gradient(circle, ${colors.shadow}, transparent 70%)` }}
                animate={{
                  opacity: hoveredImg === idx ? 0.8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              <Image
                src={img}
                alt={`${collection.title} ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500"
                style={{
                  transform: hoveredImg === idx ? 'scale(1.1)' : 'scale(1)',
                }}
              />

              {/* Overlay scuro on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
        
        <div className="relative z-50">
          <ExploreButton collectionName={collection.title} />
        </div>
      </div>
    </div>
  );
}
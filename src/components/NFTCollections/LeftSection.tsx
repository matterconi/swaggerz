"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Collection } from './types';
import CollectionBadge from './CollectionBadge';
import { Check } from 'lucide-react';
import ShaderText from '@/components/ShaderText';

interface LeftSectionProps {
  collection: Collection;
}

const colorMap = {
  emerald: {
    shadow: 'rgba(16, 185, 129, 0.6)',
  },
  cyan: {
    shadow: 'rgba(6, 182, 212, 0.6)',
  },
  orange: {
    shadow: 'rgba(249, 115, 22, 0.6)',
  },
  purple: {
    shadow: 'rgba(168, 85, 247, 0.6)',
  }
};

export default function LeftSection({ collection }: LeftSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorMap[collection.badgeColor];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative flex flex-col h-full px-6 lg:px-10 py-8 lg:py-10 gap-5 lg:gap-6 z-50">

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

        {/* Featured Image - Main highlight */}
        <motion.div
          className="relative z-50 flex-shrink-0 w-full h-48 lg:h-56 xl:h-64 rounded-lg lg:rounded-xl overflow-hidden border-2 border-zinc-800 group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-2 rounded-xl blur-xl"
            style={{ background: `radial-gradient(circle, ${colors.shadow}, transparent 70%)` }}
            animate={{
              opacity: isHovered ? 0.8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          <Image
            src={collection.images[0]}
            alt={`${collection.title} featured`}
            fill
            className="object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />

          {/* Overlay scuro on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>

        {/* Stats Grid - Single Row */}
        <div className="relative z-50 flex-shrink-0 grid grid-cols-4 gap-2 lg:gap-3">
          {/* Floor Price */}
          <div className="relative z-50 bg-zinc-900/50 border border-zinc-800 rounded-lg lg:rounded-xl p-2 lg:p-3 space-y-1">
            <p className="relative z-50 text-xs text-zinc-500 font-medium">Prezzo</p>
            <p className="relative z-50 text-base lg:text-xl font-black text-white">{collection.price}</p>
          </div>

          {/* Total Items */}
          <div className="relative z-50 bg-zinc-900/50 border border-zinc-800 rounded-lg lg:rounded-xl p-2 lg:p-3 space-y-1">
            <p className="relative z-50 text-xs text-zinc-500 font-medium">Pezzi</p>
            <p className="relative z-50 text-base lg:text-xl font-black text-white">{collection.pieces}</p>
          </div>

          {/* Collection Rank */}
          <div className="relative z-50 bg-zinc-900/50 border border-zinc-800 rounded-lg lg:rounded-xl p-2 lg:p-3 space-y-1">
            <p className="relative z-50 text-xs text-zinc-500 font-medium">Collezione</p>
            <p className="relative z-50 text-base lg:text-xl font-black text-white">#{collection.id}</p>
          </div>

          {/* Availability */}
          <div className="relative z-50 bg-zinc-900/50 border border-zinc-800 rounded-lg lg:rounded-xl p-2 lg:p-3 space-y-1">
            <p className="relative z-50 text-xs text-zinc-500 font-medium">Disp.</p>
            <p className="relative z-50 text-base lg:text-xl font-black text-emerald-500">Alta</p>
          </div>
        </div>

        {/* Brand Info - Flexible */}
        <div className="relative z-50 flex-shrink-0 bg-zinc-900/50 border border-zinc-800 rounded-lg lg:rounded-xl p-4 lg:p-5">
          <div className="relative z-50 flex items-center gap-3">
            <div className="relative z-50 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white flex items-center justify-center font-black text-black text-lg lg:text-xl">
              S
            </div>
            <div className="relative z-50">
              <p className="relative z-50 text-sm lg:text-base text-white font-bold flex items-center gap-2">
                Swaggerz
                <span className="relative z-50 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" />
                </span>
              </p>
              <p className="relative z-50 text-xs text-zinc-500">Brand Ufficiale</p>
            </div>
          </div>
        </div>

        {/* White Button with ShaderText */}
        <div className="relative z-50 flex-shrink-0">
          <motion.button
            className="group/btn w-full bg-white hover:bg-zinc-100 rounded-xl lg:rounded-2xl px-6 py-3.5 lg:py-4 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <ShaderText
              className="font-bold text-sm lg:text-base tracking-wider uppercase"
              fontSize="14px"
              fontWeight="700"
            >
              ESPLORA COLLEZIONE
            </ShaderText>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
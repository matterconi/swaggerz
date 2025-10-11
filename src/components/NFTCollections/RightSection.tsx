"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Collection } from './types';
import { Check } from 'lucide-react';
import ShaderText from '@/components/ShaderText';

interface RightSectionProps {
  collection: Collection;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function RightSection({ collection, onPrevious, onNext }: RightSectionProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative z-50 flex flex-col h-full px-6 lg:px-10 py-8 lg:py-10 gap-5 lg:gap-6">

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

        {/* Spacer - Takes remaining space */}
        <div className="flex-1 min-h-0"></div>

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
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Collection } from './types';
import { ChevronLeft, ChevronRight, Check, Truck, Shield, Award } from 'lucide-react';
import ShaderText from '@/components/ShaderText';

interface RightSectionProps {
  collection: Collection;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function RightSection({ collection, onPrevious, onNext }: RightSectionProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative z-50 flex flex-col h-full px-4 lg:px-8 py-6 lg:py-8 gap-4 lg:gap-5">

        {/* Stats Grid - Flexible */}
        <div className="relative z-50 flex-shrink-0 grid grid-cols-2 gap-3">
          {/* Floor Price */}
          <div className="relative z-50 bg-zinc-900/50 border border-zinc-800 rounded-lg lg:rounded-xl p-3 lg:p-4 space-y-1">
            <p className="relative z-50 text-xs text-zinc-500 font-medium">Prezzo Base</p>
            <p className="relative z-50 text-xl lg:text-2xl font-black text-white">{collection.price}</p>
          </div>

          {/* Total Items */}
          <div className="relative z-50 bg-zinc-900/50 border border-zinc-800 rounded-lg lg:rounded-xl p-3 lg:p-4 space-y-1">
            <p className="relative z-50 text-xs text-zinc-500 font-medium">Pezzi Totali</p>
            <p className="relative z-50 text-xl lg:text-2xl font-black text-white">{collection.pieces}</p>
          </div>

          {/* Collection Rank */}
          <div className="relative z-50 bg-zinc-900/50 border border-zinc-800 rounded-lg lg:rounded-xl p-3 lg:p-4 space-y-1">
            <p className="relative z-50 text-xs text-zinc-500 font-medium">Collezione</p>
            <p className="relative z-50 text-xl lg:text-2xl font-black text-white">#{collection.id}</p>
          </div>

          {/* Availability */}
          <div className="relative z-50 bg-zinc-900/50 border border-zinc-800 rounded-lg lg:rounded-xl p-3 lg:p-4 space-y-1">
            <p className="relative z-50 text-xs text-zinc-500 font-medium">Disponibilità</p>
            <p className="relative z-50 text-xl lg:text-2xl font-black text-emerald-500">Alta</p>
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

        {/* Navigation Controls - Always at bottom */}
        {(onPrevious || onNext) && (
          <div className="relative z-50 flex-shrink-0 flex gap-2 lg:gap-3">
            <button
              onClick={onPrevious}
              className="relative z-50 flex-1 px-4 py-2.5 lg:px-6 lg:py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm lg:text-base font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="hidden lg:inline">Precedente</span>
            </button>
            <button
              onClick={onNext}
              className="relative z-50 flex-1 px-4 py-2.5 lg:px-6 lg:py-3 bg-white hover:bg-zinc-200 text-black text-sm lg:text-base font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span className="hidden lg:inline">Successivo</span>
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
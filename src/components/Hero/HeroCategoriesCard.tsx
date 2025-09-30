"use client"

import React from 'react';
import { Star } from 'lucide-react';

interface HeroCategoriesCardProps {
  onHover: () => void;
  onLeave: () => void;
}

const HeroCategoriesCard: React.FC<HeroCategoriesCardProps> = ({ onHover, onLeave }) => {
  const categories = ['T-Shirts', 'Hoodies', 'Canvas', 'Accessories'];

  return (
    <div
      className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 border border-zinc-800/50 md:col-span-2 overflow-hidden hover:border-zinc-700/50 transition-all duration-500"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Categorie Popolari
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <div key={i} className="text-center group/cat cursor-pointer">
              <div className="bg-zinc-800/50 rounded-xl p-3 mb-2 group-hover/cat:bg-zinc-700/50 transition-colors">
                <div className="w-full aspect-square bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg" />
              </div>
              <p className="text-xs text-zinc-400 group-hover/cat:text-white transition-colors">{cat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCategoriesCard;
"use client"

import React from 'react';
import { Shield, Award } from 'lucide-react';

interface HeroTrustCardProps {
  onHover: () => void;
  onLeave: () => void;
}

const HeroTrustCard: React.FC<HeroTrustCardProps> = ({ onHover, onLeave }) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 border border-zinc-800/50 overflow-hidden hover:border-zinc-700/50 transition-all duration-500"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full flex flex-col justify-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          <Shield className="w-6 h-6 text-teal-500" />
          <Award className="w-6 h-6 text-yellow-500" />
        </div>
        <p className="text-white font-semibold text-center mb-1">100% Garantito</p>
        <p className="text-zinc-400 text-xs text-center">Soddisfatti o rimborsati</p>
      </div>
    </div>
  );
};

export default HeroTrustCard;
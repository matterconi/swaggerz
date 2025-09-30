"use client"

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HeroServiceCardProps {
  icon: LucideIcon;
  iconColor: string;
  gradientColors: string;
  title: string;
  description: string;
  cardId: string;
  onHover: (cardId: string) => void;
  onLeave: () => void;
}

const HeroServiceCard: React.FC<HeroServiceCardProps> = ({
  icon: Icon,
  iconColor,
  gradientColors,
  title,
  description,
  cardId,
  onHover,
  onLeave
}) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 border border-zinc-800/50 overflow-hidden hover:border-zinc-700/50 transition-all duration-500"
      onMouseEnter={() => onHover(cardId)}
      onMouseLeave={onLeave}
    >
      <div className={`absolute inset-0 ${gradientColors} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative h-full flex flex-col">
        <Icon className={`w-8 h-8 ${iconColor} mb-3`} />
        <h3 className="text-white font-semibold mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default HeroServiceCard;
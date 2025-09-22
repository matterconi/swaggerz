"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { VideoStats } from '@/types/video.types';

interface StatsGridProps {
  stats: VideoStats;
  isActive: boolean;
  variants?: any;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  isActive,
  variants
}) => {
  return (
    <motion.div
      variants={variants}
      className="grid grid-cols-2 gap-6 py-8"
    >
      {Object.entries(stats).map(([key, value], idx) => (
        <motion.div
          key={key}
          className="text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: isActive ? 1 : 0,
            x: isActive ? 0 : -20
          }}
          transition={{
            duration: 0.5,
            delay: 0.3 + idx * 0.1,
            ease: "easeOut"
          }}
        >
          <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1">
            {value}
          </div>
          <div className="text-xs lg:text-sm text-zinc-500 uppercase tracking-wider">
            {key}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
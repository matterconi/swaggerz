"use client";

import React from 'react';

/**
 * Hero video section
 * Fullscreen video background
 */
export default function HeroSliderSection() {
  return (
    <div className="w-full min-h-[400px] h-full relative 
       lg:border-[1px] lg:border-b-0 lg:border-zinc-700/50
      lg:rounded-l-3xl rounded-tr-3xl overflow-hidden

      before:lg:content-[''] before:lg:absolute before:lg:w-[calc(50%-16px)] before:lg:h-[32px]
      before:lg:border-b before:lg:border-zinc-700/50 
       before:lg:-bottom-[0] before:lg:-left-0 before:rounded-bl-3xl
      before:lg:z-10

      after:lg:content-[''] after:lg:absolute after:lg:w-[33px] after:lg:h-[201px]
      after:lg:border-l after:lg:border-b after:lg:border-zinc-700/50
      after:lg:rounded-bl-3xl after:lg:-right-[32px] after:lg:top-[32px] after:lg:z-10
      after:lg:bg-transparent
      "
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover rounded-3xl"
      >
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Fallback: Animated gradient background if video doesn't load */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-zinc-900 to-black -z-10 animate-pulse rounded-3xl" />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-3xl" />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center px-6">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
              SWAGGERZ
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white font-light tracking-wider uppercase">
            Lifestyle
          </p>
        </div>
      </div>
    </div>
  );
}

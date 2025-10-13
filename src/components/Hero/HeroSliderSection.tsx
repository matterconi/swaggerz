"use client";

import ShaderText from '@/components/ShaderText';
import React from 'react';

/**
 * Hero video section
 * Brand identity with essential info
 */
export default function HeroSliderSection() {
  return (
    <div className="w-full min-h-[500px] md:min-h-[600px] h-full relative 
       lg:border-[1px] lg:border-zinc-700/50
      lg:rounded-3xl overflow-hidden
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
          src="https://videos.pexels.com/video-files/5237012/5237012-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Fallback: Animated gradient background if video doesn't load */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-zinc-900 to-black -z-10 animate-pulse rounded-3xl" />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-3xl" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center px-6">
          {/* Brand Name */}
          <ShaderText>
            SWAGGERZ
          </ShaderText>
          
          {/* Tagline/Info */}
          <div className="space-y-2">
            <p className="text-base md:text-lg text-white/70 font-light tracking-wide">
              Streetwear and Digital art since 2025
            </p>
          </div>

          {/* Subtle CTA - optional */}
          <div className="pt-8">
            <a 
              href="#collection" 
              className="inline-block text-white/90 text-sm md:text-base uppercase tracking-widest
                border-b-2 border-white/40 hover:border-white transition-all duration-300
                pb-1"
            >
              Esplora la nuova collezione
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import ShaderText from '@/components/ShaderText';
import LiquidVideoShader from './LiquidVideoShader';
import React, { useRef } from 'react';

/**
 * Hero video section with liquid distortion shader
 * Brand identity with essential info
 */
export default function HeroVideoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[500px] md:min-h-[600px] h-full relative
       lg:border-[1px] lg:border-zinc-700/50
      lg:rounded-3xl overflow-hidden
      "
    >
      {/* Video with liquid distortion shader applied directly */}
      <LiquidVideoShader
        videoSrc="/videos/hero-video.mp4"
        className="rounded-3xl"
        containerRef={containerRef}
      />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-3xl z-10 pointer-events-none" />


      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="text-center px-6 pointer-events-auto">
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
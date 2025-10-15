"use client";

import React, { useRef, useState, useEffect } from 'react';
import ShaderText from '@/components/ShaderText';
import LiquidVideoShader from './LiquidVideoShader';

/**
 * Hero video section with liquid distortion shader
 * Brand identity with essential info
 * Shader only on large screens (lg+) with mouse/touchpad support
 * Priority: Screen size FIRST, then mouse detection
 */
export default function HeroVideoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldUseShader, setShouldUseShader] = useState(false);

  useEffect(() => {
    const checkShaderSupport = () => {
      // PRIORITY 1: Screen size must be >= lg (1024px)
      const isLargeScreen = window.innerWidth >= 1024;

      // PRIORITY 2: Device must have mouse/touchpad support
      const hasMouseSupport = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      // Enable shader ONLY if BOTH conditions are met
      setShouldUseShader(isLargeScreen && hasMouseSupport);
    };

    checkShaderSupport();
    window.addEventListener('resize', checkShaderSupport);

    return () => window.removeEventListener('resize', checkShaderSupport);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[500px] md:min-h-[600px] h-full relative
       lg:border-[1px] lg:border-zinc-700/50
      lg:rounded-3xl overflow-hidden
      "
    >
      {/* Large screen + Mouse/Touchpad: Shader video with interactive effects */}
      {shouldUseShader && (
        <LiquidVideoShader
          videoSrc="/videos/hero-video-hq.mp4"
          className="rounded-3xl"
          containerRef={containerRef}
        />
      )}

      {/* Small screens OR touch-only devices: Plain video for better performance */}
      {!shouldUseShader && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
        >
          <source src="/videos/hero-video-hq.mp4" type="video/mp4" />
        </video>
      )}

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
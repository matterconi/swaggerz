"use client"

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const RebkonHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-zinc-950 overflow-hidden font-jost max-lg:py-16">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black opacity-80"></div>
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-red-500/5 to-orange-500/5 rounded-full blur-3xl"></div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-24 items-center justify-center w-full">
          
          {/* Text Content */}
          <div className="space-y-12">
            {/* Top indicator */}
            <div 
              className={`transform transition-all duration-1000 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-gradient-to-r from-red-500 to-orange-500"></div>
                <span className="text-zinc-400 tracking-[0.25em] uppercase text-xs font-medium">
                  Streetwear × Arte Urbana
                </span>
              </div>
            </div>
            
            {/* Main Title */}
            <h1 
              className={`transform transition-all duration-1000 delay-200 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                lineHeight: '0.85',
                fontWeight: '800'
              }}
            >
              <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent py-4 lg:py-8">
                Swaggerz
              </span>
              <span className="block text-white mt-2 font-light tracking-tight">
                Collective
              </span>
            </h1>
            
            {/* Description */}
            <div 
              className={`space-y-8 transform transition-all duration-1000 delay-400 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <p className="text-xl text-zinc-300 max-w-lg leading-relaxed font-light">
                Abbigliamento che unisce cultura della strada e arte contemporanea. 
                <span className="text-white font-medium"> Espressione autentica</span> per chi vive la città.
              </p>
              
              {/* Stats inline */}
              <div className="flex items-center gap-12 text-sm text-zinc-400">
                <div className="flex flex-col group cursor-default">
                  <span className="text-white text-2xl font-bold tracking-tight group-hover:text-orange-400 transition-colors duration-300">500+</span>
                  <span className="text-xs uppercase tracking-wider">Designs</span>
                </div>
                <div className="w-px h-12 bg-zinc-700"></div>
                <div className="flex flex-col group cursor-default">
                  <span className="text-white text-lg font-semibold group-hover:text-orange-400 transition-colors duration-300">Est. 2020</span>
                  <span className="text-xs uppercase tracking-wider">Milano</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div 
              className={`transform transition-all duration-1000 delay-600 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <button className="group relative overflow-hidden px-10 py-5 bg-white text-black font-semibold uppercase tracking-wide text-sm hover:bg-zinc-100 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <span className="relative flex items-center gap-3">
                  Esplora la collezione
                  <ArrowRight 
                    size={18} 
                    className="group-hover:translate-x-2 transition-transform duration-300" 
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Visual Content - Migliorato ma sobrio */}
          <div className="relative w-full max-w-lg mx-auto max-sm:w-[80vw]">
            {/* Frame minimalista */}
            <div className="absolute -inset-6 opacity-20">
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-orange-500"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-red-500"></div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden group">
              {/* Immagine principale */}
              <Image
                src="/rebkon-hero-image.jpeg"
                alt="Swaggerz Collective - Urban Streetwear"
                fill
                className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
              />
              
              {/* Overlay sottile per contrasto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
              
              {/* Typography sovrapposta - più pulita */}
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                
                {/* Badge in alto */}
                <div className="flex justify-between items-start">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20">
                    <span className="text-white text-xs font-bold tracking-wider uppercase">New Collection</span>
                  </div>
                </div>

                {/* Testo centrale */}
                <div className="text-center">
                  <div className="transform group-hover:scale-105 transition-transform duration-500">
                    <span className="block text-5xl font-black tracking-wider text-white mb-2 drop-shadow-2xl">
                      STREET
                    </span>
                    <span className="block text-zinc-300 font-light tracking-[0.4em] text-sm uppercase">
                      CULTURE
                    </span>
                  </div>
                </div>

                {/* Info in basso */}
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <p className="text-white text-sm font-semibold">Urban Collection</p>
                    <p className="text-zinc-300 text-xs">Limited Drop</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2">
                    <span className="text-white font-bold text-sm">€39-89</span>
                  </div>
                </div>
              </div>

              {/* Bordi accent sottili */}
              <div className="absolute top-0 left-0 w-1 h-24 bg-gradient-to-b from-red-500 to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-24 h-1 bg-gradient-to-l from-orange-500 to-transparent"></div>
            </div>

            {/* Ombra proiettata */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-2/3 h-6 bg-red-500/10 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RebkonHero;
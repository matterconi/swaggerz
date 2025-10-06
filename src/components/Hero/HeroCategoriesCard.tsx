"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

interface HeroCategoriesCardProps {
  onHover: () => void;
  onLeave: () => void;
}

const HeroCategoriesCard: React.FC<HeroCategoriesCardProps> = ({ onHover, onLeave }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const products = [
    {
      name: 'Classic Tee',
      category: 'T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      price: '29.99€'
    },
    {
      name: 'Urban Hoodie',
      category: 'Felpe',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
      price: '59.99€'
    },
    {
      name: 'Joggers',
      category: 'Pantaloni',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop',
      price: '49.99€'
    },
    {
      name: 'Winter Jacket',
      category: 'Giubbotti',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
      price: '89.99€'
    },
    {
      name: 'Graphic Tee',
      category: 'T-Shirt',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop',
      price: '34.99€'
    },
    {
      name: 'Zip Hoodie',
      category: 'Felpe',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop',
      price: '64.99€'
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div
      className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-4 lg:p-6 border border-zinc-800/50 overflow-hidden hover:border-zinc-700/50 transition-all duration-500 h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <div>
            <h3 className="text-white text-xl lg:text-2xl font-bold mb-1">
              Abbigliamento
            </h3>
            <p className="text-zinc-400 text-sm hidden lg:block">Scopri i nostri prodotti più venduti</p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={`p-2 lg:p-2.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-all duration-300 border border-zinc-700/30 ${
                !canScrollPrev ? 'opacity-40 cursor-not-allowed' : ''
              }`}
              aria-label="Scorri a sinistra"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={`p-2 lg:p-2.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-all duration-300 border border-zinc-700/30 ${
                !canScrollNext ? 'opacity-40 cursor-not-allowed' : ''
              }`}
              aria-label="Scorri a destra"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Slider */}
        <div className="relative flex-1 overflow-hidden">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex gap-4 lg:gap-5 h-full pb-2">
              {products.map((product, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex-grow-0 basis-[180px] lg:basis-[220px] h-full group/cat cursor-pointer"
                >
                  <div className="relative h-full bg-zinc-800/30 rounded-2xl overflow-hidden hover:bg-zinc-800/50 transition-all duration-300 border border-zinc-800/30 hover:border-zinc-700/50 flex flex-col">
                    {/* Image - Takes all available space */}
                    <div className="relative w-full flex-grow overflow-hidden min-h-[200px] md:min-h-[250px] lg:min-h-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover/cat:scale-110 transition-transform duration-500"
                        sizes="(max-width: 1024px) 180px, 220px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />

                      {/* Hover Overlay with Text */}
                      <div className="absolute inset-0 bg-black/75 opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center px-3">
                          <p className="text-white font-bold text-base lg:text-lg mb-2">{product.name}</p>
                          <p className="text-zinc-200 text-sm lg:text-base font-medium">{product.price}</p>
                        </div>
                      </div>
                    </div>

                    {/* Info - Fixed at bottom */}
                    <div className="flex-shrink-0 p-3 lg:p-4 bg-zinc-900/50">
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <p className="text-sm lg:text-base text-white font-semibold truncate mb-1">
                        {product.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm lg:text-base text-zinc-300 font-medium">{product.price}</p>
                        <div className="flex items-center gap-1 text-zinc-400 group-hover/cat:text-white transition-all duration-300">
                          <span className="text-xs font-medium">Scopri</span>
                          <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover/cat:translate-x-0.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Fade Edges */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-12 lg:w-16 bg-gradient-to-r from-zinc-900 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
              !canScrollPrev ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`absolute right-0 top-0 bottom-0 w-12 lg:w-16 bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
              !canScrollNext ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCategoriesCard;
"use client"

import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  name: string;
  category: string;
  image: string;
  price: string;
}

const ProductShowcase: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      name: 'Classic White Tee',
      category: 'T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
      price: '29.99€'
    },
    {
      name: 'Urban Hoodie',
      category: 'Felpe',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
      price: '59.99€'
    },
    {
      name: 'Comfort Joggers',
      category: 'Pantaloni',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
      price: '49.99€'
    },
    {
      name: 'Winter Jacket',
      category: 'Giubbotti',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
      price: '89.99€'
    },
    {
      name: 'Graphic Tee',
      category: 'T-Shirt',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop',
      price: '34.99€'
    },
    {
      name: 'Zip Hoodie',
      category: 'Felpe',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop',
      price: '64.99€'
    },
    {
      name: 'Denim Jeans',
      category: 'Pantaloni',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop',
      price: '69.99€'
    },
    {
      name: 'Bomber Jacket',
      category: 'Giubbotti',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
      price: '99.99€'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Categorie Popolari</h2>
            <p className="text-zinc-400">Scopri i nostri prodotti più venduti</p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-white transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600/50"
              aria-label="Scorri a sinistra"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-white transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600/50"
              aria-label="Scorri a destra"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Slider */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] group cursor-pointer"
              >
                <div className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative w-full h-[380px] overflow-hidden bg-zinc-800">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="280px"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-zinc-300 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-zinc-400 font-medium">{product.price}</p>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductShowcase;
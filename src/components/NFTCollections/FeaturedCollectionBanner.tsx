"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ShaderText from '@/components/ShaderText';
import useEmblaCarousel from 'embla-carousel-react';

// Dati delle collezioni
const collections = [
  {
    id: 1,
    badge: "Collezione Primavera",
    badgeColor: "emerald",
    title: "Urban Streetwear",
    subtitle: "Spring Collection",
    description: "Scopri la nuova collezione di abbigliamento streetwear. Ogni acquisto include un NFT esclusivo autenticato sulla blockchain.",
    price: "€89",
    pieces: "150",
    nftLabel: "+ NFT",
    href: "/collection/urban-streetwear",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80"
    ],
    gradientFrom: "emerald-500/25",
    gradientVia: "green-500/15",
    accentGradient: "from-green-400/10 via-emerald-500/12 to-teal-500/10",
    buttonGradient: "bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#111111_50%,#10b981_100%)]",
    buttonHoverColor: "#10b981"
  },
  {
    id: 2,
    badge: "Collezione Estate",
    badgeColor: "cyan",
    title: "Summer Vibes",
    subtitle: "Beach Collection",
    description: "Abbigliamento estivo premium con design unici. Ottieni il tuo NFT digitale che certifica l'autenticità del prodotto.",
    price: "€69",
    pieces: "200",
    nftLabel: "+ NFT",
    href: "/collection/summer-vibes",
    images: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80"
    ],
    gradientFrom: "cyan-500/25",
    gradientVia: "blue-500/15",
    accentGradient: "from-cyan-400/10 via-blue-500/12 to-sky-500/10",
    buttonGradient: "bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#111111_50%,#06b6d4_100%)]",
    buttonHoverColor: "#06b6d4"
  },
  {
    id: 3,
    badge: "Collezione Autunno",
    badgeColor: "orange",
    title: "Cozy Essentials",
    subtitle: "Fall Collection",
    description: "Capi essenziali per l'autunno con materiali premium. Certificato NFT incluso per garantire l'esclusività del tuo acquisto.",
    price: "€99",
    pieces: "120",
    nftLabel: "+ NFT",
    href: "/collection/cozy-essentials",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80"
    ],
    gradientFrom: "orange-500/25",
    gradientVia: "amber-500/15",
    accentGradient: "from-orange-400/10 via-amber-500/12 to-yellow-500/10",
    buttonGradient: "bg-[conic-gradient(from_90deg_at_50%_50%,#f97316_0%,#111111_50%,#f97316_100%)]",
    buttonHoverColor: "#f97316"
  },
  {
    id: 4,
    badge: "Collezione Inverno",
    badgeColor: "purple",
    title: "Winter Luxe",
    subtitle: "Premium Collection",
    description: "Eleganza invernale con tecnologia blockchain. Ogni capo è accompagnato da un NFT che garantisce autenticità e rarità.",
    price: "€129",
    pieces: "80",
    nftLabel: "+ NFT",
    href: "/collection/winter-luxe",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80"
    ],
    gradientFrom: "purple-500/25",
    gradientVia: "violet-500/15",
    accentGradient: "from-purple-400/10 via-violet-500/12 to-fuchsia-500/10",
    buttonGradient: "bg-[conic-gradient(from_90deg_at_50%_50%,#a855f7_0%,#111111_50%,#a855f7_100%)]",
    buttonHoverColor: "#a855f7"
  }
];

interface FeaturedCollectionBannerProps {
  section?: 'full' | 'upper' | 'lower';
}

export default function FeaturedCollectionBanner({ section = 'full' }: FeaturedCollectionBannerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const collection = collections[selectedIndex];

  // Render Upper Section (Text Content Only)
  if (section === 'upper') {
    return (
      <motion.div
        className="relative w-full h-full overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated gradient orbs */}
        <motion.div
          className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-${collection.gradientFrom} via-${collection.gradientVia} to-transparent rounded-full blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative h-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">

          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {collection.title}
            </h2>
             <motion.p
            className="text-lg text-zinc-300 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {collection.description}
          </motion.p>
          </motion.div>
           <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 h-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {collection.images.map((image, index) => (
              <motion.div
                key={index}
                className="relative rounded-2xl overflow-hidden group border border-zinc-800"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 + index * 0.05 }}
              >
                <Image
                  src={image}
                  alt={`${collection.title} Product ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Render Lower Section (Image Grid Only)
  if (section === 'lower') {
    return (
      <motion.div
        className="relative w-full h-full overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative h-full px-4 sm:px-6 lg:px-8 py-8">

          <motion.div
            className="flex flex-wrap items-center gap-6 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <div>
              <p className="text-sm text-zinc-400 mb-1">A partire da</p>
              <p className="text-2xl font-bold text-white">{collection.price}</p>
            </div>
            <div className="w-px h-12 bg-zinc-700" />
            <div>
              <p className="text-sm text-zinc-400 mb-1">Pezzi</p>
              <p className="text-2xl font-bold text-white">{collection.pieces}</p>
            </div>
            <div className="w-px h-12 bg-zinc-700" />
            <div>
              <p className="text-sm text-zinc-400 mb-1">Limited Edition</p>
              <p className={`text-2xl font-bold text-${collection.badgeColor}-400`}>{collection.nftLabel}</p>
            </div>
          </motion.div>

          <motion.button
            className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-${collection.badgeColor}-500/40 focus:ring-offset-2 focus:ring-offset-zinc-950 w-fit`}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = collection.href}
          >
            <span className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] ${collection.buttonGradient}`} />
            <motion.span
              className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 backdrop-blur-3xl overflow-hidden relative bg-zinc-950"
              whileHover={{ backgroundColor: collection.buttonHoverColor }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                Shop Now
                <ChevronRight className="w-4 h-4" />
              </span>
            </motion.span>
          </motion.button>
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-800/80 transition-all"
          onClick={scrollPrev}
          aria-label="Previous collection"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-800/80 transition-all"
          onClick={scrollNext}
          aria-label="Next collection"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
    );
  }

  // Render Full Section (Original Layout)
  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {collections.map((collection) => (
            <div key={collection.id} className="flex-[0_0_100%] min-w-0">
              <motion.div
                className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-3xl border border-zinc-700/50 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black mx-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                {/* Animated gradient orbs */}
                <motion.div
                  className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-${collection.gradientFrom} via-${collection.gradientVia} to-transparent rounded-full blur-3xl`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <motion.div
                  className={`absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-${collection.gradientFrom} via-${collection.gradientVia} to-transparent rounded-full blur-3xl`}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />

                {/* Center accent glow */}
                <motion.div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br ${collection.accentGradient} rounded-full blur-3xl`}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.6, 0.4]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Content */}
                <div className="relative h-full px-4 sm:px-6 lg:px-8 py-8 md:py-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-full">
                    {/* Left Content */}
                    <motion.div
                      className="flex flex-col justify-center h-full"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <motion.div
                        className={`inline-block px-4 py-2 bg-${collection.badgeColor}-500/20 backdrop-blur-sm border border-${collection.badgeColor}-500/50 rounded-full mb-6`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <span className={`text-${collection.badgeColor}-300 text-sm font-semibold uppercase tracking-wider`}>
                          {collection.badge}
                        </span>
                      </motion.div>

                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.25 }}
                      >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                          {collection.title}
                        </h2>
                        <ShaderText fontSize="48px" fontWeight="900">
                          {collection.subtitle}
                        </ShaderText>
                      </motion.div>

                      <motion.p
                        className="text-xl text-zinc-300 mb-8 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        {collection.description}
                      </motion.p>

                      <motion.div
                        className="flex flex-wrap items-center gap-6 mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.35 }}
                      >
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">A partire da</p>
                          <p className="text-3xl font-bold text-white">{collection.price}</p>
                        </div>
                        <div className="w-px h-12 bg-zinc-700" />
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">Pezzi</p>
                          <p className="text-3xl font-bold text-white">{collection.pieces}</p>
                        </div>
                        <div className="w-px h-12 bg-zinc-700" />
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">Limited Edition</p>
                          <p className={`text-3xl font-bold text-${collection.badgeColor}-400`}>{collection.nftLabel}</p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <motion.button
                          className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-${collection.badgeColor}-500/40 focus:ring-offset-2 focus:ring-offset-zinc-950`}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.location.href = collection.href}
                        >
                          {/* Animated rotating gradient border */}
                          <span className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] ${collection.buttonGradient}`} />

                          {/* Button content */}
                          <motion.span
                            className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 backdrop-blur-3xl overflow-hidden relative bg-zinc-950"
                            whileHover={{ backgroundColor: collection.buttonHoverColor }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                              Shop Now
                              <ChevronRight className="w-4 h-4" />
                            </span>
                          </motion.span>
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    {/* Right Image Grid */}
                    <motion.div
                      className="grid grid-cols-2 gap-3 h-full"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      {collection.images.slice(0, 4).map((image, index) => (
                        <motion.div
                          key={index}
                          className={`relative rounded-2xl overflow-hidden group border border-zinc-800 ${
                            index < 2 ? 'row-span-1' : 'row-span-1'
                          }`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.25 + index * 0.05 }}
                        >
                          <Image
                            src={image}
                            alt={`${collection.title} Product ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-800/80 transition-all"
        onClick={scrollPrev}
        aria-label="Previous collection"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-800/80 transition-all"
        onClick={scrollNext}
        aria-label="Next collection"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {collections.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex ? 'bg-white w-8' : 'bg-zinc-600'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to collection ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ShaderText from '@/components/ShaderText';
import useEmblaCarousel from 'embla-carousel-react';
import AnimatedGradientOrb from './AnimatedGradientOrb';
import CollectionBadge from './CollectionBadge';
import CollectionStats from './CollectionStats';
import ShopButton from './ShopButton';
import ImageGrid from './ImageGrid';
import NavigationButton from './NavigationButton';
import DotsIndicator from './DotsIndicator';

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
        <AnimatedGradientOrb
          position="top-right"
          gradientFrom={collection.gradientFrom}
          gradientVia={collection.gradientVia}
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

          <ImageGrid
            images={collection.images}
            title={collection.title}
            columns={4}
          />
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
          <CollectionStats
            price={collection.price}
            pieces={collection.pieces}
            nftLabel={collection.nftLabel}
            badgeColor={collection.badgeColor}
            size="small"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-6"
          >
            <ShopButton
              badgeColor={collection.badgeColor}
              buttonGradient={collection.buttonGradient}
              buttonHoverColor={collection.buttonHoverColor}
              href={collection.href}
            />
          </motion.div>
        </div>

        <NavigationButton direction="prev" onClick={scrollPrev} size="small" />
        <NavigationButton direction="next" onClick={scrollNext} size="small" />
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
                <AnimatedGradientOrb
                  position="top-right"
                  gradientFrom={collection.gradientFrom}
                  gradientVia={collection.gradientVia}
                />

                <AnimatedGradientOrb
                  position="bottom-left"
                  gradientFrom={collection.gradientFrom}
                  gradientVia={collection.gradientVia}
                  delay={1}
                />

                <AnimatedGradientOrb
                  position="center"
                  gradientFrom={collection.accentGradient}
                  gradientVia={collection.accentGradient}
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
                      <CollectionBadge
                        badge={collection.badge}
                        badgeColor={collection.badgeColor}
                      />

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

                      <div className="mb-8">
                        <CollectionStats
                          price={collection.price}
                          pieces={collection.pieces}
                          nftLabel={collection.nftLabel}
                          badgeColor={collection.badgeColor}
                        />
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <ShopButton
                          badgeColor={collection.badgeColor}
                          buttonGradient={collection.buttonGradient}
                          buttonHoverColor={collection.buttonHoverColor}
                          href={collection.href}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Right Image Grid */}
                    <ImageGrid
                      images={collection.images.slice(0, 4)}
                      title={collection.title}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <NavigationButton direction="prev" onClick={scrollPrev} />
      <NavigationButton direction="next" onClick={scrollNext} />

      <DotsIndicator
        totalDots={collections.length}
        selectedIndex={selectedIndex}
        onDotClick={(index) => emblaApi?.scrollTo(index)}
      />
    </div>
  );
}

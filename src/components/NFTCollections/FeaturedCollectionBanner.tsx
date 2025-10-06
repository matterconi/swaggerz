"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import ShaderText from '@/components/ShaderText';

export default function FeaturedCollectionBanner() {
  return (
    <motion.div
      className="relative w-full min-h-[600px] overflow-hidden rounded-2xl md:rounded-3xl border border-zinc-700/50 mb-8 md:mb-10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated gradient orbs - tema verde */}
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-500/25 via-green-500/15 to-transparent rounded-full blur-3xl"
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
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-emerald-600/25 via-teal-500/15 to-transparent rounded-full blur-3xl"
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

      {/* Center accent glow - tema verde */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-green-400/10 via-emerald-500/12 to-teal-500/10 rounded-full blur-3xl"
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
      <div className="relative h-full px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="inline-block px-4 py-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/50 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="text-emerald-300 text-sm font-semibold uppercase tracking-wider">Collezione Primavera</span>
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Urban Streetwear
              </h2>
              <ShaderText fontSize="48px" fontWeight="900">
                Spring Collection
              </ShaderText>
            </motion.div>

            <motion.p
              className="text-xl text-zinc-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Scopri la nuova collezione di abbigliamento streetwear.
              Ogni acquisto include un NFT esclusivo autenticato sulla blockchain.
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
                <p className="text-3xl font-bold text-white">€89</p>
              </div>
              <div className="w-px h-12 bg-zinc-700" />
              <div>
                <p className="text-sm text-zinc-400 mb-1">Pezzi</p>
                <p className="text-3xl font-bold text-white">150</p>
              </div>
              <div className="w-px h-12 bg-zinc-700" />
              <div>
                <p className="text-sm text-zinc-400 mb-1">Limited Edition</p>
                <p className="text-3xl font-bold text-emerald-400">+ NFT</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <motion.button
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 focus:ring-offset-zinc-950"
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/collection/urban-streetwear'}
              >
                {/* Animated rotating gradient border */}
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#111111_50%,#10b981_100%)]" />

                {/* Button content */}
                <motion.span
                  className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 backdrop-blur-3xl overflow-hidden relative bg-zinc-950"
                  whileHover={{ backgroundColor: '#10b981' }}
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
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <motion.div
              className="relative h-72 rounded-2xl overflow-hidden group border border-zinc-800"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80"
                alt="Product 1"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            <motion.div
              className="relative h-72 rounded-2xl overflow-hidden group mt-8 border border-zinc-800"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80"
                alt="Product 2"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            <motion.div
              className="relative h-72 rounded-2xl overflow-hidden group -mt-8 border border-zinc-800"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
                alt="Product 3"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            <motion.div
              className="relative h-72 rounded-2xl overflow-hidden group border border-zinc-800"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80"
                alt="Product 4"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

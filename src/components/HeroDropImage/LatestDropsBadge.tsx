"use client"

import React from 'react';
import { motion } from 'framer-motion';

const DropHeader: React.FC = () => {
  return (
    <div className="absolute top-0 right-0 ">
      <motion.div
        className="relative"
        initial={{ x: 50, opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.320, 1] }}
      >

        {/* Container principale arrotondato - più grande e visibile */}
        <div className="relative bg-zinc-950 backdrop-blur-md px-6 md:px-8 py-3 md:py-4 rounded-bl-3xl border-b border-l border-zinc-800/50 shadow-2xl shadow-green-500/30 overflow-hidden">
          {/* Angoli tech decorativi arrotondati - più grandi */}
          <div className="absolute top-3 left-3 w-3 h-3 border-l-[3px] border-t-[3px] border-green-400 rounded-tl-xl"></div>
          <div className="absolute top-3 right-3 w-3 h-3 border-r-[3px] border-t-[3px] border-green-400 rounded-tr-xl"></div>
          <div className="absolute bottom-3 left-3 w-3 h-3 border-l-[3px] border-b-[3px] border-green-400 rounded-bl-xl"></div>
          <div className="absolute bottom-3 right-3 w-3 h-3 border-r-[3px] border-b-[3px] border-green-400 rounded-br-xl"></div>
          
          {/* Contenuto */}
          <div className="relative flex items-center gap-3 md:gap-4">
            {/* Indicatore status con pulse - più piccolo */}
            <div className="relative">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 4px rgba(34, 197, 94, 0.6)',
                    '0 0 12px rgba(34, 197, 94, 1)',
                    '0 0 4px rgba(34, 197, 94, 0.6)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 w-2 h-2 bg-green-300 rounded-full"
                animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
            </div>

            {/* Separatore tech arrotondato */}
            <div className="w-px h-5 md:h-6 bg-gradient-to-b from-transparent via-green-400/80 to-transparent rounded-full shadow-sm shadow-green-400/50"></div>

            {/* Testo principale - più grande */}
            <motion.span
              className="text-green-400 text-xs md:text-sm font-mono font-black tracking-[0.2em] md:tracking-[0.25em] uppercase whitespace-nowrap"
              animate={{
                textShadow: [
                  '0 0 8px rgba(34, 197, 94, 0.5)',
                  '0 0 16px rgba(34, 197, 94, 0.9)',
                  '0 0 8px rgba(34, 197, 94, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="hidden sm:inline">LATEST DROPS</span>
              <span className="sm:hidden">NEW</span>
            </motion.span>

            {/* Separatore tech arrotondato - solo desktop */}
            <div className="hidden md:block w-px h-6 bg-gradient-to-b from-transparent via-green-400/80 to-transparent rounded-full shadow-sm shadow-green-400/50"></div>

            {/* Indicatore live - più visibile */}
            <motion.span
              className="hidden md:inline text-green-300 text-xs font-mono font-black tracking-wider"
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [0.98, 1.02, 0.98]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              [LIVE]
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DropHeader;
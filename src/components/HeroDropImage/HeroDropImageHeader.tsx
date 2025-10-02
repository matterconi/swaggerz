"use client"

import React from 'react';
import { motion } from 'framer-motion';

const DropHeader: React.FC = () => {
  return (
    <div className="relative mb-8 w-full flex justify-center lg:justify-end">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.320, 1] }}
      >
        {/* Container principale arrotondato */}
        <div className="relative bg-black/80 backdrop-blur-sm border border-green-500/30 px-6 py-3 rounded-xl">
          {/* Angoli tech decorativi arrotondati */}
          <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-green-400 rounded-tl-lg"></div>
          <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-green-400 rounded-tr-lg"></div>
          <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-green-400 rounded-bl-lg"></div>
          <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-green-400 rounded-br-lg"></div>
          
          {/* Contenuto */}
          <div className="relative flex items-center gap-3">
            {/* Indicatore status con pulse */}
            <div className="relative">
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ 
                  boxShadow: [
                    '0 0 4px rgba(34, 197, 94, 0.4)',
                    '0 0 12px rgba(34, 197, 94, 0.8)',
                    '0 0 4px rgba(34, 197, 94, 0.4)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            {/* Separatore tech arrotondato */}
            <div className="w-px h-4 bg-gradient-to-b from-transparent via-green-400/60 to-transparent rounded-full"></div>
            
            {/* Testo principale */}
            <motion.span 
              className="text-green-400 text-xs font-mono font-bold tracking-[0.2em] uppercase"
              animate={{ 
                textShadow: [
                  '0 0 4px rgba(34, 197, 94, 0.3)',
                  '0 0 8px rgba(34, 197, 94, 0.6)',
                  '0 0 4px rgba(34, 197, 94, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              LATEST DROPS
            </motion.span>
            
            {/* Separatore tech arrotondato */}
            <div className="w-px h-4 bg-gradient-to-b from-transparent via-green-400/60 to-transparent rounded-full"></div>
            
            {/* Indicatore live */}
            <motion.span 
              className="text-green-300/80 text-[10px] font-mono font-bold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              [LIVE]
            </motion.span>
          </div>
          
          {/* Glow effect arrotondato */}
          <motion.div 
            className="absolute inset-0 bg-green-400/5 rounded-xl"
            animate={{ 
              boxShadow: [
                '0 0 10px rgba(34, 197, 94, 0.1)',
                '0 0 20px rgba(34, 197, 94, 0.2)',
                '0 0 10px rgba(34, 197, 94, 0.1)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default DropHeader;
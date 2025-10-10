"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LatestDropsBadge: React.FC = () => {
  // Timer countdown state
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset to 24 hours when countdown ends
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute -top-1 -right-1 z-[100]">
      <motion.div
        className="relative"
        initial={{ x: 50, opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.320, 1] }}
      >
        {/* Container principale arrotondato */}
        <div className="relative bg-zinc-950 backdrop-blur-md rounded-bl-3xl border-b border-l border-zinc-800/50">
          <div className='relative w-full h-full px-8 py-6'>
            {/* Angoli tech decorativi più spessi */}
            <div className="absolute top-3 left-3 w-3 h-3 border-l-[3px] border-t-[3px] border-green-400 rounded-tl-lg"></div>
            <div className="absolute top-3 right-3 w-3 h-3 border-r-[3px] border-t-[3px] border-green-400 rounded-tr-lg"></div>
            <div className="absolute bottom-3 left-3 w-3 h-3 border-l-[3px] border-b-[3px] border-green-400 rounded-bl-lg"></div>
            <div className="absolute bottom-3 right-3 w-3 h-3 border-r-[3px] border-b-[3px] border-green-400 rounded-br-lg"></div>

            {/* Contenuto verticale */}
            <div className="relative flex flex-col gap-4">
              {/* Row 1: DROP SALE + LIVE */}
              <div className="flex items-center gap-4">
                {/* Indicatore status con pulse verde più veloce */}
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
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 w-2 h-2 bg-green-300 rounded-full"
                    animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                </div>

                {/* Separatore più marcato */}
                <div className="w-0.5 h-5 bg-gradient-to-b from-transparent via-green-400/80 to-transparent rounded-full"></div>

                {/* Testo più grande */}
                <motion.span
                  className="text-green-400 text-sm font-mono font-black tracking-[0.2em] uppercase whitespace-nowrap"
                  animate={{
                    textShadow: [
                      '0 0 8px rgba(34, 197, 94, 0.5)',
                      '0 0 16px rgba(34, 197, 94, 0.9)',
                      '0 0 8px rgba(34, 197, 94, 0.5)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  DROP SALE
                </motion.span>

                {/* Separatore più marcato */}
                <div className="w-0.5 h-5 bg-gradient-to-b from-transparent via-green-400/80 to-transparent rounded-full"></div>

                {/* Live indicator più veloce e visibile */}
                <motion.span
                  className="text-green-300 text-xs font-mono font-black tracking-wider"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [0.98, 1.02, 0.98]
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  [LIVE]
                </motion.span>
              </div>

              {/* Divider verde */}
              <div className="h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
            </div>
          </div>

          <div className="flex items-center gap-4 px-8 pb-6">
            {/* Testo più grande */}
            <motion.span
              className="text-red-400 text-xs font-mono font-bold tracking-[0.15em] uppercase"
              animate={{
                opacity: [0.7, 1, 0.7],
                textShadow: [
                  '0 0 8px rgba(239, 68, 68, 0.5)',
                  '0 0 14px rgba(239, 68, 68, 0.9)',
                  '0 0 8px rgba(239, 68, 68, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SALE ENDS IN
            </motion.span>

            {/* Timer più grande */}
            <div className="flex items-center gap-1">
              <span className="text-white text-base font-mono font-black">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <motion.span
                className="text-white/60 text-base font-mono font-black"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                :
              </motion.span>
              <span className="text-white text-base font-mono font-black">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <motion.span
                className="text-white/60 text-base font-mono font-black"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                :
              </motion.span>
              <span className="text-white text-base font-mono font-black">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LatestDropsBadge;
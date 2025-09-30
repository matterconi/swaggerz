import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';

interface CollectionInfoOverlayProps {
  collection: any;
  currentCollection: number;
}

const CollectionInfoOverlay: React.FC<CollectionInfoOverlayProps> = ({
  collection,
  currentCollection
}) => {
  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={`overlay-${currentCollection}`}
        className="absolute inset-0 flex flex-col justify-between p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top: DropHeader Component */}
        <div className="text-right">
          <div className="relative">
            <div className="relative">
              {/* Container principale arrotondato */}
              <div className="relative bg-black/80 backdrop-blur-sm border border-green-500/30 px-6 py-3 rounded-xl inline-block">
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
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
            </div>
          </div>
        </div>

        {/* Bottom: Drop Info */}
        <motion.div 
          className="space-y-4 py-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.23, 1, 0.320, 1] }}
        >
          {/* Drop Name and Explore Button */}
          <div className="flex items-end justify-between">
            <div className="space-y-3 flex-1">
              <motion.span
                className="block text-2xl lg:text-3xl font-black text-white drop-shadow-2xl tracking-tight leading-none"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.23, 1, 0.320, 1] }}
              >
                {collection.name}
              </motion.span>
              <motion.span
                className="block text-zinc-300 text-xs lg:text-sm font-medium leading-relaxed max-w-[75%]"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.23, 1, 0.320, 1] }}
              >
                {collection.description}
              </motion.span>
            </div>

            {/* Prezzo e CTA integrata */}
            <motion.div
              className="flex flex-col items-end gap-2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6, ease: [0.23, 1, 0.320, 1] }}
            >
              <span className="text-orange-400 text-xl lg:text-2xl font-black">
                {collection.price}
              </span>
              
              {/* CTA minimalista integrata */}
              <motion.div
                className="group flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 cursor-pointer"
                whileHover={{ x: 3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Navigating to ${collection.name} collection`);
                }}
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300">
                  <Eye size={12} className="text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                </div>
                
                <span className="text-xs font-medium uppercase tracking-wider group-hover:tracking-widest transition-all duration-300">
                  VEDI
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CollectionInfoOverlay;
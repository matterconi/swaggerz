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
        {/* Top: Category Badge */}
        <motion.div 
          className="text-right"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.23, 1, 0.320, 1] }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-zinc-900/90 to-black/90 backdrop-blur-md border border-orange-500/60 rounded-lg shadow-xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(249, 115, 22, 0.4)",
              borderColor: "rgba(249, 115, 22, 0.8)"
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-white text-xs font-bold tracking-widest uppercase">
              {collection.category}
            </span>
          </motion.div>
        </motion.div>

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
import React from 'react';
import { motion } from 'framer-motion';

const CrosshairOverlay: React.FC = () => {
  return (
    <motion.div 
      className="absolute -inset-3 z-30 pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      <div className="relative w-full h-full">
        {/* Angoli crosshair con stagger animation */}
        {[
          { position: "top-0 left-0", corners: "border-l-3 border-t-3 rounded-tl-lg", delay: 0 },
          { position: "top-0 right-0", corners: "border-r-3 border-t-3 rounded-tr-lg", delay: 0.1 },
          { position: "bottom-0 left-0", corners: "border-l-3 border-b-3 rounded-bl-lg", delay: 0.3 },
          { position: "bottom-0 right-0", corners: "border-r-3 border-b-3 rounded-br-lg", delay: 0.2 }
        ].map((corner, index) => (
          <motion.div
            key={index}
            className={`absolute ${corner.position} w-6 h-6 ${corner.corners} border-red-500`}
            style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.8))' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: corner.delay + 0.4, 
              ease: [0.23, 1, 0.320, 1] 
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CrosshairOverlay;
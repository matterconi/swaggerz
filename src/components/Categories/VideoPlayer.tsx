import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoData {
  src: string;
  subtitle: string;
}

interface VideoPlayerProps {
  videoData: VideoData[];
  currentVideo: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoData, currentVideo }) => {
  return (
    <div className="lg:w-1/2 lg:h-full lg:sticky lg:top-0 flex items-center justify-center bg-black p-4 lg:p-16">
      <motion.div
        className="relative w-full h-full max-w-none"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Video Player - Now takes full available space */}
        <div className="relative w-full h-full bg-zinc-900 rounded-xl overflow-hidden">
          <motion.video
            key={currentVideo}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <source src={videoData[currentVideo]?.src} type="video/mp4" />
          </motion.video>
          
          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 lg:w-20 lg:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer border border-white/20"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6 lg:w-8 lg:h-8 text-white ml-1" fill="currentColor" />
            </motion.div>
          </div>
          
          {/* Video Info Overlay */}
          <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6">
            <motion.div
              key={currentVideo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white"
            >
              <p className="text-xs lg:text-sm text-zinc-400 mb-1 tracking-wider uppercase">
                {videoData[currentVideo]?.src.split('/').pop() || 'Unknown'}
              </p>
              <h3 className="text-base lg:text-xl font-medium">
                {videoData[currentVideo]?.subtitle || 'No subtitle available'}
              </h3>
            </motion.div>
          </div>
          
          {/* Progress Indicator */}
          <div className="absolute top-4 lg:top-6 right-4 lg:right-6">
            <div className="flex flex-col lg:flex-row items-center gap-2">
              {videoData.map((_, index: number) => (
                <motion.div
                  key={index}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentVideo
                      ? 'w-2 h-6 lg:w-8 lg:h-1 bg-white'
                      : 'w-2 h-2 lg:w-2 lg:h-1 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoPlayer;
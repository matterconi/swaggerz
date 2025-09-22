// components/Categories/index.tsx
"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useScrollVideo } from '@/hooks/useScrollVideo';
import VideoPlayer from './VideoPlayer';
import { FixedTextSection, scrollConfig } from './TextSection';
import { ProgressIndicator } from './ProgressIndicator';
import { videoData } from '@/data/videoData';

const Categories: React.FC = () => {
  const { containerRef, currentVideo } = useScrollVideo(videoData.length);
  const [scrollDuration, setScrollDuration] = useState(400);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Detect device type and window size
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || width < 768;
      
      setIsMobile(mobile);
      
      // Set scroll duration based on device
      if (width < 768) {
        setScrollDuration(scrollConfig.snapConfig.scrollDuration.mobile);
      } else if (width < 1024) {
        setScrollDuration(scrollConfig.snapConfig.scrollDuration.tablet);
      } else {
        setScrollDuration(scrollConfig.snapConfig.scrollDuration.desktop);
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  // Apply scroll behavior styles
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      // CSS custom properties for smooth scrolling
      container.style.setProperty('--scroll-duration', `${scrollDuration}ms`);
      
      // Adjust scroll snap behavior based on device
      if (isMobile) {
        container.style.scrollSnapType = 'y proximity';
        container.style.scrollSnapStop = 'always';
        container.style.webkitOverflowScrolling = 'touch'; // iOS smooth scrolling
      } else {
        container.style.scrollSnapType = 'y mandatory';
        container.style.scrollSnapStop = 'always';
      }
      
      // Set scroll padding to account for navbar
      container.style.scrollPaddingTop = '0px';
    }
  }, [scrollDuration, isMobile]);
  
  // Enhanced scroll handling with debouncing for mobile
  useEffect(() => {
    if (!containerRef.current) return;
    
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;
    
    const handleScroll = (e: Event) => {
      if (isMobile && !isScrolling) {
        isScrolling = true;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, scrollDuration);
      }
    };
    
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [containerRef, isMobile, scrollDuration]);

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ 
        height: `${videoData.length * 100}vh`,
      }}
    >
      <div 
        ref={scrollContainerRef}
        className="sticky top-20 flex flex-col lg:flex-row"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {/* Video Player Section */}
        <VideoPlayer 
          videoData={videoData} 
          currentVideo={currentVideo}
        />
        
        {/* Text Content Section */}
        <div className="w-full lg:w-1/2 bg-zinc-950 relative overflow-hidden">
          <ProgressIndicator 
            totalItems={videoData.length} 
            currentIndex={currentVideo} 
          />
          
          {videoData.map((item, index) => (
            <FixedTextSection
              key={item.id}
              item={item}
              index={index}
              isActive={index === currentVideo}
            />
          ))}
        </div>
      </div>
      
      {/* Optional: Add smooth scroll CSS */}
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          html {
            scroll-behavior: smooth;
          }
        }
        
        /* Custom scrollbar for better UX */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ef4444, #eab308);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #dc2626, #ca8a04);
        }
        
        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #ef4444 rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Categories;

// Hook personalizzato migliorato per lo scroll (se vuoi sovrascrivere useScrollVideo)
export const useEnhancedScrollVideo = (totalVideos: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const navbarOffset = scrollConfig.navbarHeight;
    
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollTop / scrollHeight;
      
      setScrollProgress(progress);
      
      // Calculate current video with navbar offset consideration
      const adjustedScrollTop = scrollTop + navbarOffset;
      const sectionHeight = window.innerHeight - navbarOffset;
      const newIndex = Math.min(
        Math.floor(adjustedScrollTop / sectionHeight),
        totalVideos - 1
      );
      
      setCurrentVideo(Math.max(0, newIndex));
    };
    
    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    container.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => container.removeEventListener('scroll', throttledScroll);
  }, [totalVideos]);
  
  return { 
    containerRef, 
    currentVideo, 
    scrollProgress,
    scrollToVideo: (index: number) => {
      if (containerRef.current) {
        const navbarOffset = scrollConfig.navbarHeight;
        const sectionHeight = window.innerHeight - navbarOffset;
        containerRef.current.scrollTo({
          top: index * sectionHeight,
          behavior: 'smooth'
        });
      }
    }
  };
};
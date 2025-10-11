import React from 'react';
import FeaturedCollectionBanner from '../NFTCollections/FeaturedCollectionBanner';

/**
 * Left banner section with gradient backgrounds and L-shaped border
 */
export default function BannerSectionLeft() {
  return (
    <div className="relative bg-black col-span-2 lg:col-span-2 lg:row-span-3
      lg:border-l lg:border-b lg:border-zinc-700/50
      lg:rounded-l-3xl rounded-tr-3xl lg:overflow-visible

      before:lg:content-[''] before:lg:absolute before:lg:w-[calc(100%-1px)] before:lg:h-[32px]
      before:lg:border-r before:lg:border-t before:lg:border-zinc-700/50
      before:lg:rounded-t-3xl before:lg:-top-[0] before:lg:-right-0
      before:lg:z-10

      after:lg:content-[''] after:lg:absolute after:lg:h-[calc(100%-32px)]
      after:lg:border-l after:lg:border-zinc-700/50
      after:lg:right-0 after:lg:top-8 after:lg:z-10
      after:lg:bg-transparent
      "
    >
      {/* Gradient Background UP - col 1-2, row 2-3 (bottom of Banner 1 + all Banner 2) */}
      <div className="hidden lg:block absolute left-0 top-0 w-full h-[34.5%] pointer-events-none z-20">
        <div
          className="absolute inset-0 rounded-t-3xl"
          style={{
            background: `
              radial-gradient(ellipse 130% 110% at 28% 18%, rgba(234, 179, 8, 0.22), transparent 58%),
              radial-gradient(ellipse 115% 95% at 72% 28%, rgba(250, 204, 21, 0.18), transparent 62%),
              radial-gradient(ellipse 90% 75% at 50% 45%, rgba(202, 138, 4, 0.12), transparent 68%),
              linear-gradient(180deg, rgba(234, 179, 8, 0.08) 0%, rgba(234, 179, 8, 0.04) 50%, transparent 85%)
            `
          }}
        />
        <div
          className="absolute inset-0 rounded-t-3xl"
          style={{
            background: `
              radial-gradient(ellipse 105% 88% at 35% 22%, rgba(234, 179, 8, 0.25), transparent 60%),
              radial-gradient(ellipse 98% 80% at 68% 38%, rgba(250, 204, 21, 0.2), transparent 65%)
            `,
            filter: 'blur(70px)',
            opacity: 0.35
          }}
        />
      </div>

      {/* Gradient Background DOWN - col 1, row 1 (top part of Banner Section 1) */}
      <div className="hidden lg:block absolute left-0 top-[34.5%] w-[calc(200%+32px)] h-[65.5%] pointer-events-none z-20">
        <div
          className="absolute inset-0 rounded-r-3xl rounded-bl-3xl"
          style={{
            background: `
              radial-gradient(ellipse 90% 60% at 30% 40%, rgba(234, 179, 8, 0.11), transparent 65%),
              radial-gradient(ellipse 80% 65% at 60% 55%, rgba(250, 204, 21, 0.09), transparent 70%),
              radial-gradient(ellipse 70% 55% at 48% 70%, rgba(202, 138, 4, 0.08), transparent 68%),
              radial-gradient(ellipse 95% 50% at 70% 45%, rgba(250, 204, 21, 0.06), transparent 72%)
            `
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 85% 55% at 35% 42%, rgba(234, 179, 8, 0.13), transparent 68%),
              radial-gradient(ellipse 88% 58% at 62% 58%, rgba(250, 204, 21, 0.1), transparent 72%),
              radial-gradient(ellipse 75% 48% at 50% 68%, rgba(202, 138, 4, 0.09), transparent 70%)
            `,
            filter: 'blur(65px)',
            opacity: 0.28
          }}
        />
      </div>

      <div className="lg:overflow-hidden lg:rounded-t-3xl lg:rounded-bl-3xl h-full relative">
        <FeaturedCollectionBanner section="left" />
      </div>
    </div>
  );
}

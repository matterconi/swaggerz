"use client";

import React from 'react';
import Image from 'next/image';

interface FeaturedArtistProps {
  name?: string;
  avatar?: string;
  verified?: boolean;
  followers?: string;
}

export default function FeaturedArtist({
  name = "CryptoArtist",
  avatar = "/api/placeholder/80/80",
  verified = true,
  followers = "12.5K"
}: FeaturedArtistProps) {
  return (
    <div className="relative h-full bg-gradient-to-br from-zinc-900 to-black rounded-3xl border border-zinc-700/50 overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-6 space-y-3">
        {/* Avatar with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500/50 group-hover:border-purple-400 transition-colors duration-300">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          {verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Artist name */}
        <div className="text-center space-y-1">
          <h3 className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-zinc-400 text-xs font-medium">
            Featured Artist
          </p>
        </div>

        {/* Followers count */}
        <div className="flex items-center space-x-1 text-zinc-300 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-medium">{followers}</span>
        </div>

        {/* View profile link */}
        <button className="mt-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400/50 rounded-lg text-purple-300 text-xs font-medium transition-all duration-300 group-hover:scale-105">
          View Profile
        </button>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-3xl" />
    </div>
  );
}

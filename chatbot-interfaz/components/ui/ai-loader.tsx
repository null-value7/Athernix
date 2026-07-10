'use client';

import * as React from "react";

interface LoaderProps {
  size?: number;
  text?: string;
  embed?: boolean;
}

export const Component: React.FC<LoaderProps> = ({ size = 180, text = "Generating", embed = false }) => {
  const letters = text.split("");
  const content = (
    <div className="relative flex items-center justify-center font-inter select-none" style={{ width: size, height: size }}>
      {letters.map((letter, index) => (
        <span key={index} className="inline-block text-white dark:text-gray-800 opacity-40 animate-loaderLetter" style={{ animationDelay: `${index * 0.1}s` }}>
          {letter}
        </span>
      ))}
      <div className="absolute inset-0 rounded-full animate-loaderCircle"></div>
    </div>
  );

  if (embed) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#08000a] via-[#08000a] to-[#08000a]">
      {content}
    </div>
  );
};

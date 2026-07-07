'use client';

import { useState } from 'react';

interface MessageAudioButtonProps {
  text: string;
  isPlaying?: boolean;
  onPlay: () => void;
  onStop: () => void;
}

export default function MessageAudioButton({ text, isPlaying = false, onPlay, onStop }: MessageAudioButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={isPlaying ? onStop : onPlay}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32,
        height: 32,
        borderRadius: '8px',
        background: isPlaying 
          ? 'rgba(255, 107, 53, 0.2)' 
          : hovered 
            ? 'rgba(200, 80, 255, 0.15)' 
            : 'rgba(200, 80, 255, 0.08)',
        border: isPlaying 
          ? '1px solid rgba(255, 107, 53, 0.5)' 
          : '1px solid rgba(200, 80, 255, 0.25)',
        color: isPlaying 
          ? '#ff6b35' 
          : 'rgba(200, 80, 255, 0.7)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        flexShrink: 0,
      }}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth={2}
        style={{ width: 16, height: 16 }}
      >
        {isPlaying ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 0 1 0 1.971l-11.54 6.347a1.125 1.125 0 0 1-1.667-.985V5.653Z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 0 1 0 1.971l-11.54 6.347a1.125 1.125 0 0 1-1.667-.985V5.653Z" />
        )}
      </svg>
    </button>
  );
}

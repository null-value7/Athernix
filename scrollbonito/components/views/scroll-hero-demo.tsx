'use client';

import { useEffect, useState } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import MediaContent from '@/components/views/media-content';
import { getMediaContent, MediaType } from '@/models/media.model';
import { cn } from '@/lib/utils';

/**
 * VIEW LAYER — top-level page section. Owns only the trivial
 * "which media type is selected" UI state; all scroll/touch
 * interaction logic lives in the controller hook used inside
 * ScrollExpandMedia, and all content comes from the Model.
 */
const ScrollHeroDemo = () => {
  const [mediaType, setMediaType] = useState<MediaType>('video');
  const currentMedia = getMediaContent(mediaType);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event('resetSection'));
  }, [mediaType]);

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setMediaType('video')}
          className={cn(
            'px-4 py-2 rounded-lg transition-colors',
            mediaType === 'video'
              ? 'bg-white text-black'
              : 'bg-black/50 text-white border border-white/30'
          )}
        >
          Video
        </button>
        <button
          onClick={() => setMediaType('image')}
          className={cn(
            'px-4 py-2 rounded-lg transition-colors',
            mediaType === 'image'
              ? 'bg-white text-black'
              : 'bg-black/50 text-white border border-white/30'
          )}
        >
          Image
        </button>
      </div>

      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export default ScrollHeroDemo;

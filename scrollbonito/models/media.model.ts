/**
 * MODEL LAYER
 * Pure data shapes and static content for the scroll-expansion hero.
 * No React, no DOM, no rendering logic lives here — only data.
 */

export type MediaType = 'video' | 'image';

export interface MediaAbout {
  overview: string;
  conclusion: string;
}

export interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

export type MediaContentCollection = Record<MediaType, MediaContent>;

/**
 * Sample content model. In a real app this could come from a CMS,
 * a database query, or an API route — the View/Controller layers
 * don't need to know or care where it came from.
 */
export const sampleMediaContent: MediaContentCollection = {
  video: {
    src: 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1',
    poster:
      'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
    background:
      'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS',
    title: 'Immersive Video Experience',
    date: 'Cosmic Journey',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with a video. As you scroll, the video expands to fill more of the screen, creating an immersive experience.',
      conclusion:
        'The ScrollExpandMedia component provides a unique way to engage users with your content through interactive scrolling. Try switching between video and image modes to see different implementations.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop',
    background:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop',
    title: 'Dynamic Image Showcase',
    date: 'Underwater Adventure',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with an image. The same smooth expansion effect works beautifully with static images.',
      conclusion:
        'The ScrollExpandMedia component works equally well with images and videos. This flexibility lets you choose the media type that best suits your content.',
    },
  },
};

/**
 * Fetches a single media entry by type. Swap the body of this function
 * for a real data source (CMS / database) without touching any View
 * or Controller code — that's the point of the Model boundary.
 */
export function getMediaContent(type: MediaType): MediaContent {
  return sampleMediaContent[type];
}

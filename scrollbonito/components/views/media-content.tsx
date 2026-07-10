import { getMediaContent, MediaType } from '@/models/media.model';

interface MediaContentProps {
  mediaType: MediaType;
}

/**
 * VIEW LAYER — reads from the Model (getMediaContent) and renders it.
 * No interaction state, no side effects.
 */
const MediaContent = ({ mediaType }: MediaContentProps) => {
  const currentMedia = getMediaContent(mediaType);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
        About This Component
      </h2>
      <p className="text-lg mb-8 text-black dark:text-white">
        {currentMedia.about.overview}
      </p>
      <p className="text-lg mb-8 text-black dark:text-white">
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

export default MediaContent;

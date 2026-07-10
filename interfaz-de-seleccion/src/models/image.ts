export interface Image {
  url: string;
  alt: string;
}

export interface GalleryProps {
  images?: Image[];
  animationDuration?: number;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  heroImage: SanityImage | null;
  email: string;
  phone: string;
  city: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
}

export interface Bio {
  richText: PortableTextBlock[];
  headshot: SanityImage | null;
  secondaryPhoto: SanityImage | null;
  pressKitUrl?: string;
}

export interface Performance {
  _id: string;
  title: string;
  description: string;
  venueName: string;
  cityCountry: string;
  dates: string[];
  ticketUrl?: string;
  featuredImage: SanityImage | null;
  status: 'upcoming' | 'past';
  order: number;
}

export interface GalleryImage {
  _id: string;
  image: SanityImage;
  caption?: string;
  category?: string;
  order: number;
}

export interface Testimonial {
  _id: string;
  quote: string;
  attributorName: string;
  eventContext: string;
  order: number;
}

export interface PressItem {
  _id: string;
  publicationName: string;
  excerpt: string;
  articleUrl?: string;
  date: string;
  logo?: SanityImage;
}

export interface YoutubeVideo {
  _id: string;
  title: string;
  youtubeUrl: string;
  description?: string;
  date?: string;
  order: number;
}

export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  alt?: string;
}

export type PortableTextBlock = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};

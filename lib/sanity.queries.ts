import { client } from './sanity.client';
import type {
  SiteSettings, Bio, Performance, GalleryImage,
  Testimonial, PressItem, YoutubeVideo,
} from '@/types';

// Fetch all site data in parallel for the homepage
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getBio(): Promise<Bio | null> {
  return client.fetch(`*[_type == "bio"][0]`);
}

export async function getPerformances(): Promise<Performance[]> {
  return client.fetch(
    `*[_type == "performance"] | order(order asc, dates[0] desc)`
  );
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return client.fetch(`*[_type == "galleryImage"] | order(order asc)`);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(`*[_type == "testimonial"] | order(order asc)`);
}

export async function getPressItems(): Promise<PressItem[]> {
  return client.fetch(`*[_type == "pressItem"] | order(date desc)`);
}

export async function getYoutubeVideos(): Promise<YoutubeVideo[]> {
  return client.fetch(`*[_type == "youtubeVideo"] | order(order asc)`);
}

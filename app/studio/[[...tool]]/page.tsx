'use client';
/**
 * Sanity Studio embedded at /studio
 * Navigate to /studio in your browser to edit all content.
 */
import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export const dynamic = 'force-dynamic';

export default function StudioPage() {
  return <NextStudio config={config} />;
}

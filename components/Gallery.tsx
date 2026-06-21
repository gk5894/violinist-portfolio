'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryImage } from '@/types';
import { urlFor } from '@/lib/sanity.image';
import SectionWrapper from './SectionWrapper';

interface Props { images: GalleryImage[] | null; }

// PLACEHOLDER gallery images — replace by adding galleryImage documents in Sanity Studio
const PLACEHOLDER: GalleryImage[] = [
  { _id: '1', image: null as any, caption: 'Carnegie Hall, 2024', category: 'concert', order: 1 },
  { _id: '2', image: null as any, caption: 'Rehearsal, Berlin', category: 'rehearsal', order: 2 },
  { _id: '3', image: null as any, caption: 'Vienna Musikverein', category: 'concert', order: 3 },
  { _id: '4', image: null as any, caption: 'Portrait session', category: 'portrait', order: 4 },
  { _id: '5', image: null as any, caption: 'Paris Philharmonie', category: 'concert', order: 5 },
  { _id: '6', image: null as any, caption: 'Masterclass, Juilliard', category: 'education', order: 6 },
];

const PLACEHOLDER_URLS = [
  'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&q=70',
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=70',
  'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=70',
  'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=70',
  'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&q=70',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=70',
];

export default function Gallery({ images }: Props) {
  const items = (images && images.length > 0) ? images : PLACEHOLDER;
  const [lightbox, setLightbox] = useState<number | null>(null);

  function getImageSrc(item: GalleryImage, idx: number) {
    if (item.image) return urlFor(item.image).width(800).url();
    return PLACEHOLDER_URLS[idx % PLACEHOLDER_URLS.length];
  }

  return (
    <SectionWrapper id="gallery" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-3">Portfolio</p>
      <h2 className="font-serif text-4xl md:text-5xl font-light text-off-white mb-12">Gallery</h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {items.map((img, i) => (
          <motion.button
            key={img._id}
            onClick={() => setLightbox(i)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square overflow-hidden rounded-sm group"
            aria-label={img.caption || `Gallery image ${i + 1}`}
          >
            <Image
              src={getImageSrc(img, i)}
              alt={img.caption || `Gallery image ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width:768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-end p-3">
              {img.caption && (
                <span className="font-sans text-xs text-off-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.caption}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-off-white/60 hover:text-gold transition-colors text-2xl"
              aria-label="Close lightbox"
            >
              ✕
            </button>
            {/* Prev/Next */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((prev) => (prev! - 1 + items.length) % items.length); }}
              className="absolute left-4 md:left-10 text-off-white/60 hover:text-gold transition-colors text-3xl"
              aria-label="Previous"
            >
              ‹
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full max-w-4xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getImageSrc(items[lightbox], lightbox)}
                alt={items[lightbox].caption || `Gallery image ${lightbox + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((prev) => (prev! + 1) % items.length); }}
              className="absolute right-4 md:right-10 text-off-white/60 hover:text-gold transition-colors text-3xl"
              aria-label="Next"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

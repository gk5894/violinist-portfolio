'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { YoutubeVideo } from '@/types';
import SectionWrapper from './SectionWrapper';

interface Props { videos: YoutubeVideo[] | null; }

// PLACEHOLDER videos — replace via Sanity Studio (youtubeVideo documents)
const PLACEHOLDER: YoutubeVideo[] = [
  { _id: '1', title: 'Brahms Violin Concerto — Berlin Philharmonic', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'Live recording from the Berliner Philharmonie', date: '2024-03-15', order: 1 },
  { _id: '2', title: 'Bach Chaconne — Solo Recital', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'Carnegie Hall, April 2024', date: '2024-04-02', order: 2 },
  { _id: '3', title: 'Sibelius Violin Concerto — Vienna', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'With the Vienna Philharmonic, Musikverein', date: '2024-05-18', order: 3 },
];

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function WatchSection({ videos }: Props) {
  const items = (videos && videos.length > 0) ? videos : PLACEHOLDER;
  const [active, setActive] = useState<string | null>(null);

  return (
    <SectionWrapper id="watch" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-3">Watch</p>
      <h2 className="font-serif text-4xl md:text-5xl font-light text-off-white mb-12">Performances</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((v) => {
          const ytId = extractYouTubeId(v.youtubeUrl);
          const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null;
          const isActive = active === v._id;

          return (
            <motion.div
              key={v._id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group bg-surface rounded-sm overflow-hidden border border-white/5 hover:border-gold/30 transition-colors duration-300"
            >
              {/* Video embed or thumbnail */}
              <div className="relative aspect-video bg-surface-2">
                {isActive && ytId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <button
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                    onClick={() => setActive(v._id)}
                    aria-label={`Play ${v.title}`}
                  >
                    {thumb && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumb} alt={v.title} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                    )}
                    <div className="relative z-10 w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-5 h-5 text-charcoal ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
              {/* Meta */}
              <div className="p-5">
                <h3 className="font-serif text-lg text-off-white mb-1">{v.title}</h3>
                {v.description && <p className="font-sans text-sm text-text-muted">{v.description}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

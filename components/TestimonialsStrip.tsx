'use client';
import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState } from 'react';
import type { Testimonial } from '@/types';

// Placeholder testimonials shown before Sanity content loads
const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  { _id: '1', quote: 'A performance of breathtaking depth and luminous tone.', attributorName: 'James Hartley', eventContext: 'Carnegie Hall, 2023', order: 1 },
  { _id: '2', quote: 'Vasari plays with the authority of a seasoned master and the fire of someone performing for the first time.', attributorName: 'The Guardian', eventContext: 'Review', order: 2 },
  { _id: '3', quote: 'Technically flawless, emotionally devastating. A rare talent.', attributorName: 'Sophie Laurent', eventContext: 'Paris Philharmonie', order: 3 },
  { _id: '4', quote: 'Her Brahms Sonata was the highlight of the season.', attributorName: 'NY Times Arts', eventContext: 'Season Review 2024', order: 4 },
];

interface Props { testimonials: Testimonial[] | null; }

export default function TestimonialsStrip({ testimonials }: Props) {
  const items = (testimonials && testimonials.length > 0) ? testimonials : PLACEHOLDER_TESTIMONIALS;
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  const containerRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused || !containerRef.current) return;
    xRef.current -= delta * 0.04;
    const totalWidth = containerRef.current.scrollWidth / 2;
    if (Math.abs(xRef.current) >= totalWidth) xRef.current = 0;
    containerRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  return (
    <div
      className="relative overflow-hidden py-10 bg-surface border-y border-white/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Testimonials"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />

      <div ref={containerRef} className="flex gap-16 whitespace-nowrap will-change-transform">
        {doubled.map((t, i) => (
          <div key={`${t._id}-${i}`} className="flex-shrink-0 flex items-center gap-6 max-w-xl">
            <span className="text-gold font-serif text-3xl leading-none">&ldquo;</span>
            <div>
              <p className="font-serif italic text-lg text-off-white/90 leading-snug whitespace-normal max-w-sm">
                {t.quote}
              </p>
              <p className="font-sans text-xs tracking-widest uppercase text-text-muted mt-2">
                — {t.attributorName}, <span className="text-gold">{t.eventContext}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

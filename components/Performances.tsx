'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Performance } from '@/types';
import SectionWrapper from './SectionWrapper';

interface Props { performances: Performance[] | null; }

// PLACEHOLDER performances — replace via Sanity Studio
const PLACEHOLDER: Performance[] = [
  { _id: '1', title: 'Brahms Violin Concerto', description: 'With the Berlin Philharmonic Orchestra, conducted by Klaus Mäkelä.', venueName: 'Berliner Philharmonie', cityCountry: 'Berlin, Germany', dates: ['2025-03-15T19:30:00Z'], ticketUrl: '#', featuredImage: null, status: 'upcoming', order: 1 },
  { _id: '2', title: 'Solo Recital: Bach & Bartók', description: 'A programme spanning 300 years of violin writing, from Bach Partitas to Bartók Solo Sonata.', venueName: 'Carnegie Hall', cityCountry: 'New York, USA', dates: ['2025-04-02T20:00:00Z', '2025-04-03T15:00:00Z'], ticketUrl: '#', featuredImage: null, status: 'upcoming', order: 2 },
  { _id: '3', title: 'Sibelius Violin Concerto', description: 'Opening night of the season with the Vienna Philharmonic.', venueName: 'Musikverein', cityCountry: 'Vienna, Austria', dates: ['2025-05-18T19:00:00Z'], ticketUrl: undefined, featuredImage: null, status: 'upcoming', order: 3 },
  { _id: '4', title: 'Tchaikovsky Violin Concerto', description: 'With the London Symphony Orchestra.', venueName: 'Barbican Centre', cityCountry: 'London, UK', dates: ['2024-11-10T19:30:00Z'], ticketUrl: undefined, featuredImage: null, status: 'past', order: 4 },
  { _id: '5', title: 'Prokofiev Sonatas', description: 'Chamber recital with pianist Maria Joăo Pires.', venueName: 'Paris Philharmonie', cityCountry: 'Paris, France', dates: ['2024-10-22T20:00:00Z'], ticketUrl: undefined, featuredImage: null, status: 'past', order: 5 },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Performances({ performances }: Props) {
  const items = (performances && performances.length > 0) ? performances : PLACEHOLDER;
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');
  const visible = items.filter((p) => p.status === filter);

  return (
    <SectionWrapper id="performances" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-3">Live</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-off-white">Performances</h2>
        </div>
        {/* Toggle */}
        <div className="flex gap-1 bg-surface rounded-sm p-1 self-start md:self-auto">
          {(['upcoming', 'past'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-200 rounded-sm ${
                filter === tab ? 'bg-gold text-charcoal' : 'text-text-muted hover:text-off-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          {visible.length === 0 && (
            <p className="text-text-muted font-sans text-sm py-12 text-center">No {filter} performances listed.</p>
          )}
          {visible.map((p) => (
            <div
              key={p._id}
              className="group grid md:grid-cols-[1fr_auto] gap-4 items-center py-6 px-6 md:px-8 bg-surface hover:bg-surface-2 border border-white/5 hover:border-gold/30 rounded-sm transition-all duration-300"
            >
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-off-white mb-1">{p.title}</h3>
                <p className="font-sans text-sm text-text-muted mb-2">{p.description}</p>
                <div className="flex flex-wrap gap-4 text-xs font-sans text-text-muted">
                  <span className="text-gold">{p.venueName}</span>
                  <span>{p.cityCountry}</span>
                  <span>{p.dates.map(formatDate).join(' · ')}</span>
                </div>
              </div>
              {p.ticketUrl && (
                <a
                  href={p.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-5 py-2.5 border border-gold text-gold font-sans text-xs tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-all duration-200 self-center"
                >
                  Tickets
                </a>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}

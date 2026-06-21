'use client';
import { motion } from 'framer-motion';
import type { PressItem } from '@/types';
import SectionWrapper from './SectionWrapper';

interface Props { pressItems: PressItem[] | null; }

// PLACEHOLDER press items — replace via Sanity Studio (pressItem documents)
const PLACEHOLDER: PressItem[] = [
  { _id: '1', publicationName: 'The New York Times', excerpt: '"Vasari\'s playing is nothing short of luminous. Her tone in the slow movement was so beautiful it stopped time."', articleUrl: '#', date: '2024-11-15', logo: null as any },
  { _id: '2', publicationName: 'The Guardian', excerpt: '"A commanding stage presence matched by extraordinary technical facility. One of the finest violinists of her generation."', articleUrl: '#', date: '2024-09-20', logo: null as any },
  { _id: '3', publicationName: 'Gramophone', excerpt: '"Technically flawless and emotionally devastating. Her Brahms is now the benchmark."', articleUrl: '#', date: '2024-07-01', logo: null as any },
  { _id: '4', publicationName: 'Le Monde', excerpt: '"Une interprétation d\'une profondeur exceptionnelle. La salle tout entière retenait son souffle."', articleUrl: '#', date: '2024-05-10', logo: null as any },
];

export default function PressSection({ pressItems }: Props) {
  const items = (pressItems && pressItems.length > 0) ? pressItems : PLACEHOLDER;

  return (
    <SectionWrapper id="press" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-3">Critical Acclaim</p>
      <h2 className="font-serif text-4xl md:text-5xl font-light text-off-white mb-12">Press & Reviews</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            {item.articleUrl ? (
              <a
                href={item.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full p-8 bg-surface border border-white/5 hover:border-gold/30 rounded-sm transition-all duration-300 group"
              >
                <PressCard item={item} />
              </a>
            ) : (
              <div className="h-full p-8 bg-surface border border-white/5 rounded-sm">
                <PressCard item={item} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function PressCard({ item }: { item: PressItem }) {
  return (
    <>
      <p className="font-serif italic text-xl text-off-white/90 leading-relaxed mb-6">{item.excerpt}</p>
      <div className="flex items-center justify-between">
        <span className="font-sans text-sm font-medium text-gold">{item.publicationName}</span>
        <span className="font-sans text-xs text-text-muted">
          {new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
      </div>
    </>
  );
}

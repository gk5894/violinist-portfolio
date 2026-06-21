'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Bio } from '@/types';
import { urlFor } from '@/lib/sanity.image';

interface Props { bio: Bio | null; }

// PLACEHOLDER bio — swap by editing Bio document in Sanity Studio
const PLACEHOLDER_BIO = `Marina Alba is an internationally acclaimed violinist whose performances have graced the world's most prestigious concert halls, from Carnegie Hall to the Vienna Musikverein. Trained at the Juilliard School under Itzhak Perlman, she has won top prizes at the Queen Elisabeth Competition and the Menuhin International Violin Competition.

Known for her distinctive tone and deeply communicative interpretations, Elena brings an uncompromising musicality to everything from the Baroque to contemporary world premieres. Off stage, she is passionate about music education and runs an annual masterclass series for young string players.`;

// PLACEHOLDER images — replace via Sanity Studio
const PLACEHOLDER_HEADSHOT = '/about-headshot.jpg';
const PLACEHOLDER_SECONDARY = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80';

export default function About({ bio }: Props) {
  const headshotSrc = bio?.headshot ? urlFor(bio.headshot).width(800).url() : PLACEHOLDER_HEADSHOT;
  const secondarySrc = bio?.secondaryPhoto ? urlFor(bio.secondaryPhoto).width(600).url() : PLACEHOLDER_SECONDARY;
  const bioText = bio?.richText ? null : PLACEHOLDER_BIO; // SWAP: render Portable Text when using Sanity

  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Photo collage */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Main image */}
          <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden">
            <Image src={headshotSrc} alt="Marina Alba" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
          {/* Gold accent line */}
          <div className="absolute -top-6 -left-4 w-px h-24 bg-gold opacity-60" />
        </motion.div>

        {/* Bio text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4">About</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-off-white mb-8 leading-tight">
            Artist. Storyteller.<br />Musician.
          </h2>

          {/* SWAP: replace this block with <PortableText value={bio.richText} /> when using real Sanity content */}
          {bioText ? (
            bioText.split('\n\n').map((para, i) => (
              <p key={i} className="font-sans text-base text-text-muted leading-relaxed mb-5">
                {para}
              </p>
            ))
          ) : null}

          {bio?.pressKitUrl && (
            <a
              href={bio.pressKitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 font-sans text-xs tracking-widest uppercase text-gold border-b border-gold pb-0.5 hover:text-off-white hover:border-off-white transition-colors"
            >
              Download Press Kit
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}

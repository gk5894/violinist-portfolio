'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { SiteSettings } from '@/types';
import { urlFor } from '@/lib/sanity.image';

interface HeroProps {
  settings: SiteSettings | null;
}

// PLACEHOLDER hero — replace by uploading heroImage in Sanity siteSettings
// Local fallback: drop your image at public/hero.jpg
const LOCAL_HERO = '/hero.jpg';

export default function Hero({ settings }: HeroProps) {
  const heroSrc = settings?.heroImage ? urlFor(settings.heroImage).width(1200).url() : LOCAL_HERO;
  const name = settings?.name || 'Marina Alba'; // SWAP: siteSettings.name
  const tagline = settings?.tagline || 'Violinist and Vocalist'; // SWAP: siteSettings.tagline

  // Split name for staggered line animation
  const nameParts = name.split(' ');

  return (
    {/* Mobile: h-auto so no empty black space. Desktop: full screen */}
    <section className="relative overflow-hidden bg-charcoal md:h-screen md:flex md:items-center">

      {/* Mobile image — natural flow, portrait height */}
      <div className="relative w-full aspect-[3/4] md:hidden">
        <Image
          src={heroSrc}
          alt={`${name} — Hero`}
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        {/* Mobile bottom fade so text reads over image */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0F0F0F 22%, rgba(15,15,15,0.5) 42%, transparent 62%)' }}
        />
      </div>

      {/* Desktop image — absolutely fills section */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[75%] lg:w-[70%]">
        <Image
          src={heroSrc}
          alt={`${name} — Hero`}
          fill
          priority
          className="object-cover object-top"
          sizes="72vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/20" />
      </div>

      {/* Desktop left gradient */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(to right, #0F0F0F 18%, #0F0F0F 28%, rgba(15,15,15,0.85) 42%, rgba(15,15,15,0.4) 58%, rgba(15,15,15,0.1) 72%, transparent 85%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 -mt-24 md:mt-0 pb-10 md:pb-0">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gold mb-5"
        >
          {tagline}
        </motion.p>

        {/* Name split across two lines with stagger */}
        <h1 className="font-serif font-light text-off-white leading-none tracking-tight mb-10">
          {nameParts.map((part, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="block text-6xl md:text-7xl lg:text-[8rem]"
            >
              {part}
            </motion.span>
          ))}
        </h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-16 h-px bg-gold mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 border border-gold text-gold font-sans text-xs tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            Contact
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 px-7 py-3 border border-off-white/30 text-off-white/80 font-sans text-xs tracking-widest uppercase hover:border-off-white hover:text-off-white transition-all duration-300"
          >
            View Gallery
          </a>
        </motion.div>
      </div>

    </section>
  );
}

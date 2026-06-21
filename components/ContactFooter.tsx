'use client';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import type { SiteSettings } from '@/types';

interface Props { settings: SiteSettings | null; }

export default function ContactFooter({ settings }: Props) {
  // SWAP: replace placeholder contact info with siteSettings fields
  const email = settings?.email || 'booking@marinaAlba.com';
  const phone = settings?.phone || '+1 (212) 555-0148';
  const city = settings?.city || 'New York / International';
  const instagramUrl = settings?.instagramUrl;
  const youtubeUrl = settings?.youtubeUrl;

  // Formspree contact form
  // Set NEXT_PUBLIC_FORMSPREE_ID in your .env.local to your Formspree endpoint
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || '';
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formspreeId) {
      alert('Formspree ID not configured. Set NEXT_PUBLIC_FORMSPREE_ID in .env.local');
      return;
    }
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <footer id="contact" className="bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4">Get in Touch</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-off-white mb-8">Contact</h2>

            <div className="space-y-4 mb-10">
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-text-muted mb-1">Email</p>
                <a href={`mailto:${email}`} className="font-sans text-off-white hover:text-gold transition-colors">
                  {email}
                </a>
              </div>
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-text-muted mb-1">Phone</p>
                <a href={`tel:${phone}`} className="font-sans text-off-white hover:text-gold transition-colors">
                  {phone}
                </a>
              </div>
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-text-muted mb-1">Location</p>
                <p className="font-sans text-off-white">{city}</p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-5">
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer"
                   className="font-sans text-xs tracking-widest uppercase text-text-muted hover:text-gold transition-colors">
                  Instagram
                </a>
              )}
              {youtubeUrl && (
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer"
                   className="font-sans text-xs tracking-widest uppercase text-text-muted hover:text-gold transition-colors">
                  YouTube
                </a>
              )}
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {status === 'sent' ? (
              <div className="h-full flex items-center">
                <div>
                  <p className="font-serif text-2xl text-gold mb-2">Thank you.</p>
                  <p className="font-sans text-text-muted">Your message has been sent. We&apos;ll be in touch soon.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name', label: 'Your Name', type: 'text' },
                  { name: 'email', label: 'Email Address', type: 'email' },
                  { name: 'subject', label: 'Subject', type: 'text' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block font-sans text-xs tracking-widest uppercase text-text-muted mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      className="w-full bg-surface-2 border border-white/10 focus:border-gold text-off-white font-sans text-sm px-4 py-3 rounded-sm outline-none transition-colors placeholder:text-text-muted/50"
                      placeholder={field.label}
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-text-muted mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-surface-2 border border-white/10 focus:border-gold text-off-white font-sans text-sm px-4 py-3 rounded-sm outline-none transition-colors resize-none placeholder:text-text-muted/50"
                    placeholder="Tell me about your project or booking enquiry…"
                  />
                </div>
                {status === 'error' && (
                  <p className="font-sans text-sm text-red-400">Something went wrong. Please email directly.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 bg-gold text-charcoal font-sans text-xs tracking-widest uppercase hover:bg-off-white transition-colors duration-200 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted">
          <p className="font-sans text-xs">© {new Date().getFullYear()} Marina Alba. All rights reserved.</p>
          <nav className="flex gap-6">
            {['About', 'Performances', 'Gallery', 'Press'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`}
                 className="font-sans text-xs tracking-widest uppercase hover:text-gold transition-colors">
                {l}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

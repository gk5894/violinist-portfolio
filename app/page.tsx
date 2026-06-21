import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TestimonialsStrip from '@/components/TestimonialsStrip';
import About from '@/components/About';
import Performances from '@/components/Performances';
import WatchSection from '@/components/WatchSection';
import Gallery from '@/components/Gallery';
import PressSection from '@/components/PressSection';
import ContactFooter from '@/components/ContactFooter';
import {
  getSiteSettings,
  getBio,
  getPerformances,
  getGalleryImages,
  getTestimonials,
  getPressItems,
  getYoutubeVideos,
} from '@/lib/sanity.queries';

// Revalidate page content every 60 seconds (ISR)
export const revalidate = 60;

export default async function Home() {
  // Fetch all data in parallel; falls back to placeholders if Sanity isn't configured yet
  const [settings, bio, performances, gallery, testimonials, pressItems, videos] = await Promise.allSettled([
    getSiteSettings(),
    getBio(),
    getPerformances(),
    getGalleryImages(),
    getTestimonials(),
    getPressItems(),
    getYoutubeVideos(),
  ]);

  function val<T>(result: PromiseSettledResult<T>): T | null {
    return result.status === 'fulfilled' ? result.value : null;
  }

  return (
    <main>
      <Navbar />
      <Hero settings={val(settings)} />
      <TestimonialsStrip testimonials={val(testimonials)} />
      <About bio={val(bio)} />
      <Performances performances={val(performances)} />
      <WatchSection videos={val(videos)} />
      <Gallery images={val(gallery)} />
      <PressSection pressItems={val(pressItems)} />
      <ContactFooter settings={val(settings)} />
    </main>
  );
}

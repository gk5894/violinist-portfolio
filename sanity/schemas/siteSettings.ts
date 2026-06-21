import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton — only one document
  fields: [
    defineField({ name: 'name', title: 'Violinist Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline (e.g. VIOLINIST)', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'city', title: 'City / Location', type: 'string' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube Channel URL', type: 'url' }),
  ],
});

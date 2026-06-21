import { defineField, defineType } from 'sanity';

export const bio = defineType({
  name: 'bio',
  title: 'Biography',
  type: 'document',
  fields: [
    defineField({
      name: 'richText',
      title: 'Bio Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'headshot', title: 'Headshot', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'secondaryPhoto', title: 'Secondary Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'pressKit', title: 'Press Kit PDF', type: 'file', options: { accept: '.pdf' } }),
  ],
});

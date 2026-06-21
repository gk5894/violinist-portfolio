import { defineField, defineType } from 'sanity';

export const pressItem = defineType({
  name: 'pressItem',
  title: 'Press Item',
  type: 'document',
  fields: [
    defineField({ name: 'publicationName', title: 'Publication Name', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Quote / Excerpt', type: 'text' }),
    defineField({ name: 'articleUrl', title: 'Article URL (optional)', type: 'url' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'logo', title: 'Publication Logo (optional)', type: 'image' }),
  ],
  preview: {
    select: { title: 'publicationName', subtitle: 'date' },
  },
});

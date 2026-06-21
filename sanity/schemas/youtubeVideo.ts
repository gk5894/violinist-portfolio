import { defineField, defineType } from 'sanity';

export const youtubeVideo = defineType({
  name: 'youtubeVideo',
  title: 'YouTube Video',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Video Title', type: 'string' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube URL', type: 'url' }),
    defineField({ name: 'description', title: 'Description (optional)', type: 'text' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title' },
  },
});

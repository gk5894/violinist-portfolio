import { defineField, defineType } from 'sanity';

export const performance = defineType({
  name: 'performance',
  title: 'Performance',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Concert Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'venueName', title: 'Venue Name', type: 'string' }),
    defineField({ name: 'cityCountry', title: 'City, Country', type: 'string' }),
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'array',
      of: [{ type: 'datetime' }],
    }),
    defineField({ name: 'ticketUrl', title: 'Ticket URL (optional)', type: 'url' }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['upcoming', 'past'], layout: 'radio' },
      initialValue: 'upcoming',
    }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'venueName' },
  },
});

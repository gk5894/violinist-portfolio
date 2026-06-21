import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote Text', type: 'text' }),
    defineField({ name: 'attributorName', title: 'Attributor Name', type: 'string' }),
    defineField({ name: 'eventContext', title: 'Event / Context', type: 'string' }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'attributorName', subtitle: 'quote' },
  },
});

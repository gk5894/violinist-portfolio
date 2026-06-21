import { defineField, defineType } from 'sanity';

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'caption', title: 'Caption (optional)', type: 'string' }),
    defineField({ name: 'category', title: 'Category/Tag (optional)', type: 'string' }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'caption', media: 'image' },
  },
});

import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

const legalCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        lastUpdated: z.string(),
    }),
});

export const collections = {
    'blog': blogCollection,
    'legal': legalCollection,
};


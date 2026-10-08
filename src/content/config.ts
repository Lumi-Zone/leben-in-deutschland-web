import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        seoTitle: z.string().max(65).optional(),
        description: z.string(),
        pubDate: z.date(),
        updatedDate: z.date().optional(),
        reviewedAt: z.date().optional(),
        lang: z.enum(['de', 'en', 'tr']).default('de'),
        translationKey: z.string().optional(),
        sources: z.array(z.object({
            name: z.string(),
            url: z.string().url(),
        })).default([]),
        author: z.string(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }).superRefine((value, context) => {
        if (!value.translationKey) return;
        if (!value.reviewedAt) {
            context.addIssue({ code: z.ZodIssueCode.custom, path: ['reviewedAt'], message: 'Translated guide groups require reviewedAt.' });
        }
        if (value.sources.length === 0) {
            context.addIssue({ code: z.ZodIssueCode.custom, path: ['sources'], message: 'Translated guide groups require at least one primary source.' });
        }
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

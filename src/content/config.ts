import { defineCollection, z } from 'astro:content';
import { GERMAN_STATES } from '../data/germanStates';

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        seoTitle: z.string().max(65).optional(),
        description: z.string(),
        pubDate: z.date(),
        updatedDate: z.date().optional(),
        reviewedAt: z.date().optional(),
        lang: z.enum(['de', 'en', 'tr']).default('de'),
        /** Language of the article body when it differs from the route language, e.g. a Persian explainer under /de/blog/. */
        contentLang: z.enum(['ar', 'fa', 'ps', 'ru', 'uk']).optional(),
        translationKey: z.string().optional(),
        sources: z.array(z.object({
            name: z.string(),
            url: z.string().url(),
        })).default([]),
        author: z.string(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
        practice: z.object({
            heading: z.string(),
            description: z.string(),
            startQuestionId: z.number().int().min(1).max(300).default(1),
            state: z.string().refine((slug) => GERMAN_STATES.some((state) => state.slug === slug), 'Unknown Bundesland.').optional(),
        }).optional(),
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

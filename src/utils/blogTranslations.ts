import type { CollectionEntry } from 'astro:content';
import { SUPPORTED_LANGUAGES, type SupportedLang } from '../types/language';
import { getBlogTopicsForTags, getLocalizedTopic, type BlogTopic } from '../data/blogTopics';
import { routeLangForContentLang } from '../i18n/blog';
import { resolveBlogImage } from './blog';

type BlogPost = CollectionEntry<'blog'>;

export const getRouteSlug = (post: BlogPost) => post.data.translationKey ?? post.slug;

/** The German edition carries the canonical tags and image of a translation group. */
function getSourcePost(post: BlogPost, posts: BlogPost[]): BlogPost {
  if (post.data.lang === 'de') return post;
  const slug = getRouteSlug(post);
  return posts.find((entry) => entry.data.lang === 'de' && getRouteSlug(entry) === slug) ?? post;
}

export function getPostTopics(post: BlogPost, posts: BlogPost[], lang: SupportedLang): BlogTopic[] {
  return getBlogTopicsForTags(getSourcePost(post, posts).data.tags).map((topic) => getLocalizedTopic(topic, lang));
}

export function getTopicPosts(posts: BlogPost[], lang: SupportedLang, topicSlug: string): BlogPost[] {
  return posts.filter((post) => post.data.lang === lang && getPostTopics(post, posts, lang).some((topic) => topic.slug === topicSlug));
}

export function getPostImage(post: BlogPost, posts: BlogPost[]): string {
  return resolveBlogImage(post.data.image ? post : getSourcePost(post, posts));
}

/** Other editions of the same guide, in the site's language order. */
export function getTranslations(post: BlogPost, posts: BlogPost[]): BlogPost[] {
  const slug = getRouteSlug(post);
  return posts
    .filter((entry) => entry.id !== post.id && getRouteSlug(entry) === slug)
    .sort((a, b) => SUPPORTED_LANGUAGES.indexOf(a.data.lang) - SUPPORTED_LANGUAGES.indexOf(b.data.lang));
}

/** Route languages that have at least one published guide. */
export function getBlogLanguages(posts: BlogPost[]): SupportedLang[] {
  const languages = new Set(posts.map((post) => post.data.lang));
  return SUPPORTED_LANGUAGES.filter((lang) => languages.has(lang));
}

/** Guides published under /de/blog/ whose body is written in the reader's language. */
export function getNativeGuides(posts: BlogPost[], lang: SupportedLang): BlogPost[] {
  return posts.filter((post) => post.data.contentLang && routeLangForContentLang(post.data.contentLang) === lang);
}

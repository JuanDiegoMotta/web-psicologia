import { createClient } from 'contentful';
import { cacheLife } from 'next/cache';
import type { Document } from '@contentful/rich-text-types';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN!,
});

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: string;
  heroImage: { url: string; alt: string };
  content: Document;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEntry(item: any): BlogPost {
  const f = item.fields;
  const asset = f.coverImage?.fields?.file;
  return {
    title: f.title,
    slug: f.slug,
    excerpt: f.excerpt,
    category: f.category ?? 'General',
    publishDate: f.publishDate,
    readTime: f.readTime ?? '5 min de lectura',
    heroImage: {
      url: asset ? `https:${asset.url}` : '',
      alt: f.coverImage?.fields?.title ?? f.title,
    },
    content: f.content,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  'use cache';
  cacheLife('hours');

  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: ['-fields.publishDate'],
  });

  return entries.items.map(mapEntry);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  'use cache';
  cacheLife('hours');

  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
    include: 2, // resuelve enlaces (imágenes/entradas embebidas en el Rich Text)
  });

  if (!entries.items.length) return null;
  return mapEntry(entries.items[0]);
}

export async function getAllSlugs(): Promise<string[]> {
  'use cache';
  cacheLife('hours');

  const entries = await client.getEntries({
    content_type: 'blogPost',
    select: ['fields.slug'],
  });

  return entries.items.map((item) => item.fields.slug as string);
}

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

// ===== GUÍAS DIGITALES (content type `guia`) =====

export type Guide = {
  title: string;
  slug: string; // hace también de prefijo de pago (orderId de Bold)
  description: string;
  price: number; // COP, sin decimales
  coverImage: { url: string; alt: string };
  pdfUrl: string; // URL del PDF a entregar (vacío si aún no se ha subido)
  benefits: string[];
  idealFor: string;
  emoji: string;
  order: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapGuide(item: any): Guide {
  const f = item.fields;
  const cover = f.coverImage?.fields?.file;
  const pdf = f.pdf?.fields?.file;
  return {
    title: f.title,
    slug: f.slug,
    description: f.description ?? '',
    price: f.price ?? 0,
    coverImage: {
      url: cover ? `https:${cover.url}` : '',
      alt: f.coverImage?.fields?.title ?? f.title,
    },
    pdfUrl: pdf ? `https:${pdf.url}` : '',
    benefits: Array.isArray(f.benefits) ? f.benefits : [],
    idealFor: f.idealFor ?? '',
    emoji: f.emoji ?? '📘',
    order: f.order ?? 0,
  };
}

export async function getAllGuides(): Promise<Guide[]> {
  'use cache';
  cacheLife('hours');

  const entries = await client.getEntries({
    content_type: 'guia',
    order: ['fields.order'],
    include: 1,
  });

  return entries.items.map(mapGuide);
}

// Para el webhook de Bold: la referencia del pago es `${slug}-${timestamp}`.
// Devuelve la guía cuyo slug encaja con el inicio de la referencia (match más
// largo, por si un slug fuera prefijo de otro). null si no corresponde a ninguna.
export async function getGuideByReference(reference: string): Promise<Guide | null> {
  const guides = await getAllGuides();
  const matches = guides
    .filter((g) => g.slug && reference.startsWith(`${g.slug}-`))
    .sort((a, b) => b.slug.length - a.slug.length);
  return matches[0] ?? null;
}

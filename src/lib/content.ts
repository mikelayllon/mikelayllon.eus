import { getCollection, getEntry } from 'astro:content';
import { marked } from 'marked';
import type { Lang } from '../i18n';

/** Render text from the panel (Markdown or HTML) to HTML. */
export function md(text: string | undefined | null): string {
  if (!text || !text.trim()) return '';
  return marked.parse(text, { async: false }) as string;
}

/** Inline Markdown (no wrapping <p>). */
export function mdInline(text: string | undefined | null): string {
  if (!text || !text.trim()) return '';
  return marked.parseInline(text, { async: false }) as string;
}

export async function getPage(id: string): Promise<Record<string, any>> {
  const entry = await getEntry('orriak', id);
  return (entry?.data ?? {}) as Record<string, any>;
}

/** Language block of a page, falling back to Basque for empty fields. */
export function pick<T extends Record<string, any>>(data: Record<string, any>, lang: Lang): T {
  const eu = (data.eu ?? {}) as T;
  const loc = (data[lang] ?? {}) as T;
  const out: Record<string, any> = { ...eu };
  for (const [k, v] of Object.entries(loc)) {
    if (v !== '' && v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)) out[k] = v;
  }
  return out as T;
}

export async function getWorks() {
  const works = await getCollection('lanak', ({ data }) => !data.ezkutatu);
  return works.sort((a, b) => a.data.ordena - b.data.ordena || a.data.izenburua.localeCompare(b.data.izenburua));
}

export async function getPosts() {
  const posts = await getCollection('koadernoa', ({ data }) => import.meta.env.DEV || !data.zirriborroa);
  return posts.sort((a, b) => b.data.data.getTime() - a.data.data.getTime());
}

export function readingMinutes(text: string | undefined): number {
  const words = (text ?? '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function excerpt(text: string | undefined, max = 180): string {
  const plain = (text ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`\[\]()!-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > max ? plain.slice(0, max).replace(/\s+\S*$/, '') + '…' : plain;
}

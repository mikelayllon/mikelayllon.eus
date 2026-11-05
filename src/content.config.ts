import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const str = z.string().nullish().transform((v) => v ?? '');
const list = <T extends z.ZodTypeAny>(item: T) => z.array(item).nullish().transform((v) => v ?? []);

/** Static pages and site settings, one YAML file each (edited in the panel). */
const orriak = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/orriak' }),
  schema: z.record(z.string(), z.any()),
});

const workLang = z
  .object({
    mota: str,
    azpititulua: str,
    laburpena: str,
    testua: str,
    datuak: list(z.object({ etiketa: str, balioa: str })),
    fitxa: list(z.object({ rola: str, izena: str })),
  })
  .nullish()
  .transform((v) => v ?? { mota: '', azpititulua: '', laburpena: '', testua: '', datuak: [], fitxa: [] });

const lanak = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/lanak' }),
  schema: z.object({
    izenburua: z.string(),
    ordena: z.number().default(99),
    ezkutatu: z.boolean().default(false),
    irudia: str,
    irudi_alt: str,
    audioa: str,
    argazkiak: list(z.object({ irudia: str, oina: str })),
    eu: workLang,
    es: workLang,
    en: workLang,
  }),
});

const koadernoa = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/koadernoa' }),
  schema: z.object({
    izenburua: z.string(),
    data: z.coerce.date(),
    sarrera: str,
    etiketak: list(z.string()),
    irudia: str,
    irudi_oina: str,
    zirriborroa: z.boolean().default(false),
  }),
});

export const collections = { orriak, lanak, koadernoa };

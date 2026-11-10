export const LANGS = ['eu', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'eu';

/** Prefix for a language: '' for Basque (default), '/en' for English. */
export function base(lang: Lang): string {
  return lang === DEFAULT_LANG ? '' : `/${lang}`;
}

/** Site base path ('' on the final domain, '/mikelayllon.eus' on the GitHub preview). */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a root-relative path ('/irudiak/x.jpg') with the site base. External URLs pass through. */
export function href(path: string | undefined | null): string {
  if (!path) return '';
  const p = path.replace(/ /g, '%20');
  return p.startsWith('/') && !p.startsWith('//') ? `${BASE}${p}` : p;
}

/** Build a localized URL. `path` starts with '/' (e.g. '/lanak'). */
export function url(lang: Lang, path = '/'): string {
  return href(`${base(lang)}${path}`);
}

export const ui = {
  eu: {
    langName: 'Euskara',
    nav: 'Nagusia',
    langSwitch: 'Hizkuntza',
    skip: 'Joan edukira',
    koadernoa: 'Koadernoa',
    zerbitzuak: 'Zerbitzuak',
    lanak: 'Lanak',
    ikerketa: 'Ikerketa',
    niriBuruz: 'Niri buruz',
    kontaktua: 'Kontaktua',
    readMore: 'Irakurri gehiago',
    read: 'Irakurri',
    allPosts: 'Sarrera guztiak',
    allWorks: 'Lan guztiak',
    allServices: 'Zerbitzu guztiak',
    publications: 'Argitalpenak',
    projectCta: 'Proiektu bat duzu? Idatzi',
    ctaBig: 'Proiektu bat buruan?',
    ctaEm: 'Hitz egin dezagun.',
    sections: 'Atalak',
    networks: 'Sareak',
    subscribe: 'Harpidetu (RSS)',
    top: 'Gora',
    place: 'Bilbo · Euskal Herria',
    photo: 'Argazkia',
    project: 'Proiektua',
    credits: 'Fitxa',
    gallery: 'Irudiak',
    listen: 'Soinu-zatia',
    nextWork: 'Hurrengo lana',
    noPosts: 'Laster, lehen sarrerak.',
    onlyBasque: '',
    minRead: 'minutuko irakurketa',
    notes: 'Oharrak',
    keepReading: 'Irakurtzen jarraitu',
    portrait: 'Mikel Ayllon, erretratua',
    notFound: 'Orri hau ez dago.',
    backHome: 'Itzuli hasierara',
    refTypes: {
      artikulua: 'Artikulua',
      liburua: 'Liburua',
      kapitulua: 'Liburu-kapitulua',
      hitzaldia: 'Hitzaldia',
      tesia: 'Tesia',
      azterketa: 'Azterketa',
      proiektua: 'Ikerketa-proiektua',
      bestelakoa: 'Bestelakoa',
    } as Record<string, string>,
    months: ['urt.', 'ots.', 'mar.', 'api.', 'mai.', 'eka.', 'uzt.', 'abu.', 'ira.', 'urr.', 'aza.', 'abe.'],
  },
  en: {
    langName: 'English',
    nav: 'Main',
    langSwitch: 'Language',
    skip: 'Skip to content',
    koadernoa: 'Notebook',
    zerbitzuak: 'Services',
    lanak: 'Work',
    ikerketa: 'Research',
    niriBuruz: 'About',
    kontaktua: 'Contact',
    readMore: 'Read more',
    read: 'Read',
    allPosts: 'All posts',
    allWorks: 'All work',
    allServices: 'All services',
    publications: 'Publications',
    projectCta: 'Got a project? Get in touch',
    ctaBig: 'Got a project in mind?',
    ctaEm: "Let's talk.",
    sections: 'Sections',
    networks: 'Elsewhere',
    subscribe: 'Subscribe (RSS)',
    top: 'Top',
    place: 'Bilbao · Basque Country',
    photo: 'Photo',
    project: 'The project',
    credits: 'Credits',
    gallery: 'Images',
    listen: 'Sample',
    nextWork: 'Next work',
    noPosts: 'First posts coming soon.',
    onlyBasque: 'The notebook is written in Basque.',
    minRead: 'min read',
    notes: 'Notes',
    keepReading: 'Keep reading',
    portrait: 'Portrait of Mikel Ayllon',
    notFound: "This page doesn't exist.",
    backHome: 'Back to home',
    refTypes: {
      artikulua: 'Article',
      liburua: 'Book',
      kapitulua: 'Book chapter',
      hitzaldia: 'Conference paper',
      tesia: 'Thesis',
      azterketa: 'Study',
      proiektua: 'Research project',
      bestelakoa: 'Other',
    } as Record<string, string>,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
} as const;

export function t(lang: Lang) {
  return ui[lang];
}

/** 2026.11.05 style used across the site. */
export function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}

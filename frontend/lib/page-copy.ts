import aboutEn from '@/public/locales/en/about.json';
import blogEn from '@/public/locales/en/blog.json';
import contactEn from '@/public/locales/en/contact.json';
import projectsEn from '@/public/locales/en/projects.json';
import aboutPtBr from '@/public/locales/pt-BR/about.json';
import blogPtBr from '@/public/locales/pt-BR/blog.json';
import contactPtBr from '@/public/locales/pt-BR/contact.json';
import projectsPtBr from '@/public/locales/pt-BR/projects.json';

type Locale = 'en' | 'pt-BR';

const COPY = {
  en: {
    about: aboutEn.about,
    blog: blogEn.blog,
    contact: contactEn,
    projects: projectsEn.projects,
  },
  'pt-BR': {
    about: aboutPtBr.about,
    blog: blogPtBr.blog,
    contact: contactPtBr,
    projects: projectsPtBr.projects,
  },
} as const;

export function resolvePageCopyLocale(locale: string | undefined): Locale {
  return locale === 'pt-BR' ? 'pt-BR' : 'en';
}

export function getAboutCopy(locale: string | undefined) {
  return COPY[resolvePageCopyLocale(locale)].about;
}

export function getContactCopy(locale: string | undefined) {
  return COPY[resolvePageCopyLocale(locale)].contact;
}

export function getBlogCopy(locale: string | undefined) {
  return COPY[resolvePageCopyLocale(locale)].blog;
}

export function getProjectsCopy(locale: string | undefined) {
  return COPY[resolvePageCopyLocale(locale)].projects;
}

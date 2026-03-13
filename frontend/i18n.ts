import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import aboutEn from '@/public/locales/en/about.json';
import blogEn from '@/public/locales/en/blog.json';
import commonEn from '@/public/locales/en/common.json';
import contactEn from '@/public/locales/en/contact.json';
import footerEn from '@/public/locales/en/footer.json';
import homeEn from '@/public/locales/en/home.json';
import projectsEn from '@/public/locales/en/projects.json';
import aboutPtBr from '@/public/locales/pt-BR/about.json';
import blogPtBr from '@/public/locales/pt-BR/blog.json';
import commonPtBr from '@/public/locales/pt-BR/common.json';
import contactPtBr from '@/public/locales/pt-BR/contact.json';
import footerPtBr from '@/public/locales/pt-BR/footer.json';
import homePtBr from '@/public/locales/pt-BR/home.json';
import projectsPtBr from '@/public/locales/pt-BR/projects.json';

const DEFAULT_LANGUAGE = 'en';

const RESOURCES = {
  en: {
    about: aboutEn,
    blog: blogEn,
    common: commonEn,
    contact: contactEn,
    footer: footerEn,
    home: homeEn,
    projects: projectsEn,
  },
  'pt-BR': {
    about: aboutPtBr,
    blog: blogPtBr,
    common: commonPtBr,
    contact: contactPtBr,
    footer: footerPtBr,
    home: homePtBr,
    projects: projectsPtBr,
  },
} as const;

type ResourceLanguage = keyof typeof RESOURCES;

const NAMESPACES = Object.keys(RESOURCES.en);

function resolveLanguage(lang: string): ResourceLanguage {
  return lang in RESOURCES ? (lang as ResourceLanguage) : DEFAULT_LANGUAGE;
}

function createBaseI18nInstance() {
  return createInstance().use(initReactI18next);
}

function getBaseConfig(lang: string) {
  return {
    lng: resolveLanguage(lang),
    fallbackLng: DEFAULT_LANGUAGE,
    ns: NAMESPACES,
    defaultNS: 'common',
    resources: RESOURCES,
    interpolation: { escapeValue: false },
  } as const;
}

export function createSyncI18nInstance(lang: string) {
  const instance = createBaseI18nInstance();

  instance.init({
    ...getBaseConfig(lang),
    initImmediate: false,
  });

  return instance;
}

export async function createI18nInstance(lang: string) {
  const instance = createBaseI18nInstance();

  await instance.init({
    ...getBaseConfig(lang),
    debug: process.env.NODE_ENV === 'development',
  });

  return instance;
}

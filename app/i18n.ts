import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

export const i18n = createInstance()
  .use(initReactI18next)
  .use(resourcesToBackend((lang: string, ns: string) => 
    import(`../public/locales/${lang}/${ns}.json`)
  ));

export async function initI18n(lang: string) {
  await i18n.init({
    lng: lang,
    fallbackLng: 'en',
    defaultNS: 'common',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    }
  });
  return i18n;
}
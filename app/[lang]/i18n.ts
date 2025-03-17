import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

export async function createI18nInstance(lang: string) {
  const instance = createInstance()
    .use(initReactI18next)
    .use(resourcesToBackend((lng: string, ns: string) => 
      import(`../../public/locales/${lng}/${ns}.json`)
    ));

  await instance.init({
    lng: lang,
    fallbackLng: 'en',
    defaultNS: 'common',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

  return instance;
}
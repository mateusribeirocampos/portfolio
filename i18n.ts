// i18n.ts or i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import translationEN from './public/locales/en/common.json';
import translationPTBR from './public/locales/pt-BR/common.json';

// Resources object with translations
const resources = {
  en: {
    common: translationEN,
    translation: translationEN, // Fallback
  },
  'pt-BR': {
    common: translationPTBR,
    translation: translationPTBR, // Fallback
  }
};

i18n
  // Load translation using http -> see /public/locales
  // Learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // Detect user language
  // Learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    // Remova 'initAsync: true' (não é uma opção válida)
    ns: ['common'],
    defaultNS: 'common', // String, não array
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;
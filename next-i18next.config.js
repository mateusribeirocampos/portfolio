export const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-BR'],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

export default i18nConfig;

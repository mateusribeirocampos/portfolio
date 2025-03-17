import 'i18next';
import common from './locales/en/common.json';
import home from './locales/en/home.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      home: typeof home;
    };
  }
}
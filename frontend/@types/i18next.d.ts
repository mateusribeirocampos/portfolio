import 'i18next';
import common from './locales/en/common.json';
import footer from './locales/en/footer.json';
import home from './locales/en/home.json';
import projects from './locales/en/projects.json';
import about from './locales/en/about.json';
import blog from './locales/en/blog.json';
import contact from './locales/en/contact.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      footer: typeof footer;
      home: typeof home;
      projects: typeof projects;
      about: typeof about;
      blog: typeof blog;
      contact: typeof contact;
    };
  }
}
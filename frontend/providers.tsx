'use client';

import { I18nextProvider } from 'react-i18next';
import { createI18nInstance } from './i18n';
import { useEffect, useState } from 'react';

export function Providers({
  children,
  lang
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const [i18nInstance, setI18nInstance] = useState<any>(null);

  useEffect(() => {
    // Check if we're on client side and there's a different locale in cookie
    if (typeof window !== 'undefined') {
      const cookieLocale = document.cookie
        .split('; ')
        .find(row => row.startsWith('NEXT_LOCALE='))
        ?.split('=')[1];

      const actualLang = cookieLocale || lang;

      createI18nInstance(actualLang).then((instance) => {
        setI18nInstance(instance);
      });
    } else {
      createI18nInstance(lang).then((instance) => {
        setI18nInstance(instance);
      });
    }
  }, [lang]);

  if (!i18nInstance) return null;

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
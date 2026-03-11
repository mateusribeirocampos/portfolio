'use client';

import { I18nextProvider } from 'react-i18next';
import { createI18nInstance, createSyncI18nInstance } from './i18n';
import { useEffect, useState } from 'react';

export function Providers({
  children,
  lang
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const [i18nInstance, setI18nInstance] = useState(() => createSyncI18nInstance(lang));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cookieLocale = typeof window !== 'undefined'
      ? document.cookie.split('; ').find(row => row.startsWith('NEXT_LOCALE='))?.split('=')[1]
      : undefined;

    const actualLang = cookieLocale || lang;

    createI18nInstance(actualLang).then((instance) => {
      setI18nInstance(instance);
      setReady(true);
    });
  }, [lang]);

  return (
    <I18nextProvider i18n={i18nInstance}>
      <div style={{ visibility: ready ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </I18nextProvider>
  );
}
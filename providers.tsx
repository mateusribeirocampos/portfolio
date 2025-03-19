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
    createI18nInstance(lang).then((instance) => {
      setI18nInstance(instance);
    });
  }, [lang]);

  if (!i18nInstance) return null;

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
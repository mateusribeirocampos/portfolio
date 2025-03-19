'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createI18nInstance } from './i18n';

interface I18nProviderProps {
  children: React.ReactNode;
  lang: string;
}

export function I18nProvider({ children, lang }: I18nProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [i18nInstance, setI18nInstance] = useState<any>(null);

  useEffect(() => {
    createI18nInstance(lang).then(setI18nInstance);
    setMounted(true);
  }, [lang]);

  if (!mounted || !i18nInstance) {
    return null;
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
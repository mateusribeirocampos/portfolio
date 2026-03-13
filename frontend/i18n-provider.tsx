'use client';

import { useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createSyncI18nInstance } from './i18n';

interface I18nProviderProps {
  children: React.ReactNode;
  lang: string;
}

export function I18nProvider({ children, lang }: I18nProviderProps) {
  const [i18nInstance] = useState(() => createSyncI18nInstance(lang));

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}

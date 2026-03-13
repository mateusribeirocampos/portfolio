'use client';

import { I18nextProvider } from 'react-i18next';
import { createSyncI18nInstance } from './i18n';
import { useState } from 'react';

export function Providers({
  children,
  lang
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const [i18nInstance] = useState(() => createSyncI18nInstance(lang));

  return (
    <I18nextProvider i18n={i18nInstance}>
      {children}
    </I18nextProvider>
  );
}

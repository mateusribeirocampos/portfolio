'use client';

import { useTranslation } from 'react-i18next';

export default function TestPage({ params }: { params: { lang: string } }) {
  const { t, i18n } = useTranslation('home');
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">{t('home.title')}</h1>
      <p className="mt-4">{t('home.subtitle')}</p>
      <p className="mt-4">Current language from params: {params.lang}</p>
      <p className="mt-4">Current language from i18n: {i18n.language}</p>
      <p className="mt-4">Current path: {window.location.pathname}</p>
    </div>
  );
}
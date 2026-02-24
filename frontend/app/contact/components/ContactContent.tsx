'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function ContactContent() {
  const { t } = useTranslation('contact');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao enviar mensagem');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Erro inesperado');
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <div className="grid md:grid-cols-[1fr_1fr] gap-12">
          <div>
            {status === 'success' ? (
              <div className="rounded-lg border border-green-500 bg-green-50 dark:bg-green-950 p-6 text-center space-y-2">
                <p className="text-green-700 dark:text-green-300 font-semibold text-lg">
                  {t('form.successTitle') || 'Mensagem enviada!'}
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  {t('form.successMessage') || 'Obrigado pelo contato. Responderei em breve.'}
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setStatus('idle')}>
                  {t('form.sendAnother') || 'Enviar outra mensagem'}
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t('form.name')}
                  </label>
                  <Input
                    id="name"
                    placeholder={t('form.namePlaceholder')}
                    value={form.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t('form.email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t('form.message')}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t('form.messagePlaceholder')}
                    value={form.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={2000}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
                )}

                <Button className="w-full" type="submit" disabled={status === 'loading'}>
                  {status === 'loading' ? (t('form.sending') || 'Enviando...') : t('form.send')}
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('social.title')}</h2>
              <div className="flex gap-4">
                <Link href="https://github.com/mateusribeirocampos" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <FaGithub className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/mateus-ribeiro-de-campos-6a135331/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <FaLinkedin className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <FaTwitter className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

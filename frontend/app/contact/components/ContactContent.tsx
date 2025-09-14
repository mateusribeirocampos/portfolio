'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';

export function ContactContent() {
  const { t } = useTranslation('contact');

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <div className="grid md:grid-cols-[1fr_1fr] gap-12">
          <div>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  {t('form.name')}
                </label>
                <Input id="name" placeholder={t('form.namePlaceholder')} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t('form.email')}
                </label>
                <Input id="email" type="email" placeholder={t('form.emailPlaceholder')} />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t('form.message')}
                </label>
                <Textarea id="message" placeholder={t('form.messagePlaceholder')} />
              </div>
              <Button className="w-full">{t('form.send')}</Button>
            </form>
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
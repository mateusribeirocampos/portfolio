'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Check, Mail, ServerCog } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { projects, type ProjectLocale } from '@/data/projects';
import { isPtBrPathname, withPtBrPrefix } from '@/lib/locale-paths';

const processKeys = ['contract', 'security', 'quality', 'delivery'] as const;

export default function Home() {
  const { t, i18n } = useTranslation('home');
  const pathname = usePathname();
  const locale: ProjectLocale = i18n.resolvedLanguage === 'pt-BR' ? 'pt-BR' : 'en';
  const localizePath = (href: string) => (isPtBrPathname(pathname) ? withPtBrPrefix(href) : href);
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));

  const traceItems = [
    { label: t('home.trace.request'), value: t('home.trace.request_value') },
    { label: t('home.trace.security'), value: t('home.trace.security_value') },
    { label: t('home.trace.persistence'), value: t('home.trace.persistence_value') },
    { label: t('home.trace.response'), value: t('home.trace.response_value') },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="portfolio-rule relative overflow-hidden border-x border-b bg-background/95">
        <Image
          src="/images/home/profilelinkedin.jpeg"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1280px"
          className="pointer-events-none object-cover object-[72%_38%] opacity-[0.11] grayscale dark:opacity-[0.16]"
          priority
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-y-0 right-[12%] hidden w-px bg-signal/30 lg:block" />

        <div className="relative flex min-h-[660px] flex-col justify-between px-5 py-8 sm:px-8 md:min-h-[620px] md:px-12 md:py-10 lg:px-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="portfolio-kicker text-foreground">{t('home.eyebrow')}</p>
            <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
              {t('home.availability')}
            </p>
          </div>

          <div className="max-w-4xl py-14 md:py-16">
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] sm:text-5xl md:text-6xl">
              {t('home.title')}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {t('home.description')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href={localizePath('/projects')}>
                  {t('home.projects_button')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://github.com/mateusribeirocampos"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub className="mr-2 h-4 w-4" />
                  {t('home.github_button')}
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href={localizePath('/contact')}>
                  <Mail className="mr-2 h-4 w-4" />
                  {t('home.contact_button')}
                </Link>
              </Button>
            </div>

            <div className="mt-9 flex flex-col gap-2 border-l-2 border-signal pl-4">
              <span className="portfolio-kicker">{t('home.stack_label')}</span>
              <span className="font-mono text-sm text-foreground">{t('home.stack')}</span>
            </div>
          </div>

          <div className="portfolio-rule grid border-t sm:grid-cols-2 lg:grid-cols-4">
            {traceItems.map((item, index) => (
              <div
                key={item.label}
                className="portfolio-rule min-w-0 border-b py-4 sm:px-4 sm:odd:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <p className="font-mono text-[11px] text-muted-foreground">
                  {String(index + 1).padStart(2, '0')} / {item.label}
                </p>
                <p className="mt-1 truncate font-mono text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="portfolio-kicker">{t('home.evidence.eyebrow')}</p>
            <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight md:text-4xl">
              {t('home.evidence.title')}
            </h2>
            <p className="mt-5 max-w-md leading-7 text-muted-foreground">
              {t('home.evidence.description')}
            </p>
          </div>

          <div className="portfolio-rule border-t">
            {featuredProjects.map((project, index) => (
              <article
                key={project.slug}
                className="portfolio-rule group grid gap-5 border-b py-8 sm:grid-cols-[72px_1fr] sm:py-10"
              >
                <div className="font-mono text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="portfolio-kicker text-protocol">{project.kind[locale]}</p>
                      <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
                    </div>
                    <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-signal" />
                      {project.status[locale]}
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                    {project.description[locale]}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link
                    href={localizePath('/projects') + '#' + project.slug}
                    className="mt-6 inline-flex items-center text-sm font-medium underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    {t('home.evidence.project_link')}
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-rule border-y py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-background">
              <ServerCog className="h-5 w-5 text-protocol" />
            </div>
            <p className="portfolio-kicker mt-6">{t('home.process.eyebrow')}</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              {t('home.process.title')}
            </h2>
            <p className="mt-5 max-w-md leading-7 text-muted-foreground">
              {t('home.process.description')}
            </p>
          </div>

          <ol className="portfolio-rule border-t">
            {processKeys.map((key, index) => (
              <li
                key={key}
                className="portfolio-rule grid gap-4 border-b py-6 sm:grid-cols-[72px_180px_1fr] sm:items-start"
              >
                <span className="font-mono text-sm text-signal">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-semibold">{t('home.process.steps.' + key + '.title')}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {t('home.process.steps.' + key + '.description')}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grid gap-8 py-20 md:grid-cols-[1fr_auto] md:items-end md:py-24">
        <div className="max-w-3xl">
          <p className="portfolio-kicker">{t('home.closing.eyebrow')}</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            {t('home.closing.title')}
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
            {t('home.closing.description')}
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href={localizePath('/contact')}>
            {t('home.contact_button')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}

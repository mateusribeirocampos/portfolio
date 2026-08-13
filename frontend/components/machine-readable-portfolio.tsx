'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, Check, Copy, Download, UserRound, X } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { projects, type ProjectLocale } from '@/data/projects';
import { buildPortfolioMarkdown } from '@/lib/portfolio-machine-content';
import aboutEn from '@/public/locales/en/about.json';
import aboutPtBr from '@/public/locales/pt-BR/about.json';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-mateusribeirocampos.vercel.app';

const uiCopy = {
  en: {
    ready: 'LLM ready',
    rendered: 'Reading',
    source: 'Markdown',
    copy: 'Copy Markdown',
    copied: 'Copied',
    download: 'Download Markdown',
    close: 'Close LLM view',
    human: 'Human view',
    machine: 'LLM view',
    profile: 'Profile',
    focus: 'How I work',
    experience: 'Experience',
    projects: 'Projects',
    stack: 'Core capabilities',
    contact: 'Contact',
  },
  'pt-BR': {
    ready: 'Pronto para LLM',
    rendered: 'Leitura',
    source: 'Markdown',
    copy: 'Copiar Markdown',
    copied: 'Copiado',
    download: 'Baixar Markdown',
    close: 'Fechar leitura para LLM',
    human: 'Visualização humana',
    machine: 'Visualização para LLM',
    profile: 'Perfil',
    focus: 'Como atuo',
    experience: 'Experiência',
    projects: 'Projetos',
    stack: 'Competências principais',
    contact: 'Contato',
  },
};

function MachineDocument({ locale }: { locale: ProjectLocale }) {
  const copy = uiCopy[locale];
  const about = locale === 'pt-BR' ? aboutPtBr.about : aboutEn.about;
  const skillGroups = Object.values(about.skills).filter(
    (value): value is { title: string; description: string } =>
      Boolean(value && typeof value === 'object' && 'title' in value),
  );
  const orderedProjects = [...projects].sort(
    (a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99),
  );

  return (
    <article className="mx-auto max-w-4xl px-[15px] py-12 sm:py-16">
      <header className="portfolio-rule border-b pb-8">
        <p className="portfolio-kicker text-protocol">portfolio.md / {locale}</p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
          Mateus R. Campos
          <span className="block text-signal">
            {locale === 'pt-BR' ? 'Desenvolvedor Backend' : 'Backend Developer'}
          </span>
        </h1>
        <blockquote className="mt-7 border-l-2 border-signal pl-5 text-base italic leading-7 text-muted-foreground">
          {about.subtitle}
        </blockquote>
      </header>

      <section className="portfolio-rule border-b py-9">
        <p className="portfolio-kicker">01 / {copy.profile}</p>
        <h2 className="mt-3 text-2xl font-semibold">{about.hero.headline}</h2>
        <p className="mt-5 leading-7 text-muted-foreground">{about.hero.description}</p>
      </section>

      <section className="portfolio-rule border-b py-9">
        <p className="portfolio-kicker">02 / {copy.focus}</p>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {about.focus.items.map((item) => (
            <div key={item.title}>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-rule border-b py-9">
        <p className="portfolio-kicker">03 / {copy.projects}</p>
        <div className="mt-5">
          {orderedProjects.map((project, index) => (
            <div
              key={project.slug}
              className="portfolio-rule grid gap-4 border-t py-6 sm:grid-cols-[52px_1fr]"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <span className="font-mono text-xs text-protocol">{project.kind[locale]}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {project.description[locale]}
                </p>
                {project.architecture ? (
                  <p className="mt-3 font-mono text-xs leading-6 text-foreground">
                    {project.architecture.join(' -> ')}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-rule border-b py-9">
        <p className="portfolio-kicker">04 / {copy.experience}</p>
        <div className="mt-5 space-y-8">
          {about.experience.items.map((item) => (
            <div key={item.role} className="grid gap-2 sm:grid-cols-[180px_1fr]">
              <p className="font-mono text-xs text-muted-foreground">{item.period}</p>
              <div>
                <h3 className="font-semibold">{item.role}</h3>
                <p className="text-sm text-protocol">{item.organization}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-rule border-b py-9">
        <p className="portfolio-kicker">05 / {copy.stack}</p>
        <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {skillGroups.map((skill) => (
            <div key={skill.title}>
              <dt className="font-mono text-xs font-medium text-signal">{skill.title}</dt>
              <dd className="mt-2 text-sm leading-6 text-muted-foreground">{skill.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-9">
        <p className="portfolio-kicker">06 / {copy.contact}</p>
        <div className="mt-5 space-y-2 font-mono text-sm">
          <p>contact: {SITE_URL + (locale === 'pt-BR' ? '/pt-BR/contact' : '/contact')}</p>
          <p>github: github.com/mateusribeirocampos</p>
          <p>linkedin: linkedin.com/in/mateus-ribeiro-de-campos-6a135331</p>
        </div>
      </section>
    </article>
  );
}

export function MachineReadablePortfolio({ lang }: { lang: string }) {
  const pathname = usePathname();
  const locale: ProjectLocale = lang === 'pt-BR' ? 'pt-BR' : 'en';
  const copy = uiCopy[locale];
  const about = locale === 'pt-BR' ? aboutPtBr.about : aboutEn.about;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'rendered' | 'source'>('rendered');
  const [copied, setCopied] = useState(false);
  const markdown = useMemo(
    () =>
      buildPortfolioMarkdown({
        locale,
        siteUrl: SITE_URL,
        about,
        projects,
      }),
    [about, locale],
  );

  if (pathname.startsWith('/admin')) return null;

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const machineUrl = '/portfolio.md?lang=' + locale;
  const downloadUrl = machineUrl + '&download=1';

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="fixed inset-0 left-0 top-0 z-[90] block h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-none border-0 bg-background p-0 shadow-none duration-200 sm:rounded-none [&>button]:hidden">
          <DialogTitle className="sr-only">{copy.machine}</DialogTitle>
          <DialogDescription className="sr-only">
            {locale === 'pt-BR'
              ? 'Versão estruturada e legível por máquinas do portfólio.'
              : 'Structured, machine-readable version of the portfolio.'}
          </DialogDescription>

          <header className="portfolio-rule sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
            <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center gap-2 px-[15px] py-2">
              <span className="flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-[11px] font-medium uppercase text-signal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                {copy.ready}
              </span>
              <a
                href={machineUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-md border px-3 py-1.5 font-mono text-xs text-protocol hover:bg-accent sm:inline-flex"
              >
                /portfolio.md
              </a>

              <div
                className="ml-auto flex rounded-md border bg-muted/40 p-1"
                aria-label={locale === 'pt-BR' ? 'Modo de leitura' : 'Reading mode'}
              >
                <button
                  type="button"
                  onClick={() => setMode('rendered')}
                  aria-pressed={mode === 'rendered'}
                  className={cn(
                    'rounded px-3 py-1.5 font-mono text-xs transition-colors',
                    mode === 'rendered' && 'bg-background text-foreground shadow-sm',
                  )}
                >
                  {copy.rendered}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('source')}
                  aria-pressed={mode === 'source'}
                  className={cn(
                    'rounded px-3 py-1.5 font-mono text-xs transition-colors',
                    mode === 'source' && 'bg-background text-foreground shadow-sm',
                  )}
                >
                  {copy.source}
                </button>
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyMarkdown}
                aria-label={copied ? copy.copied : copy.copy}
                title={copied ? copy.copied : copy.copy}
              >
                {copied ? <Check className="h-4 w-4 text-signal" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={downloadUrl} aria-label={copy.download} title={copy.download}>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              <DialogClose asChild>
                <Button variant="outline" size="icon" aria-label={copy.close} title={copy.close}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </header>

          {mode === 'rendered' ? (
            <MachineDocument locale={locale} />
          ) : (
            <div className="mx-auto max-w-5xl px-[15px] pb-28 pt-10">
              <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-md border bg-card p-5 font-mono text-xs leading-6 text-foreground sm:p-8 sm:text-sm">
                {markdown}
              </pre>
            </div>
          )}

          <div
            className="fixed bottom-4 right-4 z-[100] flex items-center rounded-full border bg-background/95 p-1 shadow-lg backdrop-blur"
            role="group"
            aria-label={locale === 'pt-BR' ? 'Selecionar visualização' : 'Select view'}
          >
            <DialogClose asChild>
              <button
                type="button"
                aria-pressed={false}
                aria-label={copy.human}
                title={copy.human}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <UserRound className="h-4 w-4" />
              </button>
            </DialogClose>
            <button
              type="button"
              aria-pressed={true}
              aria-label={copy.machine}
              title={copy.machine}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-signal text-black"
            >
              <Bot className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-black/70" aria-hidden="true" />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {!open ? (
        <div
          className="fixed bottom-4 right-4 z-[100] flex items-center rounded-full border bg-background/95 p-1 shadow-lg backdrop-blur"
          role="group"
          aria-label={locale === 'pt-BR' ? 'Selecionar visualização' : 'Select view'}
        >
          <button
            type="button"
            aria-pressed={true}
            aria-label={copy.human}
            title={copy.human}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background"
          >
            <UserRound className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-pressed={false}
            aria-label={copy.machine}
            title={copy.machine}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            <Bot className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}

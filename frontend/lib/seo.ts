import type { Metadata } from 'next';

import { stripPtBrPrefix, withPtBrPrefix } from '@/lib/locale-paths';

export type AppLocale = 'en' | 'pt-BR';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-mateusribeirocampos.vercel.app';
const DEFAULT_OG_IMAGE = '/images/home/profilelinkedin.jpeg';

type PageKey = 'home' | 'about' | 'projects' | 'blog' | 'contact';

const copy: Record<AppLocale, Record<PageKey, { title: string; description: string }>> = {
  en: {
    home: {
      title: 'Mateus R Campos - Backend Developer',
      description:
        'Portfolio of Mateus R Campos, backend developer focused on Java, Spring Boot, Node.js, APIs and full-stack projects.',
    },
    about: {
      title: 'About | Mateus R Campos',
      description:
        'Learn about Mateus R Campos, a backend developer focused on Java, Spring Boot, Node.js, REST APIs, and research-driven software quality.',
    },
    projects: {
      title: 'Projects | Mateus R Campos',
      description:
        'Explore backend, API and full-stack projects built by Mateus R Campos with Java, Spring Boot, Node.js and React.',
    },
    blog: {
      title: 'Blog | Mateus R Campos',
      description:
        'Articles and tutorials about software development, backend engineering, technology and continuous learning.',
    },
    contact: {
      title: 'Contact | Mateus R Campos',
      description:
        'Get in touch with Mateus R Campos for backend engineering opportunities, collaborations and professional conversations.',
    },
  },
  'pt-BR': {
    home: {
      title: 'Mateus R Campos - Desenvolvedor Backend',
      description:
        'Portfólio de Mateus R Campos, desenvolvedor backend com foco em Java, Spring Boot, Node.js, APIs e projetos full stack.',
    },
    about: {
      title: 'Sobre | Mateus R Campos',
      description:
        'Conheça Mateus R Campos, desenvolvedor backend com foco em Java, Spring Boot, Node.js, APIs REST e qualidade de software orientada por pesquisa.',
    },
    projects: {
      title: 'Projetos | Mateus R Campos',
      description:
        'Explore projetos backend, APIs e aplicações full stack desenvolvidos com Java, Spring Boot, Node.js e React.',
    },
    blog: {
      title: 'Blog | Mateus R Campos',
      description:
        'Artigos e tutoriais sobre desenvolvimento de software, engenharia backend, tecnologia e aprendizado contínuo.',
    },
    contact: {
      title: 'Contato | Mateus R Campos',
      description:
        'Entre em contato com Mateus R Campos para oportunidades em engenharia backend, colaborações e conversas profissionais.',
    },
  },
};

export function resolveLocale(locale: string | undefined): AppLocale {
  return locale === 'pt-BR' ? 'pt-BR' : 'en';
}

export function getSiteUrl(): string {
  return SITE_URL;
}

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mateus Ribeiro de Campos',
    alternateName: 'Mateus R Campos',
    url: SITE_URL,
    image: new URL(DEFAULT_OG_IMAGE, SITE_URL).toString(),
    jobTitle: 'Backend Developer',
    knowsAbout: ['Java', 'Spring Boot', 'Node.js', 'NestJS', 'React', 'Next.js', 'PostgreSQL', 'TypeScript'],
    sameAs: [
      'https://github.com/mateusribeirocampos',
      'https://www.linkedin.com/in/mateus-ribeiro-de-campos-6a135331/',
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mateus R Campos Portfolio',
    url: SITE_URL,
    inLanguage: ['en', 'pt-BR'],
    author: { '@type': 'Person', name: 'Mateus Ribeiro de Campos' },
  };
}

export function buildPageMetadata({
  locale,
  page,
  pathname,
}: {
  locale: string | undefined;
  page: PageKey;
  pathname: string;
}): Metadata {
  const resolvedLocale = resolveLocale(locale);
  const pageCopy = copy[resolvedLocale][page];
  const canonicalUrl = new URL(pathname, SITE_URL).toString();
  const ogLocale = resolvedLocale === 'pt-BR' ? 'pt_BR' : 'en_US';
  const cleanPath = stripPtBrPrefix(pathname);
  const ptBrPath = withPtBrPrefix(cleanPath);

  return {
    title: pageCopy.title,
    description: pageCopy.description,
    alternates: {
      canonical: pathname,
      languages: {
        en: cleanPath,
        'pt-BR': ptBrPath,
        'x-default': cleanPath,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: 'Mateus R Campos Portfolio',
      title: pageCopy.title,
      description: pageCopy.description,
      locale: ogLocale,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 400,
          height: 400,
          alt: 'Mateus R Campos',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageCopy.title,
      description: pageCopy.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

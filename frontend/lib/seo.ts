import type { Metadata } from 'next';

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
        'Learn about Mateus R Campos, his transition from agronomy to software development, and his backend engineering experience.',
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
        'Conheça a trajetória de Mateus R Campos, a transição da agronomia para tecnologia e sua experiência com engenharia backend.',
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

  return {
    title: pageCopy.title,
    description: pageCopy.description,
    alternates: {
      canonical: pathname,
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

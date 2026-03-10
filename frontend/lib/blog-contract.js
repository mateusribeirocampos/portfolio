export const DEFAULT_BLOG_CONTRACT_URL =
  'https://mateusribeirocampos.github.io/agro2code-blog/portfolio-articles.json';

export function normalizeBlogContractLanguage(locale) {
  return locale === 'pt-BR' ? 'pt' : 'en';
}

export function formatBlogCardDate(pubDate) {
  return String(pubDate).slice(0, 10);
}

export function isPortfolioArticleReference(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      (value.lang === 'en' || value.lang === 'pt') &&
      typeof value.title === 'string' &&
      typeof value.description === 'string' &&
      typeof value.pubDate === 'string' &&
      typeof value.canonicalSlug === 'string' &&
      typeof value.url === 'string' &&
      typeof value.portfolioFeatured === 'boolean'
  );
}

export function adaptPortfolioArticleReference(reference) {
  return {
    id: `${reference.lang}:${reference.canonicalSlug}`,
    title: reference.title,
    description: reference.portfolioSummary || reference.description,
    date: formatBlogCardDate(reference.pubDate),
    readTime: '',
    url: reference.url,
    image: reference.heroImage || '',
    lang: reference.lang,
    canonicalSlug: reference.canonicalSlug,
    external: true,
  };
}

function filterFallbackPostsByLocale(fallbackPosts, language) {
  const localized = fallbackPosts.filter((post) => post.lang === language);
  return localized.length > 0 ? localized : fallbackPosts;
}

export function resolveBlogPostsForLocale(references, locale, fallbackPosts = []) {
  const language = normalizeBlogContractLanguage(locale);
  const validReferences = Array.isArray(references) ? references.filter(isPortfolioArticleReference) : [];
  const localizedReferences = validReferences
    .filter((reference) => reference.lang === language)
    .filter((reference) => reference.portfolioFeatured)
    .map(adaptPortfolioArticleReference);

  if (localizedReferences.length > 0) {
    return localizedReferences;
  }

  return filterFallbackPostsByLocale(fallbackPosts, language);
}

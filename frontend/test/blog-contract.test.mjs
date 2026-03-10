import test from 'node:test';
import assert from 'node:assert/strict';

import {
  adaptPortfolioArticleReference,
  normalizeBlogContractLanguage,
  resolveBlogPostsForLocale,
} from '../lib/blog-contract.js';
import { getBlogCardMediaState } from '../lib/blog-card-media.js';
import { loadBlogFeedState, loadBlogPostsForLocale } from '../lib/blog-source.js';

test('normalizeBlogContractLanguage maps pt-BR to pt and keeps en as default', () => {
  assert.equal(normalizeBlogContractLanguage('pt-BR'), 'pt');
  assert.equal(normalizeBlogContractLanguage('en'), 'en');
  assert.equal(normalizeBlogContractLanguage('es'), 'en');
});

test('adaptPortfolioArticleReference converts the blog contract into the portfolio card shape', () => {
  const result = adaptPortfolioArticleReference({
    lang: 'pt',
    title: 'Featured PT',
    description: 'Long description',
    pubDate: '2026-03-02T00:00:00.000Z',
    canonicalSlug: 'featured-pt',
    url: 'https://mateusribeirocampos.github.io/agro2code-blog/pt/blog/featured-pt/',
    portfolioFeatured: true,
    portfolioSummary: 'Short summary for the portfolio',
    heroImage: 'https://mateusribeirocampos.github.io/agro2code-blog/agriculture-5.png',
  });

  assert.deepEqual(result, {
    id: 'pt:featured-pt',
    title: 'Featured PT',
    description: 'Short summary for the portfolio',
    date: '2026-03-02',
    readTime: '',
    url: 'https://mateusribeirocampos.github.io/agro2code-blog/pt/blog/featured-pt/',
    image: 'https://mateusribeirocampos.github.io/agro2code-blog/agriculture-5.png',
    lang: 'pt',
    canonicalSlug: 'featured-pt',
    external: true,
  });
});

test('resolveBlogPostsForLocale prefers valid featured references in the selected language', () => {
  const references = [
    {
      lang: 'en',
      title: 'Featured EN',
      description: 'English description',
      pubDate: '2026-03-03T00:00:00.000Z',
      canonicalSlug: 'featured-en',
      url: 'https://mateusribeirocampos.github.io/agro2code-blog/blog/featured-en/',
      portfolioFeatured: true,
      heroImage: 'https://mateusribeirocampos.github.io/agro2code-blog/EmbrapaApi.png',
    },
    {
      lang: 'pt',
      title: 'Featured PT',
      description: 'Portuguese description',
      pubDate: '2026-03-04T00:00:00.000Z',
      canonicalSlug: 'featured-pt',
      url: 'https://mateusribeirocampos.github.io/agro2code-blog/pt/blog/featured-pt/',
      portfolioFeatured: true,
      portfolioSummary: 'Resumo curto',
      heroImage: 'https://mateusribeirocampos.github.io/agro2code-blog/agriculture-5.png',
    },
  ];

  const fallbackPosts = [
    {
      id: 'fallback-en',
      title: 'Fallback EN',
      description: 'Fallback description',
      date: '2024-03-15',
      readTime: '5 min read',
      url: '/blog/fields-to-functions',
      image: '/images/blog/fields-to-functions.jpg',
      lang: 'en',
      canonicalSlug: 'fields-to-functions',
    },
  ];

  const result = resolveBlogPostsForLocale(references, 'pt-BR', fallbackPosts);

  assert.deepEqual(result, [
    {
      id: 'pt:featured-pt',
      title: 'Featured PT',
      description: 'Resumo curto',
      date: '2026-03-04',
      readTime: '',
      url: 'https://mateusribeirocampos.github.io/agro2code-blog/pt/blog/featured-pt/',
      image: 'https://mateusribeirocampos.github.io/agro2code-blog/agriculture-5.png',
      lang: 'pt',
      canonicalSlug: 'featured-pt',
      external: true,
    },
  ]);
});

test('resolveBlogPostsForLocale falls back to local data when remote references are unavailable', () => {
  const fallbackPosts = [
    {
      id: 'fallback-en',
      title: 'Fallback EN',
      description: 'Fallback description',
      date: '2024-03-15',
      readTime: '5 min read',
      url: '/blog/fields-to-functions',
      image: '/images/blog/fields-to-functions.jpg',
      lang: 'en',
      canonicalSlug: 'fields-to-functions',
    },
    {
      id: 'fallback-pt',
      title: 'Fallback PT',
      description: 'Descricao local',
      date: '2024-03-16',
      readTime: '5 min read',
      url: '/blog/campos-para-funcoes',
      image: '/images/blog/fields-to-functions.jpg',
      lang: 'pt',
      canonicalSlug: 'campos-para-funcoes',
    },
  ];

  const result = resolveBlogPostsForLocale([], 'pt-BR', fallbackPosts);

  assert.deepEqual(result, [fallbackPosts[1]]);
});

test('resolveBlogPostsForLocale ignores invalid remote entries and keeps valid featured references', () => {
  const references = [
    null,
    {
      lang: 'pt',
      title: 'Valido PT',
      description: 'Descricao PT',
      pubDate: '2026-03-05T00:00:00.000Z',
      canonicalSlug: 'valido-pt',
      url: 'https://mateusribeirocampos.github.io/agro2code-blog/pt/blog/valido-pt/',
      portfolioFeatured: true,
    },
    {
      lang: 'pt',
      title: 'Invalido PT',
      description: 'Sem URL',
      pubDate: '2026-03-05T00:00:00.000Z',
      canonicalSlug: 'invalido-pt',
      portfolioFeatured: true,
    },
  ];

  const result = resolveBlogPostsForLocale(references, 'pt-BR', []);

  assert.deepEqual(result, [
    {
      id: 'pt:valido-pt',
      title: 'Valido PT',
      description: 'Descricao PT',
      date: '2026-03-05',
      readTime: '',
      url: 'https://mateusribeirocampos.github.io/agro2code-blog/pt/blog/valido-pt/',
      image: '',
      lang: 'pt',
      canonicalSlug: 'valido-pt',
      external: true,
    },
  ]);
});

test('resolveBlogPostsForLocale falls back to localized local posts when remote references exist only in another language', () => {
  const references = [
    {
      lang: 'en',
      title: 'Featured EN',
      description: 'English description',
      pubDate: '2026-03-03T00:00:00.000Z',
      canonicalSlug: 'featured-en',
      url: 'https://mateusribeirocampos.github.io/agro2code-blog/blog/featured-en/',
      portfolioFeatured: true,
    },
  ];

  const fallbackPosts = [
    {
      id: 'fallback-en',
      title: 'Fallback EN',
      description: 'Fallback description',
      date: '2024-03-15',
      readTime: '5 min read',
      url: '/blog/fields-to-functions',
      image: '/images/blog/fields-to-functions.jpg',
      lang: 'en',
      canonicalSlug: 'fields-to-functions',
    },
    {
      id: 'fallback-pt',
      title: 'Fallback PT',
      description: 'Descricao local',
      date: '2024-03-16',
      readTime: '5 min read',
      url: '/blog/campos-para-funcoes',
      image: '/images/blog/fields-to-functions.jpg',
      lang: 'pt',
      canonicalSlug: 'campos-para-funcoes',
    },
  ];

  const result = resolveBlogPostsForLocale(references, 'pt-BR', fallbackPosts);

  assert.deepEqual(result, [fallbackPosts[1]]);
});

test('loadBlogPostsForLocale uses remote references when fetch succeeds', async () => {
  const fallbackPosts = [
    {
      id: 'fallback-en',
      title: 'Fallback EN',
      description: 'Fallback description',
      date: '2024-03-15',
      readTime: '5 min read',
      url: '/blog/fields-to-functions',
      image: '/images/blog/fields-to-functions.jpg',
      lang: 'en',
      canonicalSlug: 'fields-to-functions',
    },
  ];

  const posts = await loadBlogPostsForLocale({
    locale: 'en',
    fallbackPosts,
    fetchImpl: async () => ({
      ok: true,
      async json() {
        return [
          {
            lang: 'en',
            title: 'Featured EN',
            description: 'English description',
            pubDate: '2026-03-03T00:00:00.000Z',
            canonicalSlug: 'featured-en',
            url: 'https://mateusribeirocampos.github.io/agro2code-blog/blog/featured-en/',
            portfolioFeatured: true,
          },
        ];
      },
    }),
  });

  assert.deepEqual(posts, [
    {
      id: 'en:featured-en',
      title: 'Featured EN',
      description: 'English description',
      date: '2026-03-03',
      readTime: '',
      url: 'https://mateusribeirocampos.github.io/agro2code-blog/blog/featured-en/',
      image: '',
      lang: 'en',
      canonicalSlug: 'featured-en',
      external: true,
    },
  ]);
});

test('loadBlogPostsForLocale falls back to local posts when fetch fails', async () => {
  const fallbackPosts = [
    {
      id: 'fallback-pt',
      title: 'Fallback PT',
      description: 'Descricao local',
      date: '2024-03-16',
      readTime: '5 min read',
      url: '/blog/campos-para-funcoes',
      image: '/images/blog/fields-to-functions.jpg',
      lang: 'pt',
      canonicalSlug: 'campos-para-funcoes',
    },
  ];

  const posts = await loadBlogPostsForLocale({
    locale: 'pt-BR',
    fallbackPosts,
    fetchImpl: async () => {
      throw new Error('network error');
    },
  });

  assert.deepEqual(posts, fallbackPosts);
});

test('loadBlogPostsForLocale falls back to local posts when the response is not ok', async () => {
  const fallbackPosts = [
    {
      id: 'fallback-en',
      title: 'Fallback EN',
      description: 'Fallback description',
      date: '2024-03-15',
      readTime: '5 min read',
      url: '/blog/fields-to-functions',
      image: '/images/blog/fields-to-functions.jpg',
      lang: 'en',
      canonicalSlug: 'fields-to-functions',
    },
  ];

  const posts = await loadBlogPostsForLocale({
    locale: 'en',
    fallbackPosts,
    fetchImpl: async () => ({
      ok: false,
      status: 503,
      async json() {
        return [];
      },
    }),
  });

  assert.deepEqual(posts, fallbackPosts);
});

test('loadBlogFeedState reports fallback when the remote request fails', async () => {
  const fallbackPosts = [
    {
      id: 'fallback-pt',
      title: 'Fallback PT',
      description: 'Descricao local',
      date: '2024-03-16',
      readTime: '5 min read',
      url: '/blog/campos-para-funcoes',
      image: '/images/blog/fields-to-functions.jpg',
      lang: 'pt',
      canonicalSlug: 'campos-para-funcoes',
    },
  ];

  const state = await loadBlogFeedState({
    locale: 'pt-BR',
    fallbackPosts,
    fetchImpl: async () => {
      throw new Error('network error');
    },
  });

  assert.deepEqual(state, {
    posts: fallbackPosts,
    isFallback: true,
    fallbackReason: 'remote_request_failed',
  });
});

test('loadBlogFeedState reports fallback when there are no matching remote posts for the selected locale', async () => {
  const fallbackPosts = [
    {
      id: 'fallback-pt',
      title: 'Fallback PT',
      description: 'Descricao local',
      date: '2024-03-16',
      readTime: '5 min read',
      url: '/blog/campos-para-funcoes',
      image: '/images/blog/fields-to-functions.jpg',
      lang: 'pt',
      canonicalSlug: 'campos-para-funcoes',
    },
  ];

  const state = await loadBlogFeedState({
    locale: 'pt-BR',
    fallbackPosts,
    fetchImpl: async () => ({
      ok: true,
      async json() {
        return [
          {
            lang: 'en',
            title: 'Featured EN',
            description: 'English description',
            pubDate: '2026-03-03T00:00:00.000Z',
            canonicalSlug: 'featured-en',
            url: 'https://mateusribeirocampos.github.io/agro2code-blog/blog/featured-en/',
            portfolioFeatured: true,
          },
        ];
      },
    }),
  });

  assert.deepEqual(state, {
    posts: fallbackPosts,
    isFallback: true,
    fallbackReason: 'no_matching_remote_posts',
  });
});

test('loadBlogFeedState reports remote mode when matching featured references exist', async () => {
  const fallbackPosts = [
    {
      id: 'fallback-en',
      title: 'Fallback EN',
      description: 'Fallback description',
      date: '2024-03-15',
      readTime: '5 min read',
      url: '/blog/fields-to-functions',
      image: '/images/blog/fields-to-functions.jpg',
      lang: 'en',
      canonicalSlug: 'fields-to-functions',
    },
  ];

  const state = await loadBlogFeedState({
    locale: 'en',
    fallbackPosts,
    fetchImpl: async () => ({
      ok: true,
      async json() {
        return [
          {
            lang: 'en',
            title: 'Featured EN',
            description: 'English description',
            pubDate: '2026-03-03T00:00:00.000Z',
            canonicalSlug: 'featured-en',
            url: 'https://mateusribeirocampos.github.io/agro2code-blog/blog/featured-en/',
            portfolioFeatured: true,
          },
        ];
      },
    }),
  });

  assert.deepEqual(state, {
    posts: [
      {
        id: 'en:featured-en',
        title: 'Featured EN',
        description: 'English description',
        date: '2026-03-03',
        readTime: '',
        url: 'https://mateusribeirocampos.github.io/agro2code-blog/blog/featured-en/',
        image: '',
        lang: 'en',
        canonicalSlug: 'featured-en',
        external: true,
      },
    ],
    isFallback: false,
    fallbackReason: null,
  });
});

test('getBlogCardMediaState returns none when the card has no image', () => {
  assert.equal(getBlogCardMediaState(''), 'none');
  assert.equal(getBlogCardMediaState('   '), 'none');
  assert.equal(getBlogCardMediaState(undefined), 'none');
});

test('getBlogCardMediaState distinguishes local and remote image sources', () => {
  assert.equal(getBlogCardMediaState('/images/blog/post.jpg'), 'local');
  assert.equal(getBlogCardMediaState('https://example.com/post.jpg'), 'remote');
});

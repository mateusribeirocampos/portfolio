import {
  DEFAULT_BLOG_CONTRACT_URL,
  isPortfolioArticleReference,
  normalizeBlogContractLanguage,
  resolveBlogPostsForLocale,
} from './blog-contract.js';

/**
 * @typedef {import('../data/blog').BlogPost} BlogPost
 */

/**
 * @typedef {'remote_request_failed' | 'no_matching_remote_posts' | null} BlogFallbackReason
 */

/**
 * @typedef {{
 *   posts: BlogPost[];
 *   isFallback: boolean;
 *   fallbackReason: BlogFallbackReason;
 * }} BlogFeedState
 */

function buildFallbackState({ locale, fallbackPosts, reason }) {
  return {
    posts: resolveBlogPostsForLocale([], locale, fallbackPosts),
    isFallback: true,
    fallbackReason: reason,
  };
}

function logFallback(reason, error) {
  if (reason === 'remote_request_failed') {
    console.error('[portfolio/blog] Falling back to local posts because the remote blog contract request failed.', error);
    return;
  }

  console.warn('[portfolio/blog] Falling back to local posts because the remote blog contract returned no matching featured entries for the requested locale.');
}

/**
 * @param {{
 *   locale: string;
 *   fetchImpl?: typeof fetch;
 *   contractUrl?: string;
 *   fallbackPosts?: BlogPost[];
 * }} params
 * @returns {Promise<BlogFeedState>}
 */
export async function loadBlogFeedState({
  locale,
  fetchImpl = fetch,
  contractUrl = DEFAULT_BLOG_CONTRACT_URL,
  fallbackPosts = [],
} = {}) {
  const language = normalizeBlogContractLanguage(locale);

  try {
    const response = await fetchImpl(contractUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const error = new Error(`Failed to fetch portfolio article references: ${response.status}`);
      logFallback('remote_request_failed', error);
      return buildFallbackState({
        locale,
        fallbackPosts,
        reason: 'remote_request_failed',
      });
    }

    const references = await response.json();
    const validReferences = Array.isArray(references) ? references.filter(isPortfolioArticleReference) : [];
    const localizedReferences = validReferences
      .filter((reference) => reference.lang === language)
      .filter((reference) => reference.portfolioFeatured);

    if (localizedReferences.length === 0) {
      logFallback('no_matching_remote_posts');
      return buildFallbackState({
        locale,
        fallbackPosts,
        reason: 'no_matching_remote_posts',
      });
    }

    return {
      posts: resolveBlogPostsForLocale(validReferences, locale, fallbackPosts),
      isFallback: false,
      fallbackReason: null,
    };
  } catch (error) {
    logFallback('remote_request_failed', error);
    return buildFallbackState({
      locale,
      fallbackPosts,
      reason: 'remote_request_failed',
    });
  }
}

/**
 * @param {{
 *   locale: string;
 *   fetchImpl?: typeof fetch;
 *   contractUrl?: string;
 *   fallbackPosts?: BlogPost[];
 * }} params
 * @returns {Promise<BlogPost[]>}
 */
export async function loadBlogPostsForLocale({
  locale,
  fetchImpl = fetch,
  contractUrl = DEFAULT_BLOG_CONTRACT_URL,
  fallbackPosts = [],
} = {}) {
  const state = await loadBlogFeedState({
    locale,
    fetchImpl,
    contractUrl,
    fallbackPosts,
  });

  return state.posts;
}

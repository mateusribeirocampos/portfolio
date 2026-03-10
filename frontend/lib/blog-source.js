import { DEFAULT_BLOG_CONTRACT_URL, resolveBlogPostsForLocale } from './blog-contract.js';

/**
 * @typedef {import('../data/blog').BlogPost} BlogPost
 */

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
  try {
    const response = await fetchImpl(contractUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio article references: ${response.status}`);
    }

    const references = await response.json();
    return resolveBlogPostsForLocale(references, locale, fallbackPosts);
  } catch {
    return resolveBlogPostsForLocale([], locale, fallbackPosts);
  }
}

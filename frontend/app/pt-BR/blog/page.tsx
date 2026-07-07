import type { Metadata } from 'next';

import { blogPosts } from '@/data/blog';
import { getBlogCopy } from '@/lib/page-copy';
import { buildPageMetadata } from '@/lib/seo';
import { loadBlogFeedState } from '@/lib/blog-source';
import { BlogContent } from '../../blog/components/BlogContent';

export const metadata: Metadata = buildPageMetadata({
  locale: 'pt-BR',
  page: 'blog',
  pathname: '/pt-BR/blog',
});

export default async function BlogPtBr() {
  const blogFeed = await loadBlogFeedState({ locale: 'pt-BR', fallbackPosts: blogPosts });

  return (
    <BlogContent
      copy={getBlogCopy('pt-BR')}
      locale="pt-BR"
      posts={blogFeed.posts}
      isFallback={blogFeed.isFallback}
      fallbackReason={blogFeed.fallbackReason}
    />
  );
}

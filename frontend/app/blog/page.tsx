import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { blogPosts } from '@/data/blog';
import { getBlogCopy, resolvePageCopyLocale } from '@/lib/page-copy';
import { buildPageMetadata } from '@/lib/seo';
import { loadBlogFeedState } from '@/lib/blog-source';
import { BlogContent } from './components/BlogContent';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();

  return buildPageMetadata({
    locale: cookieStore.get('NEXT_LOCALE')?.value,
    page: 'blog',
    pathname: '/blog',
  });
}

export default async function Blog() {
  const cookieStore = await cookies();
  const locale = resolvePageCopyLocale(cookieStore.get('NEXT_LOCALE')?.value);
  const blogFeed = await loadBlogFeedState({ locale, fallbackPosts: blogPosts });

  return (
    <BlogContent
      copy={getBlogCopy(locale)}
      locale={locale}
      posts={blogFeed.posts}
      isFallback={blogFeed.isFallback}
      fallbackReason={blogFeed.fallbackReason}
    />
  );
}

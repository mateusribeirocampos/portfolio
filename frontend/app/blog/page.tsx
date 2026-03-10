import { cookies } from 'next/headers';

import { blogPosts } from '@/data/blog';
import { loadBlogFeedState } from '@/lib/blog-source';
import { BlogContent } from './components/BlogContent';

export const metadata = {
  title: 'Blog | Mateus R Campos',
  description: 'Insights and experiences from my journey in tech and agriculture',
};

export default async function Blog() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  const blogFeed = await loadBlogFeedState({ locale, fallbackPosts: blogPosts });

  return (
    <BlogContent
      posts={blogFeed.posts}
      isFallback={blogFeed.isFallback}
      fallbackReason={blogFeed.fallbackReason}
    />
  );
}

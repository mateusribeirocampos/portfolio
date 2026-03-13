'use client';

import type { BlogPost } from '@/data/blog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { getBlogCardMediaState } from '@/lib/blog-card-media';

interface BlogContentProps {
  posts: BlogPost[];
  isFallback?: boolean;
  fallbackReason?: 'remote_request_failed' | 'no_matching_remote_posts' | null;
}

function isExternalUrl(url: string) {
  return /^https?:\/\//.test(url);
}

function formatPostDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'pt-BR' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

export function BlogContent({ posts, isFallback = false, fallbackReason = null }: BlogContentProps) {
  const { t, i18n } = useTranslation('blog');

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="text-3xl font-bold">{t("blog.title")}</h1>
          <p className="text-muted-foreground">
            {t("blog.description")}
          </p>
          {isFallback ? (
            <div className="rounded-lg border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {fallbackReason === 'remote_request_failed'
                ? t('blog.fallbackRemoteFailed')
                : t('blog.fallbackNoLocalizedRemotePosts')}
            </div>
          ) : null}
        </div>

        <div className="grid auto-rows-fr gap-6">
          {posts.map((post) => {
            const mediaState = getBlogCardMediaState(post.image);

            return (
              <Card key={post.id} className="h-full overflow-hidden md:min-h-[300px]">
                <div className="grid md:grid-cols-[2fr_3fr] md:h-full">
                  <div className="relative aspect-video md:aspect-auto md:h-full overflow-hidden">
                    {mediaState === 'local' ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    ) : null}
                    {mediaState === 'remote' ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                    {mediaState === 'none' ? (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.06),rgba(15,23,42,0.14))]"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <time className="flex items-center gap-1" dateTime={post.date}>
                          <Calendar className="h-4 w-4" />
                          {formatPostDate(post.date, i18n.language)}
                        </time>
                        {post.readTime ? (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </span>
                        ) : null}
                      </div>
                      <h2 className="text-2xl font-semibold leading-none tracking-tight">{post.title}</h2>
                      <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow" />
                    <CardFooter>
                      <Button variant="outline" asChild>
                        <a
                          href={post.url}
                          target={isExternalUrl(post.url) ? '_blank' : undefined}
                          rel={isExternalUrl(post.url) ? 'noreferrer' : undefined}
                        >
                          {t("blog.readMore")} <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
} 

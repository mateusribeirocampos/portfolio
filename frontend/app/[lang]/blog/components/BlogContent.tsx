'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '@/data/blog';

export function BlogContent() {
  const { t } = useTranslation("blog");

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="text-3xl font-bold">{t("blog.title")}</h1>
          <p className="text-muted-foreground">
            {t("blog.description")}
          </p>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden">
              <div className="grid md:grid-cols-[2fr_3fr]">
                <div className="aspect-video md:aspect-auto relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow" />
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        {t("blog.readMore")} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 
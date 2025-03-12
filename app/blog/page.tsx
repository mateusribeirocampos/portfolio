import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | Mateus R Campos',
  description: 'Insights and experiences from my journey in tech and agriculture',
};

const blogPosts = [
  {
    title: 'From Fields to Functions: My Tech Journey',
    description: 'How my background in Agronomy prepared me for a career in software development',
    date: '2024-03-15',
    readTime: '5 min read',
    slug: 'fields-to-functions',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051',
  },
  {
    title: 'Bridging Agriculture and Technology',
    description: 'Exploring the intersection of agricultural science and modern tech solutions',
    date: '2024-03-10',
    readTime: '4 min read',
    slug: 'agriculture-meets-tech',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  },
  {
    title: 'Learning Computer Science: A New Perspective',
    description: 'Insights from my ongoing journey in computer science education',
    date: '2024-03-05',
    readTime: '6 min read',
    slug: 'cs-learning-journey',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  },
];

export default function Blog() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="text-muted-foreground">
            Sharing my experiences and insights from my journey in technology and agriculture.
          </p>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden">
              <div className="grid md:grid-cols-[2fr_3fr]">
                <div className="aspect-video md:aspect-auto relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full"
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
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
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
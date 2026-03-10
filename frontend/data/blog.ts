export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  url: string;
  image: string;
  lang: 'en' | 'pt';
  canonicalSlug: string;
  external?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'fallback:fields-to-functions',
    title: 'From Fields to Functions: My Tech Journey',
    description: 'How my background in Agronomy prepared me for a career in software development',
    date: '2024-03-15',
    readTime: '5 min read',
    url: '/blog/fields-to-functions',
    image: '/images/blog/fields-to-functions.jpg',
    lang: 'en',
    canonicalSlug: 'fields-to-functions',
  },
  {
    id: 'fallback:agriculture-meets-tech',
    title: 'Bridging Agriculture and Technology',
    description: 'Exploring the intersection of agricultural science and modern tech solutions',
    date: '2024-03-10',
    readTime: '4 min read',
    url: '/blog/agriculture-meets-tech',
    image: '/images/blog/agriculture-meets-tech.jpg',
    lang: 'en',
    canonicalSlug: 'agriculture-meets-tech',
  },
  {
    id: 'fallback:cs-learning-journey',
    title: 'Learning Computer Science: A New Perspective',
    description: 'Insights from my ongoing journey in computer science education',
    date: '2024-03-05',
    readTime: '6 min read',
    url: '/blog/cs-learning-journey',
    image: '/images/blog/cs-learning-journey1.jpg',
    lang: 'en',
    canonicalSlug: 'cs-learning-journey',
  },
];

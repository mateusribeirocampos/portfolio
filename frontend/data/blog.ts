export interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: 'From Fields to Functions: My Tech Journey',
    description: 'How my background in Agronomy prepared me for a career in software development',
    date: '2024-03-15',
    readTime: '5 min read',
    slug: 'fields-to-functions',
    image: '/images/blog/fields-to-functions.jpg',
  },
  {
    title: 'Bridging Agriculture and Technology',
    description: 'Exploring the intersection of agricultural science and modern tech solutions',
    date: '2024-03-10',
    readTime: '4 min read',
    slug: 'agriculture-meets-tech',
    image: '/images/blog/agriculture-meets-tech.jpg',
  },
  {
    title: 'Learning Computer Science: A New Perspective',
    description: 'Insights from my ongoing journey in computer science education',
    date: '2024-03-05',
    readTime: '6 min read',
    slug: 'cs-learning-journey',
    image: '/images/blog/cs-learning-journey1.jpg',
  },
];
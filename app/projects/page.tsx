import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'Project 1',
    description: 'Digital healthcare revolutionizes the way we deliver and experience healthcare with a paradigm shift to more accessible, personalized and efficient approaches for all.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    tags: ['React-native', 'Reactjs', 'Bootstrap', 'Node.js', 'Express', 'Sqlite'],
    github: 'https://github.com/mateusribeirocampos/dragenda',
    demo: 'https://example.com',
  },
  {
    title: 'Project 2',
    description: 'An innovative e-commerce platform that enhances online shopping experiences with personalized recommendations.',
    image: 'https://images.unsplash.com/photo-1573164574572-f9c65a4d7c8e',
    tags: ['Next.js', 'React', 'Node.js', 'Express'],
    github: 'https://github.com/project2',
    demo: 'https://project2demo.com',
  },
  {
    title: 'Project 3',
    description: 'A cutting-edge social media application that connects users with shared interests in a fun and engaging way.',
    image: 'https://images.unsplash.com/photo-1600585154339-7452cdb40c30',
    tags: ['React', 'Firebase', 'CSS'],
    github: 'https://github.com/project3',
    demo: 'https://project3demo.com',
  },
  
  // Add more projects here
];

export const metadata = {
  title: 'Projects | Mateus R Campos',
  description: 'Showcase of my technical projects and development work',
};

export default function Projects() {
  return (
    <div className="container py-12">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">
          A collection of my technical projects, showcasing my skills and experience.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={project.github}>
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={project.demo}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
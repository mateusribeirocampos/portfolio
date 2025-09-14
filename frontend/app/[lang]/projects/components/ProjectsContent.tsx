'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/frontend/components/ui/card';
import { Button } from '@/frontend/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/frontend/data/projects';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export function ProjectsContent() {
  const { t } = useTranslation("projects");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (src: string) => {
    setImageErrors(prev => ({ ...prev, [src]: true }));
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="text-3xl font-bold">{t("projects.title")}</h1>
        <p className="text-muted-foreground">
          {t("projects.pTitle")}
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card 
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-48 mb-4">
                {!imageErrors[project.image] && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={300}
                    onError={() => handleImageError(project.image)}
                    className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${
                      hoveredIndex === index && project.secondImage ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                )}
                {project.secondImage && !imageErrors[project.secondImage] && (
                  <Image
                    src={project.secondImage}
                    alt={`${project.title} - Second view`}
                    width={500}
                    height={300}
                    onError={() => project.secondImage && handleImageError(project.secondImage)}
                    className={`absolute top-0 left-0 w-full h-full object-cover rounded-md transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}
              </div>
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
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t("projects.liveDemo")}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 
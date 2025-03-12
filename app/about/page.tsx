import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About | Mateus R Campos',
  description: 'Learn about my journey from Agronomy to Full Stack Development',
};

export default function About() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Me</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">My Journey</h2>
            <p className="text-muted-foreground mb-4">
              My path to software development has been unique. With a background in Agronomy,
              I developed strong analytical skills and a deep understanding of complex systems.
              This foundation has proven invaluable in my transition to technology, where I
              approach problems with both technical expertise and a holistic perspective.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">Computer Science</h3>
                <p className="text-muted-foreground">Currently pursuing studies in Computer Science</p>
              </li>
              <li className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">B.S. in Agronomy</h3>
                <p className="text-muted-foreground">Specialized in sustainable agricultural systems</p>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">Frontend</h3>
                <p className="text-muted-foreground">React, Next.js, TypeScript</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">Backend</h3>
                <p className="text-muted-foreground">Node.js, Express, PostgreSQL</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">Tools</h3>
                <p className="text-muted-foreground">Git, Docker, AWS</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/contact">
                <FileText className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
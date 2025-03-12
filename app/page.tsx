import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Leaf, Brain } from 'lucide-react';

export default function Home() {
  return (
    <>
    <div className='flex-1'>
      <section className="container flex flex-col items-center justify-center gap-4 py-24 md:py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            Mateus R Campos
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            From nurturing plants to cultivating code. Agronomist turned Full Stack Developer,
            bringing a unique perspective to software development.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-primary">
            <Code className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Full Stack Development</h2>
            <p className="text-muted-foreground">
              Building modern web applications with React, Next.js, and Node.js
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-primary">
            <Leaf className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Agronomy Background</h2>
            <p className="text-muted-foreground">
              Bringing analytical thinking and problem-solving from agricultural science
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-primary">
            <Brain className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Continuous Learning</h2>
            <p className="text-muted-foreground">
              Currently pursuing Computer Science studies and staying updated with latest tech
            </p>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
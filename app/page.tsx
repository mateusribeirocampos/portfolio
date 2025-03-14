import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Leaf, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex-1">
        <section className="container flex flex-col items-center justify-center gap-4 py-24 md:py-32">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Hi, I&apos;m Mateus R Campos
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Science Computer Student | Full Stack | Data Scientist | Developer
              and Tech Enthusiast | Agronomist
            </p>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button asChild>
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute right-0 top-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -a-10"></div>
            <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -a-10"></div>
          </div>

          <div className="container px-4">
            <div className="text-center mb-20 relative">
              <div className="items-center rounded-md py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground mb-4">
                <h2 className="inline-flex text-4xl md:text-5xl font-bold mb-6">
                  Skills & Expertise
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  I am a Computer Science student with a robust background in
                  Agronomy and Entomology—specializing in ecotoxicology and
                  biological control. I am uniquely positioned to merge
                  scientific insight with modern technology. Transitioning into
                  IT with focuses on data analysis and full stack software
                  development while continually expanding my skills in React,
                  React Native, and backend technologies.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-primary">
              <Code className="h-12 w-12 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">
                Full Stack Development
              </h2>
              <p className="text-muted-foreground">
                Building modern web applications with React, Next.js, and
                Node.js
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-primary">
              <Smartphone className="h-12 w-12 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Mobile Development</h2>
              <p className="text-muted-foreground">
                Building cross-platform mobile apps with React Native
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-primary">
              <Leaf className="h-12 w-12 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">
                Agronomy Background
              </h2>
              <p className="text-muted-foreground">
                Bringing analytical thinking and problem-solving from
                agricultural science
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

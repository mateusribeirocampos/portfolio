'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, ExternalLink, ServerCog } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { projects, type Project, type ProjectLocale } from '@/data/projects';
import { cn } from '@/lib/utils';

interface ProjectsCopy {
  eyebrow: string;
  title: string;
  pTitle: string;
  featuredTitle: string;
  featuredDescription: string;
  architectureLabel: string;
  evidenceLabel: string;
  stackLabel: string;
  otherTitle: string;
  otherDescription: string;
  sourceCode: string;
  liveDemo: string;
}

function ProjectImage({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const primaryFailed = imageErrors[project.image];
  const secondaryFailed = project.secondImage ? imageErrors[project.secondImage] : true;
  const hasSecondaryImage = Boolean(project.secondImage && !secondaryFailed);

  if (primaryFailed) {
    return (
      <div className="flex h-full min-h-48 items-center justify-center bg-muted">
        <ServerCog className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="group relative h-full min-h-48 overflow-hidden bg-muted">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 1024px) 100vw, 46vw"
        onError={() => setImageErrors((current) => ({ ...current, [project.image]: true }))}
        className={cn(
          'object-cover transition-opacity duration-300',
          hasSecondaryImage && 'group-hover:opacity-0',
        )}
        priority={priority}
      />
      {project.secondImage && !secondaryFailed ? (
        <Image
          src={project.secondImage}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 46vw"
          onError={() =>
            setImageErrors((current) => ({
              ...current,
              [project.secondImage as string]: true,
            }))
          }
          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}

export function ProjectsContent({ copy, locale }: { copy: ProjectsCopy; locale: ProjectLocale }) {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <div className="container mx-auto px-[15px] py-14 md:py-20">
      <header className="mx-auto max-w-5xl">
        <p className="portfolio-kicker">{copy.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.06] sm:text-5xl md:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {copy.pTitle}
        </p>
      </header>

      <section className="mx-auto mt-20 max-w-5xl">
        <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">{copy.featuredTitle}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{copy.featuredDescription}</p>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {String(featuredProjects.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        <div className="portfolio-rule mt-8 border-t">
          {featuredProjects.map((project, projectIndex) => (
            <article
              id={project.slug}
              key={project.slug}
              className="portfolio-rule scroll-mt-24 border-b py-10 md:py-14"
            >
              <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:gap-12">
                <div className="space-y-6">
                  <div className="portfolio-rule relative aspect-[4/3] overflow-hidden rounded-md border">
                    <ProjectImage project={project} priority={projectIndex === 0} />
                  </div>

                  <div>
                    <p className="portfolio-kicker">{copy.stackLabel}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border bg-secondary px-2 py-1 font-mono text-xs text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="portfolio-kicker text-protocol">
                      {String(projectIndex + 1).padStart(2, '0')} / {project.kind[locale]}
                    </p>
                    <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-signal" />
                      {project.status[locale]}
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl font-semibold">{project.title}</h3>
                  <p className="mt-5 leading-7 text-muted-foreground">
                    {project.description[locale]}
                  </p>

                  {project.architecture ? (
                    <div className="mt-8">
                      <p className="portfolio-kicker">{copy.architectureLabel}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {project.architecture.map((stage, stageIndex) => (
                          <div key={stage} className="flex items-center gap-2">
                            <span className="rounded-md border bg-background px-2.5 py-1.5 font-mono text-xs">
                              {stage}
                            </span>
                            {stageIndex < project.architecture!.length - 1 ? (
                              <ArrowRight className="h-3.5 w-3.5 text-steel" aria-hidden="true" />
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {project.evidence ? (
                    <div className="mt-8">
                      <p className="portfolio-kicker">{copy.evidenceLabel}</p>
                      <dl className="portfolio-rule mt-4 border-t">
                        {project.evidence.map((item) => (
                          <div
                            key={item.label[locale]}
                            className="portfolio-rule grid gap-2 border-b py-4 sm:grid-cols-[120px_1fr]"
                          >
                            <dt className="font-mono text-xs font-medium text-signal">
                              {item.label[locale]}
                            </dt>
                            <dd className="text-sm leading-6 text-muted-foreground">
                              {item.value[locale]}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ) : null}

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.github ? (
                      <Button variant="outline" asChild>
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <FaGithub className="mr-2 h-4 w-4" />
                          {copy.sourceCode}
                        </Link>
                      </Button>
                    ) : null}
                    {project.demo ? (
                      <Button asChild>
                        <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {copy.liveDemo}
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <div>
          <h2 className="text-2xl font-semibold md:text-3xl">{copy.otherTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{copy.otherDescription}</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {otherProjects.map((project) => (
            <article
              key={project.slug}
              className="portfolio-rule flex min-h-full flex-col overflow-hidden rounded-md border bg-card"
            >
              <div className="aspect-video overflow-hidden border-b">
                <ProjectImage project={project} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="portfolio-kicker text-protocol">{project.kind[locale]}</p>
                  <span className="h-2 w-2 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {project.description[locale]}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border bg-secondary px-2 py-1 font-mono text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  {project.github ? (
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={copy.sourceCode + ': ' + project.title}
                        title={copy.sourceCode}
                      >
                        <FaGithub className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : null}
                  {project.demo ? (
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={copy.liveDemo + ': ' + project.title}
                        title={copy.liveDemo}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

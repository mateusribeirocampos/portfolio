'use client';

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  Code2,
  Database,
  ExternalLink,
  FileText,
  FlaskConical,
  GraduationCap,
  Layers3,
  Loader2,
  ShieldCheck,
  TestTube2,
  Workflow,
} from "lucide-react";

interface CertificationItem {
  name: string;
  institution: string;
  hours?: string;
  year: string;
}

interface SignalItem {
  label: string;
  value: string;
}

interface FocusItem {
  title: string;
  description: string;
}

interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  summary: string;
  bullets: string[];
}

interface ProjectItem {
  title: string;
  description: string;
  stack: string;
  href?: string;
}

interface AboutCopy {
  title: string;
  subtitle: string;
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    badges: string[];
  };
  profileSignals: SignalItem[];
  focus: {
    title: string;
    items: FocusItem[];
  };
  journey: {
    title: string;
    description: string[];
  };
  experience: {
    title: string;
    items: ExperienceItem[];
  };
  selectedProjects: {
    title: string;
    items: ProjectItem[];
  };
  whatSetsMeApart: {
    title: string;
    description: string;
  };
  education: {
    title: string;
    computerScience: { title: string; description: string };
    doctorate: { title: string; description: string };
    masters: { title: string; description: string };
    agronomy: { title: string; description: string };
  };
  skills: {
    title: string;
    backend: { title: string; description: string };
    testing: { title: string; description: string };
    frontend: { title: string; description: string };
    databases: { title: string; description: string };
    devops: { title: string; description: string };
    tools: { title: string; description: string };
  };
  certifications: {
    title: string;
    items: CertificationItem[];
  };
  downloadResume: string;
}

const focusIcons = [Code2, TestTube2, Workflow];
const skillIcons = [Layers3, TestTube2, Code2, Database, ShieldCheck, Workflow];

function getStackTags(stack: string): string[] {
  return stack
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function AboutContent({
  copy,
  lang,
}: {
  copy: AboutCopy;
  lang: 'en' | 'pt-BR';
}) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);

    const staticFile = lang === 'pt-BR'
      ? '/resume-pt-br-port.pdf'
      : '/resume-en-port.pdf';

    const triggerDownload = (href: string, filename: string) => {
      const a = document.createElement('a');
      a.href = href;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error('No API URL configured');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const url = `${apiUrl}/api/resume/download/${lang}`;
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      triggerDownload(objectUrl, `resume-${lang}.pdf`);
      URL.revokeObjectURL(objectUrl);
    } catch {
      // Fallback: serve static PDF directly from /public
      triggerDownload(staticFile, `resume-${lang}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  const skillGroups = [
    copy.skills.backend,
    copy.skills.testing,
    copy.skills.frontend,
    copy.skills.databases,
    copy.skills.devops,
    copy.skills.tools,
  ];

  return (
    <main className="container py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {copy.hero.eyebrow}
          </p>
          <h1 className="text-3xl font-bold">{copy.title}</h1>
          <p className="max-w-3xl text-muted-foreground">{copy.subtitle}</p>
          <div className="flex flex-wrap gap-2">
            {copy.hero.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-md border bg-secondary px-2 py-1 text-sm text-secondary-foreground"
              >
                {badge}
              </span>
            ))}
          </div>
          <div>
            <Button onClick={handleDownload} disabled={downloading}>
              {downloading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileText className="mr-2 h-4 w-4" />
              )}
              {copy.downloadResume}
            </Button>
          </div>
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[220px_1fr] lg:items-start">
          <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full border-4 border-primary shadow-xl ring-4 ring-primary/20 lg:mx-0 lg:h-52 lg:w-52">
            <Image
              src="/images/home/profilelinkedin.jpeg"
              alt="Mateus Ribeiro de Campos"
              fill
              sizes="(max-width: 1024px) 176px, 208px"
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold leading-tight">
                {copy.hero.headline}
              </h2>
              <p className="leading-7 text-muted-foreground">
                {copy.hero.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {copy.profileSignals.map((signal) => (
                <div key={signal.label} className="rounded-lg border bg-card p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {signal.label}
                  </p>
                  <p className="mt-2 font-semibold">{signal.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12 grid gap-8 lg:grid-cols-[0.78fr_1fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{copy.journey.title}</h2>
            <div className="space-y-4 leading-7 text-muted-foreground">
              {copy.journey.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{copy.focus.title}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {copy.focus.items.map((item, index) => {
                const Icon = focusIcons[index % focusIcons.length];

                return (
                  <article key={item.title} className="rounded-lg border bg-card p-5">
                    <Icon className="mb-4 h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <BriefcaseBusiness className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">{copy.experience.title}</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {copy.experience.items.map((item) => (
              <article
                key={`${item.role}-${item.organization}`}
                className="rounded-lg border bg-card p-5"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold">{item.role}</h3>
                    <p className="text-sm text-muted-foreground">{item.organization}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.period}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.summary}</p>
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <Code2 className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">{copy.selectedProjects.title}</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {copy.selectedProjects.items.map((project) => (
              <article key={project.title} className="rounded-lg border bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold">{project.title}</h3>
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={project.title}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {getStackTags(project.stack).map((tag) => (
                    <span
                      key={`${project.title}-${tag}`}
                      className="rounded-md border bg-secondary px-2 py-1 text-sm text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold">{copy.whatSetsMeApart.title}</h2>
            <p className="leading-7 text-muted-foreground">{copy.whatSetsMeApart.description}</p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">{copy.skills.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((skill, index) => {
              const Icon = skillIcons[index % skillIcons.length];

              return (
                <article key={skill.title} className="rounded-lg border bg-card p-4">
                  <Icon className="mb-3 h-5 w-5 text-primary" />
                  <h3 className="font-medium">{skill.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {skill.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">{copy.education.title}</h2>
            </div>
            <ul className="space-y-3">
              {[
                copy.education.computerScience,
                copy.education.doctorate,
                copy.education.masters,
                copy.education.agronomy,
              ].map((item) => (
                <li key={item.title} className="rounded-lg border bg-card p-4">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <FlaskConical className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">{copy.certifications.title}</h2>
            </div>
            <ul className="space-y-3">
              {copy.certifications.items.map((cert) => (
                <li key={`${cert.name}-${cert.year}`} className="rounded-lg border bg-card p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="font-medium">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">{cert.institution}</p>
                    </div>
                    <div className="shrink-0 text-sm text-muted-foreground sm:text-right">
                      {cert.hours && <span className="mr-2">{cert.hours}</span>}
                      <span>{cert.year}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

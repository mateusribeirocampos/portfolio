'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";

interface CertificationItem {
  name: string;
  institution: string;
  hours?: string;
  year: string;
}

interface AboutCopy {
  title: string;
  subtitle: string;
  journey: {
    title: string;
    description: string[];
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

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{copy.title}</h1>
        <p className="text-muted-foreground mb-8">{copy.subtitle}</p>

        <div className="prose dark:prose-invert max-w-none">
          {/* Who I Am Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{copy.journey.title}</h2>
            <div className="bg-card p-4 space-y-4">
              {copy.journey.description.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{copy.skills.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{copy.skills.backend.title}</h3>
                <p className="text-muted-foreground">{copy.skills.backend.description}</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{copy.skills.testing.title}</h3>
                <p className="text-muted-foreground">{copy.skills.testing.description}</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{copy.skills.frontend.title}</h3>
                <p className="text-muted-foreground">{copy.skills.frontend.description}</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{copy.skills.databases.title}</h3>
                <p className="text-muted-foreground">{copy.skills.databases.description}</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{copy.skills.devops.title}</h3>
                <p className="text-muted-foreground">{copy.skills.devops.description}</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{copy.skills.tools.title}</h3>
                <p className="text-muted-foreground">{copy.skills.tools.description}</p>
              </div>
            </div>
          </div>

          {/* What Sets Me Apart Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{copy.whatSetsMeApart.title}</h2>
            <div className="bg-card p-4">
              <p className="text-muted-foreground">{copy.whatSetsMeApart.description}</p>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{copy.education.title}</h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{copy.education.computerScience.title}</h3>
                <p className="text-muted-foreground">{copy.education.computerScience.description}</p>
              </li>
              <li className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{copy.education.doctorate.title}</h3>
                <p className="text-muted-foreground">{copy.education.doctorate.description}</p>
              </li>
              <li className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{copy.education.masters.title}</h3>
                <p className="text-muted-foreground">{copy.education.masters.description}</p>
              </li>
              <li className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{copy.education.agronomy.title}</h3>
                <p className="text-muted-foreground">{copy.education.agronomy.description}</p>
              </li>
            </ul>
          </div>

          {/* Certifications Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{copy.certifications.title}</h2>
            <ul className="space-y-3 list-none pl-0">
              {copy.certifications.items.map((cert, index) => (
                <li key={index} className="bg-card p-4 rounded-lg flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-muted-foreground text-sm">{cert.institution}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground shrink-0 ml-4">
                    {cert.hours && <span className="mr-2">{cert.hours}</span>}
                    <span>{cert.year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Resume Button */}
          <div className="flex justify-center mt-8">
            <Button onClick={handleDownload} disabled={downloading}>
              {downloading
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                : <FileText className="mr-2 h-4 w-4" />
              }
              {copy.downloadResume}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

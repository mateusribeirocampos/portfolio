'use client';

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CertificationItem {
  name: string;
  institution: string;
  hours?: string;
  year: string;
}

export function AboutContent() {
  const { t, i18n } = useTranslation("about");
  const resumeUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/resume/download/${i18n.language}`;

  const certifications = t("about.certifications.items", { returnObjects: true }) as CertificationItem[];

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t("about.title")}</h1>
        <p className="text-muted-foreground mb-8">{t("about.subtitle")}</p>

        <div className="prose dark:prose-invert max-w-none">
          {/* Who I Am Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("about.journey.title")}</h2>
            <div className="bg-card text-justify p-4 space-y-4">
              {(t("about.journey.description", { returnObjects: true }) as string[]).map((paragraph, index) => (
                <p key={index} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("about.skills.title")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{t("about.skills.backend.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.skills.backend.description")}
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{t("about.skills.testing.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.skills.testing.description")}
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{t("about.skills.frontend.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.skills.frontend.description")}
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{t("about.skills.databases.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.skills.databases.description")}
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{t("about.skills.devops.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.skills.devops.description")}
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{t("about.skills.tools.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.skills.tools.description")}
                </p>
              </div>
            </div>
          </div>

          {/* What Sets Me Apart Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("about.whatSetsMeApart.title")}</h2>
            <div className="bg-card text-justify p-4">
              <p className="text-muted-foreground">{t("about.whatSetsMeApart.description")}</p>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("about.education.title")}</h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{t("about.education.computerScience.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.education.computerScience.description")}
                </p>
              </li>
              <li className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{t("about.education.doctorate.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.education.doctorate.description")}
                </p>
              </li>
              <li className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{t("about.education.masters.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.education.masters.description")}
                </p>
              </li>
              <li className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{t("about.education.agronomy.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.education.agronomy.description")}
                </p>
              </li>
            </ul>
          </div>

          {/* Certifications Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("about.certifications.title")}</h2>
            <ul className="space-y-3 list-none pl-0">
              {certifications.map((cert, index) => (
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
            <Button asChild>
              <a href={resumeUrl}>
                <FileText className="mr-2 h-4 w-4" />
                {t("about.downloadResume")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

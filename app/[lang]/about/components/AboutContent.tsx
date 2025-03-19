'use client';

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function AboutContent() {
  const { t } = useTranslation("about");

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t("about.title")}</h1>

        <div className="prose dark:prose-invert max-w-none">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("about.journey.title")}</h2>
            <p className="text-muted-foreground mb-4">
              {t("about.journey.description")}
            </p>
          </div>

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
                <h3 className="font-medium">{t("about.education.agronomy.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.education.agronomy.description")}
                </p>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("about.skills.title")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{t("about.skills.frontend.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.skills.frontend.description")}
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-medium">{t("about.skills.backend.title")}</h3>
                <p className="text-muted-foreground">
                  {t("about.skills.backend.description")}
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

          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/contact">
                <FileText className="mr-2 h-4 w-4" />
                {t("about.downloadResume")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
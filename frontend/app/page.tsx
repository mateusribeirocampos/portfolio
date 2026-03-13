'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Leaf, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DecoderText } from '@/components/decoderText/decoderText';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const { t } = useTranslation('home');
  const title = t('home.title');
  const subtitle = t('home.subtitle');

  const { ref: subtitleRef, inView: subtitleInView } = useInView({ triggerOnce: true, threshold: .9});

  return (
    <>
      <div className="flex-1">
        <section className="container flex flex-col items-center justify-center gap-4 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 text-center md:text-left">
            <div className="flex-shrink-0">
              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary ring-4 ring-primary/20 shadow-xl">
                <Image
                  src="/images/home/profilelinkedin.jpeg"
                  alt="Mateus R Campos"
                  fill
                  sizes="(max-width: 768px) 160px, 208px"
                  className="object-cover"
                  priority
                  fetchPriority="high"
                  loading="eager"
                />
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              <DecoderText text={title} delay={600} />
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              {t('home.pTitle')}
            </p>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link href="/contact">{t('home.contact_button')}</Link>
              </Button>
              <Button asChild>
                <Link href="/projects">{t('home.projects_button')}<ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            </div>
          </div>
          {/*<div className="w-full max-w-3xl mt-8">
            <Animation />
          </div>*/}
        </section>
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute right-0 top-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -a-10"></div>
            <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -a-10"></div>
          </div>

          <div className="container px-4">
            <div className="text-center mb-20 relative">
              <div className="items-center rounded-md py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground mb-4">
                <h2 ref={subtitleRef} className="inline-flex text-4xl md:text-5xl font-bold mb-6">
                  <DecoderText text={subtitle} start={subtitleInView} delay={500} />
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('home.pSubtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-primary">
              <Code className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">
                {t("home.TitleCard1")}
              </h3>
              <p className="text-muted-foreground">
                {t("home.pCard1")}
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-primary">
              <Monitor className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{t("home.TitleCard2")}</h3>
              <p className="text-muted-foreground">
                {t("home.pCard2")}
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-primary">
              <Leaf className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">
                {t("home.TitleCard3")}
              </h3>
              <p className="text-muted-foreground">
                {t("home.pCard3")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

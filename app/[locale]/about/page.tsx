import type {Metadata} from "next";
import {getLocale, getTranslations} from "next-intl/server";

import {MotionSection} from "@/components/sections/motion-section";
import {PageBanner} from "@/components/sections/page-banner";
import {SectionHeading} from "@/components/sections/section-heading";
import {Card, CardContent} from "@/components/ui/card";
import {getSiteSettings} from "@/lib/data/public";
import {buildMetadata} from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "ar" | "fr";
  const t = await getTranslations({locale});

  return buildMetadata({
    locale,
    title: t("about.title"),
    description: t("about.subtitle"),
    path: "/about"
  });
}

export default async function AboutPage() {
  const locale = (await getLocale()) as "ar" | "fr";
  const t = await getTranslations();
  const settings = await getSiteSettings();

  if (!settings) {
    return null;
  }

  return (
    <>
      <PageBanner
        eyebrow={t("nav.about")}
        title={t("about.title")}
        description={t("about.subtitle")}
      />
      <section className="container space-y-8 pb-16">
        <MotionSection>
          <Card>
            <CardContent className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <SectionHeading title={settings.agencyNameAr} />
                <p className="text-sm leading-8 text-sand-100/75">
                  {locale === "ar" ? settings.aboutIntroAr : settings.aboutIntroFr}
                </p>
              </div>
              <div className="rounded-[2rem] border border-gold-500/15 bg-gradient-to-br from-gold-500/10 to-transparent p-6">
                <p className="font-display text-3xl text-sand-50">
                  {locale === "ar" ? "وعدنا" : "Notre promesse"}
                </p>
                <p className="mt-4 text-sm leading-8 text-sand-100/75">
                  {locale === "ar" ? settings.promiseAr : settings.promiseFr}
                </p>
              </div>
            </CardContent>
          </Card>
        </MotionSection>
        <MotionSection delay={0.08}>
          <SectionHeading title={t("about.valuesTitle")} />
          <div className="grid gap-5 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <Card key={index}>
                <CardContent className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                    0{index + 1}
                  </p>
                  <h3 className="font-display text-2xl text-sand-50">
                    {t(`about.values.${index}Title`)}
                  </h3>
                  <p className="text-sm leading-7 text-sand-100/75">
                    {t(`about.values.${index}Text`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </MotionSection>
      </section>
    </>
  );
}

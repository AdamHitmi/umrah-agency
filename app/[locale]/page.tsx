import {CalendarDays, ArrowLeft, ShieldCheck, Phone} from "lucide-react";
import type {Metadata} from "next";
import {getLocale, getTranslations} from "next-intl/server";

import {JsonLd} from "@/components/sections/json-ld";
import {DepartureCountdown} from "@/components/sections/departure-countdown";
import {MotionSection} from "@/components/sections/motion-section";
import {PackageCard} from "@/components/sections/package-card";
import {RouteVisualization} from "@/components/sections/route-visualization";
import {SectionHeading} from "@/components/sections/section-heading";
import {TestimonialGrid} from "@/components/sections/testimonial-grid";
import {TrustBadges} from "@/components/sections/trust-badges";
import {CtaStrip} from "@/components/sections/cta-strip";
import {FaqList} from "@/components/sections/faq-list";
import {Badge} from "@/components/ui/badge";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {getHomePageData} from "@/lib/data/public";
import {getPackageStartingPrice} from "@/lib/data/package-helpers";
import {formatDisplayRange, formatMadCurrency} from "@/lib/format";
import {Link} from "@/lib/i18n/navigation";
import {buildMetadata} from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "ar" | "fr";
  const t = await getTranslations({locale});

  return buildMetadata({
    locale,
    title: locale === "ar" ? "عمرة فاخرة من الدار البيضاء" : "Omra premium depuis Casablanca",
    description: t("home.ctaText"),
    path: "/"
  });
}

export default async function HomePage() {
  const locale = (await getLocale()) as "ar" | "fr";
  const t = await getTranslations();
  const {settings, featuredPackage, testimonials, faqs} = await getHomePageData();

  if (!settings || !featuredPackage) {
    return null;
  }

  const featuredTitle =
    locale === "ar" ? featuredPackage.titleAr : featuredPackage.titleFr;
  const featuredDescription =
    locale === "ar"
      ? featuredPackage.shortDescriptionAr
      : featuredPackage.shortDescriptionFr;
  const heroTitle = locale === "ar" ? settings.heroTitleAr : settings.heroTitleFr;
  const heroSubtitle =
    locale === "ar" ? settings.heroSubtitleAr : settings.heroSubtitleFr;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: settings.agencyNameAr,
          telephone: settings.phone,
          address: settings.addressAr,
          areaServed: "Morocco",
          availableLanguage: ["Arabic", "French"]
        }}
      />
      <section className="container py-8 sm:py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <MotionSection className="three-d-shell relative overflow-hidden rounded-[2rem] border border-gold-500/15 bg-gradient-to-br from-noir-900 via-noir-950 to-noir-800 px-5 py-8 shadow-panel sm:px-8 sm:py-10 lg:px-10 lg:py-14">
            <div className="floating-orb absolute end-[-4rem] top-[-3rem] h-44 w-44 rounded-full bg-gold-500/12 blur-3xl" />
            <div className="floating-orb absolute bottom-[-5rem] start-[-4rem] h-56 w-56 rounded-full bg-sand-100/10 blur-3xl [animation-delay:1.4s]" />
            <div className="mesh-overlay" />
            <div className="grid-accent absolute inset-0 opacity-20" />
            <div className="relative z-10 max-w-2xl space-y-6">
              <Badge variant="gold">{t("home.heroEyebrow")}</Badge>
              <h1 className="text-balance font-display text-4xl leading-tight text-sand-50 sm:text-5xl lg:text-6xl">
                {heroTitle}
              </h1>
              <p className="max-w-xl text-sm leading-7 text-sand-100/75 sm:text-base sm:leading-8">
                {heroSubtitle}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-sand-100/75">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2">
                  <CalendarDays className="h-4 w-4 text-gold-300" />
                  {formatDisplayRange(featuredPackage.startDate, featuredPackage.endDate, locale)}
                </span>
                {featuredPackage.isDirectFlight ? <Badge>{t("common.directFlight")}</Badge> : null}
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gold-200/70">
                  {t("marketing.home.casablancaConcierge")}
                </span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/packages/${featuredPackage.slug}`}
                  className={buttonVariants({variant: "default", size: "lg"})}
                >
                  {t("common.bookNow")}
                </Link>
                <Link
                  href="/packages"
                  className={buttonVariants({variant: "secondary", size: "lg"})}
                >
                  {t("common.viewPackages")}
                </Link>
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({variant: "ghost", size: "lg"})}
                >
                  {t("common.whatsapp")}
                </a>
              </div>
              <DepartureCountdown
                locale={locale}
                targetDate={featuredPackage.startDate.toISOString()}
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                    {t("marketing.home.duration")}
                  </p>
                  <p className="mt-2 font-display text-3xl text-sand-50">
                    {featuredPackage.durationDays}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                    {t("marketing.home.stops")}
                  </p>
                  <p className="mt-2 font-display text-3xl text-sand-50">
                    {featuredPackage.destinations.length}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                    {t("marketing.home.visa")}
                  </p>
                  <p className="mt-2 font-display text-3xl text-sand-50">
                    {featuredPackage.visaIncluded
                      ? t("marketing.home.included")
                      : t("marketing.home.notIncluded")}
                  </p>
                </div>
              </div>
              <div className="grid gap-3 rounded-[2rem] border border-gold-500/15 bg-noir-950/55 p-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-200/65">
                    {t("marketing.home.serviceStyle")}
                  </p>
                  <p className="mt-2 text-sm text-sand-50">
                    {t("marketing.home.serviceStyleText")}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-200/65">
                    {t("marketing.home.support")}
                  </p>
                  <p className="mt-2 text-sm text-sand-50">
                    {t("marketing.home.supportText")}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-200/65">
                    {t("marketing.home.experience")}
                  </p>
                  <p className="mt-2 text-sm text-sand-50">
                    {t("marketing.home.experienceText")}
                  </p>
                </div>
              </div>
            </div>
          </MotionSection>

          <MotionSection delay={0.1}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col justify-between gap-5 p-5 sm:gap-6 sm:p-6">
                <div className="space-y-3">
                  <Badge variant="sand">{t("home.featuredPackage")}</Badge>
                  <h2 className="font-display text-2xl text-sand-50 sm:text-3xl">{featuredTitle}</h2>
                  <p className="text-sm leading-7 text-sand-100/70">{featuredDescription}</p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl border border-gold-500/15 bg-noir-950/70 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-gold-200/70">
                      {t("common.startingPrice")}
                    </p>
                    <p className="mt-2 font-display text-4xl text-sand-50">
                      {formatMadCurrency(getPackageStartingPrice(featuredPackage), locale)}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/5 bg-white/5 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                        {t("packageDetail.travelDates")}
                      </p>
                      <p className="mt-2 text-sm text-sand-50">
                        {formatDisplayRange(
                          featuredPackage.startDate,
                          featuredPackage.endDate,
                          locale
                        )}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/5 bg-white/5 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                        {t("common.directFlight")}
                      </p>
                      <p className="mt-2 text-sm text-sand-50">
                        {featuredPackage.isDirectFlight
                          ? t("marketing.home.yes")
                          : t("marketing.home.no")}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-gold-500/15 bg-gradient-to-r from-gold-500/10 via-transparent to-sand-50/10 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                      {t("marketing.home.route")}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-sand-50">
                      {(locale === "ar"
                        ? featuredPackage.destinations.map((item) => item.nameAr)
                        : featuredPackage.destinations.map((item) => item.nameFr)
                      ).join(" - ")}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/packages/${featuredPackage.slug}`}
                  className={buttonVariants({variant: "outline", size: "lg"})}
                >
                  {t("common.viewDetails")}
                  <ArrowLeft className="ms-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </MotionSection>
        </div>
      </section>

      <section className="container pb-16">
        <TrustBadges />
      </section>

      <section className="container pb-16">
        <MotionSection>
          <RouteVisualization
            title={t("home.routeTitle")}
            description={t("home.routeText")}
            locale={locale}
            destinations={featuredPackage.destinations}
          />
        </MotionSection>
      </section>

      <section className="container pb-16">
        <MotionSection>
          <SectionHeading
            eyebrow={locale === "ar" ? settings.whyChooseTitleAr : settings.whyChooseTitleFr}
            title={t("home.whyChooseTitle")}
            description={locale === "ar" ? settings.whyChooseTextAr : settings.whyChooseTextFr}
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <Card key={index} className="spotlight-card aurora-panel">
                <CardContent className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-200">
                    {index === 0 ? (
                      <ShieldCheck className="h-5 w-5" />
                    ) : index === 1 ? (
                      <CalendarDays className="h-5 w-5" />
                    ) : (
                      <Phone className="h-5 w-5" />
                    )}
                  </div>
                  <h3 className="font-display text-2xl text-sand-50">
                    {t(`home.whyChooseItems.${index}Title`)}
                  </h3>
                  <p className="text-sm leading-7 text-sand-100/70">
                    {t(`home.whyChooseItems.${index}Text`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </MotionSection>
      </section>

      <section className="container pb-16">
        <MotionSection>
          <SectionHeading
            eyebrow={t("common.featured")}
            title={featuredTitle}
            description={featuredDescription}
            actions={
              <Link
                href={`/packages/${featuredPackage.slug}`}
                className={buttonVariants({variant: "secondary"})}
              >
                {t("common.viewDetails")}
              </Link>
            }
          />
          <PackageCard
            slug={featuredPackage.slug}
            heroImage={featuredPackage.heroImage}
            titleAr={featuredPackage.titleAr}
            titleFr={featuredPackage.titleFr}
            shortDescriptionAr={featuredPackage.shortDescriptionAr}
            shortDescriptionFr={featuredPackage.shortDescriptionFr}
            startDate={featuredPackage.startDate}
            endDate={featuredPackage.endDate}
            durationDays={featuredPackage.durationDays}
            originCityAr={featuredPackage.originCityAr}
            originCityFr={featuredPackage.originCityFr}
            isDirectFlight={featuredPackage.isDirectFlight}
            startingPrice={getPackageStartingPrice(featuredPackage)}
          />
        </MotionSection>
      </section>

      <section className="container pb-16">
        <MotionSection>
          <SectionHeading title={t("home.testimonials")} />
          <TestimonialGrid items={testimonials} />
        </MotionSection>
      </section>

      <section className="container pb-16">
        <MotionSection>
          <SectionHeading
            title={t("home.faqPreview")}
            actions={
              <Link href="/faq" className={buttonVariants({variant: "ghost"})}>
                {t("nav.faq")}
              </Link>
            }
          />
          <FaqList items={faqs} />
        </MotionSection>
      </section>

      <section className="container pb-16">
        <MotionSection>
          <CtaStrip phone={settings.phone} whatsapp={settings.whatsapp} />
        </MotionSection>
      </section>
    </>
  );
}

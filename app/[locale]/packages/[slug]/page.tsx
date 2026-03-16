import {CalendarDays, Hotel, Phone, ShieldCheck, StickyNote, Ticket, Wallet} from "lucide-react";
import type {Metadata} from "next";
import {getLocale, getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";

import {BookingForm} from "@/components/forms/booking-form";
import {InteractivePricing} from "@/components/sections/interactive-pricing";
import {JsonLd} from "@/components/sections/json-ld";
import {MotionSection} from "@/components/sections/motion-section";
import {PageBanner} from "@/components/sections/page-banner";
import {RouteVisualization} from "@/components/sections/route-visualization";
import {SectionHeading} from "@/components/sections/section-heading";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {getPackageBySlug, getSiteSettings} from "@/lib/data/public";
import {getPackageStartingPrice} from "@/lib/data/package-helpers";
import {formatDisplayRange, formatMadCurrency} from "@/lib/format";
import {buildMetadata} from "@/lib/metadata";
import {cn} from "@/lib/utils";

export async function generateMetadata({
  params
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const locale = (await getLocale()) as "ar" | "fr";
  const {slug} = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    return buildMetadata({
      locale,
      title: "Package",
      description: "Package not found",
      path: "/packages"
    });
  }

  return buildMetadata({
    locale,
    title: locale === "ar" ? pkg.titleAr : pkg.titleFr,
    description:
      locale === "ar" ? pkg.shortDescriptionAr : pkg.shortDescriptionFr,
    path: `/packages/${pkg.slug}`
  });
}

export default async function PackageDetailPage({
  params
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const locale = (await getLocale()) as "ar" | "fr";
  const t = await getTranslations();
  const [pkg, settings] = await Promise.all([getPackageBySlug(slug), getSiteSettings()]);

  if (!pkg || !settings) {
    notFound();
  }

  const title = locale === "ar" ? pkg.titleAr : pkg.titleFr;
  const description = locale === "ar" ? pkg.descriptionAr : pkg.descriptionFr;
  const country = locale === "ar" ? pkg.countryAr : pkg.countryFr;
  const origin = locale === "ar" ? pkg.originCityAr : pkg.originCityFr;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Offer",
          name: title,
          priceCurrency: "MAD",
          price: getPackageStartingPrice(pkg),
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "TravelAgency",
            name: settings.agencyNameAr
          }
        }}
      />
      <PageBanner
        eyebrow={pkg.isDirectFlight ? t("common.directFlight") : undefined}
        title={title}
        description={description}
      />

      <section className="container pb-28 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-10">
            <MotionSection>
              <Card>
                <CardContent className="grid gap-4 p-5 md:grid-cols-3 sm:p-6">
                  <div className="rounded-3xl border border-white/5 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                      {t("packageDetail.travelDates")}
                    </p>
                    <p className="mt-2 text-sm text-sand-50">
                      {formatDisplayRange(pkg.startDate, pkg.endDate, locale)}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/5 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                      {t("packageDetail.origin")}
                    </p>
                    <p className="mt-2 text-sm text-sand-50">{origin}</p>
                  </div>
                  <div className="rounded-3xl border border-white/5 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                      {t("packageDetail.destination")}
                    </p>
                    <p className="mt-2 text-sm text-sand-50">{country}</p>
                  </div>
                </CardContent>
              </Card>
            </MotionSection>

            <MotionSection delay={0.05}>
              <RouteVisualization
                title={t("packageDetail.route")}
                description={description}
                locale={locale}
                destinations={pkg.destinations}
              />
            </MotionSection>

            <MotionSection delay={0.1} className="space-y-5">
              <SectionHeading title={t("packageDetail.pricing")} />
              <InteractivePricing
                locale={locale}
                title={t("packageDetail.pricing")}
                groups={pkg.priceGroups.map((group) => ({
                  id: group.id,
                  roomTypeAr: group.roomTypeAr,
                  roomTypeFr: group.roomTypeFr,
                  tiers: group.tiers.map((tier) => ({
                    id: tier.id,
                    labelAr: tier.labelAr,
                    labelFr: tier.labelFr,
                    amountMad: tier.amountMad
                  }))
                }))}
              />
            </MotionSection>

            <MotionSection delay={0.15} className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardContent className="space-y-4 p-5 sm:p-6">
                  <SectionHeading title={t("packageDetail.includes")} />
                  <div className="space-y-3">
                    {pkg.inclusions.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 text-sm text-sand-100/75">
                        <Ticket className="mt-1 h-4 w-4 text-gold-300" />
                        <span>{locale === "ar" ? item.textAr : item.textFr}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-4 p-5 sm:p-6">
                  <SectionHeading title={t("packageDetail.notes")} />
                  <div className="space-y-3">
                    {pkg.notes.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 text-sm text-sand-100/75">
                        <StickyNote className="mt-1 h-4 w-4 text-gold-300" />
                        <span>{locale === "ar" ? item.textAr : item.textFr}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </MotionSection>

            <MotionSection delay={0.2} className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardContent className="space-y-4 p-5 sm:p-6">
                  <SectionHeading title={t("packageDetail.visa")} />
                  <div className="flex items-start gap-3 text-sm leading-7 text-sand-100/75">
                    <ShieldCheck className="mt-1 h-5 w-5 text-gold-300" />
                    <span>{t("packageDetail.visaText")}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-4 p-5 sm:p-6">
                  <SectionHeading title={t("packageDetail.hotels")} />
                  <div className="space-y-3">
                    {pkg.hotels.map((hotel) => (
                      <div
                        key={hotel.id}
                        className="rounded-3xl border border-white/5 bg-white/5 p-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-medium text-sand-50">{hotel.name}</p>
                            <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                              {hotel.city}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-gold-300">
                            <Hotel className="h-4 w-4" />
                            {hotel.stars}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-sand-100/75">
                          {locale === "ar" ? hotel.descriptionAr : hotel.descriptionFr}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </MotionSection>

            <MotionSection delay={0.25}>
              <BookingForm
                packageId={pkg.id}
                roomTypes={pkg.priceGroups.map((group) => ({
                  roomTypeAr: group.roomTypeAr,
                  roomTypeFr: group.roomTypeFr
                }))}
              />
            </MotionSection>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
            <Card>
              <CardContent className="space-y-5 p-5 sm:p-6">
                <SectionHeading title={t("packageDetail.summary")} />
                <div className="rounded-3xl border border-gold-500/15 bg-noir-950/70 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                    {t("common.startingPrice")}
                  </p>
                  <p className="mt-2 font-display text-4xl text-sand-50">
                    {formatMadCurrency(getPackageStartingPrice(pkg), locale)}
                  </p>
                </div>
                <div className="space-y-3 text-sm text-sand-100/75">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-1 h-4 w-4 text-gold-300" />
                    {formatDisplayRange(pkg.startDate, pkg.endDate, locale)}
                  </div>
                  <div className="flex items-start gap-3">
                    <Wallet className="mt-1 h-4 w-4 text-gold-300" />
                    {locale === "ar"
                      ? `${pkg.priceGroups.length} خيارات غرف`
                      : `${pkg.priceGroups.length} options de chambre`}
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-4 w-4 text-gold-300" />
                    <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                  </div>
                </div>
                <a href="#booking" className={buttonVariants({variant: "default", size: "lg"})}>
                  {t("packageDetail.mobileBook")}
                </a>
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({variant: "secondary", size: "lg"})}
                >
                  {t("common.whatsapp")}
                </a>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      <div className="mobile-bottom-safe fixed inset-x-0 bottom-0 z-30 border-t border-gold-500/15 bg-noir-950/95 p-3 sm:p-4 lg:hidden">
        <a href="#booking" className={cn(buttonVariants({variant: "default", size: "lg"}), "w-full")}>
          {t("packageDetail.mobileBook")}
        </a>
      </div>
    </>
  );
}

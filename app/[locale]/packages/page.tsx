import type {Metadata} from "next";
import {getLocale, getTranslations} from "next-intl/server";

import {PackageFilters} from "@/components/sections/package-filters";
import {PackageCard} from "@/components/sections/package-card";
import {PageBanner} from "@/components/sections/page-banner";
import {getPackageFilterOptions, getPackages} from "@/lib/data/public";
import {getPackageStartingPrice} from "@/lib/data/package-helpers";
import {buildMetadata} from "@/lib/metadata";

type SearchParams = Promise<{
  month?: string;
  direct?: string;
  priceMax?: string;
  roomType?: string;
}>;

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "ar" | "fr";
  const t = await getTranslations({locale});

  return buildMetadata({
    locale,
    title: t("packages.title"),
    description: t("packages.description"),
    path: "/packages"
  });
}

export default async function PackagesPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const locale = (await getLocale()) as "ar" | "fr";
  const t = await getTranslations();
  const params = await searchParams;
  const [packages, filterOptions] = await Promise.all([
    getPackages({
      month: params.month,
      direct: params.direct === "1",
      priceMax: params.priceMax ? Number(params.priceMax) : undefined,
      roomType: params.roomType
    }),
    getPackageFilterOptions()
  ]);

  return (
    <>
      <PageBanner
        eyebrow={t("nav.packages")}
        title={t("packages.title")}
        description={t("packages.description")}
      />
      <section className="container pb-16">
        <PackageFilters
          months={filterOptions.months}
          roomTypes={filterOptions.roomTypes}
          maxPrice={filterOptions.maxPrice}
          resultCount={packages.length}
        />

        {packages.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                slug={pkg.slug}
                heroImage={pkg.heroImage}
                titleAr={pkg.titleAr}
                titleFr={pkg.titleFr}
                shortDescriptionAr={pkg.shortDescriptionAr}
                shortDescriptionFr={pkg.shortDescriptionFr}
                startDate={pkg.startDate}
                endDate={pkg.endDate}
                durationDays={pkg.durationDays}
                originCityAr={pkg.originCityAr}
                originCityFr={pkg.originCityFr}
                isDirectFlight={pkg.isDirectFlight}
                startingPrice={getPackageStartingPrice(pkg)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-gold-500/20 bg-noir-900/40 p-8 text-center text-sand-100/65">
            {t("packages.empty")}
          </div>
        )}
      </section>
    </>
  );
}

"use client";

import {SlidersHorizontal} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {startTransition, useDeferredValue, useState} from "react";

import {buttonVariants} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";

type PackageFilterOption = {
  roomTypeAr: string;
  roomTypeFr: string;
};

type PackageFiltersProps = {
  months: string[];
  roomTypes: PackageFilterOption[];
  maxPrice: number;
  resultCount: number;
};

export function PackageFilters({
  months,
  roomTypes,
  maxPrice,
  resultCount
}: PackageFiltersProps) {
  const locale = useLocale() as "ar" | "fr";
  const t = useTranslations();
  const marketing = useTranslations("marketing.filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [priceValue, setPriceValue] = useState(
    Number(searchParams.get("priceMax") || maxPrice || 30000)
  );
  const deferredPrice = useDeferredValue(priceValue);

  const updateFilter = (key: string, value?: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.push(params.toString() ? `${pathname}?${params.toString()}` : pathname);
    });
  };

  const toggleDirect = () => {
    updateFilter("direct", searchParams.get("direct") === "1" ? null : "1");
  };

  const clearFilters = () => {
    setPriceValue(maxPrice || 30000);
    startTransition(() => {
      router.push(pathname);
    });
  };

  return (
    <Card className="mb-8 overflow-visible">
      <CardContent className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-500/12 text-gold-200">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-2xl text-sand-50">
                {t("packages.filters.month")} / {t("packages.filters.roomType")}
              </p>
              <p className="text-sm text-sand-100/60">{marketing("subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gold-200/70">
              {marketing("results", {count: resultCount})}
            </div>
            <button
              type="button"
              className={buttonVariants({variant: "ghost", size: "sm"})}
              onClick={clearFilters}
            >
              {marketing("reset")}
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_1.2fr_0.8fr]">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
              {t("packages.filters.month")}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={cn(
                  buttonVariants({
                    variant: searchParams.get("month") ? "ghost" : "default",
                    size: "sm"
                  })
                )}
                onClick={() => updateFilter("month", null)}
              >
                {t("packages.filters.all")}
              </button>
              {months.map((month) => {
                const label = new Intl.DateTimeFormat(
                  locale === "ar" ? "ar-MA" : "fr-MA",
                  {month: "long"}
                ).format(new Date(2027, Number(month) - 1, 1));
                const active = searchParams.get("month") === month;

                return (
                  <button
                    key={month}
                    type="button"
                    className={buttonVariants({
                      variant: active ? "default" : "secondary",
                      size: "sm"
                    })}
                    onClick={() => updateFilter("month", active ? null : month)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
              {t("packages.filters.roomType")}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={cn(
                  buttonVariants({
                    variant: searchParams.get("roomType") ? "ghost" : "default",
                    size: "sm"
                  })
                )}
                onClick={() => updateFilter("roomType", null)}
              >
                {t("packages.filters.all")}
              </button>
              {roomTypes.map((roomType) => {
                const value = roomType.roomTypeAr;
                const label = locale === "ar" ? roomType.roomTypeAr : roomType.roomTypeFr;
                const active = searchParams.get("roomType") === value;

                return (
                  <button
                    key={value}
                    type="button"
                    className={buttonVariants({
                      variant: active ? "default" : "secondary",
                      size: "sm"
                    })}
                    onClick={() => updateFilter("roomType", active ? null : value)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              className={buttonVariants({
                variant: searchParams.get("direct") === "1" ? "default" : "secondary",
                size: "sm"
              })}
              onClick={toggleDirect}
            >
              {t("packages.filters.direct")}
            </button>
            <div className="rounded-3xl border border-gold-500/15 bg-noir-950/65 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                {t("packages.filters.price")}
              </p>
              <p className="mt-2 font-display text-3xl text-sand-50">
                {new Intl.NumberFormat(locale === "ar" ? "ar-MA" : "fr-MA", {
                  style: "currency",
                  currency: "MAD",
                  maximumFractionDigits: 0
                }).format(deferredPrice)}
              </p>
              <input
                type="range"
                min={Math.min(maxPrice, 10000)}
                max={Math.max(maxPrice, 30000)}
                step={500}
                value={priceValue}
                onChange={(event) => {
                  const nextValue = Number(event.target.value);
                  setPriceValue(nextValue);
                  updateFilter("priceMax", String(nextValue));
                }}
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gold-500/15 accent-[#c8a84a]"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

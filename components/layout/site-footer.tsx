"use client";

import {Instagram, Mail, MapPin, Phone, Timer} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";

import {Link} from "@/lib/i18n/navigation";

type SiteFooterProps = {
  agencyNameAr: string;
  agencyNameFr: string;
  email: string;
  phone: string;
  cityAr: string;
  cityFr: string;
  officeHoursAr: string;
  officeHoursFr: string;
  instagramUrl?: string | null;
};

export function SiteFooter({
  agencyNameAr,
  agencyNameFr,
  email,
  phone,
  cityAr,
  cityFr,
  officeHoursAr,
  officeHoursFr,
  instagramUrl
}: SiteFooterProps) {
  const t = useTranslations();
  const locale = useLocale();
  const agencyName = locale === "ar" ? agencyNameAr : agencyNameFr;

  return (
    <footer className="border-t border-gold-500/10 bg-noir-950/90">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <p className="font-display text-2xl text-sand-50">{agencyName}</p>
          <p className="max-w-md text-sm leading-7 text-sand-100/70">
            {t("footer.tagline")}
          </p>
        </div>
        <div className="space-y-3 text-sm text-sand-100/75">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-4 w-4 text-gold-300" />
            <span>{locale === "ar" ? cityAr : cityFr}</span>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-4 w-4 text-gold-300" />
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-4 w-4 text-gold-300" />
            <a href={`tel:${phone}`}>{phone}</a>
          </div>
          <div className="flex items-start gap-3">
            <Timer className="mt-1 h-4 w-4 text-gold-300" />
            <span>{locale === "ar" ? officeHoursAr : officeHoursFr}</span>
          </div>
        </div>
        <div className="space-y-3 text-sm text-sand-100/75">
          <Link href="/packages" className="block hover:text-gold-200">
            {t("nav.packages")}
          </Link>
          <Link href="/about" className="block hover:text-gold-200">
            {t("nav.about")}
          </Link>
          <Link href="/contact" className="block hover:text-gold-200">
            {t("nav.contact")}
          </Link>
          {instagramUrl ? (
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gold-200">
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
          ) : null}
        </div>
      </div>
      <div className="border-t border-gold-500/10">
        <div className="container py-5 text-xs text-sand-100/50">
          {new Date().getFullYear()} {agencyName}. {t("footer.rights")}.
        </div>
      </div>
    </footer>
  );
}

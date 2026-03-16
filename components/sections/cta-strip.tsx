"use client";

import {useTranslations} from "next-intl";

import {buttonVariants} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Link} from "@/lib/i18n/navigation";

type CtaStripProps = {
  phone: string;
  whatsapp: string;
};

export function CtaStrip({phone, whatsapp}: CtaStripProps) {
  const t = useTranslations();

  return (
    <Card className="bg-gold-400/10">
      <CardContent className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-display text-3xl text-sand-50">{t("home.ctaTitle")}</p>
          <p className="max-w-2xl text-sm leading-7 text-sand-100/75">{t("home.ctaText")}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className={buttonVariants({variant: "default"})}>
            {t("common.contactUs")}
          </Link>
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
            className={buttonVariants({variant: "secondary"})}
            target="_blank"
            rel="noreferrer"
          >
            {t("common.whatsapp")}
          </a>
          <a href={`tel:${phone}`} className={buttonVariants({variant: "ghost"})}>
            {t("common.callNow")}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

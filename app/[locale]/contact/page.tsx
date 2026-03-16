import {Mail, MapPin, Phone, Timer} from "lucide-react";
import type {Metadata} from "next";
import {getLocale, getTranslations} from "next-intl/server";

import {ContactForm} from "@/components/forms/contact-form";
import {MotionSection} from "@/components/sections/motion-section";
import {PageBanner} from "@/components/sections/page-banner";
import {Card, CardContent} from "@/components/ui/card";
import {buttonVariants} from "@/components/ui/button";
import {getSiteSettings} from "@/lib/data/public";
import {buildMetadata} from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "ar" | "fr";
  const t = await getTranslations({locale});

  return buildMetadata({
    locale,
    title: t("contact.title"),
    description: t("contact.subtitle"),
    path: "/contact"
  });
}

export default async function ContactPage() {
  const locale = (await getLocale()) as "ar" | "fr";
  const t = await getTranslations();
  const settings = await getSiteSettings();

  if (!settings) {
    return null;
  }

  return (
    <>
      <PageBanner
        eyebrow={t("nav.contact")}
        title={t("contact.title")}
        description={t("contact.subtitle")}
      />
      <section className="container pb-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <MotionSection className="space-y-5">
            <Card>
              <CardContent className="space-y-5">
                <h2 className="font-display text-3xl text-sand-50">{t("contact.infoTitle")}</h2>
                <div className="space-y-4 text-sm text-sand-100/75">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-4 w-4 text-gold-300" />
                    <a href={`mailto:${settings.email}`}>{settings.email}</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-4 w-4 text-gold-300" />
                    <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 text-gold-300" />
                    <span>{locale === "ar" ? settings.addressAr : settings.addressFr}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Timer className="mt-1 h-4 w-4 text-gold-300" />
                    <span>
                      {locale === "ar" ? settings.officeHoursAr : settings.officeHoursFr}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                    className={buttonVariants({variant: "default"})}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("common.whatsapp")}
                  </a>
                  <a href={`tel:${settings.phone}`} className={buttonVariants({variant: "secondary"})}>
                    {t("common.callNow")}
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3">
                <h3 className="font-display text-2xl text-sand-50">
                  {locale === "ar" ? "الخريطة" : "Carte"}
                </h3>
                <div className="grid-accent flex min-h-72 items-center justify-center rounded-[2rem] border border-gold-500/15 bg-noir-950/70 p-6 text-center text-sm text-sand-100/60">
                  {t("contact.mapPlaceholder")}
                </div>
              </CardContent>
            </Card>
          </MotionSection>
          <MotionSection delay={0.08} className="space-y-5">
            <h2 className="font-display text-3xl text-sand-50">{t("contact.formTitle")}</h2>
            <ContactForm />
          </MotionSection>
        </div>
      </section>
    </>
  );
}

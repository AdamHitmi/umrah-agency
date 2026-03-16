import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {SiteFooter} from "@/components/layout/site-footer";
import {FloatingContactDock} from "@/components/layout/floating-contact-dock";
import {SiteExperience} from "@/components/layout/site-experience";
import {SiteHeader} from "@/components/layout/site-header";
import {AppProviders} from "@/components/providers/app-providers";
import {getSiteSettings} from "@/lib/data/public";
import {routing} from "@/lib/i18n/routing";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as "ar" | "fr")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const settings = await getSiteSettings();

  if (!settings) {
    notFound();
  }

  const agencyName = locale === "ar" ? settings.agencyNameAr : settings.agencyNameFr;

  return (
    <AppProviders locale={locale} messages={messages}>
      <div
        className="relative"
        dir={locale === "ar" ? "rtl" : "ltr"}
        lang={locale}
      >
        <div className="surface-pattern pointer-events-none absolute inset-0" />
        <SiteExperience locale={locale} />
        <SiteHeader
          agencyName={agencyName}
          phone={settings.phone}
          whatsapp={settings.whatsapp}
        />
        <main>{children}</main>
        <FloatingContactDock phone={settings.phone} whatsapp={settings.whatsapp} />
        <SiteFooter
          agencyNameAr={settings.agencyNameAr}
          agencyNameFr={settings.agencyNameFr}
          email={settings.email}
          phone={settings.phone}
          cityAr={settings.cityAr}
          cityFr={settings.cityFr}
          officeHoursAr={settings.officeHoursAr}
          officeHoursFr={settings.officeHoursFr}
          instagramUrl={settings.instagramUrl}
        />
      </div>
    </AppProviders>
  );
}

import type {Metadata} from "next";
import {Cormorant_Garamond, Manrope, Noto_Kufi_Arabic} from "next/font/google";
import {getLocale} from "next-intl/server";

import {appName} from "@/lib/constants";
import "@/lib/dev-vendor-warmup";
import "@/app/globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

const arabicFont = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: appName,
  description: "Luxury Umrah travel agency website for Moroccan travelers.",
  applicationName: appName
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = ((await getLocale().catch(() => "ar")) || "ar") as "ar" | "fr";

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${bodyFont.variable} ${displayFont.variable} ${arabicFont.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

import type {Metadata} from "next";

import {appName} from "@/lib/constants";

type MetadataInput = {
  locale: "ar" | "fr";
  title: string;
  description: string;
  path?: string;
};

export function buildMetadata({
  locale,
  title,
  description,
  path = ""
}: MetadataInput): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const localizedPath = locale === "ar" ? path : `/fr${path}`;
  const url = new URL(localizedPath || "/", baseUrl).toString();

  return {
    title: `${title} | ${appName}`,
    description,
    alternates: {
      canonical: url,
      languages: {
        ar: new URL(path || "/", baseUrl).toString(),
        fr: new URL(`/fr${path}`, baseUrl).toString()
      }
    },
    openGraph: {
      title: `${title} | ${appName}`,
      description,
      url,
      siteName: appName,
      locale: locale === "ar" ? "ar_MA" : "fr_MA",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${appName}`,
      description
    }
  };
}

import type {MetadataRoute} from "next";

import {prisma} from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const packages = await prisma.package.findMany({
    where: {
      active: true
    },
    select: {
      slug: true,
      updatedAt: true
    }
  });

  const staticRoutes = ["", "/packages", "/about", "/contact", "/faq"].flatMap((path) => [
    {
      url: `${baseUrl}${path}`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/fr${path}`,
      lastModified: new Date()
    }
  ]);

  const packageRoutes = packages.flatMap((pkg) => [
    {
      url: `${baseUrl}/packages/${pkg.slug}`,
      lastModified: pkg.updatedAt
    },
    {
      url: `${baseUrl}/fr/packages/${pkg.slug}`,
      lastModified: pkg.updatedAt
    }
  ]);

  return [...staticRoutes, ...packageRoutes];
}

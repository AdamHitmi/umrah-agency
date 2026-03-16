import {unstable_cache} from "next/cache";

import {prisma} from "@/lib/db";
import {
  getPackageStartingPrice,
  packageWithRelations,
  type PackageWithRelations
} from "@/lib/data/package-helpers";
import {publicDataTags} from "@/lib/data/revalidate";

const PUBLIC_CACHE_REVALIDATE_SECONDS = 60 * 5;

type PackageFilters = {
  month?: string;
  direct?: boolean;
  priceMax?: number;
  roomType?: string;
};

export type {PackageFilters};

export type PackageFilterOption = {
  roomTypeAr: string;
  roomTypeFr: string;
};

type CachedPackage = Omit<
  PackageWithRelations,
  "startDate" | "endDate" | "createdAt" | "updatedAt"
> & {
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

function serializePackage(pkg: PackageWithRelations): CachedPackage {
  return {
    ...pkg,
    startDate: pkg.startDate.toISOString(),
    endDate: pkg.endDate.toISOString(),
    createdAt: pkg.createdAt.toISOString(),
    updatedAt: pkg.updatedAt.toISOString()
  };
}

function hydratePackage(pkg: CachedPackage): PackageWithRelations {
  return {
    ...pkg,
    startDate: new Date(pkg.startDate),
    endDate: new Date(pkg.endDate),
    createdAt: new Date(pkg.createdAt),
    updatedAt: new Date(pkg.updatedAt)
  };
}

const getCachedSiteSettings = unstable_cache(
  async () => prisma.siteSetting.findFirst(),
  ["site-settings"],
  {
    revalidate: PUBLIC_CACHE_REVALIDATE_SECONDS,
    tags: [publicDataTags.settings]
  }
);

const getCachedActivePackages = unstable_cache(
  async () => {
    const packages = await prisma.package.findMany({
      where: {
        active: true
      },
      orderBy: [{featured: "desc"}, {startDate: "asc"}],
      ...packageWithRelations
    });

    return packages.map(serializePackage);
  },
  ["active-packages"],
  {
    revalidate: PUBLIC_CACHE_REVALIDATE_SECONDS,
    tags: [publicDataTags.packages]
  }
);

const getCachedActiveFaqs = unstable_cache(
  async () =>
    prisma.fAQ.findMany({
      where: {
        active: true
      },
      orderBy: {
        sortOrder: "asc"
      }
    }),
  ["active-faqs"],
  {
    revalidate: PUBLIC_CACHE_REVALIDATE_SECONDS,
    tags: [publicDataTags.faqs]
  }
);

const getCachedActiveTestimonials = unstable_cache(
  async () =>
    prisma.testimonial.findMany({
      where: {
        active: true
      },
      orderBy: {
        sortOrder: "asc"
      }
    }),
  ["active-testimonials"],
  {
    revalidate: PUBLIC_CACHE_REVALIDATE_SECONDS,
    tags: [publicDataTags.testimonials]
  }
);

async function readActivePackages() {
  const cachedPackages = await getCachedActivePackages();
  return cachedPackages.map(hydratePackage);
}

export async function getSiteSettings() {
  return getCachedSiteSettings();
}

export async function getHomePageData() {
  const [settings, packages, testimonials, faqs] = await Promise.all([
    getSiteSettings(),
    readActivePackages(),
    getCachedActiveTestimonials(),
    getCachedActiveFaqs()
  ]);

  return {
    settings,
    featuredPackage: packages.find((pkg) => pkg.featured) ?? packages[0] ?? null,
    testimonials: testimonials.slice(0, 3),
    faqs: faqs.slice(0, 4)
  };
}

export async function getPackages(filters: PackageFilters = {}) {
  const normalizedRoomType = filters.roomType?.trim().toLowerCase();
  const packages = await readActivePackages();

  return packages.filter((pkg) => {
    const matchesDirect = filters.direct ? pkg.isDirectFlight : true;
    const matchesMonth = filters.month
      ? String(pkg.startDate.getUTCMonth() + 1) === filters.month
      : true;
    const matchesPrice = filters.priceMax
      ? getPackageStartingPrice(pkg) <= filters.priceMax
      : true;
    const matchesRoomType = normalizedRoomType
      ? pkg.priceGroups.some((group) => {
          const roomTypeAr = group.roomTypeAr.toLowerCase();
          const roomTypeFr = group.roomTypeFr.toLowerCase();

          return (
            roomTypeAr.includes(normalizedRoomType) ||
            roomTypeFr.includes(normalizedRoomType)
          );
        })
      : true;

    return matchesDirect && matchesMonth && matchesPrice && matchesRoomType;
  });
}

export async function getPackageBySlug(slug: string) {
  const packages = await readActivePackages();
  return packages.find((pkg) => pkg.slug === slug) ?? null;
}

export async function getAllFaqs() {
  return getCachedActiveFaqs();
}

export async function getAllTestimonials() {
  return getCachedActiveTestimonials();
}

export async function getPackageFilterOptions() {
  const packages = await readActivePackages();
  const months = Array.from(
    new Set(packages.map((pkg) => String(pkg.startDate.getUTCMonth() + 1)))
  ).sort();
  const roomTypeMap = new Map<string, PackageFilterOption>();

  for (const pkg of packages) {
    for (const group of pkg.priceGroups) {
      roomTypeMap.set(group.roomTypeAr, {
        roomTypeAr: group.roomTypeAr,
        roomTypeFr: group.roomTypeFr
      });
    }
  }

  const roomTypes = Array.from(roomTypeMap.values());
  const maxPrice = Math.max(
    0,
    ...packages.flatMap((pkg) =>
      pkg.priceGroups.flatMap((group) => group.tiers.map((tier) => tier.amountMad))
    )
  );

  return {
    months,
    roomTypes,
    maxPrice
  };
}

export function withStartingPrice(pkg: PackageWithRelations) {
  return {
    ...pkg,
    startingPrice: getPackageStartingPrice(pkg)
  };
}

import {BookingStatus, Prisma} from "@prisma/client";

import {sanitizeNullableText, sanitizeText} from "@/lib/sanitize";
import {packageFormSchema} from "@/lib/validations/package";

export const packageWithRelations = Prisma.validator<Prisma.PackageDefaultArgs>()({
  include: {
    destinations: {
      orderBy: {
        sortOrder: "asc"
      }
    },
    priceGroups: {
      orderBy: {
        sortOrder: "asc"
      },
      include: {
        tiers: {
          orderBy: {
            sortOrder: "asc"
          }
        }
      }
    },
    inclusions: {
      orderBy: {
        sortOrder: "asc"
      }
    },
    notes: {
      orderBy: {
        sortOrder: "asc"
      }
    },
    hotels: {
      orderBy: {
        sortOrder: "asc"
      }
    }
  }
});

export type PackageWithRelations = Prisma.PackageGetPayload<typeof packageWithRelations>;

export function getPackageStartingPrice(pkg: PackageWithRelations) {
  const amounts = pkg.priceGroups.flatMap((group) =>
    group.tiers.map((tier) => tier.amountMad)
  );

  return amounts.length ? Math.min(...amounts) : 0;
}

export function serializePackageForForm(pkg: PackageWithRelations) {
  return {
    id: pkg.id,
    slug: pkg.slug,
    titleAr: pkg.titleAr,
    titleFr: pkg.titleFr,
    shortDescriptionAr: pkg.shortDescriptionAr,
    shortDescriptionFr: pkg.shortDescriptionFr,
    descriptionAr: pkg.descriptionAr,
    descriptionFr: pkg.descriptionFr,
    startDate: pkg.startDate.toISOString().slice(0, 10),
    endDate: pkg.endDate.toISOString().slice(0, 10),
    durationDays: pkg.durationDays,
    isDirectFlight: pkg.isDirectFlight,
    countryAr: pkg.countryAr,
    countryFr: pkg.countryFr,
    originCityAr: pkg.originCityAr,
    originCityFr: pkg.originCityFr,
    featured: pkg.featured,
    active: pkg.active,
    visaIncluded: pkg.visaIncluded,
    heroImage: pkg.heroImage,
    destinations: pkg.destinations.map((destination) => ({
      nameAr: destination.nameAr,
      nameFr: destination.nameFr,
      airportCode: destination.airportCode ?? "",
      sortOrder: destination.sortOrder
    })),
    priceGroups: pkg.priceGroups.map((group) => ({
      roomTypeAr: group.roomTypeAr,
      roomTypeFr: group.roomTypeFr,
      sortOrder: group.sortOrder,
      tiers: group.tiers.map((tier) => ({
        labelAr: tier.labelAr,
        labelFr: tier.labelFr,
        amountMad: tier.amountMad,
        sortOrder: tier.sortOrder
      }))
    })),
    inclusions: pkg.inclusions.map((inclusion) => ({
      textAr: inclusion.textAr,
      textFr: inclusion.textFr,
      sortOrder: inclusion.sortOrder
    })),
    notes: pkg.notes.map((note) => ({
      textAr: note.textAr,
      textFr: note.textFr,
      sortOrder: note.sortOrder
    })),
    hotels: pkg.hotels.map((hotel) => ({
      name: hotel.name,
      city: hotel.city,
      stars: hotel.stars,
      descriptionAr: hotel.descriptionAr,
      descriptionFr: hotel.descriptionFr,
      sortOrder: hotel.sortOrder
    }))
  };
}

export function getEmptyPackageFormValues() {
  return {
    slug: "",
    titleAr: "",
    titleFr: "",
    shortDescriptionAr: "",
    shortDescriptionFr: "",
    descriptionAr: "",
    descriptionFr: "",
    startDate: "",
    endDate: "",
    durationDays: 14,
    isDirectFlight: true,
    countryAr: "المملكة العربية السعودية",
    countryFr: "Arabie saoudite",
    originCityAr: "الدار البيضاء",
    originCityFr: "Casablanca",
    featured: false,
    active: true,
    visaIncluded: true,
    heroImage: "/images/umrah-hero.svg",
    destinations: [
      {
        nameAr: "الدار البيضاء",
        nameFr: "Casablanca",
        airportCode: "CMN",
        sortOrder: 0
      }
    ],
    priceGroups: [
      {
        roomTypeAr: "رباعية",
        roomTypeFr: "Quadruple",
        sortOrder: 0,
        tiers: [
          {
            labelAr: "الخيار 1",
            labelFr: "Option 1",
            amountMad: 0,
            sortOrder: 0
          }
        ]
      }
    ],
    inclusions: [
      {
        textAr: "",
        textFr: "",
        sortOrder: 0
      }
    ],
    notes: [
      {
        textAr: "",
        textFr: "",
        sortOrder: 0
      }
    ],
    hotels: [
      {
        name: "",
        city: "",
        stars: 4,
        descriptionAr: "",
        descriptionFr: "",
        sortOrder: 0
      }
    ]
  };
}

export function buildPackageWriteData(rawInput: unknown) {
  const parsed = packageFormSchema.parse(rawInput);

  return {
    slug: sanitizeText(parsed.slug),
    titleAr: sanitizeText(parsed.titleAr),
    titleFr: sanitizeText(parsed.titleFr),
    shortDescriptionAr: sanitizeText(parsed.shortDescriptionAr),
    shortDescriptionFr: sanitizeText(parsed.shortDescriptionFr),
    descriptionAr: sanitizeText(parsed.descriptionAr),
    descriptionFr: sanitizeText(parsed.descriptionFr),
    startDate: new Date(parsed.startDate),
    endDate: new Date(parsed.endDate),
    durationDays: parsed.durationDays,
    isDirectFlight: parsed.isDirectFlight,
    countryAr: sanitizeText(parsed.countryAr),
    countryFr: sanitizeText(parsed.countryFr),
    originCityAr: sanitizeText(parsed.originCityAr),
    originCityFr: sanitizeText(parsed.originCityFr),
    featured: parsed.featured,
    active: parsed.active,
    visaIncluded: parsed.visaIncluded,
    heroImage: sanitizeText(parsed.heroImage),
    destinations: parsed.destinations.map((destination, index) => ({
      nameAr: sanitizeText(destination.nameAr),
      nameFr: sanitizeText(destination.nameFr),
      airportCode: sanitizeNullableText(destination.airportCode),
      sortOrder: destination.sortOrder ?? index
    })),
    priceGroups: parsed.priceGroups.map((group, index) => ({
      roomTypeAr: sanitizeText(group.roomTypeAr),
      roomTypeFr: sanitizeText(group.roomTypeFr),
      sortOrder: group.sortOrder ?? index,
      tiers: group.tiers.map((tier, tierIndex) => ({
        labelAr: sanitizeText(tier.labelAr),
        labelFr: sanitizeText(tier.labelFr),
        amountMad: tier.amountMad,
        sortOrder: tier.sortOrder ?? tierIndex
      }))
    })),
    inclusions: parsed.inclusions.map((inclusion, index) => ({
      textAr: sanitizeText(inclusion.textAr),
      textFr: sanitizeText(inclusion.textFr),
      sortOrder: inclusion.sortOrder ?? index
    })),
    notes: parsed.notes.map((note, index) => ({
      textAr: sanitizeText(note.textAr),
      textFr: sanitizeText(note.textFr),
      sortOrder: note.sortOrder ?? index
    })),
    hotels: parsed.hotels.map((hotel, index) => ({
      name: sanitizeText(hotel.name),
      city: sanitizeText(hotel.city),
      stars: hotel.stars,
      descriptionAr: sanitizeText(hotel.descriptionAr),
      descriptionFr: sanitizeText(hotel.descriptionFr),
      sortOrder: hotel.sortOrder ?? index
    }))
  };
}

function relationPayload(data: ReturnType<typeof buildPackageWriteData>) {
  return {
    destinations: {
      create: data.destinations
    },
    priceGroups: {
      create: data.priceGroups.map((group) => ({
        roomTypeAr: group.roomTypeAr,
        roomTypeFr: group.roomTypeFr,
        sortOrder: group.sortOrder,
        tiers: {
          create: group.tiers
        }
      }))
    },
    inclusions: {
      create: data.inclusions
    },
    notes: {
      create: data.notes
    },
    hotels: {
      create: data.hotels
    }
  };
}

function scalarPayload(data: ReturnType<typeof buildPackageWriteData>) {
  return {
    slug: data.slug,
    titleAr: data.titleAr,
    titleFr: data.titleFr,
    shortDescriptionAr: data.shortDescriptionAr,
    shortDescriptionFr: data.shortDescriptionFr,
    descriptionAr: data.descriptionAr,
    descriptionFr: data.descriptionFr,
    startDate: data.startDate,
    endDate: data.endDate,
    durationDays: data.durationDays,
    isDirectFlight: data.isDirectFlight,
    countryAr: data.countryAr,
    countryFr: data.countryFr,
    originCityAr: data.originCityAr,
    originCityFr: data.originCityFr,
    featured: data.featured,
    active: data.active,
    visaIncluded: data.visaIncluded,
    heroImage: data.heroImage
  };
}

export function toPackageCreateInput(data: ReturnType<typeof buildPackageWriteData>) {
  return {
    ...scalarPayload(data),
    ...relationPayload(data)
  };
}

export function toPackageUpdateInput(data: ReturnType<typeof buildPackageWriteData>) {
  return {
    ...scalarPayload(data),
    destinations: {
      deleteMany: {},
      create: data.destinations
    },
    priceGroups: {
      deleteMany: {},
      create: data.priceGroups.map((group) => ({
        roomTypeAr: group.roomTypeAr,
        roomTypeFr: group.roomTypeFr,
        sortOrder: group.sortOrder,
        tiers: {
          create: group.tiers
        }
      }))
    },
    inclusions: {
      deleteMany: {},
      create: data.inclusions
    },
    notes: {
      deleteMany: {},
      create: data.notes
    },
    hotels: {
      deleteMany: {},
      create: data.hotels
    }
  };
}

export const bookingStatusOptions: BookingStatus[] = [
  BookingStatus.PENDING,
  BookingStatus.CONTACTED,
  BookingStatus.CONFIRMED,
  BookingStatus.CANCELLED
];

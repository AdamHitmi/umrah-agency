import {z} from "zod";

const destinationSchema = z.object({
  nameAr: z.string().min(2),
  nameFr: z.string().min(2),
  airportCode: z.string().max(10).optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0)
});

const priceTierSchema = z.object({
  labelAr: z.string().min(1),
  labelFr: z.string().min(1),
  amountMad: z.coerce.number().int().min(0),
  sortOrder: z.coerce.number().int().min(0)
});

const priceGroupSchema = z.object({
  roomTypeAr: z.string().min(2),
  roomTypeFr: z.string().min(2),
  sortOrder: z.coerce.number().int().min(0),
  tiers: z.array(priceTierSchema).min(1)
});

const inclusionSchema = z.object({
  textAr: z.string().min(2),
  textFr: z.string().min(2),
  sortOrder: z.coerce.number().int().min(0)
});

const noteSchema = z.object({
  textAr: z.string().min(2),
  textFr: z.string().min(2),
  sortOrder: z.coerce.number().int().min(0)
});

const hotelSchema = z.object({
  name: z.string().min(2),
  city: z.string().min(2),
  stars: z.coerce.number().int().min(1).max(5),
  descriptionAr: z.string().min(2),
  descriptionFr: z.string().min(2),
  sortOrder: z.coerce.number().int().min(0)
});

export const packageFormSchema = z.object({
  slug: z.string().min(2).max(120),
  titleAr: z.string().min(2),
  titleFr: z.string().min(2),
  shortDescriptionAr: z.string().min(10),
  shortDescriptionFr: z.string().min(10),
  descriptionAr: z.string().min(20),
  descriptionFr: z.string().min(20),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  durationDays: z.coerce.number().int().min(1).max(60),
  isDirectFlight: z.boolean(),
  countryAr: z.string().min(2),
  countryFr: z.string().min(2),
  originCityAr: z.string().min(2),
  originCityFr: z.string().min(2),
  featured: z.boolean(),
  active: z.boolean(),
  visaIncluded: z.boolean(),
  heroImage: z.string().min(1),
  destinations: z.array(destinationSchema).min(1),
  priceGroups: z.array(priceGroupSchema).min(1),
  inclusions: z.array(inclusionSchema).min(1),
  notes: z.array(noteSchema).min(1),
  hotels: z.array(hotelSchema).min(1)
});

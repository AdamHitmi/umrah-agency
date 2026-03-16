import {z} from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  rating: z.coerce.number().int().min(1).max(5),
  contentAr: z.string().min(10),
  contentFr: z.string().min(10),
  active: z.boolean(),
  sortOrder: z.coerce.number().int().min(0)
});

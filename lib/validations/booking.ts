import {z} from "zod";

export const bookingRequestSchema = z.object({
  packageId: z.string().min(1),
  fullName: z.string().min(2).max(100),
  phone: z.string().min(6).max(30),
  email: z.string().email(),
  city: z.string().min(2).max(100),
  roomType: z.string().min(2).max(80),
  travelersCount: z.coerce.number().int().min(1).max(20),
  notes: z.string().max(1000).optional().or(z.literal(""))
});

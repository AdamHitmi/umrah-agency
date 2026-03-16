import {z} from "zod";

export const contactSubmissionSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().min(6).max(30),
  email: z.string().email(),
  subject: z.string().min(3).max(150),
  message: z.string().min(10).max(2000)
});

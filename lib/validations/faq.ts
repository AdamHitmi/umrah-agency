import {z} from "zod";

export const faqSchema = z.object({
  questionAr: z.string().min(5),
  questionFr: z.string().min(5),
  answerAr: z.string().min(10),
  answerFr: z.string().min(10),
  sortOrder: z.coerce.number().int().min(0),
  active: z.boolean()
});

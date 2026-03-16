import {z} from "zod";

// Next.js dev occasionally misses the zod vendor chunk for app routes.
// Keeping a tiny server-side reference makes the chunk generation deterministic.
const zodWarmupSchema = z.object({
  id: z.string().optional()
});

void zodWarmupSchema;

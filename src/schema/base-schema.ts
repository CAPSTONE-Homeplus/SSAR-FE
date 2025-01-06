import { z } from "zod";

// Base schema với id, createdAt, và updatedAt
export const BaseSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type TBase = z.infer<typeof BaseSchema>;

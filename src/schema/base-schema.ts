import { z } from "zod";

// Base schema với id, createdAt, và updatedAt là kiểu string
export const BaseSchema = z.object({
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type TBase = z.infer<typeof BaseSchema>;

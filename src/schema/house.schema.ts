import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const HouseSchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string().optional(),
  buildingId: z.string().uuid(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export const HouseCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  description: z.string().optional(),
  buildingId: z.string().uuid(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export type THouseRequest = z.infer<typeof HouseSchema>;
export type THouseResponse = z.infer<typeof HouseSchema>;
export type THouseCreateRequest = z.infer<typeof HouseCreateSchema>;

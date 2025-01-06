import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const HouseTypeSchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string().optional(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export const HouseTypeCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  description: z.string().optional(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export type THouseTypeRequest = z.infer<typeof HouseTypeSchema>;
export type THouseTypeResponse = z.infer<typeof HouseTypeSchema>;
export type THouseTypeCreateRequest = z.infer<typeof HouseTypeCreateSchema>;

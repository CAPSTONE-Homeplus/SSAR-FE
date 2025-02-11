import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const HouseTypeSchema = BaseSchema.extend({
  id: z.string().uuid(),
  no: z.string().max(50),
  number: z.string().max(50),
  code: z.string().max(50),
  description: z.string().optional(),
  status: z.string().max(50),
});

export const HouseTypeCreateSchema = BaseSchema.extend({
  no: z.string().max(50),
  number: z.string().max(50),
  code: z.string().max(50),
  description: z.string().optional(),
});

export const UpdateHouseTypeSchema = BaseSchema.extend({
  no: z.string().max(50),
  number: z.string().max(50),
  code: z.string().max(50),
  description: z.string().optional(),
  status: z.string().max(50),
});

export type THouseTypeRequest = z.infer<typeof HouseTypeSchema>;
export type THouseTypeResponse = z.infer<typeof HouseTypeSchema>;
export type TCreateHouseTypeRequest = z.infer<typeof HouseTypeCreateSchema>;

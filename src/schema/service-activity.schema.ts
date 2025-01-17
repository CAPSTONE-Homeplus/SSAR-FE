import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const ServiceActivitySchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  code: z.string().max(50),
  status: z.string().max(20),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  prorityLevel: z.number().int().min(0),
  estimatedTimePerTask: z.string().max(255),
  safetyMeasures: z.string().max(255),
  serviceId: z.string().uuid(),
});

export const ServiceActivityCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  code: z.string().max(50),
  prorityLevel: z.number().int().min(0),
  estimatedTimePerTask: z.string().max(255),
  safetyMeasures: z.string().max(255),
  serviceId: z.string().uuid(),
});

export const ServiceActivityUpdateSchema = BaseSchema.extend({
  name: z.string().max(255).optional(),
  code: z.string().max(50).optional(),
  status: z.string().max(20).optional(),
  prorityLevel: z.number().int().min(0).optional(),
  estimatedTimePerTask: z.string().max(255).optional(),
  safetyMeasures: z.string().max(255).optional(),
});

export type TServiceActivityRequest = z.infer<typeof ServiceActivitySchema>;
export type TServiceActivityResponse = z.infer<typeof ServiceActivitySchema>;
export type TServiceActivityCreateRequest = z.infer<typeof ServiceActivityCreateSchema>;
export type TServiceActivityUpdateRequest = z.infer<typeof ServiceActivityUpdateSchema>;

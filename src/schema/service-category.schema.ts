import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const ServiceCategorySchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string().optional(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export const ServiceCategoryCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  description: z.string().optional(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export type TServiceCategoryRequest = z.infer<typeof ServiceCategorySchema>;
export type TServiceCategoryResponse = z.infer<typeof ServiceCategorySchema>;
export type TServiceCategoryCreateRequest = z.infer<
  typeof ServiceCategoryCreateSchema
>;

import { BaseSchema } from "@/schema/base-schema";
import { z } from "zod";

export const ServiceCategorySchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  status: z.string().optional(),
  code: z.string().max(255),

});

export const ServiceCategoryCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  code: z.string().max(255),
});


export type TServiceCategoryRequest = z.TypeOf<typeof ServiceCategorySchema>;
export type TServiceCategoryResponse = z.TypeOf<typeof ServiceCategorySchema>;
export type TServiceCategoryCreateRequest = z.TypeOf<
  typeof ServiceCategoryCreateSchema
>;
export type TUpdateServiceCategoryRequest = z.TypeOf<typeof ServiceCategorySchema>;


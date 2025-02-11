import { z } from "zod";

export const ServiceCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
  status: z.string().optional(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
  code: z.string().max(255),

});

export const ServiceCategoryCreateSchema = z.object({
  name: z.string().max(255),
  code: z.string().max(255),
});


export type TServiceCategoryRequest = z.TypeOf<typeof ServiceCategorySchema>;
export type TServiceCategoryResponse = z.TypeOf<typeof ServiceCategorySchema>;
export type TServiceCategoryCreateRequest = z.TypeOf<
  typeof ServiceCategoryCreateSchema
>;
export type TUpdateServiceCategoryRequest = z.TypeOf<typeof ServiceCategorySchema>;


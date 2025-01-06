import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const ExtraServiceSchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string().optional(),
  price: z.number().positive(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export const ExtraServiceCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  description: z.string().optional(),
  price: z.number().positive(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export type TExtraServiceRequest = z.infer<typeof ExtraServiceSchema>;
export type TExtraServiceResponse = z.infer<typeof ExtraServiceSchema>;
export type TExtraServiceCreateRequest = z.infer<
  typeof ExtraServiceCreateSchema
>;

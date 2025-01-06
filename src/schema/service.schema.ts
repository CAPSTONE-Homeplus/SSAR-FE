import { z } from "zod";
import { BaseSchema } from "./base-schema"; // Import base schema

// Service schema kế thừa từ BaseSchema
export const ServiceSchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string().optional(),
  status: z.string().max(20),
  priorityLevel: z.number().int(),
  price: z.number().positive(),
  discount: z.number().min(0).max(1),
  duration: z.number().int().positive(),
  maxCapacity: z.number().int().positive(),
  serviceCode: z.string().max(50),
  isFeatured: z.boolean(),
  isAvailable: z.boolean(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
  serviceCategoryId: z.string().uuid(),
});

// Service Create Schema (Không yêu cầu `id`)
export const ServiceCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  description: z.string().optional(),
  status: z.string().max(20),
  priorityLevel: z.number().int(),
  price: z.number().positive(),
  discount: z.number().min(0).max(1),
  duration: z.number().int().positive(),
  maxCapacity: z.number().int().positive(),
  serviceCode: z.string().max(50),
  isFeatured: z.boolean(),
  isAvailable: z.boolean(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
  serviceCategoryId: z.string().uuid(),
});

// Tạo các type từ các schema
export type TServiceRequest = z.infer<typeof ServiceSchema>;
export type TServiceResponse = z.infer<typeof ServiceSchema>;
export type TServiceCreateRequest = z.infer<typeof ServiceCreateSchema>;

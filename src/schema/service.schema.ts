import { z } from "zod";
import { BaseSchema } from "./base-schema"; // Import base schema

// Service schema kế thừa từ BaseSchema
export const ServiceSchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string().optional(),
  status: z.string().max(20),
  prorityLevel: z.number().int(),
  price: z.number().min(0),
  discount: z.number().min(0).max(100),
  duration: z.number().int().positive(),
  maxCapacity: z.number().int().positive(),
  serviceCode: z.string().max(50),
  isFeatured: z.boolean(),
  isAvailable: z.boolean(),
  createdBy: z.string().nullable(),
  updatedBy: z.string().nullable(),
  serviceCategoryId: z.string().uuid(),
  code: z.string().max(50),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});


// Service Create Schema (Không yêu cầu `id`)
export const ServiceCreateSchema = BaseSchema.extend({
  name: z.string().max(255), // Tên dịch vụ
  description: z.string().optional(), // Mô tả
  price: z.number().min(0), // Giá
  discount: z.number().min(0).max(100), // Giảm giá (phần trăm)
  prorityLevel: z.number().int().min(0), // Mức độ ưu tiên
  duration: z.number().int().positive(), // Thời lượng
  maxCapacity: z.number().int().positive(), // Sức chứa tối đa
  serviceCode: z.string().max(50), // Mã dịch vụ
  serviceCategoryId: z.string().uuid(), // ID danh mục dịch vụ
  code: z.string().max(50), // Mã code
});

export const ServiceUpdateSchema = BaseSchema.extend({
  name: z.string().max(255).optional(), 
  description: z.string().optional(), 
  price: z.number().min(0).optional(), 
  status: z.string().max(20).optional(), 
  discount: z.number().min(0).max(100).optional(), 
  prorityLevel: z.number().int().min(0).optional(), 
  duration: z.number().int().positive().optional(), 
  maxCapacity: z.number().int().positive().optional(), 
  serviceCode: z.string().max(50).optional(),
  isFeatured: z.boolean().optional(),
  isAvailable: z.boolean().optional(), 
  code: z.string().max(50).optional(),
});

// Tạo các type từ các schema
export type TServiceRequest = z.infer<typeof ServiceSchema>;
export type TServiceResponse = z.infer<typeof ServiceSchema>;
export type TServiceCreateRequest = z.infer<typeof ServiceCreateSchema>;
export type TServiceUpdateRequest = z.infer<typeof ServiceUpdateSchema>;

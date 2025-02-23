import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const OptionSchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string()
    .max(255, "Name must not exceed 255 characters")
    .min(3, "Name must be at least 3 characters long"),
  price: z.coerce.number()
    .positive("Price must be greater than 0")
    .max(100000000, "Price must not exceed 100 million"),
  note: z.string().optional(),
  status: z.enum(["Active", "Inactive"], {
    errorMap: () => ({ message: "Status must be either 'Active' or 'Inactive'" }),
  }),
  isMandatory: z.boolean(),
  maxQuantity: z.coerce.number().int().positive(),
  discount: z.coerce.number().min(0, "Discount cannot be negative"),
  code: z.string()
    .max(50, "Code must not exceed 50 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Code must only contain letters, numbers, underscores, or hyphens"),
  serviceId: z.string().uuid(),
});

export const OptionCreateSchema = BaseSchema.extend({
  name: z.string().min(1, { message: "Tên không được để trống" }),
  price: z.coerce.number()
    .positive({ message: "Giá phải là số dương" })
    .max(1_000_000, { message: "Giá không được vượt quá 1.000.000" }),
  note: z.string().optional(),
  isMandatory: z.coerce.boolean().default(false),
  maxQuantity: z.coerce.number()
    .int({ message: "Số lượng tối đa phải là số nguyên" })
    .min(0, { message: "Số lượng tối đa không thể âm" }),
  discount: z.coerce.number()
    .min(0, { message: "Giảm giá không thể âm" })
    .max(100, { message: "Giảm giá không thể vượt quá 100%" }),
  code: z.string().min(1, { message: "Mã không được để trống" }),
  serviceId: z.string().uuid({ message: "serviceId phải là UUID hợp lệ" }),
});


export type TOptionRequest = z.infer<typeof OptionSchema>;
export type TOptionResponse = z.infer<typeof OptionSchema>;
export type TOptionCreateRequest = z.infer<
  typeof OptionCreateSchema
>;
export type TOptionUpdateRequest = z.infer<typeof OptionSchema>;

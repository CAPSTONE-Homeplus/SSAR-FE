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
  name: z.string().max(255),
  description: z.string().optional(),
  price: z.number().positive(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export type TOptionRequest = z.infer<typeof OptionSchema>;
export type TOptionResponse = z.infer<typeof OptionSchema>;
export type TOptionCreateRequest = z.infer<
  typeof OptionCreateSchema
>;
export type TOptionUpdateRequest = z.infer<typeof OptionSchema>;

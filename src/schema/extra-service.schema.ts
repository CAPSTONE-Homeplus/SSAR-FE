import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const ExtraServiceSchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string()
    .max(255, "Name must not exceed 255 characters")
    .min(3, "Name must be at least 3 characters long"),
  price: z.coerce.number()
    .positive("Price must be greater than 0")
    .max(100000000, "Price must not exceed 100 million"), // Chuyển đổi từ string sang number
  status: z.enum(["Active", "Inactive"], {
    errorMap: () => ({ message: "Status must be either 'Active' or 'Inactive'" }),
  }),
  extraTime: z.coerce.number()
    .int("Extra time must be an integer")
    .positive("Extra time must be greater than 0")
    .max(1440, "Extra time cannot exceed 24 hours (1440 minutes)"), // Chuyển đổi từ string sang number
  code: z.string()
    .max(50, "Code must not exceed 50 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Code must only contain letters, numbers, underscores, or hyphens"),
  serviceId: z.string().uuid(),
});

export const ExtraServiceCreateSchema = BaseSchema.extend({
  name: z.string().min(1, "Tên không được để trống"),
  price: z.coerce.number().min(0, "Giá không được nhỏ hơn 0"),
  extraTime: z.coerce.number().min(0, "Thời gian không được nhỏ hơn 0"),
  code: z.string().min(1, "Mã không được để trống"),
  serviceId: z.string().uuid("serviceId phải là UUID hợp lệ"),
});

export type TExtraServiceRequest = z.infer<typeof ExtraServiceSchema>;
export type TExtraServiceResponse = z.infer<typeof ExtraServiceSchema>;
export type TExtraServiceCreateRequest = z.infer<
  typeof ExtraServiceCreateSchema
>;
export type TExtraServiceUpdateRequest = z.infer<typeof ExtraServiceSchema>;

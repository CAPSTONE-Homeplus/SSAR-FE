import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const EquipmentSupplySchema = BaseSchema.extend({
    id: z.string().uuid(),
    name: z.string()
      .max(255, "Name must not exceed 255 characters")
      .min(3, "Name must be at least 3 characters long"),
    urlImage: z.string().url("Invalid image URL"),
    status: z.enum(["Active", "Inactive"], {
      errorMap: () => ({ message: "Status must be either 'Active' or 'Inactive'" }),
    }),
    serviceId: z.string().uuid(),
    code: z.string()
      .max(50, "Code must not exceed 50 characters")
      .regex(/^[a-zA-Z0-9_-]+$/, "Code must only contain letters, numbers, underscores, or hyphens"),
  });
  

  export const EquipmentSupplyCreateSchema = BaseSchema.extend({
    name: z.string().min(1, "Tên không được để trống"),
    base64Image: z.string().min(1, "Ảnh không hợp lệ"),
    serviceId: z.string().uuid("serviceId không hợp lệ"),
    code: z.string(),
  });

export type TEquipmentSupplyRequest = z.infer<typeof EquipmentSupplySchema>;
export type TEquipmentSupplyResponse = z.infer<typeof EquipmentSupplySchema>;
export type TEquipmentSupplyCreateRequest = z.infer<
  typeof EquipmentSupplyCreateSchema
>;
export type TEquipmentSupplyUpdateRequest = z.infer<typeof EquipmentSupplySchema>;

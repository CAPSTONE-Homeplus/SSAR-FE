import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const EquipmentSuppliesInServiceSchema = BaseSchema.extend({ 
    id: z.string().uuid(),
    name: z.string().min(1, { message: "Tên không được trống." }),
    urlImage: z.string().min(1, { message: "URL hình ảnh không được trống." }),
    status: z.string().min(1, { message: "Trạng thái không được trống." }),
    serviceId: z.string().uuid(),
    code: z.string().min(1, { message: "Mã không được trống." }),
});

export type TEquipmentSuppliesInServiceRequest = z.infer<typeof EquipmentSuppliesInServiceSchema>;
export type TEquipmentSuppliesInServiceResponse = z.infer<typeof EquipmentSuppliesInServiceSchema>;
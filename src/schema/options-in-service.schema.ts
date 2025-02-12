import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const OptionsInServiceSchema = BaseSchema.extend({ 
    id: z.string().uuid(),
    name: z.string().min(1, { message: "Tên không được trống." }),
    price: z.number().min(0, { message: "Giá không hợp lệ." }),
    note: z.string().optional(), // Ghi chú có thể để trống
    status: z.string().min(1, { message: "Trạng thái không được trống." }),
    isMandatory: z.boolean().default(false), // Trường bắt buộc (true/false)
    maxQuantity: z.number().min(0, { message: "Số lượng tối đa không hợp lệ." }),
    discount: z.number().min(0, { message: "Giảm giá không hợp lệ." }),
    code: z.string().min(1, { message: "Mã không được trống." }),
    serviceId: z.string().uuid(),
});

export type TOptionsInServiceRequest = z.infer<typeof OptionsInServiceSchema>;
export type TOptionsInServiceResponse = z.infer<typeof OptionsInServiceSchema>;

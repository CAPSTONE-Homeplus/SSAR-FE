import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const ExtraServicesInServiceSchema = BaseSchema.extend({ 
    id: z.string().uuid(),
    name: z.string().min(1, { message: "Tên không được trống." }),
    price: z.number().min(0, { message: "Giá không hợp lệ." }),
    status: z.string().min(1, { message: "Trạng thái không được trống." }),
    extraTime: z.number().min(0, { message: "Thời gian bổ sung không hợp lệ." }),
    code: z.string().min(1, { message: "Mã không được trống." }),
    serviceId: z.string().uuid(),
});

export type TExtraServicesInServiceRequest = z.infer<typeof ExtraServicesInServiceSchema>;
export type TExtraServicesInServiceResponse = z.infer<typeof ExtraServicesInServiceSchema>;

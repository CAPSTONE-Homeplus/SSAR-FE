import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const ServiceActivitiesInServiceSchema =  BaseSchema.extend({ 
    id: z.string().uuid(),
    name: z.string().min(1, { message: "Tên không được trống." }),
    code: z.string().min(1, { message: "Mã không được trống." }),
    status: z.string().min(1, { message: "Trạng thái không được trống." }),
    prorityLevel: z.number().min(1, { message: "Mức độ ưu tiên không được trống." }),
    estimatedTimePerTask: z.string().min(1, { message: "Thời gian ước lượng không được trống." }),
    safetyMeasures: z.string().min(1, { message: "Biện pháp an toàn không được trống." }),
    serviceId: z.string().min(1, { message: "Service ID không được trống." }),
});

export type TServiceActivitiesInServiceRequest = z.infer<typeof ServiceActivitiesInServiceSchema>;
export type TServiceActivitiesInServiceResponse  = z.infer<typeof ServiceActivitiesInServiceSchema>;




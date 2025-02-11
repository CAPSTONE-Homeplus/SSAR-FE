import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const HouseSchema = BaseSchema.extend({
  id: z.string().uuid({ message: "ID không hợp lệ." }),
  no: z.string().min(1, { message: "Số nhà không được để trống." }),
  numberOfRoom: z.string().min(1, { message: "Số phòng không được để trống." }),
  status: z.string().min(1, { message: "Trạng thái không được để trống." }),
  code: z.string().min(1, { message: "Mã nhà không được để trống." }),
  bedroomCount: z.number().min(1, { message: "Phải có ít nhất 1 phòng ngủ." }),
  bathroomCount: z.number().min(1, { message: "Phải có ít nhất 1 phòng tắm." }),
  hasBalcony: z.boolean(),
  furnishingStatus: z
    .string()
    .min(1, { message: "Tình trạng nội thất không được để trống." }),
  squareMeters: z
    .string()
    .min(1, { message: "Diện tích không được để trống." }),
  orientation: z.string().min(1, { message: "Hướng nhà không được để trống." }),
  contactTerms: z
    .string()
    .min(1, { message: "Điều kiện liên hệ không được để trống." }),
  occupacy: z
    .string()
    .min(1, { message: "Tình trạng sử dụng không được để trống." }),
  buildingId: z.string().uuid({ message: "Tòa nhà không hợp lệ." }),
  houseTypeId: z.string().uuid({ message: "Loại nhà không hợp lệ." }),
});

export const HouseCreateSchema = BaseSchema.extend({
  no: z.string().min(1, { message: "Số nhà không được để trống." }),
  numberOfRoom: z.string().min(1, { message: "Số phòng không được để trống." }),
  status: z.string().min(1, { message: "Trạng thái không được để trống." }),
  code: z.string().min(1, { message: "Mã nhà không được để trống." }),
  bedroomCount: z.coerce
    .number()
    .min(1, { message: "Phải có ít nhất 1 phòng ngủ." }),
  bathroomCount: z.coerce
    .number()
    .min(1, { message: "Phải có ít nhất 1 phòng tắm." }),
  hasBalcony: z.boolean(),
  furnishingStatus: z
    .string()
    .min(1, { message: "Tình trạng nội thất không được để trống." }),
  squareMeters: z
    .string()
    .min(1, { message: "Diện tích không được để trống." }),
  orientation: z.string().min(1, { message: "Hướng nhà không được để trống." }),
  contactTerms: z
    .string()
    .min(1, { message: "Điều kiện liên hệ không được để trống." }),
  occupacy: z
    .string()
    .min(1, { message: "Tình trạng sử dụng không được để trống." }),
  buildingId: z.string().uuid({ message: "Tòa nhà không hợp lệ." }),
  houseTypeId: z.string().uuid({ message: "Loại nhà không hợp lệ." }),
});

export type THouseRequest = z.infer<typeof HouseSchema>;
export type THouseResponse = z.infer<typeof HouseSchema>;
export type TUpdateHouseRequest = z.infer<typeof HouseSchema>;
export type TCreateHouseRequest = z.infer<typeof HouseCreateSchema>;

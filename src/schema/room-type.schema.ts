import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const RoomTypeSchema = BaseSchema.extend({
  id: z.string().uuid({ message: "ID không hợp lệ, vui lòng kiểm tra lại." }),
  name: z.string().max(255, { message: "Tên không được vượt quá 255 ký tự." }),
  description: z.string().optional(),
  code: z
    .string()
    .max(50, { message: "Mã phòng không được vượt quá 50 ký tự." }),
  status: z
    .string()
    .max(50, { message: "Trạng thái không được vượt quá 50 ký tự." }),
});

export const RoomTypeCreateSchema = BaseSchema.extend({
  name: z.string().max(255, { message: "Tên không được vượt quá 255 ký tự." }),
  description: z.string().optional(),
  code: z
    .string()
    .max(50, { message: "Mã phòng không được vượt quá 50 ký tự." }),
});

export type TRoomTypeRequest = z.infer<typeof RoomTypeSchema>;
export type TRoomTypeResponse = z.infer<typeof RoomTypeSchema>;
export type TCreateRoomTypeRequest = z.infer<typeof RoomTypeCreateSchema>;
export type TUpdateRoomTypeRequest = z.infer<typeof RoomTypeSchema>;

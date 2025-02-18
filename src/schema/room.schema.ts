import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const RoomSchema = BaseSchema.extend({
  id: z.string().uuid({ message: "ID phòng không hợp lệ" }),
  name: z
    .string()
    .max(255, { message: "Tên phòng không được vượt quá 255 ký tự" }),
  status: z
    .string()
    .max(50, { message: "Trạng thái không được vượt quá 50 ký tự" }),
  size: z.number({ message: "Kích thước phòng phải là một số" }),
  furnitureIncluded: z.boolean({ message: "Giá trị phải là true hoặc false" }),
  squareMeters: z.string({ message: "Diện tích phòng phải là một chuỗi" }),
  houseId: z.string().uuid({ message: "ID nhà không hợp lệ" }),
  roomTypeId: z.string().uuid({ message: "ID loại phòng không hợp lệ" }),
  code: z
    .string()
    .max(50, { message: "Mã phòng không được vượt quá 50 ký tự" }),
});

export const RoomCreateSchema = BaseSchema.extend({
  name: z
    .string()
    .max(255, { message: "Tên phòng không được vượt quá 255 ký tự" }),
  size: z.coerce.number({ message: "Kích thước phòng phải là một số" }),
  furnitureIncluded: z.boolean({ message: "Giá trị phải là true hoặc false" }),
  squareMeters: z.string({ message: "Diện tích phòng phải là một chuỗi" }),
  houseId: z.string().uuid({ message: "ID nhà không hợp lệ" }),
  roomTypeId: z.string().uuid({ message: "ID loại phòng không hợp lệ" }),
  code: z
    .string()
    .max(50, { message: "Mã phòng không được vượt quá 50 ký tự" }),
});

export type TRoomRequest = z.infer<typeof RoomSchema>;
export type TRoomResponse = z.infer<typeof RoomSchema>;
export type TCreateRoomRequest = z.infer<typeof RoomCreateSchema>;

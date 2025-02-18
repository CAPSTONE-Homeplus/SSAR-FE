import z from "zod";
import { BaseSchema } from "./base-schema";

export const UserSchema = BaseSchema.extend({
  id: z.string().uuid(),
  fullName: z.string().min(1, { message: "Họ và tên không được trống." }),
  status: z.string().min(1, { message: "Trạng thái không được trống." }),
  roomId: z.string().min(1, { message: "Mã phòng không được trống." }),
  extraField: z.string().optional(),

  username: z.string().min(1, { message: "Tên đăng nhập không được trống." }),
  role: z.string().min(1, { message: "Vai trò không được trống." }),
});

export type TUserResponse = z.TypeOf<typeof UserSchema>;

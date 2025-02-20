import z from "zod";

export const LoginSchema = z
  .object({
    username: z.string().min(2, {
      message: "Tài khoản hoặc Email sai",
    }),
    password: z.string().min(1, {
      message: "Mật khẩu không được trống.",
    }),
  })
  .strict();
export const AuthResponseSchema = z.object({
  accessToken: z.string().min(1, { message: "Access token không được trống." }),
  refreshToken: z
    .string()
    .min(1, { message: "Refresh token không được trống." }),
  userId: z.string().uuid(),
  fullName: z.string().min(1, { message: "Họ và tên không được trống." }),
  status: z.string().min(1, { message: "Trạng thái không được trống." }),
  role: z.string().min(1, { message: "Vai trò không được trống." }),
});
export type TLoginRequest = z.TypeOf<typeof LoginSchema>;
export type TAuthResponse = z.TypeOf<typeof AuthResponseSchema>;

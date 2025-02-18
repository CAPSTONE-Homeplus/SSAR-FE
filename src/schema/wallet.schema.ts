import z from "zod";

export const WalletSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, { message: "Tên ví không được trống." }),
  balance: z.number().nonnegative({ message: "Số dư không được âm." }),
  currency: z.string().min(1, { message: "Tiền tệ không được trống." }),
  type: z.string().min(1, { message: "Loại ví không được trống." }),
  extraField: z.string().optional(),
  updatedAt: z.string().min(1, { message: "Ngày cập nhật không được trống." }),
  createdAt: z.string().min(1, { message: "Ngày tạo không được trống." }),
  status: z.string().min(1, { message: "Trạng thái không được trống." }),
  ownerId: z.string().min(1, { message: "Mã chủ sở hữu không được trống." }),
});

export const CreateWalletSchema = z.object({
  name: z.string().min(1, { message: "Tên ví không được trống." }),
  balance: z.number().nonnegative({ message: "Số dư không được âm." }),
  currency: z.string().min(1, { message: "Tiền tệ không được trống." }),
  type: z.string().min(1, { message: "Loại ví không được trống." }),
  extraField: z.string().optional(),
  ownerId: z.string().min(1, { message: "Mã chủ sở hữu không được trống." }),
});

export type TWalletResponse = z.TypeOf<typeof WalletSchema>;
export type TCreateWalletRequest = z.TypeOf<typeof CreateWalletSchema>;

import { z } from "zod";

export const StoreSchema = z.object({
  createdAt: z.string().datetime(),
  name: z.string().min(1),
  address: z.string().min(1),
  imageUrl: z.string().url(),
  storeCode: z.string().min(1),
});

export type TStoreResponse = z.TypeOf<typeof StoreSchema> & { id: string };
export type TStoreRequest = z.TypeOf<typeof StoreSchema>;

// import z from "zod";

// // Schema cho Store
// export const StoreResponseSchema = z.object({
//   id: z.string().uuid(),
//   storeName: z.string().min(1, { message: "Tên cửa hàng không được trống." }),
//   address: z.string().min(1, { message: "Địa chỉ không được trống." }),
//   phoneNumber: z.string().regex(/^\d{10,12}$/, { message: "Số điện thoại không hợp lệ." }),
//   createdDate: z.string(),
//   modifiedDate: z.string().nullable(),
//   createdBy: z.string().nullable(),
//   modifiedBy: z.string().nullable(),
//   status: z.enum(["ACTIVE", "INACTIVE"]),
// });

// export const CreateStoreSchema = z.object({
//   storeName: z.string().min(1, { message: "Tên cửa hàng không được trống." }),
//   address: z.string().min(1, { message: "Địa chỉ không được trống." }),
//   phoneNumber: z.string().regex(/^\d{10,12}$/, { message: "Số điện thoại không hợp lệ." }),
//   status: z.enum(["ACTIVE", "INACTIVE"]),
// });

// export const UpdateStoreSchema = z.object({
//   id: z.string().uuid(),
//   storeName: z.string().optional(),
//   address: z.string().optional(),
//   phoneNumber: z.string().optional(),
//   status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
//   modifiedDate: z.string().optional(),
//   modifiedBy: z.string().nullable().optional(),
// });

// // Types
// export type TStoreResponse = z.TypeOf<typeof StoreResponseSchema>;
// export type TCreateStoreRequest = z.TypeOf<typeof CreateStoreSchema>;
// export type TUpdateStoreRequest = z.TypeOf<typeof UpdateStoreSchema>;

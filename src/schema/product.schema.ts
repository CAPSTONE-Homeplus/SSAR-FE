import z from "zod";

// Schema cho Product
export const ProductResponseSchema = z.object({
  id: z.string().uuid(),
  productName: z.string(),
  img: z.string().url(),
  stock: z.coerce.number(),
  createdDate: z.string(),
  modifiedDate: z.string().nullable(),
  createdBy: z.string().nullable(),
  modifiedBy: z.string().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE", "CUSTOM", "CUSTOM-DONE"]),
  baseModelID: z.string().uuid(),
  finalPrice: z.coerce.number(),
  description: z.string(),
});

export const CreateProductSchema = z.object({
  baseModelID: z.string().uuid(),
  productName: z.string().min(1, { message: "Tên sản phẩm không được trống." }),
  description: z
    .string()
    .min(1, { message: "Mô tả sản phẩm không được trống." }),
  stock: z.coerce
    .number()
    .min(0, { message: "Số lượng phải lớn hơn hoặc bằng 0" })
    .max(100, { message: "Số lượng không được vượt quá 100" }),
  finalPrice: z.coerce
    .number()
    .min(0, { message: "Giá sản phẩm phải lớn hơn hoặc bằng 0" })
    .max(100000000, {
      message: "Giá sản phẩm không được vượt quá 100,000,000",
    }),
  status: z.enum(["ACTIVE", "INACTIVE", "CUSTOM", "CUSTOM-DONE"]),
  img: z.string(),
});

export const UpdateProductSchema = z.object({
  id: z.string(),
  baseModelID: z.string().uuid(),
  productName: z.string().optional(),
  stock: z.coerce.number().optional(),
  finalPrice: z.coerce.number().optional(),
  description: z.string().nullable().optional(),
  createdDate: z.string(),
  modifiedDate: z.string().nullable(),
  createdBy: z.string().nullable(),
  modifiedBy: z.string().nullable(),
  img: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "CUSTOM", "CUSTOM-DONE"]).optional(),
});

export type TCreateProductRequest = z.TypeOf<typeof CreateProductSchema>;
export type TUpdateProductRequest = z.TypeOf<typeof UpdateProductSchema>;
export type TProductResponse = z.TypeOf<typeof ProductResponseSchema>;

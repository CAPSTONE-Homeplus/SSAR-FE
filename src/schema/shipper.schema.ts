import z from "zod";

// Schema cho Shipper
export const ShipperResponseSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(1, { message: "Tên không được trống." }),
  phoneNumber: z
    .string()
    .regex(/^\d{10,12}$/, { message: "Số điện thoại không hợp lệ." }),
  assignedArea: z.string().uuid(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const CreateShipperSchema = z.object({
  fullName: z.string().min(1, { message: "Tên không được trống." }),
  phoneNumber: z
    .string()
    .regex(/^\d{10,12}$/, { message: "Số điện thoại không hợp lệ." }),
  assignedArea: z.string().uuid(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const UpdateShipperSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().optional(),
  phoneNumber: z.string().optional(),
  assignedArea: z.string().uuid().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

// Types
export type TShipperResponse = z.TypeOf<typeof ShipperResponseSchema>;
export type TCreateShipperRequest = z.TypeOf<typeof CreateShipperSchema>;
export type TUpdateShipperRequest = z.TypeOf<typeof UpdateShipperSchema>;

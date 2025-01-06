import z from "zod";

// Schema cho Area
export const AreaResponseSchema = z.object({
  id: z.string().uuid(),
  areaName: z.string().min(1, { message: "Tên khu vực không được trống." }),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const CreateAreaSchema = z.object({
  areaName: z.string().min(1, { message: "Tên khu vực không được trống." }),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const UpdateAreaSchema = z.object({
  id: z.string().uuid(),
  areaName: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

// Types
export type TAreaResponse = z.TypeOf<typeof AreaResponseSchema>;
export type TCreateAreaRequest = z.TypeOf<typeof CreateAreaSchema>;
export type TAreaRequest = z.TypeOf<typeof UpdateAreaSchema>;

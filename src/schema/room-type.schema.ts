import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const RoomTypeSchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string().optional(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export const RoomTypeCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  description: z.string().optional(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export type TRoomTypeRequest = z.infer<typeof RoomTypeSchema>;
export type TRoomTypeResponse = z.infer<typeof RoomTypeSchema>;
export type TCreateRoomTypeRequest = z.infer<typeof RoomTypeCreateSchema>;

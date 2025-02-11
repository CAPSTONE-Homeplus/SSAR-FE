import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const RoomSchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string().optional(),
  houseId: z.string().uuid(),
  roomTypeId: z.string().uuid(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export const RoomCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  description: z.string().optional(),
  houseId: z.string().uuid(),
  roomTypeId: z.string().uuid(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export type TRoomRequest = z.infer<typeof RoomSchema>;
export type TRoomResponse = z.infer<typeof RoomSchema>;
export type TCreateRoomRequest = z.infer<typeof RoomCreateSchema>;

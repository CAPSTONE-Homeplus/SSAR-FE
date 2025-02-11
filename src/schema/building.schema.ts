import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const BuildingSchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  longitude: z.string(),
  latitude: z.string(),
  code: z.string().max(50),
  hubId: z.string().uuid(),
  clusterId: z.string().uuid(),
  status: z.string().max(50),
});

export const BuildingCreateSchema = z.object({
  name: z.string().max(255),
  longitude: z.string(),
  latitude: z.string(),
  code: z.string().max(50),
  // hubId: z.string().uuid(),
  clusterId: z.string().uuid(),
});

export type TBuildingRequest = z.infer<typeof BuildingSchema>;
export type TBuildingResponse = z.infer<typeof BuildingSchema>;
export type TCreateBuildingRequest = z.infer<typeof BuildingCreateSchema>;

import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const BuildingSchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string().optional(),
  clusterId: z.string().uuid(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export const BuildingCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  description: z.string().optional(),
  clusterId: z.string().uuid(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export type TBuildingRequest = z.infer<typeof BuildingSchema>;
export type TBuildingResponse = z.infer<typeof BuildingSchema>;
export type TBuildingCreateRequest = z.infer<typeof BuildingCreateSchema>;

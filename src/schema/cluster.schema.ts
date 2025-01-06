import { z } from "zod";
import { BaseSchema } from "./base-schema"; // Import base schema

export const ClusterSchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string().optional(),
  location: z.string().max(255),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export const ClusterCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  description: z.string().optional(),
  location: z.string().max(255),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export type TClusterRequest = z.infer<typeof ClusterSchema>;
export type TClusterResponse = z.infer<typeof ClusterSchema>;
export type TClusterCreateRequest = z.infer<typeof ClusterCreateSchema>;

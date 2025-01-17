import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const SubServiceActivitySchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  code: z.string().max(50),
  status: z.string().max(20),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  serviceActivityId: z.string().uuid(),
});

export const SubServiceActivityCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  code: z.string().max(50),
  serviceActivityId: z.string().uuid(),
});

export const SubServiceActivityUpdateSchema = BaseSchema.extend({
  name: z.string().max(255).optional(),
  code: z.string().max(50).optional(),
  status: z.string().max(20).optional(),
});

export type TSubServiceActivityRequest = z.infer<typeof SubServiceActivitySchema>;
export type TSubServiceActivityResponse = z.infer<typeof SubServiceActivitySchema>;
export type TSubServiceActivityCreateRequest = z.infer<typeof SubServiceActivityCreateSchema>;
export type TSubServiceActivityUpdateRequest = z.infer<typeof SubServiceActivityUpdateSchema>;

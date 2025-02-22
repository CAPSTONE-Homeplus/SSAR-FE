import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const SubServiceActivitySchema = BaseSchema.extend({
  id: z.string().uuid(),
  name: z.string().max(255),
  code: z.string().max(50),
  status: z.string().max(20),
  serviceActivityId: z.string().uuid(),
});

export const SubServiceActivityCreateSchema = BaseSchema.extend({
  name: z.string().max(255),
  code: z.string().max(50),
  serviceActivityId: z.string().uuid(),
});


export type TServiceSubActivityRequest = z.infer<typeof SubServiceActivitySchema>;
export type TServiceSubActivitiesResponse = z.infer<typeof SubServiceActivitySchema>;
export type TServiceSubActivityCreateRequest = z.infer<typeof SubServiceActivityCreateSchema>;
export type TServiceSubActivityUpdateRequest = z.infer<typeof SubServiceActivitySchema>;

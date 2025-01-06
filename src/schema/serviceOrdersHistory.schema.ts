import { z } from "zod";
import { BaseSchema } from "./base-schema"; // Import base schema

// ServiceOrdersHistorySchema kế thừa từ BaseSchema
export const ServiceOrdersHistorySchema = BaseSchema.extend({
  id: z.string().uuid(),
  updatedBy: z.string().max(255),
  changeType: z.string().optional(),
  oldValue: z.string().optional(),
  newValue: z.string().optional(),
  changeReason: z.string().optional(),
  timestamp: z.string().datetime(),
  notes: z.string().optional(),
  status: z.string().max(20),
  serviceOrderId: z.string().uuid(),
});

export const ServiceOrdersHistoryCreateSchema = BaseSchema.extend({
  updatedBy: z.string().max(255),
  changeType: z.string().optional(),
  oldValue: z.string().optional(),
  newValue: z.string().optional(),
  changeReason: z.string().optional(),
  timestamp: z.string().datetime(),
  notes: z.string().optional(),
  status: z.string().max(20),
  serviceOrderId: z.string().uuid(),
});

export type TServiceOrdersHistoryRequest = z.infer<
  typeof ServiceOrdersHistorySchema
>;
export type TServiceOrdersHistoryResponse = z.infer<
  typeof ServiceOrdersHistorySchema
>;
export type TServiceOrdersHistoryCreateRequest = z.infer<
  typeof ServiceOrdersHistoryCreateSchema
>;

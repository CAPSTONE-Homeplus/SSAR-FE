import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const ExtraServiceOrderSchema = BaseSchema.extend({
  id: z.string().uuid(),
  extraServiceId: z.string().uuid(),
  orderId: z.string().uuid(),
  quantity: z.number().int().positive(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export const ExtraServiceOrderCreateSchema = BaseSchema.extend({
  extraServiceId: z.string().uuid(),
  orderId: z.string().uuid(),
  quantity: z.number().int().positive(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export type TExtraServiceOrderRequest = z.infer<typeof ExtraServiceOrderSchema>;
export type TExtraServiceOrderResponse = z.infer<
  typeof ExtraServiceOrderSchema
>;
export type TExtraServiceOrderCreateRequest = z.infer<
  typeof ExtraServiceOrderCreateSchema
>;

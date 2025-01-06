import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const TimesSlotSchema = BaseSchema.extend({
  id: z.string().uuid(),
  startTime: z.date(),
  endTime: z.date(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export const TimesSlotCreateSchema = BaseSchema.extend({
  startTime: z.date(),
  endTime: z.date(),
  createdBy: z.string().max(50),
  updatedBy: z.string().max(50),
});

export type TTimesSlotRequest = z.infer<typeof TimesSlotSchema>;
export type TTimesSlotResponse = z.infer<typeof TimesSlotSchema>;
export type TTimesSlotCreateRequest = z.infer<typeof TimesSlotCreateSchema>;

import { z } from "zod";
import { BaseSchema } from "./base-schema";

export const TimesSlotSchema = BaseSchema.extend({
  id: z.string().uuid(),
  startTime: z.object({
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
    millisecond: z.number(),
    microsecond: z.number(),
    nanosecond: z.number(),
    ticks: z.number(),
  }),
  endTime: z.object({
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
    millisecond: z.number(),
    microsecond: z.number(),
    nanosecond: z.number(),
    ticks: z.number(),
  }),
  description: z.string(),
  status: z.string(),
  code: z.string(),
});

export const TimesSlotCreateSchema = BaseSchema.extend({
  startTime: z.object({
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
    millisecond: z.number(),
    microsecond: z.number(),
    nanosecond: z.number(),
    ticks: z.number(),
  }),
  endTime: z.object({
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
    millisecond: z.number(),
    microsecond: z.number(),
    nanosecond: z.number(),
    ticks: z.number(),
  }),
  description: z.string(),
  status: z.string(),
  code: z.string(),
});

export const UpdateTimesSlotSchema = BaseSchema.extend({
  id: z.string().uuid(),
  startTime: z.string(), // Đổi từ object thành string
  endTime: z.string(), // Đổi từ object thành string
  description: z.string(),
  status: z.string(),
  code: z.string(),
});

export type TTimesSlotRequest = z.infer<typeof TimesSlotSchema>;
export type TTimesSlotResponse = z.infer<typeof TimesSlotSchema>;
export type TTimesSlotCreateRequest = z.infer<typeof TimesSlotCreateSchema>;
export type TTimesSlotCreateResponse = z.infer<typeof TimesSlotCreateSchema>;
export type TTimesSlotUpdateRequest = z.infer<typeof TimesSlotSchema>;

import { BaseSchema } from "@/schema/base-schema";
import { z } from "zod";

export const StaffStatusSchema = BaseSchema.extend({
  staffId: z.string().uuid(),
  status: z.string().max(255),
  lastUpdated: z.string().datetime(),
});

export const StaffStatusArraySchema = z.object({
  data: z.array(StaffStatusSchema),
});

export const StaffStatusReadySchema = BaseSchema.extend({
    staffId: z.string().uuid(),
    status: z.string().max(255),
    lastUpdated: z.string().datetime(),
  });

export const StaffStatusReadyArraySchema = z.array(StaffStatusReadySchema);

export type TStaffStatus = z.TypeOf<typeof StaffStatusSchema>;
export type TStaffStatusArrayResponse = z.TypeOf<typeof StaffStatusArraySchema>;
export type TStaffStatusReady = z.TypeOf<typeof StaffStatusReadySchema>;
export type TStaffStatusReadyArrayResponse = z.TypeOf<typeof StaffStatusReadyArraySchema>;

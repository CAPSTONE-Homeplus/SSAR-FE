import { z } from "zod";
import { BaseSchema } from "./base-schema"; // Import base schema

// ServiceOrderSchema kế thừa từ BaseSchema
export const ServiceOrderSchema = BaseSchema.extend({
  id: z.string().uuid(),
  note: z.string().optional(),
  price: z.number().positive(),
  status: z.string().max(20),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  address: z.string().optional(),
  bookingDate: z.string().datetime(),
  timeSlot: z.string().max(20),
  employeeId: z.string().uuid().optional(),
  employeeRating: z.number().min(0).max(5).optional(),
  customerFeedback: z.string().optional(),
  cleaningToolsRequired: z.boolean(),
  cleaningToolsProvided: z.boolean(),
  serviceType: z.string().max(50),
  distanceToCustomer: z.number().nonnegative().optional(),
  priorityLevel: z.number().int(),
  notes: z.string().optional(),
  discountCode: z.string().optional(),
  discountAmount: z.number().optional(),
  totalAmount: z.number().positive(),
  realTimeStatus: z.string().max(20),
  jobStartTime: z.string().datetime().optional(),
  jobEndTime: z.string().datetime().optional(),
  emergencyRequest: z.boolean(),
  cleaningAreas: z.string().optional(),
  itemsToClean: z.string().optional(),
  estimatedArrivalTime: z.string().datetime().optional(),
  estimatedDuration: z.number().positive().optional(),
  actualDuration: z.number().positive().optional(),
  cancellationDeadline: z.string().uuid(),
  timeSlotId: z.string().uuid(),
  serviceId: z.string().uuid(),
});

// ServiceOrderCreateSchema kế thừa từ BaseSchema
export const ServiceOrderCreateSchema = BaseSchema.extend({
  note: z.string().optional(),
  price: z.number().positive(),
  status: z.string().max(20),
  address: z.string().optional(),
  bookingDate: z.string().datetime(),
  timeSlot: z.string().max(20),
  employeeId: z.string().uuid().optional(),
  employeeRating: z.number().min(0).max(5).optional(),
  customerFeedback: z.string().optional(),
  cleaningToolsRequired: z.boolean(),
  cleaningToolsProvided: z.boolean(),
  serviceType: z.string().max(50),
  distanceToCustomer: z.number().nonnegative().optional(),
  priorityLevel: z.number().int(),
  notes: z.string().optional(),
  discountCode: z.string().optional(),
  discountAmount: z.number().optional(),
  totalAmount: z.number().positive(),
  realTimeStatus: z.string().max(20),
  jobStartTime: z.string().datetime().optional(),
  jobEndTime: z.string().datetime().optional(),
  emergencyRequest: z.boolean(),
  cleaningAreas: z.string().optional(),
  itemsToClean: z.string().optional(),
  estimatedArrivalTime: z.string().datetime().optional(),
  estimatedDuration: z.number().positive().optional(),
  actualDuration: z.number().positive().optional(),
  cancellationDeadline: z.string().uuid(),
  timeSlotId: z.string().uuid(),
  serviceId: z.string().uuid(),
});

// Tạo các type từ schema
export type TServiceOrderRequest = z.infer<typeof ServiceOrderSchema>;
export type TServiceOrderResponse = z.infer<typeof ServiceOrderSchema>;
export type TServiceOrderCreateRequest = z.infer<
  typeof ServiceOrderCreateSchema
>;

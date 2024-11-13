import z from "zod";

export const AccountResponseSchema = z.object({
  id: z.string().uuid(),
  createdDate: z.string(),
  createdBy: z.string(),
  modifiedBy: z.string(),
  modifiedDate: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  username: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  roleName: z.string(),
});

export type TAccountResponse = z.TypeOf<typeof AccountResponseSchema>;

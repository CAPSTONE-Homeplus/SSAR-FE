/* eslint-disable @typescript-eslint/no-unused-vars */
import { httpHomePlus } from "@/lib/http";
import { TStaffStatusArrayResponse, TStaffStatusReadyArrayResponse } from "@/schema/staff.schema";

export const getAllStaffStatus = async (groupId: string) => {
  const response = await httpHomePlus.get(`/staffs/get-all-staff-status/${groupId}`);
  return response.payload ?? [];
};


export const getAllStaffStatusReady = async (groupId: string) => {
  const response = await httpHomePlus.get<TStaffStatusReadyArrayResponse>(
    `/staffs/get-all-staff-status-ready/${groupId}`, 
  );
  return response.payload ?? [];
};

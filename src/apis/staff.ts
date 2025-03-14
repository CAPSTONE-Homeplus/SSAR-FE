/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { httpHomePlus } from "@/lib/http";
import { TStaffResponse, TStaffStatusReadyArrayResponse } from "@/schema/staff.schema";
import { TTableResponse } from "@/types/Table";


export const getAllStaffs = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TStaffResponse>>(
    `/staffs`,
    {
      params,
    }
  );
  // console.log("getAllserrr Response:", response);
  return response;
};

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



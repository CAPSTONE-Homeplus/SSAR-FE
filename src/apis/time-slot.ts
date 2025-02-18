/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import { TTimesSlotResponse, TTimesSlotUpdateRequest } from "@/schema/time-slot.schema";
import { TTableResponse } from "@/types/Table";

export const getAllTimeSlots = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TTimesSlotResponse>>(
    `/time-slots`,
    {
      params,
    }
  );
  // console.log("getAllserrr Response:", response);
  return response;
};

export const getTimeSlotById = async (id: string) => {
  const response = await httpHomePlus.get<TTimesSlotResponse>(`/time-slots/${id}`);
  // console.log("Service Category Response:", response);
  return response;
};

export const updateTimeSlot = async (id: string, data: TTimesSlotUpdateRequest) => {
  const response = await httpHomePlus.patch<TTimesSlotResponse>(
    `/time-slots/${id}`,
    data
  );
  // console.log("update service-categories Response:", response);
  return response;
};
"use server";

import { httpHomePlus } from "@/lib/http";
import { TServiceSubActivitiesResponse, TServiceSubActivityUpdateRequest } from "@/schema/service-sub-activity.schema";


export const getServiceSubActivityById = async (id: string) => {
  const response = await httpHomePlus.get<TServiceSubActivitiesResponse>(`/service-sub-activities/${id}`);
  console.log("Service Activity Response:", response);
  return response;
};

export const updateSubServiceActivity = async (id: string, data: TServiceSubActivityUpdateRequest) => {
  const response = await httpHomePlus.patch<TServiceSubActivitiesResponse>(
    `/service-sub-activities/${id}`,
    data
  );
  // console.log("update service-sub-categories Response:", response);
  return response;
};
 


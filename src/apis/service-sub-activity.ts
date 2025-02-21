"use server";

import { httpHomePlus } from "@/lib/http";


export const getServiceSubActivityById = async (id: string) => {
  const response = await httpHomePlus.get<TServiceSubActivityResponse>(`/service-sub-activities/${id}`);
//   console.log("Service Activity Response:", response);
  return response;
};



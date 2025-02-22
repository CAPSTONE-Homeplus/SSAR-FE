/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import { TExtraServiceResponse, TExtraServiceUpdateRequest } from "@/schema/extra-service.schema";

export const getExtraServiceById = async (id: string) => {
  const response = await httpHomePlus.get<TExtraServiceResponse>(`/extra-services/${id}`);
  return response;
};


// export const createServiceCategory = async (data: Partial<TServiceCategoryResponse>) => {
//   const response = await httpHomePlus.post<TServiceCategoryResponse>(`/service-categories`, data);
// //   console.log("create Services Response:", response);
//   return response;
// };

export const updateExtraService = async (id: string, data: TExtraServiceUpdateRequest) => {
  const response = await httpHomePlus.patch<TExtraServiceResponse>(
    `/extra-services/${id}`,
    data
  );
  return response;
};


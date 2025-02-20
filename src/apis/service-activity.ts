/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import { TServiceActivityResponse, TServiceActivityUpdateRequest } from "@/schema/service-activity.schema";
import { TServiceCategoryResponse } from "@/schema/service-category.schema";
import { TTableResponse } from "@/types/Table";

export const getAllServiceCategories = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TServiceCategoryResponse>>(
    `/service-categories`,
    {
      params,
    }
  );
  // console.log("getAllserrr Response:", response);
  return response;
};


export const getServiceActivityById = async (id: string) => {
  const response = await httpHomePlus.get<TServiceActivityResponse>(`/service-activities/${id}`);
//   console.log("Service Activity Response:", response);
  return response;
};

// export const createServiceCategory = async (data: Partial<TServiceCategoryResponse>) => {
//   const response = await httpHomePlus.post<TServiceCategoryResponse>(`/service-categories`, data);
// //   console.log("create Services Response:", response);
//   return response;
// };

export const updateServiceActivity = async (id: string, data: TServiceActivityUpdateRequest) => {
  const response = await httpHomePlus.patch<TServiceActivityResponse>(
    `/service-activities/${id}`,
    data
  );
//   console.log("update service-categories Response:", response);
  return response;
};


/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import { TServiceCategoryResponse } from "@/schema/service-category.schema";
import { TTableResponse } from "@/types/Table";

export const getAllServiceCategories = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TServiceCategoryResponse>>(
    `/service-categories`,
    {
      params,
    }
  );
  console.log("getAllserrr Response:", response);
  return response;
};

export const getAreaById = async (id: string) => {
  const response = await httpHomePlus.get<TServiceCategoryResponse>(`/services/${id}`);
  console.log("getAreaById Response:", response);
  return response;
};

export const createArea = async (data: Partial<TServiceCategoryResponse>) => {
  const response = await httpHomePlus.post<TServiceCategoryResponse>(`/services`, data);
  console.log("createArea Response:", response);
  return response;
};

export const updateArea = async (id: string, data: Partial<TServiceCategoryResponse>) => {
  const response = await httpHomePlus.put<TServiceCategoryResponse>(`/services/${id}`, data);
  console.log("updateArea Response:", response);
  return response;
};

export const deleteArea = async (id: string) => {
  const response = await httpHomePlus.delete(`/areas/${id}`);
  console.log("deleteArea Response:", response);
  return response;
};

/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import { TServiceCategoryResponse, TUpdateServiceCategoryRequest } from "@/schema/service-category.schema";
import { TServiceResponse } from "@/schema/service.schema";
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

export const getServicesInServiceCategory = async (id: string, params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TServiceResponse>>(
    `/service-categories/${id}/services`,
    {
      params,
    }
  );
  return response;
};

export const getServiceCategoryById = async (id: string) => {
  const response = await httpHomePlus.get<TServiceCategoryResponse>(`/service-categories/${id}`);
  console.log("Service Category Response:", response);
  return response;
};

export const createServiceCategory = async (data: Partial<TServiceCategoryResponse>) => {
  const response = await httpHomePlus.post<TServiceCategoryResponse>(`/service-categories`, data);
  console.log("create Services Response:", response);
  return response;
};

export const updateServiceCategory = async (id: string, data: TUpdateServiceCategoryRequest) => {
  const response = await httpHomePlus.patch<TServiceCategoryResponse>(
    `/service-categories/${id}`,
    data
  );
  console.log("update service-categories Response:", response);
  return response;
};

export const deleteArea = async (id: string) => {
  const response = await httpHomePlus.delete(`/areas/${id}`);
  console.log("deleteArea Response:", response);
  return response;
};

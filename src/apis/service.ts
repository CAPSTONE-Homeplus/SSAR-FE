/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import { TServiceResponse } from "@/schema/service.schema";
import { TTableResponse } from "@/types/Table";

export const getAllServices = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TServiceResponse>>(
    `/services`,
    {
      params,
    }
  );
  // console.log("getAllserrr Response:", response);
  return response;
};

export const getAreaById = async (id: string) => {
  const response = await httpHomePlus.get<TServiceResponse>(`/services/${id}`);
  console.log("getAreaById Response:", response);
  return response;
};

export const createService = async (data: Partial<TServiceResponse>) => {
  const response = await httpHomePlus.post<TServiceResponse>(`/services`, data);
  console.log("create Services Response:", response);
  return response;
};

export const updateArea = async (id: string, data: Partial<TServiceResponse>) => {
  const response = await httpHomePlus.put<TServiceResponse>(`/services/${id}`, data);
  console.log("updateArea Response:", response);
  return response;
};

export const deleteArea = async (id: string) => {
  const response = await httpHomePlus.delete(`/areas/${id}`);
  console.log("deleteArea Response:", response);
  return response;
};

/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import { TAreaResponse } from "@/schema/area.schema";
import { TTableResponse } from "@/types/Table";

export const getAllAreas = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TAreaResponse>>(
    `/areas`,
    {
      params,
    }
  );
  console.log("getAllAreas Response:", response);
  return response;
};

export const getAreaById = async (id: string) => {
  const response = await httpHomePlus.get<TAreaResponse>(`/areas/${id}`);
  console.log("getAreaById Response:", response);
  return response;
};

export const createArea = async (data: Partial<TAreaResponse>) => {
  const response = await httpHomePlus.post<TAreaResponse>(`/areas`, data);
  console.log("createArea Response:", response);
  return response;
};

export const updateArea = async (id: string, data: Partial<TAreaResponse>) => {
  const response = await httpHomePlus.put<TAreaResponse>(`/areas/${id}`, data);
  console.log("updateArea Response:", response);
  return response;
};

export const deleteArea = async (id: string) => {
  const response = await httpHomePlus.delete(`/areas/${id}`);
  console.log("deleteArea Response:", response);
  return response;
};

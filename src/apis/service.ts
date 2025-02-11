/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import { TServiceActivitiesInServiceResponse } from "@/schema/service-activities-in-service.schema";
import { TServiceResponse, TUpdateServiceRequest } from "@/schema/service.schema";
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

export const getServiceById = async (id: string) => {
  const response = await httpHomePlus.get<TServiceResponse>(`/services/${id}`);
  console.log("Service Response:", response);
  return response;
};

export const getServiceActivitiesInService = async (id: string, params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TServiceActivitiesInServiceResponse>>(
    `/services/${id}/service-activities`,
    {
      params,
    }
  );
  return response;
};

export const createService = async (data: Partial<TServiceResponse>) => {
  const response = await httpHomePlus.post<TServiceResponse>(`/services`, data);
  console.log("create Services Response:", response);
  return response;
};

export const updateService = async (id: string, data: TUpdateServiceRequest) => {
  const response = await httpHomePlus.patch<TServiceResponse>(
    `/services/${id}`,
    data
  );
  console.log("update service Response:", response);
  return response;
};

export const deleteArea = async (id: string) => {
  const response = await httpHomePlus.delete(`/areas/${id}`);
  console.log("deleteArea Response:", response);
  return response;
};

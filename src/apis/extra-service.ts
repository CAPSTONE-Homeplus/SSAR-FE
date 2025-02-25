/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import { TExtraServiceResponse, TExtraServiceUpdateRequest } from "@/schema/extra-service.schema";

export const getExtraServiceById = async (id: string) => {
  const response = await httpHomePlus.get<TExtraServiceResponse>(`/extra-services/${id}`);
  return response;
};

export const createExtraService = async (data: Partial<TExtraServiceResponse>) => {
  const response = await httpHomePlus.post<TExtraServiceResponse>(`/extra-services`, data);
  return response;
};

export const updateExtraService = async (id: string, data: TExtraServiceUpdateRequest) => {
  const response = await httpHomePlus.patch<TExtraServiceResponse>(
    `/extra-services/${id}`,
    data
  );
  return response;
};


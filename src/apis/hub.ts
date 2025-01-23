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
      next: { tags: ["services"] },
    }
  );

  console.log("getAllServices Response:", response);
  return response;
};

// export const getStoreById = async (id: string) => {
//   return await httpMock.get<TStoreResponse>(`/products/${id}`, {});
// };

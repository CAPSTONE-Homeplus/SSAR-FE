"use server";

import { httpBag, httpMock } from "@/lib/http";
import { TStoreResponse } from "@/schema/store.schema";

export const getAllStores = async (params?: any) => {
  const response = await httpMock.get<TStoreResponse[]>("/products", {
    params,
  });
  return response;
};

export const getStoreById = async (id: string) => {
  return await httpMock.get<TStoreResponse>(`/products/${id}`, {});
};

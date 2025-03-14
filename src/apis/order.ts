/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import { TAssignStaffToOrderRequest, TOrderResponse } from "@/schema/order.schema";
import { TTableResponse } from "@/types/Table";


export const getAllOrders = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TOrderResponse>>(
    `/orders`,
    {
      params,
    }
  );
  return response;
};

export const getOrderById = async (id: string) => {
  const response = await httpHomePlus.get<TOrderResponse>(`/orders/${id}`);
//   console.log("Service Category Response:", response);
  return response;
};


export const assignStaffToOrder = async (id: string, data: TAssignStaffToOrderRequest) => {
  const response = await httpHomePlus.put<TOrderResponse>(
    `/orders/assign-staff`,
    data
  );
  return response;
};

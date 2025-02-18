/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import {
  TRoomTypeResponse,
  TCreateRoomTypeRequest,
} from "@/schema/room-type.schema";
import { TTableResponse } from "@/types/Table";
import { TRoomResponse } from "@/schema/room.schema";

export const getAllRoomTypes = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TRoomTypeResponse>>(
    `/roomtypes`,
    {
      params,
    }
  );
  console.log("getAllRoomTypes Response:", response);
  return response;
};
export const getRoomsInRoomType = async (id: string, params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TRoomResponse>>(
    `/roomtypes/${id}/room`,
    {
      params,
    }
  );
  return response;
};

export const getRoomTypeById = async (id: string) => {
  const response = await httpHomePlus.get<TRoomTypeResponse>(
    `/roomtypes/${id}`
  );
  console.log("getRoomTypeById Response:", response);
  return response;
};

export const createRoomType = async (data: Partial<TRoomTypeResponse>) => {
  const response = await httpHomePlus.post<TRoomTypeResponse>(
    `/roomtypes`,
    data
  );
  console.log("createRoomType Response:", response);
  return response;
};

export const updateRoomType = async (
  id: string,
  data: TCreateRoomTypeRequest
) => {
  const response = await httpHomePlus.patch<TRoomTypeResponse>(
    `/roomtypes/${id}`,
    data
  );
  console.log("updateRoomType Response:", response);
  return response;
};

export const deleteRoomType = async (id: string) => {
  const response = await httpHomePlus.delete(`/roomtypes/${id}`);
  console.log("deleteRoomType Response:", response);
  return response;
};

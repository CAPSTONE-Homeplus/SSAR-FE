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
    `/room-types`,
    {
      params,
    }
  );
  console.log("getAllRoomTypes Response:", response);
  return response;
};
export const getRoomsInRoomType = async (id: string, params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TRoomResponse>>(
    `/room-types/${id}/room`,
    {
      params,
    }
  );
  return response;
};

export const getRoomTypeById = async (id: string) => {
  const response = await httpHomePlus.get<TRoomTypeResponse>(
    `/room-types/${id}`
  );
  console.log("getRoomTypeById Response:", response);
  return response;
};

export const createRoomType = async (data: Partial<TRoomTypeResponse>) => {
  const response = await httpHomePlus.post<TRoomTypeResponse>(
    `/room-types`,
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
    `/room-types/${id}`,
    data
  );
  console.log("updateRoomType Response:", response);
  return response;
};

export const deleteRoomType = async (id: string) => {
  const response = await httpHomePlus.delete(`/room-types/${id}`);
  console.log("deleteRoomType Response:", response);
  return response;
};

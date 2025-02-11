/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import { TRoomResponse, TCreateRoomRequest } from "@/schema/room.schema";
import { TClusterResponse } from "@/schema/cluster.schema";
import { TTableResponse } from "@/types/Table";

export const getAllRooms = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TRoomResponse>>(
    `/rooms`,
    {
      params,
    }
  );
  console.log("getAllRooms Response:", response);
  return response;
};
export const getClustersInRoom = async (id: string, params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TClusterResponse>>(
    `/rooms/${id}/cluster`,
    {
      params,
    }
  );
  return response;
};

export const getRoomById = async (id: string) => {
  const response = await httpHomePlus.get<TRoomResponse>(`/rooms/${id}`);
  console.log("getRoomById Response:", response);
  return response;
};

export const createRoom = async (data: Partial<TRoomResponse>) => {
  const response = await httpHomePlus.post<TRoomResponse>(`/rooms`, data);
  console.log("createRoom Response:", response);
  return response;
};

export const updateRoom = async (id: string, data: TCreateRoomRequest) => {
  const response = await httpHomePlus.patch<TRoomResponse>(
    `/rooms/${id}`,
    data
  );
  console.log("updateRoom Response:", response);
  return response;
};

export const deleteRoom = async (id: string) => {
  const response = await httpHomePlus.delete(`/rooms/${id}`);
  console.log("deleteRoom Response:", response);
  return response;
};

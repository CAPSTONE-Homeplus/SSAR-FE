/* eslint-disable @typescript-eslint/no-explicit-any */ 
"use server";

import { httpHomePlus } from "@/lib/http";
import { TGroupResponse } from "@/schema/group.schema";
import { TTableResponse } from "@/types/Table";

export const getAllGroups = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TGroupResponse>>(
    `/groups`,
    {
      params,
    }
  );
  return response;
};

export const getGroupById = async (id: string) => {
  const response = await httpHomePlus.get<{ payload: TGroupResponse; status: number; message: string }>(`/groups/${id}`);
  return response;
};

export const createGroup = async (data: Partial<TGroupResponse>) => {
  const response = await httpHomePlus.post(`/groups`, data);
  return response;
};
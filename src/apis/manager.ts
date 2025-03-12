/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpHomePlus } from "@/lib/http";
import { TManagerResponse } from "@/schema/manager.schema";
import { TTableResponse } from "@/types/Table";

export const getAllManagers = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TManagerResponse>>(
    `/managers`,
    {
      params,
    }
  );
  return response;
};
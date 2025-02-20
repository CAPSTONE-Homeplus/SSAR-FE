/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpVinWallet } from "@/lib/http";
import { TAuthResponse, TLoginRequest } from "@/schema/auth.schema";

export const login = async (data: Partial<TLoginRequest>) => {
  const response = await httpVinWallet.post<TAuthResponse>(`/auth/login`, data);
  console.log("login Response:", response);
  return response;
};

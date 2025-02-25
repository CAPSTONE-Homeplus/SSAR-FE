/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpHomePlus } from "@/lib/http";
import { TAuthResponse, TLoginRequest } from "@/schema/auth.schema";

export const checkLoginManager = async (data: TLoginRequest) => {
  const response = await httpHomePlus.post<TAuthResponse>(
    `/auth/login-manager`,
    data
  );
  console.log("login Response:", response);
  return response;
};

export const checkLoginAdmin = async (data: TLoginRequest) => {
  const response = await httpHomePlus.post<TAuthResponse>(
    `/auth/login-admin`,
    data
  );
  console.log("login Response:", response);
  return response;
};

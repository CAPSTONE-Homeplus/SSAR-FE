/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpVinWallet } from "@/lib/http";
import { TUserResponse } from "@/schema/user.schema";
import { TWalletResponse } from "@/schema/wallet.schema";
import { TTableResponse } from "@/types/Table";

export const getAllUsers = async (params?: any) => {
  const response = await httpVinWallet.get<TTableResponse<TUserResponse>>(
    `/users`,
    {
      params,
    }
  );
  console.log("getAllUsers Response:", response);
  return response;
};
export const getWalletsInUser = async (id: string, params?: any) => {
  const response = await httpVinWallet.get<TTableResponse<TWalletResponse>>(
    `/users/${id}/wallets`,
    {
      params,
    }
  );
  return response;
};

export const getUserById = async (id: string) => {
  const response = await httpVinWallet.get<TUserResponse>(`/users/${id}`);
  console.log("getUserById Response:", response);
  return response;
};

export const createUser = async (data: Partial<TUserResponse>) => {
  const response = await httpVinWallet.post<TUserResponse>(`/users`, data);
  console.log("createUser Response:", response);
  return response;
};

// export const updateUser = async (id: string, data: TUpdateUserRequest) => {
//   const response = await httpVinWallet.patch<TUserResponse>(
//     `/users/${id}`,
//     data
//   );
//   console.log("updateUser Response:", response);
//   return response;
// };

// export const deleteUser = async (id: string) => {
//   const response = await httpVinWallet.delete(`/users/${id}`);
//   console.log("deleteUser Response:", response);
//   return response;
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpHomePlus } from "@/lib/http"; // HTTP client của bạn
import { TBuildingResponse } from "@/schema/building.schema"; // Schema cho Building
import { TTableResponse } from "@/types/Table"; // Kiểu trả về dạng bảng

// Lấy danh sách tất cả các tòa nhà
export const getAllBuildings = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TBuildingResponse>>(`/buildings`, {
    params,
    next: { tags: ["buildings"] },
  });
  console.log("getAllBuildings Response:", response);
  return response;
};

// Lấy thông tin chi tiết của một tòa nhà theo ID
export const getBuildingById = async (id: string) => {
  const response = await httpHomePlus.get<TBuildingResponse>(`/buildings/${id}`);
  console.log("getBuildingById Response:", response);
  return response;
};

// Tạo mới một tòa nhà
export const createBuilding = async (data: Partial<TBuildingResponse>) => {
  const response = await httpHomePlus.post<TBuildingResponse>(`/buildings`, data);
  console.log("createBuilding Response:", response);
  return response;
};

// Cập nhật thông tin của một tòa nhà theo ID
export const updateBuilding = async (id: string, data: Partial<TBuildingResponse>) => {
  const response = await httpHomePlus.put<TBuildingResponse>(`/buildings/${id}`, data);
  console.log("updateBuilding Response:", response);
  return response;
};

// Xóa một tòa nhà theo ID
export const deleteBuilding = async (id: string) => {
  const response = await httpHomePlus.delete(`/buildings/${id}`);
  console.log("deleteBuilding Response:", response);
  return response;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpHomePlus } from "@/lib/http"; // HTTP client của bạn
import { TClusterResponse } from "@/schema/cluster.schema"; // Schema cho Cluster
import { TTableResponse } from "@/types/Table"; // Kiểu trả về dạng bảng

// Lấy danh sách tất cả các cụm (cluster)
export const getAllClusters = async (params?: any) => {
  const response = await httpHomePlus.get<TTableResponse<TClusterResponse>>(`/clusters`, {
    params,
    next: { tags: ["clusters"] },
  });
  console.log("getAllClusters Response:", response);
  return response;
};

// Lấy thông tin chi tiết của một cụm theo ID
export const getClusterById = async (id: string) => {
  const response = await httpHomePlus.get<TClusterResponse>(`/clusters/${id}`);
  console.log("getClusterById Response:", response);
  return response;
};

// Tạo mới một cụm
export const createCluster = async (data: Partial<TClusterResponse>) => {
  const response = await httpHomePlus.post<TClusterResponse>(`/clusters`, data);
  console.log("createCluster Response:", response);
  return response;
};

// Cập nhật thông tin của một cụm theo ID
export const updateCluster = async (id: string, data: Partial<TClusterResponse>) => {
  const response = await httpHomePlus.put<TClusterResponse>(`/clusters/${id}`, data);
  console.log("updateCluster Response:", response);
  return response;
};

// Xóa một cụm theo ID
export const deleteCluster = async (id: string) => {
  const response = await httpHomePlus.delete(`/clusters/${id}`);
  console.log("deleteCluster Response:", response);
  return response;
};

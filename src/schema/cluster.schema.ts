import z from "zod";

// Schema cho Cluster Response
export const ClusterResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, { message: "Tên cụm không được trống." }),
  code: z.string().min(1, { message: "Mã cụm không được trống." }),
  status: z.string().min(1, { message: "Trạng thái không được trống." }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  areaId: z.string().uuid(),
});

// Schema cho Create/Update Cluster
export const CreateClusterSchema = z.object({
  name: z.string().min(1, { message: "Tên cụm không được trống." }),
  code: z.string().min(1, { message: "Mã cụm không được trống." }),
  areaId: z.string(),
});

// Types
export type TClusterResponse = z.TypeOf<typeof ClusterResponseSchema>;
export type TCreateClusterRequest = z.TypeOf<typeof CreateClusterSchema>;
export type TUpdateClusterRequest = z.TypeOf<typeof ClusterResponseSchema>;

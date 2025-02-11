import { getAllClusters } from "@/apis/cluster";
import { useQuery } from "@tanstack/react-query";

export const useClusters = () => {
  return useQuery({
    queryKey: ["clusters"],
    queryFn: async () => {
      const params = { page: 1, limit: 100 };
      const response = await getAllClusters(params);
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return response.payload.items; // API trả về `data`
    },
  });
};

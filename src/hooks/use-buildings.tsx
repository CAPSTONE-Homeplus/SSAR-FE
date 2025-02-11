import { getAllBuildings } from "@/apis/building";
import { useQuery } from "@tanstack/react-query";

export const useBuildings = () => {
  return useQuery({
    queryKey: ["buildings"],
    queryFn: async () => {
      const params = { page: 1, limit: 100 };
      const response = await getAllBuildings(params);
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return response.payload.items; // API trả về `data`
    },
  });
};

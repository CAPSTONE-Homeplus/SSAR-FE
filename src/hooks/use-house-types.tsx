import { getAllHouseTypes } from "@/apis/house-type";
import { useQuery } from "@tanstack/react-query";

export const useHouseTypes = () => {
  return useQuery({
    queryKey: ["house-types"],
    queryFn: async () => {
      const params = { page: 1, limit: 100 };
      const response = await getAllHouseTypes(params);
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return response.payload.items; // API trả về `data`
    },
  });
};

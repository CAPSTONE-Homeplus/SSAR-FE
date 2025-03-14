import { getAllHouses } from "@/apis/house";
import { useQuery } from "@tanstack/react-query";

export const useHouses = () => {
  return useQuery({
    queryKey: ["house-types"],
    queryFn: async () => {
      const params = { page: 1, limit: 100 };
      const response = await getAllHouses(params);
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return response.payload.items; // API trả về `data`
    },
  });
};

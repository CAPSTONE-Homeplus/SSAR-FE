import { getAllRoomTypes } from "@/apis/room-type";
import { useQuery } from "@tanstack/react-query";

export const useRoomTypes = () => {
  return useQuery({
    queryKey: ["room-types"],
    queryFn: async () => {
      const params = { page: 1, limit: 100 };
      const response = await getAllRoomTypes(params);
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return response.payload.items; // API trả về `data`
    },
  });
};

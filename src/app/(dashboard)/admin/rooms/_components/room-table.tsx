import { DataTable } from "@/components/table/data-table";
import { getAllRooms } from "@/apis/room";
import { searchParamsCache } from "@/lib/searchparams";
import { columns } from "./room-tables/columns";

const RoomTable = async () => {
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("search");
  const size = searchParamsCache.get("size");

  const filters = {
    page,
    size: size,
    ...(search && { search }),
  };
  const storeResponse = await getAllRooms(filters);
  const storePayload = storeResponse.payload;
  return (
    <div>
      <DataTable
        data={storePayload.items}
        columns={columns}
        totalItems={storePayload.total}
      />
    </div>
  );
};

export default RoomTable;

import { DataTable } from "@/components/table/data-table";
import { getAllRoomTypes } from "@/apis/room-type";
import { searchParamsCache } from "@/lib/searchparams";
import { columns } from "./room-type-tables/columns";

const RoomTypeTable = async () => {
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("search");
  const size = searchParamsCache.get("size");

  const filters = {
    page,
    size: size,
    ...(search && { search }),
  };
  const storeResponse = await getAllRoomTypes(filters);
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

export default RoomTypeTable;

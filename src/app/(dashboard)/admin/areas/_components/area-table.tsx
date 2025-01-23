import { DataTable } from "@/components/table/data-table";
import { columns } from "./area-tables/columns";
import { getAllAreas } from "@/apis/area";
import { searchParamsCache } from "@/lib/searchparams";

const AreaTable = async () => {
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("search");
  const size = searchParamsCache.get("size");

  const filters = {
    page,
    size: size,
    ...(search && { search }),
  };
  const storeResponse = await getAllAreas(filters);
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

export default AreaTable;

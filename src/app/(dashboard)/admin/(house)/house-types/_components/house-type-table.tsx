import { DataTable } from "@/components/table/data-table";
import { columns } from "./house-type-tables/columns";
import { getAllHouseTypes } from "@/apis/house-type";
import { searchParamsCache } from "@/lib/searchparams";

const HouseTypeTable = async () => {
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("search");
  const size = searchParamsCache.get("size");

  const filters = {
    page,
    size: size,
    ...(search && { search }),
  };
  const storeResponse = await getAllHouseTypes(filters);
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

export default HouseTypeTable;

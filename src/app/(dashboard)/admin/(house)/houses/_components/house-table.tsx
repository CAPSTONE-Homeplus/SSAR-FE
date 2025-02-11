import { DataTable } from "@/components/table/data-table";
import { columns } from "../../house-types/[slug]/_components/list-house-in-house-type/house-tables/columns";
import { getAllHouses } from "@/apis/house";
import { searchParamsCache } from "@/lib/searchparams";

const HouseTable = async () => {
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("search");
  const size = searchParamsCache.get("size");

  const filters = {
    page,
    size: size,
    ...(search && { search }),
  };
  const storeResponse = await getAllHouses(filters);
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

export default HouseTable;

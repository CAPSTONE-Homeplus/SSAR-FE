import { DataTable } from "@/components/table/data-table";

import { searchParamsCache } from "@/lib/searchparams";
import { columns } from "./service-activities-tables/columns";
import { getServiceActivitiesInService } from "@/apis/service";
type Props = {
  slug: string;
};
const ServiceActivitiesTableInService = async ({ slug }: Props) => {
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("search");
  const size = searchParamsCache.get("size");
  const filters = {
    page,
    size: size,
    ...(search && { search }),
  };

  const response = await getServiceActivitiesInService(slug, filters);
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const responsePayload = response.payload;
  return (
    <div>
      <DataTable
        data={responsePayload.items}
        columns={columns}
        totalItems={responsePayload.total}
      />
    </div>
  );
};

export default ServiceActivitiesTableInService;

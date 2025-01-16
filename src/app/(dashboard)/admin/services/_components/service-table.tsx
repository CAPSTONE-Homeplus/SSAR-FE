import { DataTable } from "@/components/table/data-table";
import { TServiceResponse } from "@/schema/service.schema";
import { TTableResponse } from "@/types/Table";
import React from "react";
import { columns } from "./service-tables/columns";
import { getAllServices } from "@/apis/service";

const ServiceTable = async () => {
  const serviceResponse = await getAllServices();
  console.log(serviceResponse);
  const parsedServiceResponse: TTableResponse<TServiceResponse> = {
    size: 0,
    page: 0,
    total: 0,
    totalPages: 0,
    items: serviceResponse.payload.items,
  };
  return (
    <div>
      <DataTable
        data={parsedServiceResponse.items}
        columns={columns}
        totalItems={parsedServiceResponse.totalPages}
      />
    </div>
  );
};

export default ServiceTable;

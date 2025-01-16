import { DataTable } from "@/components/table/data-table";
import { TServiceResponse } from "@/schema/service.schema";
import { TTableResponse } from "@/types/Table";
import React from "react";
import { columns } from "./store-tables/columns";
import { getAllServices } from "@/apis/service";

const StoreTable = async () => {
  const storeResponse = await getAllServices();
  console.log(storeResponse);
  const parsedStoreResponse: TTableResponse<TServiceResponse> = {
    size: 0,
    page: 0,
    total: 0,
    totalPages: 0,
    items: storeResponse.payload.items,
  };
  return (
    <div>
      <DataTable
        data={parsedStoreResponse.items}
        columns={columns}
        totalItems={parsedStoreResponse.totalPages}
      />
    </div>
  );
};

export default StoreTable;

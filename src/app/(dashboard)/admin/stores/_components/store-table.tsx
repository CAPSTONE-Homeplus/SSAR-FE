import { DataTable } from "@/components/table/data-table";
import { TStoreResponse } from "@/schema/store.schema";
import { TTableResponse } from "@/types/Table";
import React from "react";
import { columns } from "./store-tables/columns";
import { getAllStores } from "@/apis/store";

const StoreTable = async () => {
  const storeResponse = await getAllStores();
  const parsedStoreResponse: TTableResponse<TStoreResponse> = {
    listResult: storeResponse.payload,
    limit: 10,
    page: 1,
    totalPage: 3,
  };
  return (
    <div>
      <DataTable
        data={parsedStoreResponse.listResult}
        columns={columns}
        totalItems={parsedStoreResponse.totalPage}
      />
    </div>
  );
};

export default StoreTable;

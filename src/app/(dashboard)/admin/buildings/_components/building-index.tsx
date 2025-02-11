import PageContainer from "@/components/layout/page-container";
import React, { Suspense } from "react";
import BuildingTable from "./building-table";

import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import BuildingTableAction from "./building-tables/cluster-table-action";
import { CredenzaCreateBuilding } from "./credenza-create-building";
type Props = {
  keyProps: string;
};
const BuildingIndex = ({ keyProps }: Props) => {
  return (
    <PageContainer>
      {/* <div className="space-y-2">
        <BuildingTable storeResponse={storeResponse} />
      </div> */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Heading title="Khu vực" description="Quản lý khu vực " />
          <CredenzaCreateBuilding />
        </div>
        <Separator />

        <BuildingTableAction />
        <Suspense
          key={keyProps}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <BuildingTable />
        </Suspense>
      </div>
    </PageContainer>
  );
};

export default BuildingIndex;

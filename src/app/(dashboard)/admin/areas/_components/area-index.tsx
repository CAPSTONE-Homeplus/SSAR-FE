import PageContainer from "@/components/layout/page-container";
import React, { Suspense } from "react";
import AreaTable from "./area-table";

import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import AreaTableAction from "./area-tables/area-table-action";
type Props = {
  keyProps: string;
};
const AreaIndex = ({ keyProps }: Props) => {
  return (
    <PageContainer>
      {/* <div className="space-y-2">
        <AreaTable storeResponse={storeResponse} />
      </div> */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Khu vực" description="Quản lý khu vực " />
        </div>
        <Separator />
        <AreaTableAction />
        <Suspense
          key={keyProps}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <AreaTable />
        </Suspense>
      </div>
    </PageContainer>
  );
};

export default AreaIndex;

import PageContainer from "@/components/layout/page-container";
import React, { Suspense } from "react";
import AreaTable from "./area-table";

import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import AreaTableAction from "./area-tables/area-table-action";
import { CredenzaCreateArea } from "./credenza-create-area";
type Props = {
  keyProps: string;
};
const AreaIndex = ({ keyProps }: Props) => {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Heading title="Khu vực" description="Quản lý khu vực " />
          <CredenzaCreateArea />
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

import PageContainer from "@/components/layout/page-container";
import React, { Suspense } from "react";
import HouseTypeTable from "./house-type-table";

import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import HouseTypeTableAction from "./house-type-tables/house-type-table-action";
import { CredenzaCreateHouseType } from "./credenza-create-house-type";
type Props = {
  keyProps: string;
};
const HouseTypeIndex = ({ keyProps }: Props) => {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Heading
            title="Các loại căn hộ"
            description="Quản lý từng loại căn hộ có trong mỗi căn hộ "
          />
          <CredenzaCreateHouseType />
        </div>
        <Separator />

        <HouseTypeTableAction />
        <Suspense
          key={keyProps}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <HouseTypeTable />
        </Suspense>
      </div>
    </PageContainer>
  );
};

export default HouseTypeIndex;

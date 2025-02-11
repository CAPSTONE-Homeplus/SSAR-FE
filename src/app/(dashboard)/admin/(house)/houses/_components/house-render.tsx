import React, { Suspense } from "react";
import HouseTable from "./house-table";

import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import HouseTableAction from "../../house-types/[slug]/_components/list-house-in-house-type/house-tables/house-table-action";
import { CredenzaCreateHouse } from "./credenza-create-house";
type Props = {
  keyProps: string;
};
const HouseRender = ({ keyProps }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Heading title="Căn hộ" description="Quản lý căn hộ " />
        <CredenzaCreateHouse className="" />
      </div>

      <Separator />

      <HouseTableAction />
      <Suspense
        key={keyProps}
        fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
      >
        <HouseTable />
      </Suspense>
    </div>
  );
};

export default HouseRender;

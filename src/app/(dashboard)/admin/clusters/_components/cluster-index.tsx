import PageContainer from "@/components/layout/page-container";
import React, { Suspense } from "react";
import ClusterTable from "./cluster-table";

import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import ClusterTableAction from "./cluster-tables/cluster-table-action";
import { CredenzaCreateCluster } from "./credenza-create-cluster";
type Props = {
  keyProps: string;
};
const ClusterIndex = ({ keyProps }: Props) => {
  return (
    <PageContainer>
      {/* <div className="space-y-2">
        <ClusterTable storeResponse={storeResponse} />
      </div> */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Heading title="Khu vực" description="Quản lý khu vực " />
          <CredenzaCreateCluster />
        </div>
        <Separator />

        <ClusterTableAction />
        <Suspense
          key={keyProps}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ClusterTable />
        </Suspense>
      </div>
    </PageContainer>
  );
};

export default ClusterIndex;

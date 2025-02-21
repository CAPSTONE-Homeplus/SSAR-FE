import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import ServiceActivityDetailInService from "@/app/(dashboard)/manager/services/[slug]/service-activity/[serviceActivityId]/_components/update/service-activity-detail-async";
import ServiceSubActivityTableAction from "@/app/(dashboard)/manager/services/[slug]/service-activity/[serviceActivityId]/_components/list-service-sub-activity/service-sub-activity-tables/service-sub-activity-table-action";
import ServiceSubActivityTable from "@/app/(dashboard)/manager/services/[slug]/service-activity/[serviceActivityId]/_components/list-service-sub-activity/service-sub-activity-table";

type Props = {
  slug: string;
  keyProps: string;
};
const ServiceActivityDetailIndex = ({ slug, keyProps }: Props) => {
  return (
    <PageContainer>
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-16 col-span-12">
          <Suspense fallback={<Skeleton className="" />}>
            <ServiceActivityDetailInService slug={slug} />
          </Suspense>
        </Card>

        <div className="col-span-12 md:col-span-3 lg:col-span-12">
          <Separator />
          <ServiceSubActivityTableAction />

          <div className="py-4">
            <Heading
              title="Danh sách dịch vụ trong phân loại dịch vụ"
              description="Danh sách dịch vụ trong phân loại dịch vụ"
            />
          </div>

          <Suspense
            key={keyProps}
            fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
          >
            <ServiceSubActivityTable slug={slug} />
          </Suspense>
        </div>
      </div>
    </PageContainer>
  );
};

export default ServiceActivityDetailIndex;

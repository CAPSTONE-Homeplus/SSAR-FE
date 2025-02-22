import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import PageContainer from "@/components/layout/page-container";
import ServiceActivityDetailAsync from "@/app/(dashboard)/manager/services/[slug]/service-activity/[serviceActivityId]/_components/update/service-activity-detail-async";
import { Separator } from "@radix-ui/react-separator";
import { Heading } from "@/components/ui/headling";
import ServiceSubActivityTableAction from "@/app/(dashboard)/manager/services/[slug]/service-activity/[serviceActivityId]/_components/list-service-sub-activity/service-sub-activity-tables/service-sub-activity-table-action";
import ServiceSubActivityTable from "@/app/(dashboard)/manager/services/[slug]/service-activity/[serviceActivityId]/_components/list-service-sub-activity/service-sub-activity-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";

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
          {/* <p>hi</p> */}
            <ServiceActivityDetailAsync slug={slug} />
          </Suspense>
        </Card>

        <div className="col-span-12 md:col-span-3 lg:col-span-12">
          <Separator />
          <ServiceSubActivityTableAction />

          <div className="py-4">
            <Heading
              title="Danh sách dịch vụ phụ"
              description="Danh sách dịch vụ phụ trong các hoạt động của dịch vụ"
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

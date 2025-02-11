import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import ServiceDetailAsync from "./update/service-detail-async";
import ServiceActivitiesTableInService from "@/app/(dashboard)/manager/services/[slug]/_components/list-service-activities-in-service/service-activities-table-in-service";

type Props = {
  slug: string;
  keyProps: string;
};
const ServiceDetailIndex = ({ slug, keyProps }: Props) => {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 p-4">
        <Card className="p-4 col-span-12 md:col-span-12 lg:col-span-12">
          <Suspense fallback={<Skeleton className=" w-full h-full" />}>
            <ServiceDetailAsync slug={slug} />
          </Suspense>
        </Card>

        <div className="col-span-12 md:col-span-3 lg:col-span-12">
          <Separator />
          <div className="py-4">
            <Heading
              title="Dịch vụ"
              description="Danh sách dịch vụ"
            />
          </div>

          <Suspense
            key={keyProps}
            fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
          >
            <ServiceActivitiesTableInService slug={slug} />
          </Suspense>
        </div>
      </div>
    </PageContainer>
  );
};

export default ServiceDetailIndex;

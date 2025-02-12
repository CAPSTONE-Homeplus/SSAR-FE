import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import ServiceDetailAsync from "./update/service-detail-async";
import ServiceActivitiesTableInService from "@/app/(dashboard)/manager/services/[slug]/_components/list-service-activities-in-service/service-activities-table-in-service";
import ExtraServiceTableInService from "@/app/(dashboard)/manager/services/[slug]/_components/list-extra-service-in-services/extra-services-table-in-service";
import OptionsTableInService from "@/app/(dashboard)/manager/services/[slug]/_components/list-options-in-services/extra-services-table-in-service";
import EquipmentSuppliesTableInService from "@/app/(dashboard)/manager/services/[slug]/_components/list-equipment-supplies-in-services/extra-services-table-in-service";

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

        <div className="col-span-12">
          <Separator />
          <div className="py-4">
            <Heading title="Những dịch vụ liên quan" description="Các danh sách dịch vụ" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <Card className="p-4">
                <Heading title="Hoạt động dịch vụ" description="Danh sách các hoạt động dịch vụ" />
                <Suspense
                  key={keyProps}
                  fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
                >
                  <ServiceActivitiesTableInService slug={slug} />
                </Suspense>
              </Card>
            </div>

            <div className="col-span-1">
              <Card className="p-4">
                <Heading title="Dịch vụ bổ sung" description="Danh sách các dịch vụ bổ sung" />
                <Suspense
                  key={keyProps}
                  fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
                >
                  <ExtraServiceTableInService slug={slug} />
                </Suspense>
              </Card>
            </div>

            {/* Bảng 3: Lựa chọn */}
            <div className="col-span-1">
              <Card className="p-4">
                <Heading title="Lựa chọn" description="Danh sách các lựa chọn" />
                <Suspense
                  key={keyProps}
                  fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
                >
                  <OptionsTableInService slug={slug} />
                </Suspense>
              </Card>
            </div>

            {/* Bảng 4: Trang thiết bị hỗ trợ */}
            <div className="col-span-1">
              <Card className="p-4">
                <Heading title="Trang thiết bị hỗ trợ" description="Danh sách các các thiết bị hô trợ"  />
                <Suspense
                  key={keyProps}
                  fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
                >
                  <EquipmentSuppliesTableInService slug={slug} />
                </Suspense>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ServiceDetailIndex;

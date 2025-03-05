import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import PageContainer from "@/components/layout/page-container";
import HouseDetailAsync from "./update/house-detail-async";

type Props = {
  slug: string;
  keyProps: string;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HouseDetailIndex = ({ slug, keyProps }: Props) => {
  return (
    <PageContainer>
      <div className="grid grid-cols-6 gap-4 p-4">
        <Card className="p-4 col-span-6">
          <Suspense fallback={<Skeleton className=" w-full h-full" />}>
            <HouseDetailAsync slug={slug} />
          </Suspense>
        </Card>

        {/* <div className="col-span-6 ">
          <Separator />
          <div className="py-4">
            <Heading title="Phòng trong căn hộ" description="" />
          </div>

          <Suspense
            key={keyProps}
            fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
          >
            <RoomTableHouse slug={slug} />
          </Suspense>
        </div> */}
      </div>
    </PageContainer>
  );
};

export default HouseDetailIndex;

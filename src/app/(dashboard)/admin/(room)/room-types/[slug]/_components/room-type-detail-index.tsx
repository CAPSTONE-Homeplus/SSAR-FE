import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import RoomTypeDetailAsync from "./update/room-type-detail-async";
import RoomTableRoomType from "./list-room-in-room-type/room-table-room-type";

type Props = {
  slug: string;
  keyProps: string;
};
const RoomTypeDetailIndex = ({ slug, keyProps }: Props) => {
  return (
    <PageContainer>
      <div className="grid grid-cols-6 gap-4 p-4">
        <Card className="p-4 col-span-6">
          <Suspense fallback={<Skeleton className=" w-full h-full" />}>
            <RoomTypeDetailAsync slug={slug} />
          </Suspense>
        </Card>

        <div className="col-span-6 ">
          <Separator />
          <div className="py-4">
            <Heading title="Các phòng có liên quan" description="" />
          </div>

          <Suspense
            key={keyProps}
            fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
          >
            <RoomTableRoomType slug={slug} />
          </Suspense>
        </div>
      </div>
    </PageContainer>
  );
};

export default RoomTypeDetailIndex;

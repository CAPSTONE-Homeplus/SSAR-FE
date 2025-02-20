import React, { Suspense } from "react";
import RoomTable from "./room-table";

import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import RoomTableAction from "./room-tables/room-table-action";
import { CredenzaCreateRoom } from "./credenza-create-room";
type Props = {
  keyProps: string;
};
const RoomRender = ({ keyProps }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Heading title="Tạo phòng" description="Quản lý phòng " />
        <CredenzaCreateRoom />
      </div>

      <Separator />

      <RoomTableAction />
      <Suspense
        key={keyProps}
        fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
      >
        <RoomTable />
      </Suspense>
    </div>
  );
};

export default RoomRender;

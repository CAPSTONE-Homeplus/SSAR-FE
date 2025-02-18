import React, { Suspense } from "react";
import RoomTypeTable from "./room-type-table";

import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heading } from "@/components/ui/headling";
import { Separator } from "@/components/ui/separator";
import { CredenzaCreateRoomType } from "./credenza-create-room-type";
import RoomTypeTableAction from "./room-type-tables/room-type-table-action";
type Props = {
  keyProps: string;
};
const RoomTypeRender = ({ keyProps }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Heading title="Loại phòng" description="" />
        <CredenzaCreateRoomType />
      </div>

      <Separator />

      <RoomTypeTableAction />
      <Suspense
        key={keyProps}
        fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
      >
        <RoomTypeTable />
      </Suspense>
    </div>
  );
};

export default RoomTypeRender;

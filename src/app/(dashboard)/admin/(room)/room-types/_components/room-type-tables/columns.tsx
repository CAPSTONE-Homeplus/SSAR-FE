"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TRoomTypeResponse } from "@/schema/room-type.schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit } from "lucide-react";
import Link from "next/link";
import { formattedDateTime } from "@/lib/formatter";

export const columns: ColumnDef<TRoomTypeResponse>[] = [
  {
    accessorKey: "name",
    header: "Tên loại phòng",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="w-36 truncate cursor-pointer hover:underline">
              {row.getValue("name")}
            </span>
          </TooltipTrigger>
          <TooltipContent>{row.getValue("name")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.getValue("description") || "Không có mô tả"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => (
      <span className="text-sm">
        {formattedDateTime(row.getValue("createdAt"))}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Cập nhật lần cuối",
    cell: ({ row }) => (
      <span className="text-sm">
        {formattedDateTime(row.getValue("updatedAt"))}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const roomTypeId = row.original.id;
      return (
        <Link href={`/admin/room-types/${roomTypeId}`}>
          <Edit />
        </Link>
      );
    },
  },
];

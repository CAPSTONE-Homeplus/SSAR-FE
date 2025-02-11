"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TRoomResponse } from "@/schema/room.schema";
// import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<TRoomResponse>[] = [
  {
    accessorKey: "name",
    header: "Tên phòng",
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
  // {
  //   accessorKey: "houseId",
  //   header: "Mã nhà",
  //   cell: ({ row }) => (
  //     <Badge variant="outline" className="text-sm font-mono px-2 py-1">
  //       {row.getValue("houseId")}
  //     </Badge>
  //   ),
  // },
  // {
  //   accessorKey: "roomTypeId",
  //   header: "Mã loại phòng",
  //   cell: ({ row }) => (
  //     <Badge variant="outline" className="text-sm font-mono px-2 py-1">
  //       {row.getValue("roomTypeId")}
  //     </Badge>
  //   ),
  // },
  {
    accessorKey: "createdBy",
    header: "Người tạo",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("createdBy")}</span>
    ),
  },
  {
    accessorKey: "updatedBy",
    header: "Người cập nhật",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("updatedBy")}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const roomId = row.original.id;
      return (
        <Link href={`/admin/rooms/${roomId}`}>
          <Edit />
        </Link>
      );
    },
  },
];

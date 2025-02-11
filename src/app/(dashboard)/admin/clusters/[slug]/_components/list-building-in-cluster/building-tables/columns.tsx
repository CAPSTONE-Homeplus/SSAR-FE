"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import Link from "next/link";
import { TBuildingResponse } from "@/schema/building.schema";

export const columns: ColumnDef<TBuildingResponse>[] = [
  {
    accessorKey: "name",
    header: "Tên toà nhà",
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
    accessorKey: "code",
    header: "Mã toà nhà",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-sm font-mono px-2 py-1">
        {row.getValue("code")}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-sm px-2 py-1">
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "longitude",
    header: "Kinh độ",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("longitude")}</span>
    ),
  },
  {
    accessorKey: "latitude",
    header: "Vĩ độ",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("latitude")}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => (
      <span className="text-sm">
        {format(new Date(row.getValue("createdAt")), "dd/MM/yyyy HH:mm")}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Cập nhật lần cuối",
    cell: ({ row }) => (
      <span className="text-sm">
        {format(new Date(row.getValue("updatedAt")), "dd/MM/yyyy HH:mm")}
      </span>
    ),
  },
  {
    accessorKey: "hubId",
    header: "Mã hub",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-sm font-mono px-2 py-1">
        {row.getValue("hubId")}
      </Badge>
    ),
  },
  {
    accessorKey: "clusterId",
    header: "Mã cụm",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-sm font-mono px-2 py-1">
        {row.getValue("clusterId")}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const buildingId = row.original.id;
      return (
        <Link href={`/admin/buildings/${buildingId}`}>
          <Edit />
        </Link>
      );
    },
  },
];

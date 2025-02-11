"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TBuildingResponse } from "@/schema/building.schema";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CellAction } from "./cell-action";
import { format } from "date-fns";

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
    accessorKey: "latitude",
    header: "Vĩ độ",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("latitude")}</span>
    ),
  },
  {
    accessorKey: "longitude",
    header: "Kinh độ",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("longitude")}</span>
    ),
  },
  // {
  //   accessorKey: "clusterId",
  //   header: "Mã cụm",
  //   cell: ({ row }) => (
  //     <Badge variant="outline" className="text-sm font-mono px-2 py-1">
  //       {row.getValue("clusterId")}
  //     </Badge>
  //   ),
  // },
  // {
  //   accessorKey: "hubId",
  //   header: "Mã hub",
  //   cell: ({ row }) => (
  //     <Badge variant="outline" className="text-sm font-mono px-2 py-1">
  //       {row.getValue("hubId")}
  //     </Badge>
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

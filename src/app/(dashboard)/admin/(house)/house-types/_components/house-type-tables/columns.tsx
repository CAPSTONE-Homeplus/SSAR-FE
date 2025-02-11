"use client";

import { ColumnDef } from "@tanstack/react-table";
import { THouseTypeResponse } from "@/schema/house-type.schema";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<THouseTypeResponse>[] = [
  {
    accessorKey: "no",
    header: "Số thứ tự",
    cell: ({ row }) => <span className="text-sm">{row.getValue("no")}</span>,
  },
  {
    accessorKey: "number",
    header: "Số nhà",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("number")}</span>
    ),
  },
  {
    accessorKey: "code",
    header: "Mã nhà",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-sm font-mono px-2 py-1">
        {row.getValue("code")}
      </Badge>
    ),
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="block max-w-[300px] truncate overflow-hidden whitespace-nowrap cursor-pointer hover:underline">
              {row.getValue("description") || "Không có mô tả"}
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            {row.getValue("description")}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
        {new Date(row.getValue("createdAt")).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Ngày cập nhật",
    cell: ({ row }) => (
      <span className="text-sm">
        {new Date(row.getValue("updatedAt")).toLocaleString()}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

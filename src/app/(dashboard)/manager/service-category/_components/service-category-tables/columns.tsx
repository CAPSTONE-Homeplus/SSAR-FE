"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { TServiceCategoryResponse } from "@/schema/service-category.schema";

export const columns: ColumnDef<TServiceCategoryResponse>[] = [
  {
    accessorKey: "name",
    header: "Tên Dịch Vụ",
    cell: ({ row }) => (
      <div
        className="w-36 truncate cursor-pointer"
        title={row.getValue("name")}
        onClick={() => alert(row.getValue("name"))}
      >
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng Thái",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "createAt",
    header: "Ngày Tạo",
    cell: ({ row }) => <div>{new Date(row.getValue("createAt")).toLocaleString()}</div>,
  },
  {
    accessorKey: "updatedAt",
    header: "Ngày Cập Nhật",
    cell: ({ row }) => <div>{new Date(row.getValue("updatedAt")).toLocaleString()}</div>,
  },
  {
    accessorKey: "code",
    header: "Mã Code",
    cell: ({ row }) => <div>{row.getValue("code")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

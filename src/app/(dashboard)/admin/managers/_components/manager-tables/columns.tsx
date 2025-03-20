"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CheckCircle, XCircle } from "lucide-react";
import { TManagerResponse } from "@/schema/manager.schema";

export const columns: ColumnDef<TManagerResponse>[] = [
  {
    accessorKey: "fullName",
    header: "Họ và Tên",
    cell: ({ row }) => (
      <div
        className="w-36 truncate cursor-pointer"
        title={row.getValue("fullName")}
        onClick={() => alert(row.getValue("fullName"))}
      >
        {row.getValue("fullName")}
      </div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Số Điện Thoại",
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "status",
    header: "Trạng Thái",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      return (
        <div className="flex items-center gap-2">
          {status === "Active" ? (
            <CheckCircle className="text-green-500" size={20} />
          ) : (
            <XCircle className="text-red-500" size={20} />
          )}
          <span>{status === "Active" ? "Hoạt động" : "Không hoạt động"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày Tạo",
    cell: ({ row }) => <div>{new Date(row.getValue("createdAt")).toLocaleString()}</div>,
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
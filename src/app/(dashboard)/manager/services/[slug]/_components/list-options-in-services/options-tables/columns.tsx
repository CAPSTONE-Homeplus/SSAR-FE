"use client";

// import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { TOptionsInServiceResponse } from "@/schema/options-in-service.schema";

export const OptionColumns : ColumnDef<TOptionsInServiceResponse>[] = [
  {
    accessorKey: "name",
    header: "Tên lựa chọn",
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
    header: "Mã lựa chọn",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-sm font-mono px-2 py-1">
        {row.getValue("code")}
      </Badge>
    ),
  },
  // {
  //   accessorKey: "price",
  //   header: "Giá dịch vụ bổ sung",
  //   cell: ({ row }) => (
  //     <span className="text-sm font-medium">
  //       {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(row.getValue("price"))}
  //     </span>
  //   ),
  // },
  // {
  //   accessorKey: "note",
  //   header: "Ghi chú",
  //   cell: ({ row }) => (
  //     <span className="text-sm">{row.getValue("note") || "Không có"}</span>
  //   ),
  // },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          variant="secondary"
          className={`text-sm px-2 py-1 ${
            status === "Active" ? "bg-green-500 text-white" : "bg-gray-400 text-white"
          }`}
        >
          {status === "Active" ? "Hoạt động" : "Ngừng hoạt động"}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Ngày tạo",
  //   cell: ({ row }) => (
  //     <span className="text-sm font-medium">
  //       {new Date(row.getValue("createdAt")).toLocaleDateString("vi-VN")}
  //     </span>
  //   ),
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Ngày cập nhật",
  //   cell: ({ row }) => (
  //     <span className="text-sm font-medium">
  //       {new Date(row.getValue("updatedAt")).toLocaleDateString("vi-VN")}
  //     </span>
  //   ),
  // },
  {
    accessorKey: "isMandatory",
    header: "Bắt buộc",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isMandatory") ? "default" : "outline"}>
        {row.getValue("isMandatory") ? "Có" : "Không"}
      </Badge>
    ),
  },
  // {
  //   accessorKey: "maxQuantity",
  //   header: "Số lượng tối đa",
  //   cell: ({ row }) => <span className="text-sm">{row.getValue("maxQuantity")}</span>,
  // },
  // {
  //   accessorKey: "discount",
  //   header: "Giảm giá (%)",
  //   cell: ({ row }) => (
  //     <span className="text-sm">
  //       {row.getValue("discount")}% 
  //     </span>
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const serviceId = row.original.id;
      return (
        <Link href={`/manager/service/${serviceId}`}>
          <Edit />
        </Link>
      );
    },
  },
];
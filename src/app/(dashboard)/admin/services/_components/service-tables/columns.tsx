"use client";

import { formatPriceVND } from "@/lib/formatter";

import { ColumnDef } from "@tanstack/react-table";
import { TServiceResponse } from "@/schema/service.schema"; // Thay TStoreResponse thành TServiceResponse
import Image from "next/image";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<TServiceResponse>[] = [
  {
    accessorKey: "imageUrl",
    header: "Hình ảnh",
    cell: ({ row }) => {
      const imgSrc = row.getValue("imageUrl") as string;
      return imgSrc ? (
        <div className="relative aspect-square">
          <Image src={imgSrc} alt="Product Image" fill className="rounded-lg" />
        </div>
      ) : (
        "No Image"
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên Dịch Vụ",
    cell: ({ row }) => (
      <div
        className="w-36 truncate cursor-pointer"
        title={row.getValue("name")}
        onClick={() => alert(row.getValue("name"))} // Hiển thị tên dịch vụ khi nhấn
      >
        {row.getValue("name")}
      </div>
    ),
  },

  {
    accessorKey: "serviceCode",
    header: "Mã Dịch Vụ",
    cell: ({ row }) => <div className="">{row.getValue("serviceCode")}</div>,
  },
  {
    accessorKey: "description",
    header: "Mô Tả",
    cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => <div className="">{formatPriceVND(row.getValue("price"))}</div>,
  },
  {
    accessorKey: "discount",
    header: "Giảm Giá",
    cell: ({ row }) => <div className="">{row.getValue("discount")}%</div>,
  },
  {
    accessorKey: "duration",
    header: "Thời Gian",
    cell: ({ row }) => <div className="">{row.getValue("duration")} giờ</div>,
  },
  {
    accessorKey: "maxCapacity",
    header: "Sức Chứa",
    cell: ({ row }) => <div className="">{row.getValue("maxCapacity")}</div>,
  },
  {
    accessorKey: "status",
    header: "Trạng Thái",
    cell: ({ row }) => <div className="">{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

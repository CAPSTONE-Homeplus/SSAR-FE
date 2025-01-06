"use client";

import { formatPriceVND } from "@/lib/formatter";

import { ColumnDef } from "@tanstack/react-table";
import { TStoreResponse } from "@/schema/store.schema";
import Image from "next/image";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<TStoreResponse>[] = [
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
    header: "Tên cửa hàng",
    cell: ({ row }) => (
      <div
        className="w-36 truncate cursor-pointer"
        title={row.getValue("name")}
        onClick={() => alert(row.getValue("name"))} // Displays product name on click
      >
        {row.getValue("name")}
      </div>
    ),
  },

  {
    accessorKey: "storeCode",
    header: "Mã cửa hàng",
    cell: ({ row }) => <div className="">{row.getValue("storeCode")}</div>,
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
    cell: ({ row }) => (
      <div className="">{formatPriceVND(row.getValue("address"))}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

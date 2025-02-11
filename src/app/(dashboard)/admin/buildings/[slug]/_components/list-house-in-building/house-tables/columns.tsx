"use client";

import { ColumnDef } from "@tanstack/react-table";
import { THouseResponse } from "@/schema/house.schema"; // Đảm bảo đường dẫn schema đúng
import Image from "next/image";
import { CellAction } from "./cell-action";

import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<THouseResponse>[] = [
  {
    accessorKey: "imageUrl", // Nếu có trường ảnh trong schema của bạn
    header: "Hình ảnh",
    cell: ({ row }) => {
      const imgSrc = row.getValue("imageUrl") as string;
      return imgSrc ? (
        <div className="relative w-16 h-16 border rounded-lg overflow-hidden">
          <Image src={imgSrc} alt="House Image" fill className="object-cover" />
        </div>
      ) : (
        <span className="text-gray-400 text-sm">Không có ảnh</span>
      );
    },
  },
  {
    accessorKey: "no", // Cập nhật theo mã căn hộ
    header: "Mã căn hộ",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-sm font-mono px-2 py-1">
        {row.getValue("no")}
      </Badge>
    ),
  },
  {
    accessorKey: "status", // Trạng thái căn hộ
    header: "Trạng thái",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-sm px-2 py-1">
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "code", // Mã căn hộ
    header: "Mã căn hộ",
    cell: ({ row }) => <span className="text-sm">{row.getValue("code")}</span>,
  },
  {
    accessorKey: "bedroomCount", // Số phòng ngủ
    header: "Số phòng ngủ",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("bedroomCount")}</span>
    ),
  },
  {
    accessorKey: "bathroomCount", // Số phòng tắm
    header: "Số phòng tắm",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("bathroomCount")}</span>
    ),
  },
  {
    accessorKey: "hasBalcony", // Có ban công không
    header: "Có ban công",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.getValue("hasBalcony") ? "Có" : "Không"}
      </span>
    ),
  },
  {
    accessorKey: "squareMeters", // Diện tích
    header: "Diện tích (m²)",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("squareMeters")}</span>
    ),
  },
  {
    accessorKey: "orientation", // Hướng nhà
    header: "Hướng căn hộ",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("orientation")}</span>
    ),
  },
  {
    accessorKey: "contactTerms", // Điều kiện liên hệ
    header: "Điều kiện liên hệ",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("contactTerms")}</span>
    ),
  },
  {
    accessorKey: "occupacy", // Tình trạng cư trú
    header: "Tình trạng cư trú",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("occupacy")}</span>
    ),
  },
  // {
  //   accessorKey: "buildingId", // ID tòa nhà
  //   header: "Tòa nhà",
  //   cell: ({ row }) => (
  //     <span className="text-sm">{row.getValue("buildingId")}</span>
  //   ),
  // },
  // {
  //   accessorKey: "houseTypeId", // Loại căn hộ
  //   header: "Loại căn hộ",
  //   cell: ({ row }) => (
  //     <span className="text-sm">{row.getValue("houseTypeId")}</span>
  //   ),
  // },
  {
    id: "actions", // Các hành động
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

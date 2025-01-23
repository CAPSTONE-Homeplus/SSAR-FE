"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TAreaResponse } from "@/schema/area.schema";
import Image from "next/image";
import { CellAction } from "./cell-action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const columns: ColumnDef<TAreaResponse>[] = [
  {
    accessorKey: "imageUrl",
    header: "Hình ảnh",
    cell: ({ row }) => {
      const imgSrc = row.getValue("imageUrl") as string;
      return imgSrc ? (
        <div className="relative w-16 h-16 border rounded-lg overflow-hidden">
          <Image src={imgSrc} alt="Area Image" fill className="object-cover" />
        </div>
      ) : (
        <span className="text-gray-400 text-sm">Không có ảnh</span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên khu vực",
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
    header: "Mã khu vực",
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
    accessorKey: "address",
    header: "Địa chỉ",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="block text-sm max-w-[200px] truncate cursor-pointer hover:underline">
              {row.getValue("address")}
            </span>
          </TooltipTrigger>
          <TooltipContent>{row.getValue("address")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "contactInfo",
    header: "Liên hệ",
    cell: ({ row }) => {
      const contact = row.getValue("contactInfo") as string;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {contact.includes("@") ? (
                <Link
                  href={`mailto:${contact}`}
                  className="text-blue-600 hover:underline"
                >
                  {contact}
                </Link>
              ) : (
                <Link
                  href={`tel:${contact}`}
                  className="text-blue-600 hover:underline"
                >
                  {contact}
                </Link>
              )}
            </TooltipTrigger>
            <TooltipContent>{contact}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "areaType",
    header: "Loại khu vực",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-sm px-2 py-1">
        {row.getValue("areaType")}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

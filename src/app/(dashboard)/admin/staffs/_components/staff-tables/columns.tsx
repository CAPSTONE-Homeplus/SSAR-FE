"use client"

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  User,
  Briefcase,
  Hash,
} from "lucide-react";
import React from "react";
import { TStaffResponse } from "@/schema/staff.schema";

export const StaffColumns: ColumnDef<TStaffResponse>[] = [
  {
    accessorKey: "fullName",
    header: "Họ và Tên",
    cell: ({ row }) => {
      const fullName = row.getValue("fullName") as string;
      return (
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <User className="text-blue-500 h-5 w-5" />
          </div>
          <div>
            <div 
              className="font-semibold text-gray-800 w-44 truncate cursor-pointer hover:text-blue-600 transition-colors"
              title={fullName}
            >
              {fullName || 'Chưa cập nhật'}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return (
        <div className="flex items-center space-x-2">
          <Mail className="text-red-500 h-5 w-5" />
          <span className="text-gray-700 truncate max-w-[200px]">
            {email || 'Chưa cập nhật'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Số Điện Thoại",
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phoneNumber") as string;
      return (
        <div className="flex items-center space-x-2">
          <Phone className="text-green-500 h-5 w-5" />
          <span className="text-gray-700">
            {phoneNumber || 'Chưa cập nhật'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "jobPosition",
    header: "Vị Trí Công Việc",
    cell: ({ row }) => {
      const jobPosition = row.getValue("jobPosition") as string;
      return (
        <div className="flex items-center space-x-2">
          <Briefcase className="text-purple-500 h-5 w-5" />
          <span className="text-gray-700">
            {jobPosition || 'Chưa xác định'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Mã Nhân Viên",
    cell: ({ row }) => {
      const code = row.getValue("code") as string;
      return (
        <div className="flex items-center space-x-2">
          <Hash className="text-gray-500 h-5 w-5" />
          <span className="text-gray-700 font-mono bg-gray-100 px-2 py-1 rounded-md">
            {code || 'Chưa có mã'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng Thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex items-center space-x-2">
          {status === "Active" ? (
            <CheckCircle className="text-green-500 h-5 w-5" />
          ) : (
            <XCircle className="text-red-500 h-5 w-5" />
          )}
          <span 
            className={`font-medium ${
              status === "Active" ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status === "Active" ? "Hoạt động" : "Không hoạt động"}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Thao Tác",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <CellAction data={row.original} />
      </div>
    ),
  },
];

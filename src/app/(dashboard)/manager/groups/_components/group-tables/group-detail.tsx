/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // Import utility class để styling dễ hơn

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, data }) => {
  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">📌 Chi tiết nhóm</DialogTitle>
        </DialogHeader>

        {/* Nội dung chính */}
        <div className="grid gap-4 text-gray-700">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Tên Nhóm</p>
            <p className="text-lg font-semibold">{data.name}</p>
          </div>

          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Mã Nhóm</p>
            <p className="text-lg font-medium">{data.code}</p>
          </div>

          <div className="border-b pb-2 flex items-center gap-2">
            <p className="text-sm text-gray-500">Trạng Thái</p>
            <div className="flex items-center gap-2">
              {data.status === "Active" ? (
                <CheckCircle className="text-green-500" size={18} />
              ) : (
                <XCircle className="text-red-500" size={18} />
              )}
              <span
                className={cn(
                  "text-sm font-medium px-2 py-1 rounded-md",
                  data.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}
              >
                {data.status === "Active" ? "Hoạt động" : "Không hoạt động"}
              </span>
            </div>
          </div>

          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Ngày Tạo</p>
            <p className="text-md">{new Date(data.createdAt).toLocaleString()}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Ngày Cập Nhật</p>
            <p className="text-md">{new Date(data.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

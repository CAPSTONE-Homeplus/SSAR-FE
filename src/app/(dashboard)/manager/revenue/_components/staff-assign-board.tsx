/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { getAllOrders } from "@/apis/order";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { TaskBoard } from "@/app/(dashboard)/manager/revenue/_components/group-tables/TaskBoard";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const today = format(new Date(), "EEEE, dd/MM/yyyy", { locale: vi });

const StaffAssignBoard = () => {
  interface OrderItem {
    id: string;
    note?: string | null;
    price?: number | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    address: string;
    bookingDate?: string | null;
    employeeId?: string | null;
    employeeRating?: number | null;
    customerFeedback?: string | null;
    cleaningToolsRequired?: boolean | null;
    cleaningToolsProvided?: boolean | null;
    serviceType?: string | null;
    distanceToCustomer?: number | null;
    priorityLevel?: string | null;
    notes?: string | null;
    discountCode?: string | null;
    discountAmount?: number | null;
    totalAmount: number;
    realTimeStatus?: string | null;
    jobStartTime?: string | null;
    jobEndTime?: string | null;
    emergencyRequest: boolean;
    cleaningAreas: string[];
    itemsToClean: string[];
    estimatedArrivalTime?: string | null;
    estimatedDuration?: number | null;
    actualDuration?: number | null;
    cancellationDeadline?: string | null;
    code: string;
    timeSlotId: string;
    serviceId: string;
    userId: string;
    extraServices: string[];
    options: string[];
  }

  interface OrdersData {
    items: OrderItem[];
    totalPages: number;
  }

  const [ordersData, setOrdersData] = useState<OrdersData>({
    items: [],
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (pageParam = 1, sizeParam = 10, searchParam = "") => {
    setIsLoading(true);
    const page = pageParam;
    const size = sizeParam;
    const search = searchParam;

    const filters = { page, size, ...(search && { search }) };

    setIsLoading(true);

    try {
      const orderResponse = await getAllOrders(filters);
      const orderPayload = orderResponse?.payload || {
        items: [],
        totalPages: 0,
      };

      // Chuẩn hóa dữ liệu trước khi truyền vào TaskBoard
      const enhancedItems = orderPayload.items.map((item: any) => {
        // Make sure all properties are of the correct type
        return {
          ...item,
          id: item.id || `temp-${Math.random().toString(36).substring(2, 10)}`,
          code:
            item.code ||
            `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          customerName:
            item.customerName ||
            item.customer?.name ||
            "Khách hàng chưa xác định",
          totalAmount:
            typeof item.totalAmount === "number"
              ? item.totalAmount
              : item.total || item.amount || 0,
          createdAt:
            item.createdAt ||
            item.createTime ||
            item.createDate ||
            new Date().toISOString(),
          dueDate: item.dueDate || item.deadline || item.expectedDeliveryDate,
          items:
            typeof item.items === "number"
              ? item.items
              : Array.isArray(item.products)
              ? item.products.length
              : Array.isArray(item.orderItems)
              ? item.orderItems.length
              : undefined,
          priority: item.priority || "medium",
          assignedTo: item.assignedTo || item.assignee || item.staffName,
          status: standardizeStatus(item.status),
          // Ensure these are arrays
          extraServices: Array.isArray(item.extraServices)
            ? item.extraServices
            : [],
          cleaningAreas: Array.isArray(item.cleaningAreas)
            ? item.cleaningAreas
            : [],
          itemsToClean: Array.isArray(item.itemsToClean)
            ? item.itemsToClean
            : [],
          options: Array.isArray(item.options) ? item.options : [],
          // Make sure boolean properties are correct
          emergencyRequest: Boolean(item.emergencyRequest),
          // Ensure nullable fields
          cleaningToolsRequired:
            item.cleaningToolsRequired !== undefined
              ? Boolean(item.cleaningToolsRequired)
              : null,
          cleaningToolsProvided:
            item.cleaningToolsProvided !== undefined
              ? Boolean(item.cleaningToolsProvided)
              : null,
        };
      });

      console.log(`Đã xử lý ${enhancedItems.length} đơn hàng`);
      setOrdersData({
        items: enhancedItems,
        totalPages: orderPayload.totalPages,
      });
      setError(null);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
      setError("Đã xảy ra lỗi khi tải dữ liệu đơn hàng");
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    loadData();
  }, []);

  // Handle manual refresh
  const handleRefresh = () => {
    loadData();
  };

  // Function to standardize status
  function standardizeStatus(status: string | undefined): string {
    if (!status) return "Draft";

    const normalizedStatus = status.toLowerCase().replace(/\s+/g, "");

    switch (normalizedStatus) {
      case "draft":
      case "new":
      case "created":
      case "tạomới":
        return "Draft";

      case "pending":
      case "waiting":
      case "inreview":
      case "chờxử lý":
      case "chờduyệt":
        return "Pending";

      case "accepted":
      case "approved":
      case "inprogress":
      case "processing":
      case "đãduyệt":
      case "đangxử lý":
        return "Accepted";

      case "completed":
      case "done":
      case "finished":
      case "hoànthành":
        return "Completed";

      default:
        return "Draft";
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin h-10 w-10 text-blue-500 mx-auto" />
          <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-700 font-bold">
          Đã xảy ra lỗi khi tải dữ liệu đơn hàng
        </h3>
        <p className="text-red-600">{error}</p>
        <Button onClick={handleRefresh} className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" /> Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
          <p className="text-gray-600">
            Kéo và thả các đơn hàng giữa các cột để cập nhật trạng thái
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">{today}</span>{" "}
          {/* Hiển thị ngày tháng */}
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="flex items-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Làm mới
          </Button>
        </div>
      </div>
      <TaskBoard
        orders={ordersData.items.map((order) => ({
          id: order.id,
          code: order.code,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt || order.createdAt, // Dùng createdAt nếu không có updatedAt
          options: Array.isArray(order.options)
            ? order.options.map(String)
            : [],
          status: order.status || "Draft",
          note: order.note ?? null,
          price: order.price ?? order.totalAmount ?? null,
          address: order.address ?? "Unknown Address",
          bookingDate: order.bookingDate ?? null,
          employeeId: order.employeeId ?? null,
          extraServices: Array.isArray(order.extraServices)
            ? order.extraServices.map(String)
            : [],
          cleaningAreas: Array.isArray(order.cleaningAreas)
            ? order.cleaningAreas.map(String)
            : [],
          itemsToClean: Array.isArray(order.itemsToClean)
            ? order.itemsToClean.map(String)
            : [],
          emergencyRequest: Boolean(order.emergencyRequest),
          cleaningToolsRequired:
            order.cleaningToolsRequired !== undefined
              ? Boolean(order.cleaningToolsRequired)
              : null,
          cleaningToolsProvided:
            order.cleaningToolsProvided !== undefined
              ? Boolean(order.cleaningToolsProvided)
              : null,
          priorityLevel: order.priorityLevel ?? "Normal",
          notes: order.notes ?? null,
          discountCode: order.discountCode ?? null,
          discountAmount: order.discountAmount ?? null,
          totalAmount: order.totalAmount ?? 0,
          realTimeStatus: order.realTimeStatus ?? "Draft",
          jobStartTime: order.jobStartTime ?? null,
          jobEndTime: order.jobEndTime ?? null,
          estimatedArrivalTime: order.estimatedArrivalTime ?? null,
          estimatedDuration: order.estimatedDuration ?? null,
          actualDuration: order.actualDuration ?? null,
          cancellationDeadline: order.cancellationDeadline ?? null,
          timeSlotId: order.timeSlotId ?? "temp-1234",
          serviceId: order.serviceId ?? "temp-1234",
          userId: order.userId ?? "temp-1234",
          employeeRating: order.employeeRating ?? null,
          customerFeedback: order.customerFeedback ?? null,
          serviceType: order.serviceType ?? "General",
          distanceToCustomer: order.distanceToCustomer ?? 0,
        }))}
      />
    </div>
  );
};

export default StaffAssignBoard;

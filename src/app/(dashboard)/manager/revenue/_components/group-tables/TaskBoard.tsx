// TaskBoard.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { OrderDetailsPopup } from "@/app/(dashboard)/manager/revenue/_components/group-tables/OrderDetail";
import { useState, useRef, useEffect, useMemo } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { OrderSchema } from "@/schema/order.schema";
import { z } from "zod";

// Import the proper order type from the schema
type OrderType = z.infer<typeof OrderSchema>;

// Define the API response type
type TOrderResponse = {
  id: string;
  code?: string;
  status: string;
  customerName?: string;
  totalAmount?: number;
  createdAt?: string;
  dueDate?: string;
  items?: number;
  priority?: "high" | "medium" | "low";
  assignedTo?: string;
  employeeRating?: number | null;
  customerFeedback?: string | null;
  cleaningToolsRequired?: boolean | null; // Changed from boolean | undefined
  cleaningToolsProvided?: boolean | null; // Changed for consistency
  // Add other fields needed for the OrderDetailsPopup
  updatedAt?: string;
  address?: string;
  serviceId?: string;
  userId?: string;
  timeSlotId?: string;
  priorityLevel?: string;
  serviceType?: string;
  discountAmount?: number | null;
  discountCode?: string | null;
  emergencyRequest?: boolean;
  extraServices?: string[];
  itemsToClean?: string[];
  cleaningAreas?: string[];
  options?: string[];
  notes?: string | null;
  note?: string | null;
  price?: number | null;
  bookingDate?: string | null;
  employeeId?: string | null;
  realTimeStatus?: string | null;
  jobStartTime?: string | null;
  jobEndTime?: string | null;
  estimatedArrivalTime?: string | null;
  estimatedDuration?: number | null;
  actualDuration?: number | null;
  cancellationDeadline?: string | null;
  distanceToCustomer?: number | null;
};

// Board status types
type BoardStatus = "Draft" | "Pending" | "Accepted" | "Completed";

type TaskBoardProps = {
  orders: TOrderResponse[];
};

const TaskBoard: React.FC<TaskBoardProps> = ({ orders }) => {
  // Convert API data to OrderType compatible format using useMemo to prevent needless recalculations
  const formattedOrders = useMemo(() => orders.map((o) => ({
    id: o.id,
    code: o.code || `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    status: o.status || "Draft",
    createdAt: o.createdAt || new Date().toISOString(),
    updatedAt: o.updatedAt || new Date().toISOString(),
    address: o.address || "",
    userId: o.userId || "",
    serviceId: o.serviceId || "",
    timeSlotId: o.timeSlotId || "",
    totalAmount: o.totalAmount || 0,
    customerName: o.customerName || "Khách hàng chưa xác định",
    // Set required fields with defaults
    emergencyRequest: o.emergencyRequest || false,
    extraServices: o.extraServices || [],
    cleaningAreas: o.cleaningAreas || [], 
    itemsToClean: o.itemsToClean || [],
    options: o.options || [],
    // Nullable fields
    note: o.note || null,
    notes: o.notes || null,
    price: o.price || null,
    bookingDate: o.bookingDate || null,
    employeeId: o.employeeId || null,
    employeeRating: o.employeeRating || null,
    customerFeedback: o.customerFeedback || null,
    cleaningToolsRequired: o.cleaningToolsRequired !== undefined ? o.cleaningToolsRequired : null,
    cleaningToolsProvided: o.cleaningToolsProvided !== undefined ? o.cleaningToolsProvided : null,
    serviceType: o.serviceType || null,
    priorityLevel: o.priorityLevel || null,
    discountCode: o.discountCode || null,
    discountAmount: o.discountAmount || null,
    realTimeStatus: o.realTimeStatus || null,
    jobStartTime: o.jobStartTime || null,
    jobEndTime: o.jobEndTime || null, 
    estimatedArrivalTime: o.estimatedArrivalTime || null,
    estimatedDuration: o.estimatedDuration || null,
    actualDuration: o.actualDuration || null,
    cancellationDeadline: o.cancellationDeadline || null,
    distanceToCustomer: o.distanceToCustomer || null,
    dueDate: o.dueDate,
    items: o.items,
    priority: o.priority,
    assignedTo: o.assignedTo,
  })), [orders]);

  // Track board status separately from the order status
  const [boardData, setBoardData] = useState<{
    Draft: OrderType[];
    Pending: OrderType[];
    Accepted: OrderType[];
    Completed: OrderType[];
  }>({
    Draft: [],
    Pending: [],
    Accepted: [],
    Completed: []
  });

  // Helper function to get board status from API status
  const getBoardStatus = (status: string): BoardStatus => {
    if (["draft", "Draft"].includes(status)) return "Draft";
    if (["pending", "Pending"].includes(status)) return "Pending";
    if (["accepted", "Accepted", "in_progress", "scheduled"].includes(status)) return "Accepted";
    if (["completed", "Completed"].includes(status)) return "Completed";
    return "Draft"; // Default
  };

  // Update columns when orders change
  useEffect(() => {
    setBoardData({
      Draft: formattedOrders.filter(o => getBoardStatus(o.status) === "Draft"),
      Pending: formattedOrders.filter(o => getBoardStatus(o.status) === "Pending"),
      Accepted: formattedOrders.filter(o => getBoardStatus(o.status) === "Accepted"),
      Completed: formattedOrders.filter(o => getBoardStatus(o.status) === "Completed"),
    });
  }, [formattedOrders]); // Adding formattedOrders to dependency array

  const moveOrder = (order: OrderType, newStatus: BoardStatus) => {
    const currentStatus = getBoardStatus(order.status);
    if (currentStatus === newStatus) return;
    
    // Update the order's status
    const updatedOrder = { ...order, status: getApiStatus(newStatus) };
    
    setBoardData(prev => {
      const newBoardData = {
        ...prev,
        [currentStatus]: prev[currentStatus].filter(o => o.id !== order.id),
        [newStatus]: [...prev[newStatus], updatedOrder]
      };
      return newBoardData;
    });

    // TODO: Call API to update the order status
    console.log(`Đã chuyển đơn hàng ${order.code} từ ${currentStatus} sang ${newStatus}`);
    // updateOrderStatus(order.id, getApiStatus(newStatus));
  };

  // Helper function to get API status from board status (for API updates)
  const getApiStatus = (boardStatus: BoardStatus): string => {
    switch (boardStatus) {
      case "Draft": return "draft";
      case "Pending": return "pending";
      case "Accepted": return "accepted";
      case "Completed": return "completed";
      default: return "draft";
    }
  };

  // Status configuration
  const statusConfig = {
    Draft: { 
      label: "BẢN NHÁP", 
      bgColor: "bg-gray-100", 
      textColor: "text-gray-700",
      headerBg: "bg-gray-200"
    },
    Pending: { 
      label: "ĐANG CHỜ", 
      bgColor: "bg-yellow-50", 
      textColor: "text-yellow-800",
      headerBg: "bg-yellow-200"
    },
    Accepted: { 
      label: "ĐÃ CHẤP NHẬN", 
      bgColor: "bg-blue-50", 
      textColor: "text-blue-800",
      headerBg: "bg-blue-200"
    },
    Completed: { 
      label: "HOÀN THÀNH", 
      bgColor: "bg-green-50", 
      textColor: "text-green-800",
      headerBg: "bg-green-200"
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(boardData).map(([status, orders]) => (
          <Column 
            key={status} 
            status={status as BoardStatus} 
            orders={orders} 
            moveOrder={moveOrder}
            config={statusConfig[status as BoardStatus]}
          />
        ))}
      </div>
    </DndProvider>
  );
};

const Column: React.FC<{
  status: BoardStatus;
  orders: OrderType[];
  moveOrder: (order: OrderType, newStatus: BoardStatus) => void;
  config: { label: string; bgColor: string; textColor: string; headerBg: string };
}> = ({ status, orders, moveOrder, config }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop({
    accept: "ORDER",
    drop: (item: OrderType) => moveOrder(item, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <div 
      ref={ref} 
      className={`${config.bgColor} border rounded-lg shadow-sm overflow-hidden 
        transition-all duration-200 ${isOver ? 'ring-2 ring-blue-400' : ''}`}
    >
      <div className={`${config.headerBg} p-3 ${config.textColor}`}>
        <h2 className="font-bold text-center">{config.label}</h2>
        <div className="text-xs text-center mt-1">{orders.length} đơn hàng</div>
      </div>

      <div className="p-3 min-h-[400px] max-h-[600px] overflow-y-auto">
        {orders.length === 0 ? (
          <div className="p-4 my-2 border border-dashed rounded-lg text-gray-400 text-center">
            Không có đơn hàng
          </div>
        ) : (
          orders.map((order) => (
            <TaskCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
};

const TaskCard: React.FC<{ order: OrderType }> = ({ order }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: "ORDER",
    item: order,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Format amount
  const formatAmount = (amount?: number) => {
    if (amount === undefined) return "";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Get priority badge
  const getPriorityBadge = (priority: string | null) => {
    if (!priority) return null;
    
    const badges = {
      high: <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">Cao</span>,
      medium: <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded">Trung bình</span>,
      low: <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Thấp</span>
    };
    
    return badges[priority as keyof typeof badges] || null;
  };

  const handleClick = () => {
    // Only open popup if not dragging
    if (!isDragging) {
      setIsPopupOpen(true);
    }
  };

  drag(ref);

  // Get the customer name from custom field or use a default
  const customerName = order.serviceType
  // Get additional fields that may be part of our board extension but not in OrderType
  const dueDate = order.bookingDate;
  const items = order.code;
  const assignedTo = order.address;
  const priority = order.priorityLevel;

  return (
    <div 
      ref={ref} 
      onClick={handleClick}
      className={`p-3 my-2 bg-white border rounded-lg shadow-sm cursor-move 
        hover:shadow-md transition-all duration-200 ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}`}
    >
      <div className="flex justify-between items-start">
        <div className="font-medium text-blue-700">{order.code}</div>
        {getPriorityBadge(priority)}
      </div>

      <div className="mt-2 text-sm font-medium">{customerName}</div>
      
      {order.totalAmount && (
        <div className="mt-1 text-sm text-gray-700">
          <span className="font-medium">Tổng tiền:</span> {formatAmount(order.totalAmount)}
        </div>
      )}
      
      {items && (
        <div className="mt-1 text-sm text-gray-700">
          <span className="font-medium">Sản phẩm:</span> {items}
        </div>
      )}
      
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <div>Ngày tạo: {formatDate(order.createdAt)}</div>
        {dueDate && (
          <div>Hạn: {formatDate(dueDate)}</div>
        )}
      </div>
      
      {assignedTo && (
        <div className="mt-2 text-xs bg-gray-100 p-1 rounded text-gray-600">
          Phụ trách: {assignedTo}
        </div>
      )}
      
      {isPopupOpen && (
        <OrderDetailsPopup 
          order={order} 
          isOpen={isPopupOpen} 
          onClose={() => setIsPopupOpen(false)} 
        />
      )}
    </div>
  );
};

export default TaskBoard;
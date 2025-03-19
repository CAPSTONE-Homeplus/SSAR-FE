// components/TaskCard.tsx
"use client";

import { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { OrderType } from "@/hooks/useTaskBoard";
import OrderDetailsPopup from "@/app/(dashboard)/manager/revenue/_components/order-management/OrderDetailsPopup/OrderDetailsPopup";

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Draft": return "border-gray-300";
    case "Pending": return "border-yellow-400";
    case "Accepted": return "border-blue-500";
    case "Completed": return "border-green-500";
    case "Cancelled": return "border-red-500";
    default: return "border-gray-300";
  }
};

const getPriorityColor = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case "high": return "text-red-600 bg-red-50";
    case "medium": return "text-orange-600 bg-orange-50";
    case "low": return "text-green-600 bg-green-50";
    default: return "text-gray-600 bg-gray-50";
  }
};

interface TaskCardProps {
  order: OrderType;
  onRefresh?: () => void;
  groupId?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ order, onRefresh, groupId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: "ORDER",
    item: order,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const handleClick = () => {
    if (!isDragging) setIsPopupOpen(true);
  };

  drag(ref);

  const statusClass = getStatusColor(order.status);
  const priorityClass = getPriorityColor(order.priorityLevel || "medium");

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`p-3 my-2 bg-white border ${statusClass} rounded-lg shadow-sm cursor-move 
        hover:shadow-md transition-all duration-200 ${isDragging ? "opacity-50 scale-95" : "opacity-100"}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-semibold text-gray-700">{order.code}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${priorityClass}`}>
          {order.priorityLevel || "Medium"}
        </span>
      </div>
      <h3 className="text-md font-medium mb-1 truncate">{order.userId}</h3>
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        <span>{order.totalAmount?.toLocaleString()} đ</span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <span className="truncate text-gray-600">{order.serviceId || 0} SP</span>
        <span className="text-gray-600 truncate">{order.employeeId || "Chưa gán"}</span>
      </div>
      {isPopupOpen && (
        <OrderDetailsPopup
          order={order}
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onOrderUpdate={onRefresh}
          groupId={groupId}
        />
      )}
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTaskBoard, OrderType, BoardStatus } from "@/hooks/useTaskBoard";
import { TaskCard } from "@/app/(dashboard)/manager/revenue/_components/order-management/OrderManagement/TaskCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const statusConfig: Record<
  BoardStatus,
  { label: string; bgColor: string; textColor: string; headerBg: string }
> = {
  Draft: { label: "Đơn mới", bgColor: "bg-gray-50", textColor: "text-gray-600", headerBg: "bg-gray-100" },
  Pending: { label: "Chờ xử lý", bgColor: "bg-yellow-50", textColor: "text-yellow-600", headerBg: "bg-yellow-100" },
  Accepted: { label: "Đang thực hiện", bgColor: "bg-blue-50", textColor: "text-blue-600", headerBg: "bg-blue-100" },
  Completed: { label: "Hoàn thành", bgColor: "bg-green-50", textColor: "text-green-600", headerBg: "bg-green-100" },
  Cancelled: { label: "Đã hủy", bgColor: "bg-red-50", textColor: "text-red-600", headerBg: "bg-red-100" },
};

interface TaskBoardProps {
  orders: OrderType[];
  groupId?: string;
}

const Column = ({ status, orders, moveOrder, config, onRefresh, groupId }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(3); // Số đơn hiển thị ban đầu
  const [{ isOver }, drop] = useDrop({
    accept: "ORDER",
    drop: (item: OrderType) => moveOrder(item, status),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });
  drop(ref);

  const displayOrders = orders.slice(0, visibleCount); // Hiển thị số đơn theo visibleCount
  const hasMore = orders.length > visibleCount; // Còn đơn để hiển thị thêm
  const isExpanded = visibleCount > 3; // Đã mở rộng danh sách

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3); // Tăng thêm 3 đơn
  };

  const handleCollapse = () => {
    setVisibleCount(3); // Thu gọn về 3 đơn
  };

  return (
    <div
      ref={ref}
      className={`${config.bgColor} border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200 flex-1 ${
        orders.length === 0 ? "h-auto" : "h-[calc(100vh-8rem)]"
      } flex flex-col ${isOver ? "ring-2 ring-blue-300" : ""}`}
    >
      <div
        className={`${config.headerBg} ${config.textColor} p-3 font-semibold flex justify-between items-center shadow-sm`}
      >
        <span>{config.label}</span>
        <span className="text-xs bg-white px-2 py-1 rounded-full shadow-inner">{orders.length}</span>
      </div>
      <div className="p-4 flex-1 overflow-y-auto space-y-3">
        {displayOrders.length === 0 ? (
          <div className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-400 text-center text-sm">
            Không có đơn hàng
          </div>
        ) : (
          displayOrders.map((order: OrderType) => (
            <TaskCard key={order.id} order={order} onRefresh={onRefresh} groupId={groupId} />
          ))
        )}
      </div>
      {(hasMore || isExpanded) && (
        <div className="p-4 pt-0 flex flex-col gap-2">
          {hasMore && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full flex items-center justify-center gap-2 transition-all duration-200"
              onClick={handleShowMore}
            >
              <ChevronDown size={16} />
              Xem thêm ({Math.min(3, orders.length - visibleCount)})
            </Button>
          )}
          {isExpanded && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-full flex items-center justify-center gap-2 transition-all duration-200"
              onClick={handleCollapse}
            >
              <ChevronUp size={16} />
              Thu gọn
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export const TaskBoard: React.FC<TaskBoardProps> = ({ orders, groupId }) => {
  const { boardData, moveOrder, refreshData } = useTaskBoard(orders);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg h-[calc(100vh-4rem)]">
        {Object.entries(boardData).map(([status, columnOrders]) => (
          <Column
            key={status}
            status={status as BoardStatus}
            orders={columnOrders}
            moveOrder={moveOrder}
            config={statusConfig[status as BoardStatus]}
            onRefresh={refreshData}
            groupId={groupId}
          />
        ))}
      </div>
    </DndProvider>
  );
};
"use client"

import OrderDetailsPopup from "@/app/(dashboard)/manager/revenue/_components/group-tables/OrderDetail";
import { TOrderResponse } from "@/schema/order.schema";
import { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define the missing types
export type BoardStatus = "Draft" | "Pending" | "Accepted" | "Completed";

export type OrderType = TOrderResponse;

interface TaskBoardProps {
  orders: TOrderResponse[];
}

// Helper functions for card styling
const getStatusColor = (status: string): string => {
  switch (status) {
    case "Draft": return "border-gray-300";
    case "Pending": return "border-yellow-400";
    case "Accepted": return "border-blue-500";
    case "Completed": return "border-green-500";
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

const TaskCard: React.FC<{ order: TOrderResponse; onRefresh?: () => void }> = ({ order, onRefresh }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: "ORDER",
    item: order,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    // Only open popup if not dragging
    if (!isDragging) {
      setIsPopupOpen(true);
    }
  };

  drag(ref);

  // Get colors based on order status and priority
  const statusClass = getStatusColor(order.status);
  const priorityClass = getPriorityColor(order.priorityLevel || "medium");

  return (
    <div 
      ref={ref} 
      onClick={handleClick}
      className={`p-3 my-2 bg-white border ${statusClass} rounded-lg shadow-sm cursor-move 
        hover:shadow-md transition-all duration-200 ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}`}
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
        <span className="truncate text-gray-600">
          {order.serviceId || 0} SP
        </span>
        <span className="text-gray-600 truncate">
          {order.employeeId || 'Chưa gán'}
        </span>
      </div>
      
      {isPopupOpen && (
        <OrderDetailsPopup 
          order={order} 
          isOpen={isPopupOpen} 
          onClose={() => setIsPopupOpen(false)} 
          onOrderUpdate={onRefresh} 
        />
      )}
    </div>
  );
};

// Status configuration for columns
const statusConfig: Record<BoardStatus, { label: string; bgColor: string; textColor: string; headerBg: string }> = {
  Draft: {
    label: "Đơn mới",
    bgColor: "bg-gray-50",
    textColor: "text-gray-700",
    headerBg: "bg-gray-200"
  },
  Pending: {
    label: "Chờ xử lý",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    headerBg: "bg-yellow-200"
  },
  Accepted: {
    label: "Đang thực hiện",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    headerBg: "bg-blue-200"
  },
  Completed: {
    label: "Hoàn thành",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    headerBg: "bg-green-200"
  }
};

export const TaskBoard: React.FC<TaskBoardProps> = ({ orders }) => {
  // Group orders by status
  const [boardData, setBoardData] = useState<Record<BoardStatus, TOrderResponse[]>>(() => {
    const initialBoard: Record<BoardStatus, TOrderResponse[]> = {
      Draft: [],
      Pending: [],
      Accepted: [],
      Completed: []
    };
    
    // Distribute orders to their respective columns
    orders.forEach(order => {
      const status = order.status as BoardStatus;
      if (initialBoard[status]) {
        initialBoard[status].push(order);
      } else {
        initialBoard.Draft.push(order);
      }
    });
    
    return initialBoard;
  });
  
  // Function to move an order to a different status column
  const moveOrder = (order: OrderType, newStatus: BoardStatus) => {
    setBoardData(prev => {
      // Create copies of the data
      const newData = { ...prev };
      
      // Remove from current status
      Object.keys(newData).forEach(status => {
        newData[status as BoardStatus] = newData[status as BoardStatus].filter(o => o.id !== order.id);
      });
      
      // Add to new status
      newData[newStatus] = [...newData[newStatus], { ...order, status: newStatus }];
      
      return newData;
    });
  };
  
  // Add a refresh function
  const refreshData = () => {
    // This function will be called when an order is updated
    console.log("Refreshing data after order update");
    // You could potentially fetch new data here
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
            onRefresh={refreshData}
          />
        ))}
      </div>
    </DndProvider>
  );
};

const Column: React.FC<{
  status: BoardStatus;
  orders: TOrderResponse[];
  moveOrder: (order: OrderType, newStatus: BoardStatus) => void;
  config: { label: string; bgColor: string; textColor: string; headerBg: string };
  onRefresh?: () => void;
}> = ({ status, orders, moveOrder, config, onRefresh }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isOver }, drop] = useDrop({
    accept: "ORDER",
    drop: (item: OrderType) => {
      moveOrder(item, status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  
  drop(ref);

  return (
    <div 
      ref={ref} 
      className={`${config.bgColor} border rounded-lg shadow-sm overflow-hidden 
        transition-all duration-200 ${isOver ? 'ring-2 ring-blue-400' : ''}`}
    >
      <div className={`${config.headerBg} ${config.textColor} p-3 font-medium flex justify-between items-center`}>
        <span>{config.label}</span>
        <span className="text-xs bg-white bg-opacity-80 px-2 py-1 rounded-full">
          {orders.length}
        </span>
      </div>

      <div className="p-3 min-h-[400px] max-h-[600px] overflow-y-auto">
        {orders.length === 0 ? (
          <div className="p-4 my-2 border border-dashed rounded-lg text-gray-400 text-center">
            Không có đơn hàng
          </div>
        ) : (
          orders.map((order) => (
            <TaskCard key={order.id} order={order} onRefresh={onRefresh} />
          ))
        )}
      </div>
    </div>
  );
};
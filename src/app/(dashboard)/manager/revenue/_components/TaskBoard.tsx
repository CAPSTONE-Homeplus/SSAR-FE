"use client";

import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Input } from "@/components/ui/input";
import { getAllOrders } from "@/apis/order";

const ItemType = { ORDER: "order" };

const statuses = {
  pending: { title: "Chờ xử lý", color: "bg-blue-300 border-blue-500" },
  inProgress: { title: "Đang xử lý", color: "bg-yellow-300 border-yellow-500" },
  completed: { title: "Hoàn thành", color: "bg-green-300 border-green-500" },
};

const OrderCard = ({ order }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.ORDER,
    item: { id: order.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 m-2 shadow-lg rounded-xl border-2 ${
        statuses[order.status].color
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <h3 className="font-bold text-lg">{order.customerName}</h3>
      <p className="text-sm text-gray-800 mt-1">Mã đơn: {order.id}</p>
      <p className="text-xs mt-2 font-semibold">
        Giá trị: <span className="font-normal">{order.totalPrice} VNĐ</span>
      </p>
    </div>
  );
};

const OrderColumn = ({ status, orders, moveOrder }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType.ORDER,
    drop: (item) => moveOrder(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`w-1/3 p-4 rounded-lg shadow-md ${isOver ? "bg-gray-200" : "bg-gray-100"}`}
    >
      <h2 className="text-lg font-bold mb-3 p-2 rounded-md bg-gray-800 text-white text-center">
        {statuses[status].title}
      </h2>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

const StaffAssignBoard = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getAllOrders({ page: 1, size: 20 });
      setOrders(response.payload.items);
    };
    fetchOrders();
  }, []);

  const moveOrder = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <Input
          className="w-full p-3 border rounded-lg shadow-sm"
          placeholder="Tìm kiếm đơn hàng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex w-full p-8 gap-6">
          {Object.keys(statuses).map((status) => (
            <OrderColumn
              key={status}
              status={status}
              orders={orders.filter(
                (order) =>
                  order.status === status &&
                  order.customerName.toLowerCase().includes(search.toLowerCase())
              )}
              moveOrder={moveOrder}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default StaffAssignBoard;

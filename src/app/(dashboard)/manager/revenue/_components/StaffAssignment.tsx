/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Input } from "@/components/ui/input";
import { AvailableStaff } from "@/app/(dashboard)/manager/revenue/_components/AvailableStaff";

const ItemType = { TASK: "task" };

type TaskStatus = "pending" | "inProgress" | "completed";

interface Task {
  id: number;
  title: string;
  description: string;
  level: string;
  estimatedTime: string;
  status: TaskStatus;
  assignedTo: number[];
}

const statuses: Record<TaskStatus, { title: string; color: string }> = {
  pending: { title: "Chưa giao", color: "bg-blue-300 border-blue-500" },
  inProgress: { title: "Đang làm", color: "bg-yellow-300 border-yellow-500" },
  completed: { title: "Hoàn thành", color: "bg-green-300 border-green-500" },
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Dọn dẹp phòng khách",
    description: "Quét, lau sàn, sắp xếp đồ đạc.",
    level: "Nhẹ",
    estimatedTime: "30 phút",
    status: "pending",
    assignedTo: [],
  },
  {
    id: 2,
    title: "Vệ sinh nhà bếp",
    description: "Rửa bát, lau bếp, đổ rác.",
    level: "Trung bình",
    estimatedTime: "45 phút",
    status: "inProgress",
    assignedTo: [101],
  },
  {
    id: 3,
    title: "Lau kính",
    description: "Lau cửa kính phòng khách và ban công.",
    level: "Nhẹ",
    estimatedTime: "20 phút",
    status: "completed",
    assignedTo: [102],
  },
];

const staffList = [
  {
    id: 101,
    name: "Nguyễn Văn A",
    status: "available",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 102,
    name: "Trần Thị B",
    status: "busy",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const Task: React.FC<{ task: Task }> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.TASK,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const assignedStaff = staffList.filter((s) => task.assignedTo.includes(s.id));

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`p-4 m-2 cursor-pointer shadow-lg rounded-xl border-2 ${
        statuses[task.status].color
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-800 mt-1">{task.description}</p>
      <p className="text-xs mt-2 font-semibold">
        Mức độ: <span className="font-normal">{task.level}</span> | Thời gian:{" "}
        <span className="font-normal">{task.estimatedTime}</span>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {assignedStaff.map((s) => (
          <div
            key={s.id}
            className="flex items-center space-x-2 bg-white shadow-md p-2 rounded-lg border border-gray-300"
          >
            <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full" />
            <span className="text-sm font-medium">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TaskColumn: React.FC<{
  status: TaskStatus;
  tasks: Task[];
  moveTask: (taskId: number, newStatus: TaskStatus) => void;
}> = ({ status, tasks, moveTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType.TASK,
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`w-1/3 p-4 rounded-lg shadow-md ${
        isOver ? "bg-gray-200" : "bg-gray-100"
      }`}
    >
      <h2 className="text-lg font-bold mb-3 p-2 rounded-md bg-gray-800 text-white text-center">
        {statuses[status].title}
      </h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");

  const moveTask = (taskId: number, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <Input
          className="w-full p-3 border rounded-lg shadow-sm"
          placeholder="Tìm kiếm công việc..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex w-full p-8 gap-6">
          {Object.keys(statuses).map((status) => (
            <TaskColumn
              key={status}
              status={status as TaskStatus}
              tasks={tasks.filter(
                (task) =>
                  task.status === status &&
                  task.title.toLowerCase().includes(search.toLowerCase())
              )}
              moveTask={moveTask}
            />
          ))}

          <AvailableStaff />
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskBoard;

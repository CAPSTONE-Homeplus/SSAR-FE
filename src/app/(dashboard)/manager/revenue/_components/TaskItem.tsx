/* eslint-disable @next/next/no-img-element */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Task {
  id: string;
  name: string;
  level: "light" | "normal" | "heavy";
  status: "pending" | "in_progress" | "completed";
  assignedTo: string[];
}

interface Staff {
  id: string;
  name: string;
  status: string;
  avatar: string;
}

interface TaskItemProps {
  task: Task;
  staff: Staff[];
  onAssign: (taskId: string, staffId: string) => void;
  onMove: (taskId: string, newStatus: string) => void;
}

export default function TaskItem({ task, staff, onMove }: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id: task.id });
  const assignedStaff = staff.filter((s) => task.assignedTo.includes(s.id));

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-3 bg-white shadow-md rounded-lg flex flex-col space-y-2 cursor-pointer"
      style={{ transform: CSS.Transform.toString(transform) }}
    >
      <h3 className="font-semibold text-gray-800">{task.name}</h3>

      <div className="flex space-x-2">
        {assignedStaff.map((s) => (
          <div key={s.id} className="flex items-center space-x-1">
            <img src={s.avatar} alt={s.name} className="w-6 h-6 rounded-full" />
            <span className="text-sm">{s.name}</span>
          </div>
        ))}
      </div>

      {task.status !== "completed" && (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => onMove(task.id, task.status === "pending" ? "in_progress" : "completed")}
        >
          {task.status === "pending" ? "Bắt đầu" : "Hoàn thành"}
        </button>
      )}
    </div>
  );
}

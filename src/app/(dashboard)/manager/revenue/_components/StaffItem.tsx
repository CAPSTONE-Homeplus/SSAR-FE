import { useDraggable } from "@dnd-kit/core";

interface Staff {
  id: number;
  name: string;
  status: "free" | "busy";
}

export default function StaffItem({ staff }: { staff: Staff }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: staff.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-4 border rounded-lg shadow-md cursor-pointer bg-white"
      style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined }}
    >
      <p className="font-semibold">{staff.name}</p>
      <p className="text-sm text-gray-500">{staff.status === "free" ? "Rảnh" : "Đang làm"}</p>
    </div>
  );
}

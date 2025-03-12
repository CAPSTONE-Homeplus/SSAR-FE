
const staffList = [
    { id: 101, name: "Nguyễn Văn A", status: "available", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 102, name: "Trần Thị B", status: "busy", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  ];
  

export const AvailableStaff: React.FC = () => {
    const availableStaff = staffList.filter((s) => s.status === "available");
  
    return (
      <div className="w-1/4 p-4 rounded-lg shadow-md bg-white">
        <h2 className="text-lg font-bold mb-3 p-2 bg-green-500 text-white text-center rounded-md">Nhân viên rảnh</h2>
        {availableStaff.map((staff) => (
          <div key={staff.id} className="flex items-center space-x-3 bg-gray-100 p-2 rounded-lg border border-gray-300 shadow-sm mb-2">
            <img src={staff.avatar} alt={staff.name} className="w-10 h-10 rounded-full" />
            <span className="text-sm font-medium">{staff.name}</span>
          </div>
        ))}
      </div>
    );
  };
  
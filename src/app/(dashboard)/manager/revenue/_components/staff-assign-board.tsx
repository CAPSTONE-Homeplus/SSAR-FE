/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-async-client-component */

import { searchParamsCache } from "@/lib/searchparams";
import { getAllOrders } from "@/apis/order";
import TaskBoard from "@/app/(dashboard)/manager/revenue/_components/group-tables/TaskBoard";

const StaffAssignBoard = async () => {
  const page = searchParamsCache.get("page") || 1;
  const search = searchParamsCache.get("search");
  const size = searchParamsCache.get("size") || 10;

  const filters = { page, size, ...(search && { search }) };
  
  try {
    const orderResponse = await getAllOrders(filters);
    const orderPayload = orderResponse?.payload || { items: [], totalPages: 0 };
    
    // Chuẩn hóa dữ liệu trước khi truyền vào TaskBoard
    const enhancedItems = orderPayload.items.map((item: any) => {
      // Make sure all properties are of the correct type
      return {
        ...item,
        id: item.id || `temp-${Math.random().toString(36).substring(2, 10)}`,
        code: item.code || `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        customerName: item.customerName || item.customer?.name || "Khách hàng chưa xác định",
        totalAmount: typeof item.totalAmount === 'number' ? item.totalAmount : 
                    (item.total || item.amount || 0),
        createdAt: item.createdAt || item.createTime || item.createDate || new Date().toISOString(),
        dueDate: item.dueDate || item.deadline || item.expectedDeliveryDate,
        items: typeof item.items === 'number' ? item.items : 
               (Array.isArray(item.products) ? item.products.length : 
               (Array.isArray(item.orderItems) ? item.orderItems.length : undefined)),
        priority: item.priority || "medium",
        assignedTo: item.assignedTo || item.assignee || item.staffName,
        status: standardizeStatus(item.status),
        // Ensure these are arrays
        extraServices: Array.isArray(item.extraServices) ? item.extraServices : [],
        cleaningAreas: Array.isArray(item.cleaningAreas) ? item.cleaningAreas : [],
        itemsToClean: Array.isArray(item.itemsToClean) ? item.itemsToClean : [],
        options: Array.isArray(item.options) ? item.options : [],
        // Make sure boolean properties are correct
        emergencyRequest: Boolean(item.emergencyRequest),
        // Ensure nullable fields
        cleaningToolsRequired: item.cleaningToolsRequired !== undefined ? 
                              Boolean(item.cleaningToolsRequired) : null,
        cleaningToolsProvided: item.cleaningToolsProvided !== undefined ? 
                              Boolean(item.cleaningToolsProvided) : null
      };
    });

    console.log(`Đã xử lý ${enhancedItems.length} đơn hàng`);
    
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <p className="text-gray-600">Kéo và thả các đơn hàng giữa các cột để cập nhật trạng thái</p>
        <TaskBoard orders={enhancedItems} />
      </div>
    );
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-700 font-bold">Đã xảy ra lỗi khi tải dữ liệu đơn hàng</h3>
        <p className="text-red-600">Vui lòng thử lại sau hoặc liên hệ quản trị viên hệ thống.</p>
      </div>
    );
  }
};

// Hàm chuẩn hóa status từ API để phù hợp với 4 trạng thái
function standardizeStatus(status: string | undefined): string {
  if (!status) return "Draft";
  
  // Chuẩn hóa status (chuyển thành lowercase và loại bỏ dấu cách)
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '');
  
  // Map các status có thể có từ API vào 4 trạng thái chính
  switch (normalizedStatus) {
    case 'draft':
    case 'new':
    case 'created':
    case 'tạomới':
      return "Draft";
      
    case 'pending':
    case 'waiting':
    case 'inreview':
    case 'chờxử lý':
    case 'chờduyệt':
      return "Pending";
      
    case 'accepted':
    case 'approved':
    case 'inprogress':
    case 'processing':
    case 'đãduyệt':
    case 'đangxử lý':
      return "Accepted";
      
    case 'completed':
    case 'done':
    case 'finished':
    case 'hoànthành':
      return "Completed";
      
    default:
      // Nếu không khớp với bất kỳ trạng thái nào, mặc định là Draft
      return "Draft";
  }
}

export default StaffAssignBoard;
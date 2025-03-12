import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, User, Clipboard, DollarSign, Tag, Package, CheckCircle, ShieldAlert, Wrench } from "lucide-react";
import { format } from 'date-fns';
import { z } from 'zod';
import { OrderSchema } from '@/schema/order.schema';

type OrderType = z.infer<typeof OrderSchema>;

interface OrderDetailsPopupProps {
  order: OrderType | null;
  isOpen: boolean;
  onClose: () => void;
}

// Hàm định dạng tiền tệ VND
const formatCurrency = (amount: number | null | undefined) => {
  if (amount === null || amount === undefined) return 'N/A';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Hàm định dạng ngày giờ
const formatDateTime = (dateString: string | null | undefined) => {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  } catch {
    return dateString;
  }
};

// Hàm lấy màu cho trạng thái
const getStatusColor = (status: string) => {
  const statusMap: Record<string, string> = {
    'draft': 'bg-gray-100 text-gray-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'accepted': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
    'in_progress': 'bg-indigo-100 text-indigo-800',
    'scheduled': 'bg-purple-100 text-purple-800',
  };
  
  return statusMap[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

// Hàm lấy màu cho mức độ ưu tiên
const getPriorityColor = (priority: string | null | undefined) => {
  if (!priority) return 'bg-gray-100 text-gray-800';
  
  const priorityMap: Record<string, string> = {
    'high': 'bg-red-100 text-red-800',
    'medium': 'bg-orange-100 text-orange-800',
    'low': 'bg-green-100 text-green-800',
  };
  
  return priorityMap[priority.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

export const OrderDetailsPopup: React.FC<OrderDetailsPopupProps> = ({ order, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!order) return null;
  
  const statusClass = getStatusColor(order.status);
  const priorityClass = getPriorityColor(order.priorityLevel || '');
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DialogTitle className="text-xl font-bold text-blue-800">Đơn hàng #{order.code}</DialogTitle>
              <Badge className={statusClass}>{order.status}</Badge>
              {order.emergencyRequest && (
                <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                  <ShieldAlert size={14} />
                  Khẩn cấp
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-500">
              ID: {order.id.substring(0, 8)}...
            </div>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="services">Dịch vụ</TabsTrigger>
            <TabsTrigger value="scheduling">Lịch trình</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Thông tin chính */}
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Clipboard size={18} />
                Thông tin chính
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Khách hàng</div>
                    <div className="font-medium">{order.userId || 'N/A'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-green-600" />
                  <div>
                    <div className="text-sm text-gray-500">Nhân viên</div>
                    <div className="font-medium">{order.employeeId || 'Chưa phân công'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-purple-600" />
                  <div>
                    <div className="text-sm text-gray-500">Ngày tạo</div>
                    <div className="font-medium">{formatDateTime(order.createdAt)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-600" />
                  <div>
                    <div className="text-sm text-gray-500">Cập nhật</div>
                    <div className="font-medium">{formatDateTime(order.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Thông tin thanh toán */}
            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <DollarSign size={18} />
                Thông tin thanh toán
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Giá gốc</div>
                  <div className="font-medium">{formatCurrency(order.price)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Tổng thanh toán</div>
                  <div className="font-bold text-lg text-green-700">{formatCurrency(order.totalAmount)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Mã giảm giá</div>
                  <div className="font-medium">{order.discountCode || 'Không có'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Giảm giá</div>
                  <div className="font-medium text-red-600">{formatCurrency(order.discountAmount)}</div>
                </div>
              </div>
            </div>
            
            {/* Ghi chú */}
            {(order.note || order.notes) && (
              <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                  <Tag size={18} />
                  Ghi chú
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{order.note || order.notes}</p>
              </div>
            )}
            
            {/* Đánh giá khách hàng */}
            {(order.customerFeedback || order.employeeRating) && (
              <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} />
                  Đánh giá
                </h3>
                {order.customerFeedback && (
                  <div className="mb-2">
                    <div className="text-sm text-gray-500">Phản hồi khách hàng</div>
                    <p className="text-gray-700">{order.customerFeedback}</p>
                  </div>
                )}
                {order.employeeRating && (
                  <div>
                    <div className="text-sm text-gray-500">Đánh giá nhân viên</div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < order.employeeRating! ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-gray-700 font-medium">{order.employeeRating}/5</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="services" className="space-y-6">
            {/* Thông tin dịch vụ */}
            <div className="bg-indigo-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
                <Package size={18} />
                Thông tin dịch vụ
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Loại dịch vụ</div>
                  <div className="font-medium">{order.serviceType || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">ID Dịch vụ</div>
                  <div className="font-medium">{order.serviceId}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Mức độ ưu tiên</div>
                  <Badge className={priorityClass}>{order.priorityLevel || 'Bình thường'}</Badge>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Khoảng cách</div>
                  <div className="font-medium">{order.distanceToCustomer ? `${order.distanceToCustomer} km` : 'N/A'}</div>
                </div>
              </div>
            </div>
            
            {/* Dụng cụ vệ sinh */}
            <div className="bg-orange-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                <Wrench size={18} />
                Dụng cụ vệ sinh
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Yêu cầu dụng cụ</div>
                  <div className="font-medium">{order.cleaningToolsRequired ? 'Có' : 'Không'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Cung cấp dụng cụ</div>
                  <div className="font-medium">{order.cleaningToolsProvided ? 'Có' : 'Không'}</div>
                </div>
              </div>
            </div>
            
            {/* Khu vực vệ sinh */}
            {order.cleaningAreas.length > 0 && (
              <div className="bg-teal-50 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-teal-800 mb-3">Khu vực vệ sinh</h3>
                <div className="flex flex-wrap gap-2">
                  {order.cleaningAreas.map((area, index) => (
                    <Badge key={index} className="bg-teal-100 text-teal-800">{area}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Đồ cần vệ sinh */}
            {order.itemsToClean.length > 0 && (
              <div className="bg-cyan-50 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-cyan-800 mb-3">Đồ cần vệ sinh</h3>
                <div className="flex flex-wrap gap-2">
                  {order.itemsToClean.map((item, index) => (
                    <Badge key={index} className="bg-cyan-100 text-cyan-800">{item}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Dịch vụ thêm */}
            {order.extraServices.length > 0 && (
              <div className="bg-pink-50 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-pink-800 mb-3">Dịch vụ thêm</h3>
                <div className="flex flex-wrap gap-2">
                  {order.extraServices.map((service, index) => (
                    <Badge key={index} className="bg-pink-100 text-pink-800">{service}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tùy chọn khác */}
            {order.options.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">Tùy chọn khác</h3>
                <div className="flex flex-wrap gap-2">
                  {order.options.map((option, index) => (
                    <Badge key={index} className="bg-gray-200 text-gray-800">{option}</Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="scheduling" className="space-y-6">
            {/* Thông tin lịch trình */}
            <div className="bg-violet-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-violet-800 mb-3 flex items-center gap-2">
                <Clock size={18} />
                Thông tin lịch trình
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Ngày đặt lịch</div>
                  <div className="font-medium">{formatDateTime(order.bookingDate)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">ID Khung giờ</div>
                  <div className="font-medium">{order.timeSlotId}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Thời gian ước tính</div>
                  <div className="font-medium">
                    {order.estimatedDuration ? `${order.estimatedDuration} phút` : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Thời gian thực tế</div>
                  <div className="font-medium">
                    {order.actualDuration ? `${order.actualDuration} phút` : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chi tiết thời gian */}
            <div className="bg-emerald-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-emerald-800 mb-3">Chi tiết thời gian</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="text-gray-700">Thời gian đến dự kiến</div>
                  </div>
                  <div className="font-medium">{formatDateTime(order.estimatedArrivalTime)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-gray-700">Thời gian bắt đầu</div>
                  </div>
                  <div className="font-medium">{formatDateTime(order.jobStartTime)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="text-gray-700">Thời gian kết thúc</div>
                  </div>
                  <div className="font-medium">{formatDateTime(order.jobEndTime)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="text-gray-700">Hạn chót hủy</div>
                  </div>
                  <div className="font-medium">{formatDateTime(order.cancellationDeadline)}</div>
                </div>
              </div>
            </div>
            
            {/* Địa chỉ */}
            <div className="bg-stone-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
                <MapPin size={18} />
                Địa chỉ
              </h3>
              <div className="text-gray-700">{order.address}</div>
            </div>
            
            {/* Trạng thái thực */}
            <div className="bg-amber-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-amber-800 mb-3">Trạng thái thực</h3>
              <Badge className={getStatusColor(order.realTimeStatus || order.status)}>
                {order.realTimeStatus || order.status}
              </Badge>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" onClick={onClose}>Đóng</Button>
          <div className="flex gap-2">
            <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
              Chỉnh sửa
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Cập nhật trạng thái
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsPopup;
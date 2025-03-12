import React, { useState, useEffect } from 'react';
import { useSignalR } from '@/hooks/useNotifications';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'; 

const NotificationComponent = () => {
  const { notifications, connectionStatus, connectionId } = useSignalR();
  const [unreadCount, setUnreadCount] = useState(0);

  // Cập nhật số thông báo chưa đọc khi có thông báo mới
  useEffect(() => {
    setUnreadCount(notifications.length);
  }, [notifications.length]);

  // Đánh dấu tất cả là đã đọc
  const markAsRead = () => {
    setUnreadCount(0);
  };

  // Sắp xếp thông báo mới nhất lên đầu
  const sortedNotifications = [...notifications].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium leading-none">Thông báo</h4>
          <Button variant="ghost" size="sm" onClick={markAsRead}>
            Đánh dấu đã đọc
          </Button>
        </div>
        <Separator />
        
        {/* Hiển thị trạng thái kết nối */}
        <div className="my-2">
          <div className="flex items-center text-xs text-gray-500">
            <span>Trạng thái: </span>
            <span className={`ml-1 px-1.5 py-0.5 rounded-sm text-xs font-medium ${
              connectionStatus === 'connected' ? 'bg-green-100 text-green-800' : 
              connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {connectionStatus === 'connected' ? 'Đã kết nối' : 
               connectionStatus === 'connecting' ? 'Đang kết nối' : 'Ngắt kết nối'}
            </span>
          </div>
          {connectionId && (
            <div className="text-xs text-gray-500 mt-1">
              ID: <span className="font-mono">{connectionId}</span>
            </div>
          )}
        </div>
        
        <Separator />
        
        {/* Danh sách thông báo */}
        <div className="mt-2 max-h-60 overflow-y-auto space-y-2">
          {sortedNotifications.length > 0 ? (
            sortedNotifications.map((notification, index) => (
              <div key={index} className="text-sm p-2 rounded hover:bg-gray-50">
                <p>{notification.message}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs ${
                    notification.type === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {notification.type === 'all' ? 'Tất cả' : 'User'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(notification.timestamp)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 py-2">Không có thông báo mới.</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const formatTimeAgo = (date: number | Date) => {
  const now = new Date();
  const timestamp = typeof date === 'number' ? date : date.getTime(); 
  const diffInSeconds = Math.floor((now.getTime() - timestamp) / 1000); 

  if (diffInSeconds < 60) return 'vừa xong';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} ngày trước`;
  
  return new Date(timestamp).toLocaleDateString();
};


export default NotificationComponent;
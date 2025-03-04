// import React, { useEffect, useState } from "react";
// import { Bell } from "lucide-react"; // Sử dụng icon chuông từ Lucide
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Badge } from "@/components/ui/badge";
// import io from "socket.io-client";
// import { Separator } from "@/components/ui/separator";

// const socket = io("http://localhost:3001"); // Kết nối đến server Socket.IO

// const NotificationBell = () => {
//   const [notifications, setNotifications] = useState<string[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);

//   useEffect(() => {
//     // Lắng nghe sự kiện "new-notification" từ server
//     socket.on("new-notification", (message: string) => {
//       setNotifications((prev) => [message, ...prev]);
//       setUnreadCount((prev) => prev + 1);
//     });

//     // Dọn dẹp khi component unmount
//     return () => {
//       socket.off("new-notification");
//     };
//   }, []);

//   const markAsRead = () => {
//     setUnreadCount(0); // Đánh dấu tất cả thông báo là đã đọc
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative">
//           <Bell className="h-5 w-5" />
//           {unreadCount > 0 && (
//             <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0">
//               {unreadCount}
//             </Badge>
//           )}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80">
//         <div className="flex justify-between items-center mb-2">
//           <h4 className="font-medium leading-none">Thông báo</h4>
//           <Button variant="ghost" size="sm" onClick={markAsRead}>
//             Đánh dấu đã đọc
//           </Button>
//         </div>
//         <Separator />
//         <div className="mt-2 space-y-2">
//           {notifications.length > 0 ? (
//             notifications.map((notification, index) => (
//               <div key={index} className="text-sm">
//                 {notification}
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">Không có thông báo mới.</p>
//           )}
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default NotificationBell;

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Pusher from "pusher-js";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Kết nối đến Pusher
    const pusher = new Pusher("ad735f18e64dc9122570", {
        cluster: "ap1",
      });

    // Đăng ký kênh và lắng nghe sự kiện
    const channel = pusher.subscribe("notifications");
    channel.bind("new-order", (data: { message: string }) => {
      setNotifications((prev) => [data.message, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    // Dọn dẹp khi component unmount
    return () => {
      pusher.unsubscribe("notifications");
    };
  }, []);

  const markAsRead = () => {
    setUnreadCount(0); // Đánh dấu tất cả thông báo là đã đọc
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0">
              {unreadCount}
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
        <div className="mt-2 space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="text-sm">
                {notification}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Không có thông báo mới.</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
import * as signalR from "@microsoft/signalr";
import { useState, useEffect, useRef } from "react";

export type Notification = {
  message: string;
  type: "all" | "Manager" | "Admin" | "User";
  timestamp: Date;
};

// Biến static để theo dõi kết nối toàn cục
let globalConnection: signalR.HubConnection | null = null;
let connectionCounter = 0;

export const useSignalR = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connectionId, setConnectionId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">("disconnected");
  
  // Sử dụng useRef để theo dõi liệu component này đã đăng ký event listeners chưa
  const hasRegisteredListeners = useRef(false);
  
  // ID riêng cho mỗi instance của hook
  const instanceId = useRef(++connectionCounter);

  useEffect(() => {
    const initializeConnection = async () => {
      try {
        // Nếu đã có kết nối toàn cục, sử dụng lại
        if (globalConnection) {
          console.log(`[Instance ${instanceId.current}] Reusing existing SignalR connection`);
          
          // Chỉ đăng ký listeners nếu chưa làm điều đó
          if (!hasRegisteredListeners.current) {
            registerEventListeners(globalConnection);
            hasRegisteredListeners.current = true;
          }
          
          // Kiểm tra trạng thái kết nối hiện tại trước khi thực hiện hành động
          const currentState = globalConnection.state;
          
          if (currentState === signalR.HubConnectionState.Connected) {
            // Nếu đã kết nối, chỉ cần cập nhật state
            console.log(`[Instance ${instanceId.current}] Connection already in Connected state`);
            setConnectionId(globalConnection.connectionId || null);
            setConnectionStatus("connected");
          } 
          else if (currentState === signalR.HubConnectionState.Disconnected) {
            // Chỉ khởi động lại nếu đang trong trạng thái Disconnected
            console.log(`[Instance ${instanceId.current}] Connection in Disconnected state, starting...`);
            setConnectionStatus("connecting");
            await globalConnection.start();
            setConnectionId(globalConnection.connectionId || null);
            setConnectionStatus("connected");
          }
          else if (currentState === signalR.HubConnectionState.Connecting) {
            // Đang kết nối, chỉ cần cập nhật state
            console.log(`[Instance ${instanceId.current}] Connection is currently Connecting`);
            setConnectionStatus("connecting");
          }
          else if (currentState === signalR.HubConnectionState.Reconnecting) {
            // Đang kết nối lại, chỉ cần cập nhật state
            console.log(`[Instance ${instanceId.current}] Connection is currently Reconnecting`);
            setConnectionStatus("connecting");
          }
          
          return;
        }
        
        setConnectionStatus("connecting");
        console.log(`[Instance ${instanceId.current}] Creating new SignalR connection`);

        const accessToken = localStorage.getItem("accessToken") || "";
        console.log("Access Token:", accessToken);

        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl("https://homeclean.onrender.com/homeCleanHub", {
            accessTokenFactory: () => accessToken,
            transport: signalR.HttpTransportType.WebSockets,
          })
          .withAutomaticReconnect()
          .build();

        // Lưu kết nối vào biến toàn cục
        globalConnection = newConnection;
        
        // Đăng ký event listeners
        registerEventListeners(newConnection);
        hasRegisteredListeners.current = true;

        // Bắt sự kiện khi kết nối thành công
        newConnection.onreconnected((connectionId) => {
          console.log(`[Instance ${instanceId.current}] SignalR connection reconnected with ID:`, connectionId);
          setConnectionId(connectionId || null);
          setConnectionStatus("connected");
        });

        // Bắt sự kiện khi đang kết nối lại
        newConnection.onreconnecting((error) => {
          console.log(`[Instance ${instanceId.current}] SignalR connection reconnecting:`, error);
          setConnectionStatus("connecting");
        });

        // Bắt sự kiện khi kết nối đóng
        newConnection.onclose((error) => {
          console.error(`[Instance ${instanceId.current}] SignalR connection closed:`, error);
          setConnectionStatus("disconnected");
        });

        await newConnection.start();
        setConnectionId(newConnection.connectionId || null);
        setConnectionStatus("connected");

        console.log(`[Instance ${instanceId.current}] Connected to SignalR Hub with ID:`, newConnection.connectionId);
      } catch (err) {
        console.error(`[Instance ${instanceId.current}] Error establishing SignalR connection:`, err);
        setConnectionStatus("error");
        
        // Nếu lỗi xảy ra khi tạo kết nối mới, đặt lại biến toàn cục để lần sau có thể thử lại
        if (!globalConnection || globalConnection.state === signalR.HubConnectionState.Disconnected) {
          globalConnection = null;
        }
      }
    };

    const registerEventListeners = (connection: signalR.HubConnection) => {
      console.log(`[Instance ${instanceId.current}] Registering event listeners`);
      
      // Để đảm bảo không đăng ký trùng lặp, trước tiên xóa tất cả các listeners cũ
      connection.off("ReceiveNotificationToAll");
      connection.off("ReceiveNotificationToUser");
      
      connection.on("ReceiveNotificationToAll", (message: string) => {
        console.log(`[Instance ${instanceId.current}] Received Notification (All):`, message);
        setNotifications((prev) => [
          ...prev,
          { message, type: "all", timestamp: new Date() },
        ]);
      });

      connection.on("ReceiveNotificationToUser", (message: string) => {
        console.log(`[Instance ${instanceId.current}] Received Notification (User):`, message);
        setNotifications((prev) => [
          ...prev,
          { message, type: "Admin", timestamp: new Date() },
        ]);
      });
    };

    initializeConnection();

    // Cleanup function
    return () => {
      console.log(`[Instance ${instanceId.current}] Component unmounting`);
      
      // Không stop connection khi unmount, chỉ bỏ đăng ký listeners của component này
      if (globalConnection) {
        console.log(`[Instance ${instanceId.current}] Removing event listeners`);
        globalConnection.off("ReceiveNotificationToAll");
        globalConnection.off("ReceiveNotificationToUser");
        hasRegisteredListeners.current = false;
      }
    };
  }, []); // Empty dependency array để chỉ chạy một lần khi component mount

  return { 
    connection: globalConnection, 
    notifications, 
    connectionId, 
    connectionStatus,
    // Thêm hàm để xóa thông báo 
    clearNotifications: () => setNotifications([])
  };
};
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useState, FormEvent } from "react";
// import { Paperclip, Mic, CornerDownLeft, MessageCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { ChatMessageList } from "@/components/ui/chat-message-list";
// import { ChatInput } from "@/app/(landing)/homeplus/chat/chat-input";
// import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/app/(landing)/homeplus/chat/chat-bubble";

// export function ChatMessageListDemo() {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       content: "Hello! How can I help you today?",
//       sender: "ai",
//     },
//   ]);

//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false); // Trạng thái mở/đóng chatbox

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = {
//       id: messages.length + 1,
//       content: input,
//       sender: "user",
//     };

//     // Cập nhật tin nhắn ngay lập tức trước khi gọi API
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const updatedMessages = [...messages, userMessage];

//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ messages: updatedMessages }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText);
//       }

//       const data = await response.json();

//       if (data.choices && data.choices.length > 0) {
//         const aiMessage = {
//           id: messages.length + 2,
//           content: data.choices[0].message.content,
//           sender: "ai",
//         };

//         setMessages((prev) => [...prev, aiMessage]);
//       }
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//       setMessages((prev) => [
//         ...prev,
//         { id: messages.length + 2, content: "⚠️ Lỗi khi gọi API Gemini", sender: "ai" },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-5 right-5 flex flex-col items-end gap-2">
//       {!isChatOpen && (
//         <button
//           onClick={() => setIsChatOpen(true)}
//           className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
//         >
//           <MessageCircle size={28} />
//         </button>
//       )}

//       {isChatOpen && (
//         <div className="max-w-96 h-[400px] border bg-white shadow-lg rounded-lg flex flex-col">
//           <div className="p-4 border-b flex justify-between items-center bg-gray-100">
//             <span className="font-semibold">Chat với AI</span>
//             <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-gray-700">
//               ✖
//             </button>
//           </div>

//           <div className="flex-1 overflow-hidden">
//             <ChatMessageList>
//               {messages.map((message) => (
//                 <ChatBubble key={message.id} variant={message.sender === "user" ? "sent" : "received"}>
//                   <ChatBubbleAvatar
//                     className="h-8 w-8 shrink-0"
//                     src={
//                       message.sender === "user"
//                         ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
//                         : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
//                     }
//                     fallback={message.sender === "user" ? "US" : "AI"}
//                   />
//                   <ChatBubbleMessage variant={message.sender === "user" ? "sent" : "received"}>
//                     {message.content}
//                   </ChatBubbleMessage>
//                 </ChatBubble>
//               ))}

//               {isLoading && (
//                 <ChatBubble variant="received">
//                   <ChatBubbleAvatar
//                     className="h-8 w-8 shrink-0"
//                     src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
//                     fallback="AI"
//                   />
//                   <ChatBubbleMessage isLoading />
//                 </ChatBubble>
//               )}
//             </ChatMessageList>
//           </div>

//           <div className="p-4 border-t">
//             <form onSubmit={handleSubmit} className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
//               <ChatInput
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type your message..."
//                 className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
//               />
//               <div className="flex items-center p-3 pt-0 justify-between">
//                 <Button type="submit" size="sm" className="ml-auto gap-1.5">
//                   Send Message
//                   <CornerDownLeft className="size-3.5" />
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect, FormEvent } from "react";
import { MessageCircle, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/app/(landing)/homeplus/chat/chat-bubble";
import { ChatInput } from "@/app/(landing)/homeplus/chat/chat-input";

export function ChatMessageListDemo() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Tự động ẩn tin nhắn chào sau 5 giây nếu chưa mở chat
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    setShowWelcome(false); // Ẩn tin nhắn chào khi mở chat
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const updatedMessages = [...messages, userMessage];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      if (data.choices?.length > 0) {
        const aiMessage = {
          id: messages.length + 2,
          content: data.choices[0].message.content,
          sender: "ai",
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          content: "⚠️ Lỗi khi gọi API Gemini",
          sender: "ai",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end gap-2">
      {showWelcome && (
        <div
          className="absolute -top-6 left-[-170px] bg-gradient-to-r from-purple-500 to-pink-500 
               text-white px-3 py-1 rounded-md shadow-md text-pretty font-extralight 
               animate-fade-in"
          style={{ whiteSpace: "nowrap", maxWidth: "200px" }}
        >
          Bạn cần tôi giúp gì không?
        </div>
      )}

      {/* Nút icon chat */}
      {!isChatOpen && (
        <button
          onClick={handleOpenChat}
          className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chatbox */}
      {isChatOpen && (
        <div className="max-w-96 h-[400px] border bg-white shadow-lg rounded-lg flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-gray-100">
            <span className="font-semibold">Chat với AI</span>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <ChatMessageList>
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  variant={message.sender === "user" ? "sent" : "received"}
                >
                  <ChatBubbleAvatar
                    className="h-8 w-8 shrink-0"
                    src={
                      message.sender === "user"
                        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
                        : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                    }
                    fallback={message.sender === "user" ? "US" : "AI"}
                  />
                  <ChatBubbleMessage
                    variant={message.sender === "user" ? "sent" : "received"}
                  >
                    {message.content}
                  </ChatBubbleMessage>
                </ChatBubble>
              ))}

              {isLoading && (
                <ChatBubble variant="received">
                  <ChatBubbleAvatar
                    className="h-8 w-8 shrink-0"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                    fallback="AI"
                  />
                  <ChatBubbleMessage isLoading />
                </ChatBubble>
              )}
            </ChatMessageList>
          </div>

          <div className="p-4 border-t">
            <form
              onSubmit={handleSubmit}
              className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
            >
              <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0 justify-between">
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Gửi tin nhắn
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

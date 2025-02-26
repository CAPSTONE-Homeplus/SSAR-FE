"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_OPENAI_API_KEY`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: newMessages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      }),
    });

    const data = await response.json();
    setMessages([...newMessages, { text: data.choices[0].message.content, sender: "bot" }]);
  };

  return (
    <div className="fixed bottom-5 right-5">
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="p-4 bg-blue-500 text-white rounded-full">
          Chat với chúng tôi
        </Button>
      )}
      {isOpen && (
        <Card className="w-80 bg-white shadow-lg p-4">
          <CardContent className="h-60 overflow-y-auto border-b border-gray-200">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 text-${msg.sender === "user" ? "right" : "left"}`}>
                <span className={`p-2 rounded-md inline-block ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </CardContent>
          <div className="flex items-center gap-2 mt-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập tin nhắn..." className="flex-grow" />
            <Button onClick={handleSend} className="p-2 bg-green-500 text-white rounded-full">
              <Send size={16} />
            </Button>
          </div>
          <Button onClick={() => setIsOpen(false)} className="mt-2 text-red-500">Đóng</Button>
        </Card>
      )}
    </div>
  );
}

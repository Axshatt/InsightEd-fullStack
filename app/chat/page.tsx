"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface Message {
  sender: "bot" | "user";
  text: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hi! I’m InsightEd. Tell me your marks or ask me anything about your studies.",
    },
  ]);
  const [input, setInput] = useState("");
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    chatWindowRef.current?.scrollTo({
      top: chatWindowRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

 const sendMessage = async () => {
  if (!input.trim()) return;

  const userMsg: Message = { sender: "user", text: input.trim() };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");

  // Add "thinking" message
  const thinkingMsg: Message = { sender: "bot", text: "⏳ Thinking..." };
  setMessages((prev) => [...prev, thinkingMsg]);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.text }),
    });

    const data = await res.json();

    // Replace the "thinking" message with AI response
    setMessages((prev) => [
      ...prev.slice(0, -1),
      { sender: "bot", text: data.reply },
    ]);
  } catch (err) {
    setMessages((prev) => [
      ...prev.slice(0, -1),
      { sender: "bot", text: "⚠️ Error: Couldn't get a response." },
    ]);
  }
};


  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 font-poppins">
      <div className="w-[400px] bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-700 text-white flex items-center p-4">
          <Image
            src="/insighted.png"
            alt="InsightEd Logo"
            width={45}
            height={45}
            className="mr-3"
          />
          <h2 className="text-lg font-semibold">InsightEd - Study Buddy</h2>
        </div>

        {/* Chat Window */}
        <div
          id="chat-window"
          ref={chatWindowRef}
          className="h-[400px] p-4 overflow-y-auto bg-[#f4f9ff]"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-3 rounded-2xl max-w-[80%] ${
                msg.sender === "bot"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-blue-700 text-white ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex border-t border-gray-200">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 p-3 border-none outline-none text-gray-700"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-700 text-white px-5 text-lg hover:bg-blue-800 transition"
          >
            ➤
          </button>
        </div>
      </div>
    </main>
  );
}

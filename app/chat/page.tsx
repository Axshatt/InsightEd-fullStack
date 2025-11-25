"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

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

  // Auto-scroll to bottom when new message appears
  useEffect(() => {
    chatWindowRef.current?.scrollTo({
      top: chatWindowRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Function to clean markdown while preserving math
  const cleanMarkdown = (text: string) => {
    return text
      .replace(/\*\*/g, "") // remove bold markers
      .replace(/\*/g, "")   // remove italics
      .replace(/`/g, "")    // remove code backticks
      .replace(/#+/g, "")   // remove headings
      .replace(/_/g, "")    // remove underscores
      .replace(/---/g, "")  // remove separators
      .replace(/\|/g, " ")  // remove table pipes
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // keep link text only
      .trim();
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Temporary "thinking" message
    const thinkingMsg: Message = { sender: "bot", text: "⏳ Thinking..." };
    setMessages((prev) => [...prev, thinkingMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg.text, history: messages }),
      });

      const data = await res.json();
      const cleanedReply = cleanMarkdown(data.reply);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: cleanedReply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: "⚠️ Error: Couldn't get a response." },
      ]);
    }
  };

  return (
    <MathJaxContext
      config={{
        loader: { load: ["input/tex", "output/chtml"] },
        tex: { inlineMath: [["$", "$"], ["\\(", "\\)"]] },
      }}
    >
      <main className="flex flex-col h-screen w-screen bg-gradient-to-br from-sky-100 to-sky-200 font-poppins">
        {/* Header */}
        <header className="bg-blue-700 text-white flex items-center p-4 shadow-md">
          <Image
            src="/insighted.png"
            alt="InsightEd Logo"
            width={45}
            height={45}
            className="mr-3"
          />
          <h2 className="text-xl font-semibold">InsightEd — Study Buddy</h2>
        </header>

        {/* Chat Window */}
        <section
          id="chat-window"
          ref={chatWindowRef}
          className="flex-1 p-6 overflow-y-auto bg-[#f4f9ff]"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-3 rounded-2xl max-w-[25%] break-words whitespace-pre-wrap overflow-wrap-anywhere ${msg.sender === "bot"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-blue-700 text-white ml-auto"
                }`}
            >
              <MathJax dynamic>{msg.text}</MathJax>
            </div>

          ))}
        </section>

        {/* Input Area */}
        <footer className="flex items-center border-t border-gray-300 p-3 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 p-3 border-none outline-none text-gray-700 text-base"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-700 text-white px-6 py-2 text-lg rounded-lg hover:bg-blue-800 transition"
          >
            ➤
          </button>
        </footer>
      </main>
    </MathJaxContext>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BotIcon, SendHorizonal } from "lucide-react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    setChat((prev) => [...prev, `🧑 You: ${input}`]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/chat/", { message: input });
      setChat((prev) => [...prev, `🤖 Bot: ${res.data.response}`]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [...prev, "⚠️ Failed to get response."]);
    }

    setInput("");
    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:300%_300%] animate-gradient-x dark:bg-black dark:text-white flex flex-col items-center">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center mb-8 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BotIcon className="w-6 h-6 animate-pulse" />
        EduSmart Chatbot
      </motion.h1>

      <div className="w-full max-w-3xl h-[400px] sm:h-[500px] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 shadow-md mb-6 space-y-3">
        {chat.map((line, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
              line.startsWith("🧑")
                ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 self-end ml-auto"
                : line.startsWith("🤖")
                ? "bg-gray-200 dark:bg-zinc-800 text-black dark:text-white self-start"
                : "text-red-500"
            }`}
          >
            {line}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="w-full max-w-3xl flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-5 py-3 rounded-lg bg-white text-blue-600 dark:bg-zinc-900 dark:text-white font-semibold hover:bg-blue-100 dark:hover:bg-zinc-800 transition flex items-center gap-2"
        >
          {loading ? "Sending..." : <><SendHorizonal className="w-4 h-4" /> Send</>}
        </button>
      </div>
    </div>
  );
}

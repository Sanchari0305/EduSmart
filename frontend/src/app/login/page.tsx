"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem("username", name.trim());
      router.push("/app");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white 
                 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                 bg-[length:300%_300%] animate-gradient-x px-4"
    >
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login to EduSmart</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg font-semibold text-white bg-blue-600 
             hover:bg-blue-700 transition-all duration-300 shadow-md 
             transform hover:-translate-y-1 hover:shadow-lg active:scale-95 
             animate-pulse-glow"
        >
           Continue
        </button>

      </div>
    </div>
  );
}

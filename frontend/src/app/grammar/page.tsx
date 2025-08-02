"use client";

import axios from "axios";
import { useState } from "react";
import { SpellCheck } from "lucide-react";

export default function GrammarChecker() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/grammar/", {
        text: input,
      });

      if (res.data.output) {
        setOutput(res.data.output);
      } else {
        setOutput("⚠️ No correction found or API error.");
      }
    } catch (err) {
      console.error("AxiosError:", err);
      setOutput("⚠️ Network Error: Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:300%_300%] animate-gradient-x text-white dark:bg-black dark:text-white flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 flex items-center gap-2">
        <SpellCheck className="text-white w-6 h-6 animate-pulse" />
        Grammar Checker
      </h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a paragraph to check grammar..."
        className="w-full max-w-3xl p-4 text-black rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg mb-6 dark:text-white dark:bg-zinc-800 dark:border-zinc-700"
        rows={6}
      />

      <button
        onClick={handleCheck}
        disabled={loading}
        className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-blue-100 transition-all duration-300 disabled:opacity-60"
      >
        {loading ? "Checking..." : "Check Grammar"}
      </button>

      {output && (
        <div className="mt-8 max-w-3xl w-full p-6 bg-white text-black rounded-xl shadow-xl border dark:bg-zinc-900 dark:text-white dark:border-zinc-700 whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
}

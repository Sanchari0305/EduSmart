"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";

export default function TextSummarizer() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("medium");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/summarize/", {
        text,
        mode,
      });
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      setSummary("⚠️ Failed to summarize text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-[length:300%_300%] animate-gradient-x dark:bg-black dark:text-white flex flex-col items-center">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-8 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SparklesIcon className="w-6 h-6 animate-pulse" />
        Text Summarizer
      </motion.h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="w-full max-w-4xl p-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        rows={8}
      />

      <div className="flex items-center gap-4 flex-wrap justify-center mb-6">
        <label className="font-medium">Summary Length:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white"
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="detailed">Detailed</option>
        </select>

        <button
          onClick={handleSummarize}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-white text-purple-600 dark:bg-zinc-900 dark:text-white font-semibold hover:bg-purple-100 dark:hover:bg-zinc-800 transition"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </div>

      {summary && (
        <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg p-6 whitespace-pre-wrap shadow-md text-black dark:text-white">
          {summary}
        </div>
      )}
    </div>
  );
}

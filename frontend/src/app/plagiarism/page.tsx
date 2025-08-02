"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ShieldAlertIcon } from "lucide-react";

export default function PlagiarismChecker() {
  const [content, setContent] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setError("");
    setScore(null);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/plagiarism/", {
        content,
      });
      setScore(res.data.plagiarism_score);
    } catch (err: any) {
      setError("❌ Failed to check plagiarism.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 bg-[length:300%_300%] animate-gradient-x dark:bg-black dark:text-white flex flex-col items-center">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-8 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ShieldAlertIcon className="w-6 h-6" />
        Plagiarism Checker
      </motion.h1>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste content here..."
        className="w-full max-w-4xl p-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
        rows={6}
      />

      <button
        onClick={handleCheck}
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-white text-red-600 dark:bg-zinc-900 dark:text-white font-semibold hover:bg-red-100 dark:hover:bg-zinc-800 transition"
      >
        {loading ? "Checking..." : "Check Plagiarism"}
      </button>

      {score !== null && (
        <p className="mt-6 text-lg font-semibold bg-white dark:bg-zinc-800 p-4 rounded shadow text-black dark:text-white">
          🔍 Plagiarism Score: <span className="font-bold">{score}%</span>
        </p>
      )}

      {error && (
        <p className="text-red-200 mt-4 bg-red-900 p-3 rounded font-semibold max-w-2xl text-center">
          {error}
        </p>
      )}
    </div>
  );
}

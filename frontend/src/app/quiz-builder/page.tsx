"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ListChecksIcon } from "lucide-react";

export default function QuizBuilder() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/quiz/", {
        topic,
        num_questions: count,
      });
      setQuiz(res.data.quiz);
    } catch (err) {
      console.error(err);
      setQuiz("⚠️ Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 bg-[length:300%_300%] animate-gradient-x dark:bg-black dark:text-white flex flex-col items-center">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-8 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ListChecksIcon className="w-6 h-6" />
        Quiz Builder
      </motion.h1>

      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic..."
        className="w-full max-w-4xl p-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={6}
      />

      <div className="w-full max-w-4xl flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          placeholder="No. of questions"
          className="flex-1 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white"
        />
        <button
          onClick={handleGenerate}
          className="px-6 py-3 rounded-lg bg-white text-blue-600 dark:bg-zinc-900 dark:text-white font-semibold hover:bg-blue-100 dark:hover:bg-zinc-800 transition"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>

      {quiz && (
        <pre className="w-full max-w-4xl whitespace-pre-wrap bg-white dark:bg-zinc-900 p-6 border border-gray-300 dark:border-zinc-700 rounded-lg shadow text-black dark:text-white">
          {quiz}
        </pre>
      )}
    </div>
  );
}

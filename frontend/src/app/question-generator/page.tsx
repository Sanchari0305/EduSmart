"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BookOpenCheckIcon } from "lucide-react";

export default function QuestionGenerator() {
  const [syllabus, setSyllabus] = useState("");
  const [marks, setMarks] = useState(5);
  const [count, setCount] = useState(3);
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/questions/generate-questions/", {
        syllabus,
        marks,
        num_questions: count,
      });
      setQuestions(res.data.questions);
    } catch (err) {
      console.error(err);
      setQuestions("⚠️ Failed to generate questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-[length:300%_300%] animate-gradient-x dark:bg-black dark:text-white flex flex-col items-center">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-8 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BookOpenCheckIcon className="w-6 h-6" />
        Question Generator
      </motion.h1>

      <textarea
        value={syllabus}
        onChange={(e) => setSyllabus(e.target.value)}
        placeholder="Paste syllabus here..."
        className="w-full max-w-4xl p-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={6}
      />

      <div className="flex flex-wrap gap-4 mb-6 w-full max-w-4xl items-center">
        <input
          type="number"
          value={marks}
          onChange={(e) => setMarks(Number(e.target.value))}
          placeholder="Marks"
          className="w-full sm:w-48 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          placeholder="Number of Questions"
          className="w-full sm:w-64 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-white text-blue-600 dark:bg-zinc-900 dark:text-white font-semibold hover:bg-blue-100 dark:hover:bg-zinc-800 transition"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {questions && (
        <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg p-6 whitespace-pre-wrap shadow-md text-black dark:text-white">
          {questions}
        </div>
      )}
    </div>
  );
}

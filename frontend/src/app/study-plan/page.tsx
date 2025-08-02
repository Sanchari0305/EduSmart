"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CalendarCheck, Plus } from "lucide-react";

export default function StudyPlan() {
  const [subject, setSubject] = useState("");
  const [chapters, setChapters] = useState<string[]>([]);
  const [chapterInput, setChapterInput] = useState("");
  const [studyDays, setStudyDays] = useState(7);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [plan, setPlan] = useState("");

  const handleAddChapter = () => {
    if (chapterInput.trim()) {
      setChapters([...chapters, chapterInput.trim()]);
      setChapterInput("");
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/study-plan/", {
        subject,
        chapters,
        study_days: studyDays,
        hours_per_day: hoursPerDay,
      });
      setPlan(res.data.plan);
    } catch (err) {
      console.error(err);
      setPlan("⚠️ Failed to generate study plan.");
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-[length:300%_300%] animate-gradient-x dark:bg-black dark:text-white flex flex-col items-center">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CalendarCheck className="w-6 h-6" />
        Study Plan Generator
      </motion.h1>

      <div className="w-full max-w-3xl space-y-4">
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject (e.g., Physics)"
          className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex gap-2">
          <input
            value={chapterInput}
            onChange={(e) => setChapterInput(e.target.value)}
            placeholder="Add chapter"
            className="flex-1 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white"
          />
          <button
            onClick={handleAddChapter}
            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1"
          >
            <Plus size={18} /> Add
          </button>
        </div>

        {chapters.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <p className="font-semibold mb-2">Chapters:</p>
            <ul className="list-disc list-inside space-y-1">
              {chapters.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="number"
            value={studyDays}
            onChange={(e) => setStudyDays(Number(e.target.value))}
            placeholder="Study Days"
            className="flex-1 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white"
          />
          <input
            type="number"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            placeholder="Hours/Day"
            className="flex-1 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg bg-white text-blue-600 dark:bg-zinc-900 dark:text-white font-semibold hover:bg-blue-100 dark:hover:bg-zinc-800 transition"
        >
          Generate Study Plan
        </button>

        {plan && (
          <pre className="whitespace-pre-wrap bg-white dark:bg-zinc-900 p-6 border border-gray-300 dark:border-zinc-700 rounded-lg shadow text-black dark:text-white mt-6">
            {plan}
          </pre>
        )}
      </div>
    </div>
  );
}

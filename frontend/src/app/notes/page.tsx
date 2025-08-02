"use client";

import { useState } from "react";
import axios from "axios";
import { Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown"; // ✅ import markdown renderer

export default function NotesGenerator() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/notes/", { topic });
      setNotes(res.data.notes);
    } catch (err) {
      console.error(err);
      setNotes("⚠️ Failed to generate notes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:300%_300%] animate-gradient-x text-white dark:bg-black dark:text-white flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 flex items-center gap-2">
        <Sparkles className="text-white w-7 h-7 animate-pulse" />
        Notes Generator
      </h1>

      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic or syllabus..."
        className="w-full max-w-3xl p-4 text-black rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg mb-6 dark:text-white dark:bg-zinc-800 dark:border-zinc-700"
        rows={6}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-blue-100 transition-all duration-300 disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate Notes"}
      </button>

      {notes && (
        <div className="mt-8 max-w-3xl w-full p-6 bg-white text-black rounded-xl shadow-xl border dark:bg-zinc-900 dark:text-white dark:border-zinc-700 prose dark:prose-invert prose-pre:bg-zinc-800 prose-pre:text-white prose-code:text-pink-500">
          <ReactMarkdown>{notes}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

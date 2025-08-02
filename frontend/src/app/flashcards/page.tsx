"use client";

import { useState } from "react";
import axios from "axios";
import { Brain } from "lucide-react";

export default function FlashcardCreator() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/flashcards/", {
        notes,
      });
      setResult(res.data.flashcards);
    } catch (error) {
      console.error(error);
      setResult("⚠️ Failed to generate flashcards.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 bg-[length:300%_300%] animate-gradient-x text-white dark:bg-black dark:text-white flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 flex items-center gap-2">
        <Brain className="text-white w-6 h-6 animate-pulse" />
        Flashcard Creator
      </h1>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Paste your notes here..."
        className="w-full max-w-3xl p-4 text-black rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg mb-6 dark:text-white dark:bg-zinc-800 dark:border-zinc-700"
        rows={8}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-purple-100 transition-all duration-300 disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>

      {result && (
        <div className="mt-8 max-w-3xl w-full p-6 bg-white text-black rounded-xl shadow-xl border dark:bg-zinc-900 dark:text-white dark:border-zinc-700 whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}

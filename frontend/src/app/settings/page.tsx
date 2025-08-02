"use client";

import { useEffect, useState } from "react";
import { toggleDarkMode } from "@/utils/theme";
import { Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setIsDark(saved);
    toggleDarkMode(saved);
  }, []);

  const handleToggle = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    toggleDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:300%_300%] animate-gradient-x dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="flex items-center gap-4">
        <span className="text-lg">Dark Mode</span>
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${
            isDark ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          {isDark ? (
            <>
              <Moon size={18} />
              On
            </>
          ) : (
            <>
              <Sun size={18} />
              Off
            </>
          )}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function NavThemeToggle() {
  const { isDark, toggleDark } = useTheme();

  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      title="Toggle Theme"
    >
      {isDark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}

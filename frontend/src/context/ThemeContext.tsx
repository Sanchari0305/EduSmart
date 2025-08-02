"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleDark: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setIsDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggleDark = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

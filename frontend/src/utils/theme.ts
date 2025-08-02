// src/utils/theme.ts
export function toggleDarkMode(enabled: boolean) {
  const root = document.documentElement;

  if (enabled) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

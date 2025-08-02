// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import DarkModeInitializer from "@/components/DarkModeInitializer";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar"; // ✅ Import Navbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduSmart",
  description: "AI-powered educational tools for grammar, notes, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <DarkModeInitializer />
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <>
            <Navbar /> {/* ✅ Navbar added here */}
            <main className="pt-16">{children}</main> {/* optional top padding to offset fixed navbar */}
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}

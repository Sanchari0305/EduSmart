"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:300%_300%] animate-gradient-x flex flex-col items-center justify-center text-white px-4 dark:bg-black dark:text-white">
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold text-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to EduSmart
      </motion.h1>

      <TypeAnimation
        sequence={[
          "Your AI-powered Study Buddy.",
          2000,
          "Grammar Fixer. Notes Generator. Quiz Builder.",
          2000,
          "Plan Smart. Study Smart. EduSmart.",
          2000,
        ]}
        wrapper="p"
        speed={50}
        className="text-xl sm:text-2xl text-center mb-10"
        repeat={Infinity}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl w-full">
        {[
          { label: "Grammar Checker", path: "/grammar" },
          { label: "Notes Generator", path: "/notes" },
          { label: "Text Summarizer", path: "/summarizer" },
          { label: "Question Generator", path: "/question-generator" },
          { label: "AI Chatbot", path: "/chatbot" },
          { label: "Plagiarism Checker", path: "/plagiarism" },
          { label: "Flashcards", path: "/flashcards" },
          { label: "Quiz Builder", path: "/quiz-builder" },
          { label: "Study Plan Generator", path: "/study-plan" },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className="bg-white/90 dark:bg-gray-800 text-blue-600 dark:text-white py-4 rounded-xl font-semibold shadow-md hover:bg-white dark:hover:bg-gray-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Floating Collapsible Footer */}
      <div className="fixed bottom-4 right-4 z-50">
        {(isOpen || !isMobile) && (
          <div className="flex items-center gap-4 bg-white/90 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300">
            <a
              href="https://github.com/Sanchari0305"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/sancharighosh03/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/thickieeboo?igsh=djgxODhybWE4MGdv&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        )}

        {/* Toggle Button on Mobile */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md transition-all"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        )}
      </div>
    </div>
  );
}

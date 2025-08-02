"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";

export default function SplashPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white
                 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                 bg-[length:300%_300%] animate-gradient-x"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-extrabold mb-6 drop-shadow-lg"
      >
        EduSmart
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-xl mb-10 text-center h-8 drop-shadow-md"
      >
        <ReactTyped
          strings={[
            "Your AI-Powered Study Buddy",
            "Smarter Learning Starts Here",
            "Master Subjects with AI Tools",
          ]}
          typeSpeed={50}
          backSpeed={30}
          loop
        />
      </motion.div>

      <button
        onClick={() => router.push("/login")}
        className="border border-white py-3 px-6 rounded font-semibold 
                   hover:bg-white hover:text-blue-600 transition"
      >
        Login
      </button>
    </div>
  );
}

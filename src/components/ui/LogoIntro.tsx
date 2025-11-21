"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props {
  targetRef: React.RefObject<HTMLDivElement>;
}

export default function LogoIntro({ targetRef }: Props) {
  // 🚫 Skip loader completely on PDF template pages (for Puppeteer)
  if (
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/pdf-templates")
  ) {
    return null;
  }

  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  // --------------------------------------------------------
  // ONE-SHOT BUTTER SMOOTH PROGRESS
  // --------------------------------------------------------
  useEffect(() => {
    setProgress(0);
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  // Exit after animation finishes
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setShow(false), 650);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-black"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* LOGO */}
          <div className="mb-8">
            <Image
              src="/images/logo-2.png"
              alt="Logo"
              width={110}
              height={110}
              className="rounded-2xl shadow-lg shadow-black/10 dark:shadow-white/10"
              priority
            />
          </div>

          {/* SMOOTH ONE-SHOT BAR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-[260px] h-[12px] bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden relative"
          >
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 1.65,
                ease: [0.15, 0.85, 0.25, 1],
              }}
              className="h-full bg-black dark:bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

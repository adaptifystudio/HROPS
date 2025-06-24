"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props {
  targetRef: React.RefObject<HTMLDivElement>;
}

export default function LogoIntro({ targetRef }: Props) {
  const [show, setShow] = useState(true);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2400);

    if (typeof window !== "undefined" && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      setCoords({
        x: rect.left - centerX + 40, 
        y: rect.top - centerY + 20,
      });
    }

    return () => clearTimeout(timer);
  }, [targetRef]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 1, x: 0, y: 0 }}
            animate={{
              scale: 0.5,
              x: coords.x,
              y: coords.y,
            }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <Image
              src="/images/logo-2.png"
              alt="Logo"
              width={100}
              height={100}
              className="rounded-2xl"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

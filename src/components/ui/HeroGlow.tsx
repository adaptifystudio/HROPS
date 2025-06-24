"use client";
import { motion } from "framer-motion";

export const HeroGlow = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
    >
      <div
        className="h-[1000px] w-[1000px] rounded-full blur-[140px]"
        style={{
          background: `radial-gradient(circle at center, rgba(255,140,0,0.35) 0%, rgba(255,140,0,0.15) 40%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
};

"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";


interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  reverse?: boolean;
  simple?: boolean;
}

const Container = ({
  children,
  className,
  delay = 0.2,
  reverse,
  simple,
  ...props
}: Props) => {
  return (
    <motion.div
      className={cn("w-full h-full", className)}
      initial={{ opacity: 0, y: reverse ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay,
        duration: simple ? 0.2 : 0.4,
        type: simple ? "keyframes" : "spring",
        stiffness: simple ? 100 : undefined,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Container;

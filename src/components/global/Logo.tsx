"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-3 px-4 py-1"
    >
      <Image
        src="/images/logo-2.png"
        alt="HROPS Logo"
        width={30}
        height={30}
        className="rounded-sm object-contain"
        priority
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm font-semibold text-black dark:text-white"
      >
        HROPS admin
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
    </Link>
  );
};

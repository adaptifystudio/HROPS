"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

import { IconMenu2, IconX } from "@tabler/icons-react";

import { motion, HTMLMotionProps } from "framer-motion";

interface Links {
  label: string;
  href?: string;
  icon: React.JSX.Element | React.ReactNode;
  onClick?: () => void;
}

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const SidebarBody = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <DesktopSidebar className={className} {...props}>
        {children}
      </DesktopSidebar>
      <MobileSidebar className={className}>{children}</MobileSidebar>
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) => {
  return (
    <motion.div
      className={cn(
        "hidden h-full w-[300px] flex-shrink-0 bg-white dark:bg-black text-black dark:text-white px-4 py-4 md:flex md:flex-col",
        className
      )}
      animate={{ width: "300px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
} & HTMLMotionProps<"div">) => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Top bar */}
      <motion.div
        className={cn(
          "flex h-10 w-full flex-row items-center justify-between px-4 py-4 md:hidden",
          mounted ? (theme === "dark" ? "bg-black" : "bg-white") : "",
          className
        )}
        {...props}
      >
        <div className="z-20 flex w-full justify-end">
          <IconMenu2
            className={
              mounted ? (theme === "dark" ? "text-white" : "text-black") : ""
            }
            onClick={() => setOpen(true)}
          />
        </div>
      </motion.div>

      {/* Sidebar menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed inset-0 z-[100] flex h-full w-full flex-col justify-between p-4 sm:p-10",
              mounted
                ? theme === "dark"
                  ? "bg-black text-white"
                  : "bg-white text-black"
                : "",
              className
            )}
          >
            {/* Close button */}
            <div
              className={cn(
                "absolute right-10 top-10 z-50 cursor-pointer",
                mounted ? (theme === "dark" ? "text-white" : "text-black") : ""
              )}
              onClick={() => setOpen(false)}
            >
              <IconX />
            </div>

            {/* Sidebar content */}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  id,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
  id?: string;
}) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (link.onClick) {
      e.preventDefault(); // Prevent navigation
      link.onClick(); // Trigger the toggle or custom click
    }
  };

  return (
    <Link
      href={link.href || "#"}
      onClick={handleClick}
      className={cn("group/sidebar relative px-4 py-1", className)}
      onMouseEnter={() => setHovered(id ?? null)}
      onMouseLeave={() => setHovered(null)}
      {...props}
    >
      {hovered === id && (
        <motion.div
          layoutId="hovered-sidebar-link"
          className="absolute inset-0 z-10 rounded-lg bg-neutral-100 dark:bg-neutral-900"
        />
      )}
      <div className="relative z-20 flex items-center justify-start gap-2 py-2">
        {link.icon}

        <motion.span
          animate={{ display: "inline-block", opacity: 1 }}
          className="!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-800 dark:text-neutral-200 transition duration-150 group-hover/sidebar:translate-x-1"
        >
          {link.label}
        </motion.span>
      </div>
    </Link>
  );
};

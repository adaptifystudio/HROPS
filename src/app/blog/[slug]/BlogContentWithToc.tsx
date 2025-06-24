"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu } from "@tabler/icons-react";

export function BlogContentWithToc({ blog }: { blog: Blog }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 md:flex-row md:px-8 pt-32 pb-20">
      <Toc toc={blog.toc} />
      <div className="flex max-w-2xl flex-1 flex-col">
        {/* 🔙 French styled back button */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour au blog
          </Link>
        </div>
        {/* Blog image */}
        {blog.image || blog.imageBase64 || blog.thumbnail ? (
          <Image
            src={
              (blog.image || blog.imageBase64 || blog.thumbnail) ??
              "/fallback.jpg"
            }
            alt={blog.title}
            className="h-60 w-full rounded-3xl object-cover md:h-[30rem]"
            height={720}
            width={1024}
          />
        ) : (
          <div className="h-60 w-full rounded-3xl bg-neutral-800 md:h-[30rem]" />
        )}
        {/* Blog title */}
        <h2 className="mb-2 mt-6 text-2xl font-bold tracking-tight text-black dark:text-white">
          {blog.title}
        </h2>

        <hr className="my-6 border-t border-neutral-700 dark:border-neutral-600" />

        {/* Blog content */}
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Divider */}
        <div className="mt-10 max-w-2xl">
          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-900" />
          <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800" />
        </div>
        {/* Author + date */}
        <div className="mt-10 flex items-center">
          <Image
            src={
              blog.authorImage?.length
                ? blog.authorImage
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
            }
            alt={blog.author}
            className="h-5 w-5 rounded-full"
            height={20}
            width={20}
          />
          <p className="pl-2 text-sm text-neutral-600 dark:text-neutral-400">
            {blog.author}
          </p>
          <div className="mx-2 h-1 w-1 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          <p className="pl-1 text-sm text-neutral-600 dark:text-neutral-400">
            Publié le{" "}
            {blog.createdAt
              ? format(new Date(blog.createdAt), "LLLL d, yyyy")
              : "?"}
          </p>
          {blog.updatedAt && (
            <p className="pl-1 text-sm text-neutral-600 dark:text-neutral-400">
              (Mis à jour le {format(new Date(blog.updatedAt), "LLLL d, yyyy")})
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const Toc = ({ toc }: { toc?: string[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  if (!toc || toc.length === 0) return null;

  return (
    <>
      <div className="sticky left-0 top-20 hidden max-w-xs flex-col self-start pr-10 md:flex">
        {toc.map((title, index) => (
          <div
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="group/toc-link relative rounded-lg px-2 py-1 text-sm text-neutral-700 dark:text-neutral-200"
          >
            {hovered === index && (
              <motion.span
                layoutId="toc-indicator"
                className="absolute left-0 top-0 h-full w-1 rounded-br-full rounded-tr-full bg-neutral-200 dark:bg-neutral-700"
              />
            )}
            <span className="inline-block transition duration-200 group-hover/toc-link:translate-x-1">
              {title}
            </span>
          </div>
        ))}
      </div>
      <div className="sticky right-2 top-20 flex w-full flex-col items-end justify-end self-start md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm dark:bg-neutral-900"
        >
          <IconMenu className="h-6 w-6 text-black dark:text-white" />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 flex flex-col items-end rounded-3xl border border-neutral-100 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900"
            >
              {toc.map((title, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  className="group/toc-link relative rounded-lg px-2 py-1 text-right text-sm text-neutral-700 dark:text-neutral-200"
                >
                  {hovered === index && (
                    <motion.span
                      layoutId="toc-indicator"
                      className="absolute left-0 top-0 h-full w-1 rounded-br-full rounded-tr-full bg-neutral-200 dark:bg-neutral-700"
                    />
                  )}
                  <span className="inline-block transition duration-200 group-hover/toc-link:translate-x-1">
                    {title}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

type Blog = {
  title: string;
  summary?: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  authorImage: string;
  thumbnail?: string; // optional
  image?: string; // optional
  imageBase64?: string; // ✅ ADD THIS
  content: string;
  toc?: string[];
};

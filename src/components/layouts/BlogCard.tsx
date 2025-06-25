"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";






export type Blog = {
  title: string;
  description: string;
  slug: string;
  image: string;
  author: string;
  authorAvatar: string;
};

interface IBlurImage {
  height?: any;
  width?: any;
  src?: string | any;
  objectFit?: any;
  className?: string | any;
  alt?: string | undefined;
  layout?: any;
  [x: string]: any;
}


export const BlogCard = ({ blog }: { blog: Blog }) => {
  const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, "");

  const truncate = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <Link
      className="shadow-derek rounded-3xl border dark:border-neutral-800 w-full bg-white dark:bg-neutral-900  overflow-hidden  hover:scale-[1.02] transition duration-200"
      href={`/blog/${blog.slug}`}
    >
      {/* ✅ FIXED: Render image directly with <img> for base64 support */}
      {blog.image ? (
        <img
          src={blog.image}
          alt={blog.title}
          className="h-52 object-cover object-top w-full"
        />
      ) : (
        <div className="h-52 bg-white dark:bg-neutral-900" />
      )}

      <div className="p-4 md:p-8 bg-white dark:bg-neutral-900">
        <div className="flex space-x-2 items-center mb-2">
          <Image
            src={blog.authorAvatar}
            alt={blog.author}
            width={20}
            height={20}
            className="rounded-full h-5 w-5"
          />
          <p className="text-sm font-normal text-neutral-600 dark:text-neutral-400">
            {blog.author}
          </p>
        </div>

        <p className="text-lg font-bold mb-4 text-neutral-800 dark:text-neutral-100">
          {blog.title}
        </p>

        <p className="text-left text-sm mt-2 text-neutral-600 dark:text-neutral-400">
          {truncate(stripHtml(blog.description), 100)}
        </p>
      </div>
    </Link>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  objectFit,
  alt,
  layout,
  ...rest
}: IBlurImage) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300 transform",
        isLoading ? "blur-sm scale-105" : "blur-0 scale-100",
        className
      )}
      onLoadingComplete={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={src}
      layout={layout}
      alt={alt ? alt : "Avatar"}
      {...rest}
    />
  );
};
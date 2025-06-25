"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { GridPattern, GridPatternContainer } from "@/components/layouts/GridPattern";


export default function SimpleBlogWithGrid() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const BLOGS_PER_PAGE = 6;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((blog: any) => ({
          title: blog.title,
          description: blog.content,
          slug: blog._id,
          image: blog.thumbnail,
          author: blog.author,
          authorAvatar:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png",
        }));
        setBlogs(formatted);
        setLoading(false); // ✅ End loading
      });
  }, []);

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);
  const startIndex = (page - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const paginatedBlogs = blogs.slice(startIndex, endIndex);

  return (
    <div className="relative overflow-hidden pt-32 md:pt-40 pb-20">
      <GridPatternContainer className="opacity-50" />
      <div className="py-4 md:py-10 overflow-hidden relative px-4 md:px-8">
        <GridPatternContainer className="opacity-50" />

        <div className="relative z-20 py-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-4">
            Blog
          </h1>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover insightful resources and expert advice from our seasoned
            team to elevate your knowledge.
          </p>
        </div>
      </div>

      {/* ✅ Show Skeleton While Loading */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 mt-12">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="shadow-derek rounded-3xl border dark:border-neutral-800 w-full bg-white dark:bg-neutral-900 overflow-hidden animate-pulse"
            >
              <div className="h-52 w-full bg-neutral-800" />

              <div className="p-4 md:p-8 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 rounded-full bg-neutral-700" />
                  <div className="h-4 w-24 rounded bg-neutral-700" />
                </div>
                <div className="h-6 w-full rounded bg-neutral-700" />
                <div className="h-4 w-3/4 rounded bg-neutral-700" />
              </div>
            </div>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border border-dashed rounded-2xl border-muted bg-muted/30">
          <Image
            src="/images/no-blogs.webp"
            alt="Aucun article"
            width={160}
            height={160}
            className="mb-6 opacity-70 dark:opacity-60"
          />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Aucun article pour le moment
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Revenez bientôt pour découvrir les dernières actualités, conseils et
            articles exclusifs.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 mt-12">
            {paginatedBlogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={page === i + 1}
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        setPage((p) => Math.min(p + 1, totalPages))
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
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

type Blog = {
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


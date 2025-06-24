"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { Logo, LogoIcon } from "@/components/global/Logo";

import {
  IconHome,
  IconArticle,
  IconWorldWww,
  IconMenu2,
  IconX,
  IconLogout,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

import Image from "next/image";
import { IconChecklist } from "@tabler/icons-react";
import { motion, HTMLMotionProps } from "framer-motion";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { SimpleEditor } from "@/components/tiptap/simple-editor";

import { useParams, useRouter } from "next/navigation";

interface Links {
  label: string;
  href?: string;
  icon: React.JSX.Element | React.ReactNode;
  onClick?: () => void; 
}


export default function SimpleSidebarWithHover() {
  return (
    <div className="h-screen w-full flex">
      <SidebarLayout>
        <Dashboard />
      </SidebarLayout>
    </div>
  );
}

export function SidebarLayout({
  
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 
  }, []);

const primaryLinks = ([
  {
    label: "Home",
    href: "/admin",
    icon: <IconHome className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: "Blogs",
    href: "/blog",
    icon: <IconArticle className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: "Website",
    href: "/",
    icon: <IconWorldWww className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
  },
  mounted && {
    label: theme === "dark" ? "Light Mode" : "Dark Mode",
    href: "#",
    icon: theme === "dark"
      ? <IconSun className="h-5 w-5 text-yellow-500" />
      : <IconMoon className="h-5 w-5 text-neutral-700" />,
    onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
  },
] as (Links | false)[]).filter(Boolean) as Links[];

  return (
  <div
    className={cn(
      "flex w-full min-h-screen flex-col md:flex-row overflow-hidden",
      "bg-white text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
      className
    )}
  >
    <Sidebar>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Logo />
          <div className="mt-8 flex flex-col">
            {primaryLinks.map((link, idx) => (
              <SidebarLink key={idx} link={link} id={`primary-link-${idx}`} />
            ))}
          </div>

          {/* Divider fix: subtle in light mode, invisible in dark */}
          <div className="mt-4">
            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700" />
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex flex-col gap-2">
          <SidebarLink
            link={{
              label: "Faycal Khadad",
              href: "#",
              icon: (
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem("admin-auth");
              window.location.href = "/admin/login";
            }}
            className="flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700"
          >
            <IconLogout className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </SidebarBody>
    </Sidebar>

    {children as React.ReactNode}
  </div>
);

}



const Dashboard = () => {
  const params = useParams();
  const id = params?.id?.toString();

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<any>(null);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [toc, setToc] = useState<string[]>([]); // ✅ TOC STATE ADDED
  const [newTocItem, setNewTocItem] = useState("");

  console.log("ID from useParams:", id);

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.title) throw new Error();
        setBlog(data);
        setDescription(data.description || "");
        setContent(data.content || "");
        setToc(data.toc || []); // ✅ LOAD TOC
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load blog data.");
        setLoading(false);
      });
  }, [id]);

  const addTocItem = () => setToc([...toc, ""]); // ✅ Add item
  const updateTocItem = (index: number, value: string) => {
    const updated = [...toc];
    updated[index] = value;
    setToc(updated);
  };
  const removeTocItem = (index: number) => {
    const updated = [...toc];
    updated.splice(index, 1);
    setToc(updated);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const title = (form.querySelector("#title") as HTMLInputElement).value;
    const author = (form.querySelector("#author") as HTMLInputElement).value;
    const imageInput = form.querySelector("#image") as HTMLInputElement;
    const imageFile = imageInput.files?.[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("toc", JSON.stringify(toc)); // ✅ Add TOC to payload
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        toast.success("Blog updated successfully");
        router.push("/admin");
      } else {
        toast.error("Failed to update blog");
      }
    } catch {
      toast.error("Server error");
    }
  };

  if (loading)
  return (
    <div className="w-full max-w-4xl mt-20 px-4 space-y-6">
      {/* Page Title */}
      <div className="h-10 w-64 animate-pulse rounded-md bg-neutral-800" />

      {/* Subtitle */}
      <div className="h-5 w-80 animate-pulse rounded-md bg-neutral-700" />

      {/* Blog Title Input */}
      <div className="space-y-2">
        <div className="h-4 w-32 animate-pulse rounded-md bg-neutral-700" />
        <div className="h-10 w-full animate-pulse rounded-md bg-neutral-800" />
      </div>

      {/* Author Name Input */}
      <div className="space-y-2">
        <div className="h-4 w-32 animate-pulse rounded-md bg-neutral-700" />
        <div className="h-10 w-full animate-pulse rounded-md bg-neutral-800" />
      </div>

      {/* Description Textarea */}
      <div className="space-y-2">
        <div className="h-4 w-40 animate-pulse rounded-md bg-neutral-700" />
        <div className="h-20 w-full animate-pulse rounded-md bg-neutral-800" />
      </div>

      {/* Full Content Editor */}
      <div className="space-y-2">
        <div className="h-4 w-32 animate-pulse rounded-md bg-neutral-700" />
        <div className="h-[400px] w-full animate-pulse rounded-md bg-neutral-900 border border-neutral-800" />
      </div>

      {/* Table of Contents */}
      <div className="space-y-2">
        <div className="h-4 w-48 animate-pulse rounded-md bg-neutral-700" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-full animate-pulse rounded-md bg-neutral-800" />
        ))}
        <div className="h-10 w-full animate-pulse rounded-md bg-neutral-800" />
      </div>

      {/* Add Button */}
      <div className="h-10 w-20 animate-pulse rounded-md bg-neutral-700" />

      {/* File Upload */}
      <div className="space-y-2">
        <div className="h-4 w-40 animate-pulse rounded-md bg-neutral-700" />
        <div className="h-10 w-full animate-pulse rounded-md bg-neutral-800" />
      </div>

      {/* Cover Image */}
      <div className="h-60 w-full animate-pulse rounded-md bg-neutral-900" />

      {/* Update Button */}
      <div className="h-10 w-40 animate-pulse rounded-md bg-neutral-700" />
    </div>
  );





  return (
  <div className="flex items-start justify-start min-h-screen w-full bg-white text-black dark:bg-neutral-950 dark:text-white px-4 py-8 overflow-y-auto">
    <div className="w-full px-4 md:px-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
          Edit Blog Post
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm max-w-sm">
          Update the blog's content, author, image, and more.
        </p>
      </div>

      <div className="py-10">
        <form onSubmit={handleUpdate} className="space-y-9 w-full">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-400">
              Blog Title
            </label>
            <input
              id="title"
              type="text"
              defaultValue={blog?.title}
              className="mt-2 block w-full bg-white dark:bg-neutral-900 px-4 py-1.5 rounded-md shadow-input text-black dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm"
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-neutral-700 dark:text-neutral-400">
              Author Name
            </label>
            <input
              id="author"
              type="text"
              defaultValue={blog?.author}
              className="mt-2 block w-full bg-white dark:bg-neutral-900 px-4 py-1.5 rounded-md shadow-input text-black dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 dark:text-neutral-400">
              Short Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 block w-full bg-white dark:bg-neutral-900 px-4 py-1.5 rounded-md shadow-input text-black dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm"
            />
          </div>

          {/* Full Content */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">
              Full Content
            </label>
            <div className="bg-white dark:bg-neutral-900 text-black dark:text-white rounded-md overflow-hidden">
              <SimpleEditor content={content} onChange={setContent} />
            </div>
          </div>

          {/* TOC Section */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-1">
              Table of Contents (TOC)
            </label>
            <div className="space-y-3">
              {toc.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateTocItem(index, e.target.value)}
                    className="w-full rounded-md bg-white dark:bg-neutral-900 px-4 py-2 text-sm text-black dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    placeholder={`TOC item #${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeTocItem(index)}
                    className="flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newTocItem}
                  onChange={(e) => setNewTocItem(e.target.value)}
                  placeholder="New TOC item"
                  className="w-full rounded-md bg-white dark:bg-neutral-900 px-4 py-2 text-sm text-black dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newTocItem.trim()) {
                      setToc([...toc, newTocItem.trim()]);
                      setNewTocItem("");
                    }
                  }}
                  className="rounded-md bg-white dark:bg-neutral-200 px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200 dark:hover:bg-neutral-300 transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-neutral-700 dark:text-neutral-400">
              Change Cover Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const previewUrl = URL.createObjectURL(file);
                  setImagePreview(previewUrl);
                }
              }}
              className="mt-2 block w-full bg-white dark:bg-neutral-900 px-4 py-1.5 rounded-md shadow-input text-black dark:text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-200 file:text-black hover:file:bg-neutral-300"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="New Preview"
                className="mt-4 max-h-64 rounded-md border border-neutral-800 object-cover"
              />
            ) : blog?.thumbnail ? (
              <img
                src={blog.thumbnail}
                alt="Current Cover"
                className="mt-4 max-h-64 rounded-md border border-neutral-800 object-cover"
              />
            ) : null}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 mt-4 bg-black dark:bg-white dark:text-black text-white text-sm font-medium py-2 rounded-full hover:bg-black/90 dark:hover:bg-neutral-100 transition"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  </div>
);


};

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
            className={mounted ? (theme === "dark" ? "text-white" : "text-black") : ""}
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
              mounted ? (theme === "dark" ? "bg-black text-white" : "bg-white text-black") : "",
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

  return (
    <Link
      href={link.href || "#"}
      onClick={(e) => {
        if (link.onClick) {
          e.preventDefault(); // ⛔ prevent page reload
          link.onClick();     // ✅ toggle theme
        }
      }}
      className={cn("group/sidebar relative px-4 py-1", className)}
      onMouseEnter={() => setHovered(id ?? null)}
      onMouseLeave={() => setHovered(null)}
      {...props}
    >
      {hovered === id && (
        <motion.div
          layoutId="hovered-sidebar-link"
          className="absolute inset-0 z-10 rounded-lg bg-neutral-200 dark:bg-neutral-900"
        />
      )}
      <div className="relative z-20 flex items-center justify-start gap-2 py-2">
        {link.icon}

        <motion.span
          animate={{ display: "inline-block", opacity: 1 }}
          className="!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-700 transition duration-150 group-hover/sidebar:translate-x-1 dark:text-neutral-200"
        >
          {link.label}
        </motion.span>
      </div>
    </Link>
  );
};

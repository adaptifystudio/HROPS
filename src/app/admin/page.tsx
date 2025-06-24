"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
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


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { motion, HTMLMotionProps } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Links {
  label: string;
  href?: string;
  icon: React.JSX.Element | React.ReactNode;
  onClick?: () => void; 
}


import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";

export interface Blog {
  _id: string;
  title: string;
  author: string;
  content: string;
  description: string; 
  imageBase64?: string;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  

  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth");
    if (!isAuth) {
      router.push("/admin/login");
    }
  }, []);

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
      "flex w-full min-h-screen flex-col md:flex-row overflow-hidden bg-white dark:bg-neutral-800",
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

          <div className="mt-4">
            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>

        {/* ✅ User avatar */}
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

          {/* 🔴 LOGOUT BUTTON FIXED HERE */}
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

const columns = [
  { key: "title", label: "Title" },
  { key: "author", label: "Author" },
  { key: "description", label: "Description" },
  { key: "createdAt", label: "Created" },
];

const Dashboard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched blogs:", data); // <-- ✅ Check if `description` exists
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blogs", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
  <div className="flex-1 px-4 py-6 bg-white text-black dark:bg-black dark:text-white w-full">
    <div className="flex items-center justify-between mb-6">
      <div className="h-10 w-40 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-10 w-28 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
    </div>

    <div className="rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
      <div className="grid grid-cols-4 gap-4 p-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-6 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"
          />
        ))}
      </div>

      <div className="space-y-3 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
            <div className="h-4 w-1/4 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-1/5 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-20 rounded bg-neutral-300 dark:bg-neutral-700" />
          </div>
        ))}
      </div>
    </div>
  </div>
);


  return (
  <div className="flex-1 px-4 py-6 bg-white text-black dark:bg-neutral-950 dark:text-white w-full">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-xl font-semibold">Blog Dashboard</h1>
      <Link
        href="/admin/blogs/create"
        className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md shadow hover:bg-neutral-900 transition dark:bg-white dark:text-black dark:hover:bg-neutral-200"
      >
        Create Blog
      </Link>
    </div>

    {!blogs.length ? (
      <div className="p-6 text-neutral-500 dark:text-white">No blogs found.</div>
    ) : (
      <>
        <div className="rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 overflow-x-auto">
          <Table
            isStriped
            removeWrapper
            aria-label="Blog Dashboard Table"
            className="min-w-[800px]"
          >
            <TableHeader
              columns={[
                { key: "title", label: "Title" },
                { key: "description", label: "Description" },
                { key: "createdAt", label: "Created" },
                { key: "actions", label: "Actions" },
              ]}
            >
              {(column) => (
                <TableColumn
                  key={column.key}
                  className="text-sm text-neutral-700 dark:text-neutral-300"
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody items={blogs}>
              {(item) => (
                <TableRow key={item._id}>
                  {(columnKey) => {
                    if (columnKey === "title") {
                      return (
                        <TableCell>
                          <Link
                            href={`/admin/blogs/${item._id}/edit`}
                            className="inline-block bg-black text-white text-xs font-medium px-3 py-1 rounded-md hover:bg-neutral-900 transition dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                          >
                            {item.title}
                          </Link>
                        </TableCell>
                      );
                    }

                    if (columnKey === "createdAt") {
                      return (
                        <TableCell className="text-sm">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : "—"}
                        </TableCell>
                      );
                    }

                    if (columnKey === "actions") {
                      return (
                        <TableCell>
                          <div className="flex gap-2">
                            <Link
                              href={`/admin/blogs/${item._id}/edit`}
                              className="bg-black text-white text-xs px-3 py-1 rounded-md hover:bg-neutral-900 transition dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                            >
                              Edit
                            </Link>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  className="text-xs px-3 py-1 h-auto"
                                >
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-black dark:text-white">
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-neutral-700 dark:text-neutral-400">
                                    This action cannot be undone. This will
                                    permanently delete this blog post.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-black text-white hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-red-600 text-white hover:bg-red-700"
                                    onClick={async () => {
                                      try {
                                        const res = await fetch(
                                          `/api/blogs/${item._id}`,
                                          {
                                            method: "DELETE",
                                          }
                                        );

                                        if (res.ok) {
                                          setBlogs((prev) =>
                                            prev.filter(
                                              (b) => b._id !== item._id
                                            )
                                          );
                                          toast.success("Blog deleted", {
                                            description:
                                              "The blog was successfully removed.",
                                          });
                                        } else {
                                          toast.error("Failed to delete", {
                                            description:
                                              "An error occurred while deleting the blog.",
                                          });
                                        }
                                      } catch (err) {
                                        console.error(err);
                                        toast.error("Server error", {
                                          description: "Something went wrong.",
                                        });
                                      }
                                    }}
                                  >
                                    Yes, delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell
                        className={cn(
                          "text-sm text-neutral-800 dark:text-neutral-100",
                          columnKey === "description" && "max-w-[200px] truncate"
                        )}
                      >
                        {columnKey === "description"
                          ? item.description || "—"
                          : (item as any)[columnKey] || "—"}
                      </TableCell>
                    );
                  }}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          Total blogs: {blogs.length}
        </p>
      </>
    )}
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

  const handleClick = (e: React.MouseEvent) => {
    if (link.onClick) {
      e.preventDefault(); // Prevent navigation
      link.onClick();     // Trigger the toggle or custom click
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

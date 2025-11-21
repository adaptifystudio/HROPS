"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/layouts/SidebarLayout";

import {
  IconHome,
  IconArticle,
  IconWorldWww,
  IconLogout,
  IconSun,
  IconMoon,
  IconChecklist,
} from "@tabler/icons-react";

interface Links {
  label: string;
  href?: string;
  icon: React.JSX.Element;
  onClick?: () => void;
}

export function AdminLayout({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const primaryLinks = (
    [
      {
        label: "Dashboard",
        href: "/admin",
        icon: <IconHome className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      },
      {
        label: "Blogs",
        href: "/blog",
        icon: <IconArticle className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      },
      {
        label: "Assessments",
        href: "/admin/assessments",
        icon: <IconChecklist className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      },
      {
        label: "Website",
        href: "/",
        icon: <IconWorldWww className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      },
      mounted && {
        label: theme === "dark" ? "Light Mode" : "Dark Mode",
        href: "#",
        icon:
          theme === "dark" ? (
            <IconSun className="h-5 w-5 text-yellow-500" />
          ) : (
            <IconMoon className="h-5 w-5 text-neutral-700" />
          ),
        onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
      },
    ] as (Links | false)[]
  ).filter(Boolean) as Links[];

  return (
    <div
      className={cn(
        "flex w-full min-h-screen flex-col md:flex-row overflow-hidden",
        "bg-white text-black dark:bg-neutral-900 dark:text-white",
        className
      )}
    >
      <Sidebar>
        <SidebarBody className="justify-between gap-10">

          <div className="flex flex-1 flex-col overflow-y-auto">
            {/* LOGO */}
            <div className="px-2 py-4 text-xl font-bold">HROps Admin</div>

            <div className="mt-6 flex flex-col">
              {primaryLinks.map((l, i) => (
                <SidebarLink key={i} link={l} id={`lnk-${i}`} />
              ))}
            </div>

            <div className="mt-6 h-px w-full bg-neutral-300 dark:bg-neutral-700" />
          </div>

          {/* FOOTER USER + LOGOUT */}
          <div className="flex flex-col gap-2 mb-6">
            <SidebarLink
              link={{
                label: "Faycal Khadad",
                href: "#",
                icon: (
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
                    width={40}
                    height={40}
                    alt="Avatar"
                    className="rounded-full"
                  />
                ),
              }}
            />

            <button
              onClick={() => {
                localStorage.removeItem("admin-auth");
                window.location.href = "/admin/login";
              }}
              className="flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
            >
              <IconLogout className="h-5 w-5" />
              Logout
            </button>
          </div>

        </SidebarBody>
      </Sidebar>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

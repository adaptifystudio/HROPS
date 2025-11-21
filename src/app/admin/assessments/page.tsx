"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Logo } from "@/components/global/Logo";

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

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Download } from "lucide-react";

// ------------------------------
// PAGE WRAPPER
// ------------------------------
export default function AdminHome() {
  return (
    <div className="h-screen w-full flex">
      <SidebarLayout>
        <Dashboard />
      </SidebarLayout>
    </div>
  );
}

// ------------------------------
// SIDEBAR LAYOUT (UNCHANGED)
// ------------------------------

interface Links {
  label: string;
  href?: string;
  icon: React.JSX.Element | React.ReactNode;
  onClick?: () => void;
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

  useEffect(() => setMounted(true), []);

  const primaryLinks = (
    [
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
      {
        label: "Diagnostics",
        href: "/admin/assessments",
        icon: <IconChecklist className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      },
      mounted && {
        label: theme === "dark" ? "Light Mode" : "Dark Mode",
        href: "#",
        icon: theme === "dark"
          ? <IconSun className="h-5 w-5 text-yellow-500" />
          : <IconMoon className="h-5 w-5 text-neutral-700" />,
        onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
      },
    ] as (Links | false)[]
  ).filter(Boolean) as Links[];

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

            {/* Divider */}
            <div className="mt-4">
              <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800" />
            </div>
          </div>

          {/* User */}
          <div className="flex flex-col gap-2">
            <SidebarLink
              link={{
                label: "Faycal Khadad",
                href: "#",
                icon: (
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
                    className="h-7 w-7 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />

            {/* Logout */}
            <button
              onClick={() => {
                localStorage.removeItem("admin-auth");
                window.location.href = "/admin/login";
              }}
              className="flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
            >
              <IconLogout className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </SidebarBody>
      </Sidebar>

      {children}
    </div>
  );
}

// ------------------------------
// MAIN DASHBOARD (REPLACED with ASSESSMENT LIST)
// ------------------------------

interface Assessment {
  _id: string;
  companyName?: string;
  contactName?: string;
  email: string;
  totalScore: number;
  maturityLevel: string;
  createdAt: string;
}

const Dashboard = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/assessments")
      .then((res) => res.json())
      .then((data) => {
        setAssessments(data.assessments || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load assessments.");
        setLoading(false);
      });
  }, []);

  async function downloadPDF(id: string) {
    const res = await fetch("/api/assessment/pdf", {
      method: "POST",
      body: JSON.stringify({ assessmentId: id }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `Diagnostic_${id}.pdf`;
    a.click();
  }

  if (loading)
    return (
      <div className="flex-1 px-4 py-6 bg-white dark:bg-black text-black dark:text-white">
        Loading...
      </div>
    );

  return (
    <div className="flex-1 px-4 py-6 bg-white dark:bg-neutral-950 text-black dark:text-white">
      <h1 className="text-xl font-semibold mb-6">Diagnostics – Leads</h1>

      {!assessments.length ? (
        <div className="p-6 text-neutral-500 dark:text-neutral-300">
          No assessments found.
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 overflow-x-auto">
            <Table
              isStriped
              aria-label="Assessment Table"
              className="min-w-[900px]"
            >
              <TableHeader
                columns={[
                  { key: "email", label: "Email" },
                  { key: "companyName", label: "Company" },
                  { key: "score", label: "Score" },
                  { key: "createdAt", label: "Submitted" },
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

              <TableBody items={assessments}>
                {(item) => (
                  <TableRow key={item._id}>
                    {(columnKey) => {
                      if (columnKey === "score") {
                        return (
                          <TableCell>
                            {item.totalScore} / 96 — {item.maturityLevel}
                          </TableCell>
                        );
                      }

                      if (columnKey === "createdAt") {
                        return (
                          <TableCell>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </TableCell>
                        );
                      }

                      if (columnKey === "actions") {
                        return (
                          <TableCell>
                            <button
                              onClick={() => downloadPDF(item._id)}
                              className="flex items-center gap-2 px-3 py-1 bg-orange-600 text-white rounded-md text-xs hover:bg-orange-500"
                            >
                              <Download className="w-4 h-4" />
                              PDF
                            </button>
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell className="text-sm">
                          {(item as any)[columnKey] || "—"}
                        </TableCell>
                      );
                    }}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Total leads: {assessments.length}
          </p>
        </>
      )}
    </div>
  );
};

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHome from "@/components/admin/AdminHome";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth");
    if (isAuth !== "true") {
      router.replace("/admin/login");
    }
  }, []);

  return <AdminHome />;
}

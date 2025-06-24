"use client";

import { ThemeProvider } from "next-themes";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/sections/Footer";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import LogoIntro from "@/components/ui/LogoIntro";
import Navbar from "@/sections/Navbar"; 
import { NavbarLogo } from "@/components/ui/resizable-navbar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  
  const logoRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {!isAdminRoute && <LogoIntro targetRef={logoRef} />}
      {!isAdminRoute && <Navbar logoRef={logoRef} />}
      {!isAdminRoute && (
        <ScrollProgress className="top-0 z-[100] fixed h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 transition-all duration-300" />
      )}

      {children}

      <Toaster position="top-right" richColors closeButton />
      {!isAdminRoute && <Footer />}
    </ThemeProvider>
  );
}

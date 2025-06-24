"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-neutral-950 text-black dark:text-white px-4 text-center">

  {/* Image with glow only in dark mode */}
  <div className="relative">
    <div className="absolute -inset-2 z-0 rounded-full blur-2xl opacity-30 dark:bg-orange-500 hidden dark:block" />
    <img
      src="/images/not-found.png"
      alt="Page non trouvée"
      className="relative z-10 mb-6 max-w-xs sm:max-w-sm md:max-w-md rounded"
    />
  </div>

  {/* 404 with glow in dark mode only */}
  <div className="relative mt-4">
    <div className="absolute inset-0 -z-10 h-full w-full rounded-full blur-xl opacity-30 hidden dark:block dark:bg-orange-500" />
    <h1 className="text-5xl font-bold">404</h1>
  </div>

  <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">Page non trouvée</p>
  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
    La page que vous recherchez n'existe pas ou a été déplacée.
  </p>

  <Link href="/" passHref>
    <Button className="mt-6 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
      Retour à l’accueil
    </Button>
  </Link>
</div>

  

  );
}

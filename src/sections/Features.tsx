
"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { StatsWithGridBackground } from "@/components/ui/StatsWithGridBackground";
import { ThreeColumnBentoGrid } from "@/components/ui/bentogrid";
import AnimationContainer from "@/components/ui/animation-container";

const Features = () => {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    
    <section id="expertise" className="relative z-10 flex w-full flex-col items-center justify-center overflow-hidden px-4 py-20 text-center space-y-16 bg-background dark:bg-[#0a0a0a]">

      {/* 🌙 Dark mode glow */}
      <div className="absolute inset-0 -z-10 hidden dark:block">
        <div
          className="h-full w-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,165,0,0.15), transparent 70%)",
            maskImage: "radial-gradient(ellipse at center, white, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse at center, white, transparent)",
          }}
        />
      </div>

      {/* ☀️ Light mode fallback */}
      <div className="absolute inset-0 -z-10 block dark:hidden bg-white" />

      {/* Heading and glowing button */}
      <AnimationContainer delay={0.4}>
      <div className="relative z-10">
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFA726_0%,#FB8C00_50%,#FFA726_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-slate-950 px-4 text-sm font-medium text-black dark:text-white backdrop-blur-3xl">
            Pourquoi nous choisir ?
          </span>
        </button>
        <AnimationContainer delay={0.3}>
        <h2 className="mt-6 text-3xl font-bold text-black dark:text-white md:text-5xl">
          Nos fonctionnalités clés
        </h2>
        </AnimationContainer>

        <p className="mx-auto mt-2 max-w-2xl text-base text-neutral-700 dark:text-neutral-300 md:text-lg">
          Découvrez les services essentiels que nous offrons pour transformer la gestion de vos ressources humaines.
        </p>
      </div>
      </AnimationContainer>

      {/* 📊 Stats */}
      <AnimationContainer delay={0.6}>
      <div className="relative z-10 w-full">
        <StatsWithGridBackground />
      </div>
      </AnimationContainer>

      {/* 🧩 Feature Grid */}
      <AnimationContainer delay={0.8}>
      <div className="relative z-10 w-full max-w-7xl px-4 pt-10">
        <ThreeColumnBentoGrid />
      </div>
      </AnimationContainer>
    </section>
  );
};

export default Features;

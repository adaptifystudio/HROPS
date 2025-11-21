"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AssessmentStartPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-neutral-950 overflow-hidden px-6">

      {/* ⭐ Keep YOUR background exactly as is */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.45]"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      />

      {/* ✨ Soft Apple-style overlay for clarity */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* CONTENT */}
      <div className="relative max-w-3xl text-center space-y-10">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-white leading-tight"
        >
          Diagnostic IA
          <span className="block text-white/70 text-3xl md:text-4xl mt-3">
            Maturité RH Digitale
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto"
        >
          Une évaluation moderne et précise conçue pour comprendre le niveau
          réel de maturité numérique de votre organisation. Alignée avec les
          exigences de la Loi 25 et les meilleures pratiques RH.
        </motion.p>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-neutral-400 text-sm tracking-wide"
        >
          8 thèmes • 32 questions • Analyse IA • Rapport PDF professionnel
        </motion.div>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pt-4"
        >
          <Link href="/assessment/questions">
            <Button
              size="lg"
              className="
                group px-10 py-6 text-lg font-medium 
                rounded-2xl bg-white text-black 
                hover:bg-neutral-200 transition
                shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]
              "
            >
              Commencer l’évaluation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

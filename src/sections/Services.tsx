"use client";

import { HoverEffect } from "../components/ui/card-hover-effect";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";
import Container from "../components/ui/container";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import AnimationContainer from "@/components/ui/animation-container";


export const projects = [
  {
    title: "Stratégie et Transformation Digitale RH",
    description:
      "Nous définissons avec vous la feuille de route de votre transformation RH pour aligner les objectifs business et humains via les solutions digitales.",
  },
  {
    title: "Déploiement de Solutions SIRH",
    description:
      "Mise en place de systèmes d'information RH modernes pour automatiser et fiabiliser vos processus de gestion des talents, paie, formation, etc.",
  },
  {
    title: "Optimisation des Systèmes RH Existants",
    description:
      "Audit et amélioration continue de vos outils RH pour un meilleur usage, un meilleur ROI et une expérience collaborateur optimisée.",
  },
  {
    title: "Assistance à Maîtrise d’Ouvrage (AMOA)",
    description:
      "Accompagnement dans la rédaction des cahiers des charges, la gestion des appels d’offres et le pilotage des projets RH.",
  },
  {
    title: "Change Management et Formation",
    description:
      "Conduite du changement adaptée à vos équipes RH et managers, avec des plans de communication et formations ciblées.",
  },
  {
    title: "Veille et Conseils en Innovations RH",
    description:
      "Nous vous tenons informés des dernières tendances RH et vous conseillons sur les solutions innovantes à forte valeur ajoutée.",
  },
];

export default function ServicesSection() {
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "fd521eb3-5eb4-46c7-adb8-a1e770826526", 
        subject: "Nouvelle inscription à la newsletter HROPS",
        email,
      }),
    });

    if (res.ok) {
      toast("Merci pour votre inscription !", {
        description:
          "Vous recevrez bientôt nos dernières actualités RH.",
      });
      setEmail(""); 
    } else {
      toast("Erreur lors de l'inscription", {
        description: "Veuillez réessayer plus tard.",
      });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <section id="services" className="scroll-mt-20">
    <div className="relative w-full bg-white dark:bg-neutral-950 py-20 overflow-hidden">
      {/* Glow background */}
      <div className="pointer-events-none absolute left-[-200px] top-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full blur-3xl opacity-30 bg-grey dark:bg-gradient-to-br dark:from-orange-400/20 dark:via-orange-500/10 dark:to-transparent" />
      <div className="pointer-events-none absolute right-[-150px] bottom-[-100px] h-[600px] w-[600px] rounded-full blur-3xl opacity-20 bg-grey dark:bg-gradient-to-tr dark:from-orange-400/20 dark:via-orange-500/10 dark:to-transparent" />

      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <AnimationContainer delay={0.5}>
          <div className="text-center mb-12">
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFA726_0%,#FB8C00_50%,#FFA726_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-neutral-950 px-4 text-sm font-medium text-black dark:text-white backdrop-blur-3xl">
                Nos Services
              </span>
            </button>

            <h2 className="mt-6 text-4xl font-bold text-black dark:text-white md:text-5xl">
              Transformez vos RH avec des solutions digitales innovantes
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-700 dark:text-neutral-300 md:text-lg">
              Chez HROPS Consulting, nous vous accompagnons dans la
              digitalisation de vos processus RH pour optimiser la gestion du
              capital humain et aligner vos objectifs organisationnels avec les
              exigences du marché moderne.
            </p>
          </div>
        </AnimationContainer>

        <AnimationContainer delay={0.7}>
          <HoverEffect items={projects} />
        </AnimationContainer>

         <div className="mt-24 max-w-2xl mx-auto">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Abonnez-vous à notre newsletter
      </h2>

      <PlaceholdersAndVanishInput
        onChange={handleChange}
        onSubmit={handleSubmit as (e: React.FormEvent<HTMLFormElement>) => void}
        placeholders={[
          "Entrez votre adresse e-mail",
          "Recevez les dernières actus RH",
          "Soyez les premiers informés",
          "Rejoignez notre communauté",
        ]}
      />
    </div>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full py-20">
        <Container className="py-20 max-w-6xl mx-auto">
          <div className="relative flex flex-col items-center justify-center py-12 lg:py-20 px-0 rounded-2xl lg:rounded-3xl bg-background/20 text-center border border-foreground/20 overflow-hidden backdrop-blur-md">
            {/* Particles */}
            <Particles
              refresh
              ease={80}
              quantity={80}
              color="#d4d4d4"
              className="hidden lg:block absolute inset-0 z-0"
            />
            <Particles
              refresh
              ease={80}
              quantity={35}
              color="#d4d4d4"
              className="block lg:hidden absolute inset-0 z-0"
            />

            {/* Optional rotating inner glow (still inside for subtle motion) */}
            <motion.div
              className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] lg:h-[500px] lg:w-[500px] rounded-full blur-[120px] -z-10 opacity-40 hidden dark:block"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, #f97316 0deg, #fb923c 180deg, #facc15 360deg)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-medium !leading-snug">
              Boostez votre <br />
              <span className="font-subheading italic">stratégie RH</span> avec
              le digital
            </h2>
            <p className="text-sm md:text-lg text-center text-accent-foreground/80 max-w-2xl mx-auto mt-4">
              HROPS vous accompagne dans la digitalisation de vos processus RH
              pour optimiser la performance, renforcer l’engagement
              collaborateur{" "}
              <span className="hidden lg:inline">
                et piloter efficacement votre transformation humaine.
              </span>
            </p>

            <Link href="#contact" className="mt-8 ">
              <Button className="pointer" size="lg">Demander une consultation</Button>
            </Link>
          </div>
        </Container>
      </div>
    </div>
    </section>
  );
}

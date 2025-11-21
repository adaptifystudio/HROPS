"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/assessment";
import { ArrowLeft, ChevronRight, Circle, CheckCircle2 } from "lucide-react";

const allQuestions = questions;

export default function QuestionsPage() {
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  // Lead fields (FINAL SLIDE)
  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [loadingGenerate, setLoadingGenerate] = useState(false);

  const totalQuestions = allQuestions.length;
  const isLastSlide = index === totalQuestions; // IMPORTANT
  const progress = ((index + 1) / (totalQuestions + 1)) * 100;

  // Scroll up after every slide
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  // --------------------------
  // SELECT ANSWER
  // --------------------------
  function selectAnswer(score: number) {
    const q = allQuestions[index];
    const newAnswers = { ...answers, [q.id]: score };
    setAnswers(newAnswers);

    setTimeout(() => {
      setIndex(index + 1);
    }, 350);
  }

  // --------------------------
  // FINAL SUBMIT
  // --------------------------
  async function submitFinal() {
    if (!email.trim()) return alert("Veuillez entrer un email.");

    setLoadingGenerate(true);

    try {
      const payload = {
        answers,
        email,
        contactName,
        companyName,
      };

      const res = await fetch("/api/assessment/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        alert("Erreur lors de la génération.");
        setLoadingGenerate(false);
        return;
      }

      const assessment = json.assessment || json;

      localStorage.setItem("assessment_result", JSON.stringify(assessment));
      localStorage.setItem("assessment_id", assessment._id);

      router.push("/assessment/results");
    } catch (err) {
      console.error(err);
      alert("Erreur serveur.");
    }

    setLoadingGenerate(false);
  }

  // --------------------------
  // RENDER
  // --------------------------
  return (
    <div className="relative min-h-screen w-full px-6 pt-24 pb-16 text-white flex flex-col items-center">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      />
      <div className="absolute inset-0 bg-neutral-950/70" />

      <div className="relative z-10 w-full max-w-2xl mx-auto">

        {/* Progress Bar */}
        <div className="mb-16 text-center">
          <div className="text-neutral-400 mb-3 text-sm flex gap-1 justify-center">
            <span>{index < totalQuestions ? `Question ${index + 1}` : "Finalisation"}</span>
            <span className="text-neutral-600">/</span>
            <span>{totalQuestions + 1}</span>
          </div>

          <div className="w-full h-2 bg-neutral-800/70 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ====================== Questions ======================= */}
          {!isLastSlide && (
            <motion.div
              key={allQuestions[index].id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-center gap-2 text-orange-400 uppercase text-sm tracking-wide">
                <ChevronRight className="w-4 h-4" />
                {allQuestions[index].themeId.replace(/_/g, " ")}
              </div>

              <h1 className="text-3xl md:text-4xl font-semibold text-center leading-tight">
                {allQuestions[index].question}
              </h1>

              <div className="space-y-4 mt-6">
                {allQuestions[index].options.map((opt) => {
                  const selected = answers[allQuestions[index].id] === opt.score;
                  return (
                    <motion.button
                      key={opt.label}
                      onClick={() => selectAnswer(opt.score)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full px-6 py-4 rounded-xl border flex items-center gap-3 transition-all backdrop-blur-sm
                      ${selected
                        ? "border-orange-500 bg-orange-600/20 text-orange-300 shadow-md shadow-orange-900/30"
                        : "border-neutral-700/70 hover:border-neutral-500/70 hover:bg-neutral-900/50 text-neutral-300"
                      }`}
                    >
                      {selected ? (
                        <CheckCircle2 className="w-5 h-5 text-orange-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-neutral-600" />
                      )}
                      <span>{opt.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ====================== FINAL FORM SLIDE ======================= */}
          {isLastSlide && (
            <motion.div
              key="final-form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45 }}
              className="mt-8 bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 backdrop-blur space-y-6"
            >
              <h2 className="text-xl font-semibold text-center">Finaliser votre diagnostic</h2>

              <input
                className="w-full px-4 py-3 bg-neutral-800 rounded-xl border border-neutral-700"
                placeholder="Votre email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="w-full px-4 py-3 bg-neutral-800 rounded-xl border border-neutral-700"
                placeholder="Nom complet (optionnel)"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />

              <input
                className="w-full px-4 py-3 bg-neutral-800 rounded-xl border border-neutral-700"
                placeholder="Nom de l’entreprise (optionnel)"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <button
                onClick={submitFinal}
                disabled={loadingGenerate}
                className="w-full bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-xl font-semibold"
              >
                {loadingGenerate ? "Analyse IA..." : "Générer le rapport IA"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Button */}
        {index > 0 && (
          <motion.button
            onClick={() => setIndex(index - 1)}
            whileHover={{ scale: 1.05 }}
            className="mt-12 mx-auto block text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </motion.button>
        )}
      </div>
    </div>
  );
}

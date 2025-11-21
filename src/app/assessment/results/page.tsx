"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AssessmentResultsPage() {
  const router = useRouter();

  const [loadingPDF, setLoadingPDF] = useState(false);
  const [result, setResult] = useState<{
    totalScore: number;
    maturityLevel: string;
  } | null>(null);

  // ---------------------------------------------------
  // CHARGEMENT DES RÉSULTATS
  // ---------------------------------------------------
  useEffect(() => {
    const stored = localStorage.getItem("assessment_result");

    if (!stored) {
      router.push("/assessment/start");
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      setResult({
        totalScore: parsed.totalScore,
        maturityLevel: parsed.maturityLevel,
      });
    } catch {
      router.push("/assessment/start");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <span className="opacity-60 text-lg">Chargement des résultats...</span>
      </div>
    );
  }

  // ---------------------------------------------------
  // TRADUIRE LES NIVEAUX EN ANGLAIS
  // ---------------------------------------------------
  let levelLabel = result.maturityLevel;
  if (result.maturityLevel === "Débutant") levelLabel = "Starter";
  else if (result.maturityLevel === "En progrès") levelLabel = "Optimizer";
  else if (result.maturityLevel === "Avancé") levelLabel = "Leader";

  const percentage = Math.round((result.totalScore / 96) * 100);

  const badgeColor =
    levelLabel === "Leader"
      ? "bg-green-500/20 text-green-300 border-green-500/30"
      : levelLabel === "Optimizer"
      ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      : "bg-red-500/20 text-red-300 border-red-500/30";

  // ---------------------------------------------------
  // TÉLÉCHARGER LE PDF
  // ---------------------------------------------------
  async function downloadPDF() {
    const assessmentId = localStorage.getItem("assessment_id");
    if (!assessmentId) {
      alert("ID du diagnostic introuvable.");
      return;
    }

    setLoadingPDF(true);

    try {
      const res = await fetch("/api/assessment/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId }),
      });

      if (!res.ok) throw new Error("Erreur lors de la génération du PDF.");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Diagnostic_HROps.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la génération du PDF.");
    } finally {
      setLoadingPDF(false);
    }
  }

  // ---------------------------------------------------
  // INTERFACE (STYLE APPLE)
  // ---------------------------------------------------
  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-16 flex flex-col items-center">
      {/* Fond */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Bouton retour */}
      <button
        onClick={() => router.push("/assessment/start")}
        className="absolute top-10 left-10 text-neutral-400 hover:text-white transition flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-semibold text-center mb-12 z-10"
      >
        Diagnostic RH – Résultats
      </motion.h1>

      {/* Cercle du score */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="relative mt-4 z-10"
      >
        <svg className="w-48 h-48" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" stroke="#222" strokeWidth="10" fill="none" />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            stroke="orange"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDasharray: 0 }}
            animate={{ strokeDasharray: `${(percentage / 100) * 326} 326` }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-semibold">{percentage}%</span>
        </div>
      </motion.div>

      {/* Niveau */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`mt-6 px-6 py-2 rounded-full border ${badgeColor} text-sm font-medium z-10`}
      >
        Niveau : {levelLabel}
      </motion.div>

      {/* Bouton PDF */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        onClick={downloadPDF}
        disabled={loadingPDF}
        className="mt-14 bg-orange-600 hover:bg-orange-500 text-white px-10 py-4 rounded-2xl font-semibold flex items-center gap-3 shadow-lg shadow-orange-900/20 transition disabled:opacity-50 z-10"
      >
        <Download className="w-5 h-5" />
        {loadingPDF ? "Génération du PDF..." : "Télécharger le rapport"}
      </motion.button>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-10 z-10"
      >
        <button
          onClick={() => router.push("/contact")}
          className="px-10 py-4 rounded-2xl border border-neutral-700 bg-neutral-900/40 hover:bg-neutral-800 transition font-medium text-white"
        >
          Obtenir une consultation
        </button>
      </motion.div>
    </div>
  );
}

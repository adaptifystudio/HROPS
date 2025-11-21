import mongoose, { Schema, models, model } from "mongoose";

/**
 * HROps Digital HR Assessment Lead Storage
 * Stores: identification, answers (32), score, maturity level, AI analysis, timestamps
 */

const AssessmentSchema = new Schema(
  {
    // --- Lead Identification ---
    companyName: {
      type: String,
      default: "",
    },
    contactName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "", // ← FIXED: removed required: true
      trim: true,
    },

    // --- Answers Object (ex: { Q1: 2, Q2: 3, ... }) ---
    answers: {
      type: Object,
      required: true,
    },

    // --- Final Score (0 to 96) ---
    totalScore: {
      type: Number,
      required: true,
    },

    // --- Maturity Level (Débutant / En progrès / Avancé) ---
    maturityLevel: {
      type: String,
      required: true,
    },

    // --- AI Full Analysis Text ---
    aiAnalysis: {
      type: String,
      required: true,
    },

    // --- Optional generated PDF file URL ---
    pdfUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Assessment || model("Assessment", AssessmentSchema);

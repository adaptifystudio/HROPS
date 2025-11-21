import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { Readable } from "stream";
import Assessment from "@/app/models/Assessment";
import dbConnect from "@/lib/mongodb";
import path from "path";
import fs from "fs";

// Convert PDF stream → Buffer
function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { assessmentId } = await req.json();

    if (!assessmentId) {
      return NextResponse.json({ error: "Missing assessmentId" }, { status: 400 });
    }

    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }

    // ✅ Load custom font
    const fontPath = path.join(process.cwd(), "public", "fonts", "InterDisplay-Medium.ttf");
    if (!fs.existsSync(fontPath)) throw new Error("Font not found: " + fontPath);

    // Create PDF
    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
      // @ts-ignore
      font: fontPath,
      info: {
        Title: "Diagnostic RH Digital – HROps Consulting",
        Author: "HROps Consulting",
      },
    });

    const stream = doc as unknown as Readable;

    // --- HEADER SECTION (Brand Bar) ---
    doc.rect(0, 0, 595, 80).fill("#111827");
    doc.fillColor("#F97316").fontSize(22).text("HROps Consulting", 50, 30);
    doc.fillColor("#ffffff").fontSize(10).text("Rapport de Diagnostic RH Digital", 50, 55);

    // --- Hero Title ---
    doc.moveDown(3);
    doc
      .font(fontPath)
      .fillColor("#111")
      .fontSize(20)
      .text("Rapport – Diagnostic de Maturité Digitale RH", { align: "center" })
      .moveDown(1);

    // --- Company Information Box ---
    doc.rect(50, doc.y, 495, 90).fill("#F97316");
    doc.fillColor("#fff").fontSize(12).text(
      `Entreprise : ${assessment.companyName || "Non spécifié"}\nContact : ${
        assessment.contactName || "Non spécifié"
      }\nEmail : ${assessment.email || "Non spécifié"}`,
      65,
      doc.y + 15
    );
    doc.moveDown(4);

    // --- Résultats Clés Section ---
    doc
      .fillColor("#111")
      .fontSize(16)
      .text("📊 Résultats Clés", { underline: true })
      .moveDown(1);

    doc.fontSize(13).fillColor("#333").text(`Score total : ${assessment.totalScore} / 96`);

    let color = "#d90429";
    if (assessment.maturityLevel === "En progrès") color = "#ffb703";
    if (assessment.maturityLevel === "Avancé") color = "#00b368";

    doc
      .fillColor(color)
      .fontSize(13)
      .text(`Niveau de maturité : ${assessment.maturityLevel}`)
      .moveDown(2);

    // --- Bar visualization ---
    const progressBarX = 50;
    const progressBarY = doc.y;
    const barWidth = 495;
    const filledWidth = (barWidth * assessment.totalScore) / 96;

    doc.rect(progressBarX, progressBarY, barWidth, 12).fill("#e5e7eb");
    doc.rect(progressBarX, progressBarY, filledWidth, 12).fill(color);
    doc.moveDown(2);

    // --- Analyse IA ---
    doc
      .fillColor("#111")
      .fontSize(16)
      .text("🧠 Analyse IA Personnalisée", { underline: true })
      .moveDown(0.7);

    doc
      .fontSize(12)
      .fillColor("#333")
      .text(assessment.aiAnalysis || "Aucune analyse disponible.", {
        align: "justify",
        lineGap: 6,
      })
      .moveDown(2);

    // --- Signature Footer ---
    doc
      .moveDown(2)
      .fontSize(10)
      .fillColor("#9ca3af")
      .text(
        "Ce rapport est généré automatiquement par la solution d’analyse IA de HROps Consulting.",
        { align: "center" }
      )
      .moveDown(0.3)
      .text("© 2025 HROps Consulting – Diagnostic Digital RH", { align: "center" });

    // Decorative footer bar
    doc.rect(0, 780, 595, 20).fill("#F97316");

    doc.end();

    const buffer = await streamToBuffer(stream);
    const uint8 = new Uint8Array(buffer);

    return new Response(uint8, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Diagnostic_HROps.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Internal PDF error" }, { status: 500 });
  }
}

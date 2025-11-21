import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import dbConnect from "@/lib/mongodb";
import Assessment from "@/app/models/Assessment";

// ✅ Ensure Node.js runtime (Vercel serverless)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { assessmentId } = await req.json();
    if (!assessmentId) {
      return NextResponse.json({ error: "Missing assessmentId" }, { status: 400 });
    }

    const assessment = await Assessment.findById(assessmentId).lean();
    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }

    // -------------------------------------------------
    // 1️⃣  Launch Puppeteer with Chromium for serverless
    // -------------------------------------------------
    const executablePath = await chromium.executablePath();

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: executablePath || undefined,
      headless: true,
    });

    const page = await browser.newPage();

    // -------------------------------------------------
    // 2️⃣  Load the HTML PDF Template
    // -------------------------------------------------
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const templateUrl = `${baseUrl}/pdf-templates/assessment?assessmentId=${assessmentId}`;

    await page.goto(templateUrl, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // -------------------------------------------------
    // 3️⃣  Generate PDF buffer
    // -------------------------------------------------
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "30px",
        bottom: "30px",
        left: "20px",
        right: "20px",
      },
    });

    await browser.close();

    // -------------------------------------------------
    // 4️⃣  Return the file as a downloadable PDF
    // -------------------------------------------------
    return new Response(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Diagnostic_HROps.pdf"',
      },
    });
  } catch (error: any) {
    console.error("❌ PDF generation error:", error);
    return NextResponse.json(
      { error: "Internal PDF generation error", details: error?.message },
      { status: 500 }
    );
  }
}

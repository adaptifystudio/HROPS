import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import dbConnect from "@/lib/mongodb";
import Assessment from "@/app/models/Assessment";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { assessmentId } = await req.json();
    if (!assessmentId)
      return NextResponse.json({ error: "Missing assessmentId" }, { status: 400 });

    const assessment = await Assessment.findById(assessmentId).lean();
    if (!assessment)
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });

    // -------------------------------------------------
    // 1️⃣  Launch Puppeteer (Headless Chrome)
    // -------------------------------------------------
    const browser = await puppeteer.launch({
      headless: true, // ✅ use boolean to match TypeScript definition
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // -------------------------------------------------
    // 2️⃣  Go to your HTML PDF Template
    // -------------------------------------------------
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const templateUrl = `${baseUrl}/pdf-templates/assessment?assessmentId=${assessmentId}`;

    await page.goto(templateUrl, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // -------------------------------------------------
    // 3️⃣  Generate the PDF
    // -------------------------------------------------
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "30px", bottom: "30px", left: "20px", right: "20px" },
    });

    await browser.close();

    // -------------------------------------------------
    // 4️⃣  Return the file as a real PDF download
    // -------------------------------------------------
    // ✅ Explicitly cast the buffer type so Response accepts it
    return new Response(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Diagnostic_HROps.pdf"',
      },
    });
  } catch (error) {
    console.error("❌ PDF generation error:", error);
    return NextResponse.json(
      { error: "Internal PDF generation error" },
      { status: 500 }
    );
  }
}

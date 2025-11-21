import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Assessment from "@/app/models/Assessment";
import playwright from "playwright-aws-lambda";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { assessmentId } = await req.json();
    if (!assessmentId)
      return NextResponse.json({ error: "Missing assessmentId" }, { status: 400 });

    const assessment = await Assessment.findById(assessmentId).lean();
    if (!assessment)
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });

    // Automatically detect your deployed domain
    const origin = new URL(req.url).origin;
    const templateUrl = `${origin}/pdf-templates/assessment?assessmentId=${assessmentId}`;

    // ✅ Launch Playwright (Chromium) — works on Vercel without setup
    const browser = await playwright.launchChromium();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(templateUrl, { waitUntil: "networkidle" });

    const pdf = await page.pdf({
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

    return new Response(Buffer.from(pdf), {
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

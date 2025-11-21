import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Assessment from "@/app/models/Assessment";

export async function GET() {
  try {
    await dbConnect();

    const assessments = await Assessment.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ assessments });
  } catch (error) {
    console.error("Admin assessments error:", error);
    return NextResponse.json({ error: "Failed to load assessments" }, { status: 500 });
  }
}

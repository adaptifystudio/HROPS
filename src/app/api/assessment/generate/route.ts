import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Assessment from "@/app/models/Assessment";
import { questions } from "@/lib/assessment";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { answers, companyName, contactName, email } = body;

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid answers" },
        { status: 400 }
      );
    }

    // ------------------------------
    // 1. SCORE CALCULATION
    // ------------------------------
    let totalScore = 0;

    for (const q of questions) {
      const score = answers[q.id];
      if (typeof score === "number") {
        totalScore += score;
      }
    }

    // ------------------------------
    // 2. DETERMINE MATURITY LEVEL (ENGLISH VERSION)
    // ------------------------------
    let maturityLevel = "Starter";

    if (totalScore >= 65) maturityLevel = "Leader";
    else if (totalScore >= 40) maturityLevel = "Optimizer";
    else maturityLevel = "Starter";

    // ------------------------------
    // 3. GPT PROMPT
    // ------------------------------
    const prompt = `
Tu es un expert RH du Québec spécialisé en transformation numérique.

Score total : ${totalScore}/96
Niveau : ${maturityLevel}

Analyse en français :
- Résumé clair (10 lignes)
- Forces principales
- Faiblesses
- Priorités immédiates (3-5)
- Opportunités long terme
- Risques RH si rien n'est fait

Ton professionnel adapté aux PME québécoises.
    `.trim();

    // ------------------------------
    // 4. AI GENERATION
    // ------------------------------
    let aiAnalysis = "Analyse IA non générée (clé OpenRouter manquante).";

    if (process.env.OPENROUTER_API_KEY) {
      try {
        const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            model: "openai/gpt-4.1-mini",
            messages: [
              { role: "system", content: "Tu es un expert RH du Québec." },
              { role: "user", content: prompt },
            ],
          }),
        });

        const aiData = await aiRes.json();
        aiAnalysis =
          aiData?.choices?.[0]?.message?.content ||
          "Analyse IA non disponible.";
      } catch (err) {
        console.error("OpenRouter error:", err);
        aiAnalysis = "Analyse IA indisponible pour le moment.";
      }
    }

    // ------------------------------
    // 5. SAVE INTO MONGODB
    // ------------------------------
    const saved = await Assessment.create({
      companyName,
      contactName,
      email,
      answers,
      totalScore,
      maturityLevel,
      aiAnalysis,
    });

    // ------------------------------
    // 6. RETURN EXACT SHAPE EXPECTED BY UI
    // ------------------------------
    return NextResponse.json({
      assessment: {
        _id: saved._id.toString(),
        email: saved.email,
        contactName: saved.contactName,
        companyName: saved.companyName,
        answers: saved.answers,
        totalScore: saved.totalScore,
        maturityLevel: saved.maturityLevel,
        aiAnalysis: saved.aiAnalysis,
        createdAt: saved.createdAt,
      },
    });
  } catch (err) {
    console.error("Assessment API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

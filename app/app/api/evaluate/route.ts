import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Asana } from "@/types/asana";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are a supportive and encouraging Yoga Teacher Trainer. You are provided with a pose definition and a transcript of a student's cueing.
The student is undergoing a self-assessment of their cueing skills for their 200h yoga teacher training program.
Your goal is to motivate student teachers while helping them improve their cueing skills.

IMPORTANT SCORING PHILOSOPHY:
- Start with a POSITIVE mindset - look for what they DID rather than what they didn't
- Award scores (0-10 range) to encourage practice and growth
- A score of 0 is given only when the recording is empty or gibberish
- A score of 1 is given when the transcript doesn't mention anything related to yoga at all and is a generic recording or a recording of something other than the pose being practiced.
- A score of 5 should be baseline for ANY attempt at cueing (even if brief)
- Focus your evaluation on EFFORT, SAFETY, and PROGRESS rather than perfection

SCORING GUIDANCE:
- 9-10: Excellent! Comprehensive, safe, and well-articulated cueing
- 7-8: Great job! Hit key points with room for minor refinements
- 5-6: Good start! Basic cueing present, encourage adding more detail
- 3-4: ONLY if major safety issues or completely wrong pose
- 1-2: ONLY if dangerous or harmful instructions

EVALUATION PRIORITIES (in order):
1. CELEBRATE what they did well (find their strengths)
2. Check for SAFETY (forbidden words and contraindications)
3. Note if basic pose structure was mentioned (even if brief)
4. Gently suggest enhancements (frame as "next level" not "missing")
5. Clarity and pacing (are they speaking clearly and at a good pace?)

Return ONLY a valid JSON response with this exact structure (no markdown, no code blocks, just raw JSON):
{
  "score": number (0-10),
  "strengths": string[] (List 1-3 positive things they did, even if basic like "You got started!" or "Clear instruction"),
  "improvements": string[] (1-3 gentle suggestions framed as opportunities, not failures),
  "breathCue": {
    "correct": boolean,
    "expected": string,
    "found": string or null
  },
  "clarityAndPacing": {
    "clear": boolean,
    "pace": string (1-3 sentence description of their pace),
  },
  "forbiddenWordsUsed": string[] (any forbidden words they used),
  "elevatedSuggestions": [
    {
      "original": string (phrase from their transcript),
      "suggestion": string (elevated alternative)
    }
  ]
}

Remember: Your feedback should make them excited to try again, not discouraged. Be their honest and encouraging coach while guiding them toward excellence!`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transcript, asana } = body as { transcript: string; asana: Asana };

    if (!transcript || !asana) {
      return NextResponse.json(
        { error: "Missing transcript or asana data" },
        { status: 400 }
      );
    }

    // Create the user prompt with asana data and transcript
    const userPrompt = `A student teacher is practicing their cueing for ${asana.names.english} (${asana.names.sanskrit}). Please provide encouraging, constructive feedback.

POSE REFERENCE:
Category: ${asana.category}

Key Foundation Points (use these as gentle reminders, not strict requirements):
${asana.cueing.foundation.map((point, i) => `${i + 1}. ${point}`).join("\n")}

Key Alignment Points (celebrate if any were mentioned):
${asana.cueing.alignment.map((point, i) => `${i + 1}. ${point}`).join("\n")}

Ideal Breath Instruction: ${asana.cueing.breath_instruction}

Safety Words to Avoid: ${asana.cueing.forbidden_words.join(", ")}

Vocabulary Enhancement Ideas:
${asana.cueing.elevated_vocabulary.map(v => `- "${v.basic}" → "${v.elevated}"`).join("\n")}

STUDENT'S CUEING:
"${transcript}"

Please evaluate with compassion and encouragement. Remember:
- Find at least 2 genuine strengths to celebrate
- Give a score between 5-10 (be generous - reward effort and safety)
- Frame improvements as exciting next steps, not deficiencies
- Make them feel proud of their progress!

Return your assessment in the JSON format specified. Return ONLY the JSON, no other text.`;

    // Use Gemini 2.5 Pro for evaluation
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: userPrompt }
    ]);

    const response = result.response;
    const text = response.text();

    // Extract JSON from the response (in case Gemini wraps it in markdown)
    let jsonText = text.trim();

    // Remove markdown code blocks if present
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/, "").replace(/\n?```$/, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/, "").replace(/\n?```$/, "");
    }

    // Parse the JSON response
    const evaluation = JSON.parse(jsonText);

    // Add the transcript to the response
    return NextResponse.json({
      ...evaluation,
      transcript,
    });
  } catch (error) {
    console.error("Evaluation error:", error);
    return NextResponse.json(
      {
        error: "Failed to evaluate cueing",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

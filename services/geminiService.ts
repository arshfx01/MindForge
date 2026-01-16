
import { GoogleGenAI, Type } from "@google/genai";
import { Feedback } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function evaluateReasoning(
  scenarioTitle: string,
  narrative: string,
  userAnalysis: string
): Promise<Feedback> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Evaluate the following critical thinking analysis for the scenario: "${scenarioTitle}".
        Scenario Context: ${narrative}
        User's Analysis: ${userAnalysis}
      `,
      config: {
        systemInstruction: `
          You are the "AI Oracle" for MindForge, a gamified critical thinking platform.
          Your goal is to evaluate the user's reasoning.
          Provide a score from 0-100.
          List any logical fallacies found (e.g., Strawman, Ad Hominem, False Dilemma, etc.).
          Provide constructive feedback on their strengths and a "Strategic Pivot" (advice for better reasoning).
          Award XP based on the quality (typically 50-200 XP).
          Output MUST be valid JSON.
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedbackMarkdown: { type: Type.STRING },
            fallaciesArray: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            xpAwarded: { type: Type.NUMBER },
            strategicPivot: { type: Type.STRING }
          },
          required: ["score", "feedbackMarkdown", "fallaciesArray", "xpAwarded", "strategicPivot"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Evaluation error:", error);
    // Graceful fallback
    return {
      score: 0,
      feedbackMarkdown: "There was an error connecting to the Oracle. Please try again.",
      fallaciesArray: ["Network Latency"],
      xpAwarded: 0,
      strategicPivot: "Ensure your connection is stable before submitting to the Oracle."
    };
  }
}

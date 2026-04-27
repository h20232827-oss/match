import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResponse, Mood, Gender } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    inputAnalysis: {
      type: Type.STRING,
      description: "Analysis of the user's input clothing item and features.",
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: "Category of the recommended item (e.g., Top, Bottom, Shoes, Accessory)" },
          itemName: { type: Type.STRING, description: "Specific name of the recommended item" },
          description: { type: Type.STRING, description: "Why this item matches the mood and the input item" },
          stylingTip: { type: Type.STRING, description: "A tip on how to wear this item with the input item" },
        },
        required: ["category", "itemName", "description", "stylingTip"],
      },
      description: "A list of 3-4 recommended cloth items to complete the outfit.",
    },
    overallTip: {
      type: Type.STRING,
      description: "An overall fashion tip for the selected mood.",
    },
  },
  required: ["inputAnalysis", "recommendations", "overallTip"],
};

export async function analyzeStyle(
  imageContent: string | null,
  features: string,
  mood: Mood,
  gender: Gender
): Promise<AnalysisResponse> {
  const parts: any[] = [];

  if (imageContent) {
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageContent.split(",")[1],
      },
    });
  }

  parts.push({
    text: `You are a professional fashion stylist specializing in ${gender}'s fashion. 
    Analyze the provided clothing item (may have image and/or text description: "${features}") 
    and recommend other items to complete an outfit that fits the "${mood}" mood for a ${gender}.
    
    Translate the output to Korean.
    The response must follow the provided JSON schema.`,
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error;
  }
}

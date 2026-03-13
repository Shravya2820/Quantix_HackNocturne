import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateMilestones = async (title: string, description: string, budget: number) => {
  const prompt = `Generate a structured list of project milestones for a freelance contract.
  Project Title: ${title}
  Project Description: ${description}
  Total Budget: ${budget} INR
  
  Each milestone should have a title, description, amount (INR), and estimated deadline (days from start).
  The sum of milestone amounts must equal the total budget.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            amount: { type: Type.NUMBER },
            deadlineDays: { type: Type.NUMBER }
          },
          required: ["title", "description", "amount", "deadlineDays"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};

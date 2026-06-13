import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const analyzeResume = async (resumeText) => {
  // 1. Diagnostic Alert: Check if Vite can actually see your key
  if (!API_KEY) {
    console.error("❌ DEPLOYMENT ERROR: VITE_OPENROUTER_API_KEY is undefined!");
    throw new Error("API Key is missing. Make sure it is added to your Vercel Dashboard Settings.");
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert career mentor. Analyze resumes and return skills, missing skills, roadmap, score and recommended jobs.",
          },
          {
            role: "user",
            content: resumeText,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    // 2. Clearer Logging: Pull out the exact message OpenRouter sends back
    const serverMessage = error.response?.data?.error?.message || error.message;
    console.error("❌ OpenRouter API Call Failed:", serverMessage);
    
    // Pass the error back up to your UI component so it can display it on screen
    throw new Error(serverMessage);
  }
};
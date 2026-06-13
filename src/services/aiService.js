import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const analyzeResume = async (resumeText) => {
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
    console.error(error);
  }
};
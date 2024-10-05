import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export const useGenerativeAI = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateText = async (userInput) => {
    setLoading(true);
    setError(null);

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: 'Response length: 15-25 words',
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: 'user',
            parts: [{ text: userInput }],
          },
        ],
      });

      const result = await chatSession.sendMessage(userInput);
      setResponse(result.response.text());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { generateText, response, loading, error };
};

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initialize server-side Gemini API client lazy-loaded
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST Api routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.post('/api/gemini/symptoms', async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: 'Symptoms list must be a non-empty array.' });
    }

    const ai = getGeminiClient();
    const prompt = `Analyze these selected symptoms strictly for educational & awareness purposes: ${symptoms.join(', ')}.
Provide a high-fidelity, medically responsible, encouraging non-diagnostic review. Show how they could relate to hormonal phases, life stress (cortisol), ovarian balance (PCOS/PCOD), or metabolic changes (thyroid). Under no circumstances should you state or imply a definitive diagnosis. Make the tone highly professional, empathetic, and informative.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert women's health advisor and educational system. Your objective is to educate users, help them understand symptom biology and connections, list holistic lifestyle support tips, and always emphasize a clinical consult. Never diagnose or prescribe.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            educationalOutlook: {
              type: Type.STRING,
              description: "A medically responsible overview of how those symptoms connect to female health, endocrine pathways, or general cycles. Keep the explanation rich but easy for a user to understand."
            },
            suggestedAwarenessTopics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-4 relevant educational topics (e.g., 'Insulin Sensitivity', 'Adrenal Fatigue', 'Follicular Phase Care') that the user could explore further."
            },
            selfCareHacks: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 highly actionable, evidence-based lifestyle or nutritional habits matched to these symptoms."
            },
            redFlags: {
              type: Type.STRING,
              description: "Warning markers which require immediate professional or emergency consultation."
            },
            consultMessage: {
              type: Type.STRING,
              description: "An encouraging message recommending questions to ask a doctor during their next visit."
            }
          },
          required: ["educationalOutlook", "suggestedAwarenessTopics", "selfCareHacks", "redFlags", "consultMessage"]
        }
      }
    });

    const parsedData = JSON.parse(response.text?.trim() || '{}');
    res.json(parsedData);
  } catch (error: any) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({
      error: 'Failed to generate symptom educational assessment.',
      details: error.message || error
    });
  }
});

// Setup server integration with Vite or production dist direct routing
async function initServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FemCare Wellness full-stack server running on http://localhost:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error('Startup failed:', err);
});

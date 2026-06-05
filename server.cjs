var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
});
app.post("/api/gemini/symptoms", async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: "Symptoms list must be a non-empty array." });
    }
    const ai = getGeminiClient();
    const prompt = `Analyze these selected symptoms strictly for educational & awareness purposes: ${symptoms.join(", ")}.
Provide a high-fidelity, medically responsible, encouraging non-diagnostic review. Show how they could relate to hormonal phases, life stress (cortisol), ovarian balance (PCOS/PCOD), or metabolic changes (thyroid). Under no circumstances should you state or imply a definitive diagnosis. Make the tone highly professional, empathetic, and informative.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert women's health advisor and educational system. Your objective is to educate users, help them understand symptom biology and connections, list holistic lifestyle support tips, and always emphasize a clinical consult. Never diagnose or prescribe.",
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            educationalOutlook: {
              type: import_genai.Type.STRING,
              description: "A medically responsible overview of how those symptoms connect to female health, endocrine pathways, or general cycles. Keep the explanation rich but easy for a user to understand."
            },
            suggestedAwarenessTopics: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "3-4 relevant educational topics (e.g., 'Insulin Sensitivity', 'Adrenal Fatigue', 'Follicular Phase Care') that the user could explore further."
            },
            selfCareHacks: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "3 highly actionable, evidence-based lifestyle or nutritional habits matched to these symptoms."
            },
            redFlags: {
              type: import_genai.Type.STRING,
              description: "Warning markers which require immediate professional or emergency consultation."
            },
            consultMessage: {
              type: import_genai.Type.STRING,
              description: "An encouraging message recommending questions to ask a doctor during their next visit."
            }
          },
          required: ["educationalOutlook", "suggestedAwarenessTopics", "selfCareHacks", "redFlags", "consultMessage"]
        }
      }
    });
    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json(parsedData);
  } catch (error) {
    console.error("Error with Gemini API:", error);
    res.status(500).json({
      error: "Failed to generate symptom educational assessment.",
      details: error.message || error
    });
  }
});
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FemCare Wellness full-stack server running on http://localhost:${PORT}`);
  });
}
initServer().catch((err) => {
  console.error("Startup failed:", err);
});
//# sourceMappingURL=server.cjs.map

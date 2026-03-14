const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, ".env");
dotenv.config({ path: envPath });

async function listAll() {
    const apiKey = process.env.GEMINI_API_KEY.trim();
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.models) {
            const geminiModels = data.models
                .filter(m => m.name.includes("gemini"))
                .map(m => m.name);
            console.log("AVAILABLE MDOELS:", geminiModels);
        } else {
            console.log("No models found or error:", data);
        }
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}
listAll();

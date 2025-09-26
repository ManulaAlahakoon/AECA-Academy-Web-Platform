// controllers/voiceChatController.js
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-live-001" });

// Keep history (replace with DB/session in prod)
let conversationHistory = [];

export const handleVoiceChat = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Audio file required" });

    const audioBuffer = fs.readFileSync(req.file.path);
    const base64Audio = audioBuffer.toString("base64");

    // Add user input to conversation
    conversationHistory.push({
      role: "user",
      parts: [
        { inlineData: { mimeType: "audio/webm", data: base64Audio } },
        { text: "Transcribe this and reply as a friendly English tutor. Keep answers short and casual. Give pronunciation tips if asked." }
      ]
    });

    const result = await model.generateContent({
      contents: conversationHistory,
      modalities: ["text", "audio"],
      audio: { voice: "alloy" }
    });

    // Extract AI text
    const aiText = result.response.text();

    // Extract AI audio (some SDKs use `response.audio[0].data`)
    let aiAudioBase64 = null;
    if (result.response.audio?.length > 0) {
      aiAudioBase64 = result.response.audio[0].data;
    }

    // Save bot reply to history
    conversationHistory.push({ role: "assistant", parts: [{ text: aiText }] });

    fs.unlinkSync(req.file.path); // cleanup temp upload

    res.json({ message: aiText, audio: aiAudioBase64 });
  } catch (err) {
    console.error("Voice chat error:", err);
    res.status(500).json({ error: "Failed to process voice input" });
  }
};

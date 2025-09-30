// routes/chatRoutes.js
import { Router } from 'express';
import { chatWithBot, chatWithBotVoice } from '../controllers/chatbot.controller.js';
import { authenticateAPIKey } from '../middlewares/authenticateAPIKey.middleware.js';
import { handleVoiceChat } from "../controllers/voiceChatBot.controller.js";
import multer from "multer";
import WebSocket from "ws";

const router = Router();
//const upload = multer({ dest: "uploads/voice" });
//const upload = multer({ dest: "tmp/" });
const upload = multer({ dest: "uploads/" });

//router.post("/voice", upload.single("audio"), handleVoiceChat);
router.post('/chat', authenticateAPIKey, chatWithBot);
router.post("/chat/voice", upload.single("audio"), chatWithBotVoice);


// In-memory conversation
let conversationHistory = [];

// Endpoint to start a Gemini WebSocket session
router.post("/start-session", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // Request Gemini realtime session (this is HTTPS, returns WebSocket URL)
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-realtime:beginRealtimeSession",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    const data = await response.json();
    // data contains `wsUrl` (WebSocket URL) to connect
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to start session" });
  }
});



export default router;


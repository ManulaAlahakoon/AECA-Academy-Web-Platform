import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const textModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const voiceModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


// Handle text or voice (transcribed) messages
export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required." });

    const result = await textModel.generateContent({
      contents: [
        {
          role: "model",
          parts: [
            {
              text: `
-Have a friendly and casual tone.
-Have causal conversations.
-When user send a wrong sentence. Reply only the corrected sentence.
-When user send a incorrect word. Reply only the corrected word.
`
            }
          ]
        },
        {
          role: "user",
          parts: [{ text: message }]
        }
      ]
    });

    const aiResponse = result.response.text();

    // Remove any unexpected emojis or special chars just in case
    const cleanResponse = aiResponse.replace(/[^\w\s.,!?'-]/g, "");

    res.json({ message: cleanResponse });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to process input" });
  }
};

// Handle text messages
// export const chatWithBot = async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) return res.status(400).json({ error: "Message is required." });

//     const prompt = `
// Do not use emojis.And different special characters in answers.Give very short answers.Help with spoken english.english grammmer.If ask for pronounciation help do that"${message}"
// `;

//     const result = await textModel.generateContent(prompt);
//     const aiResponse = result.response.text();
//     res.json({ message: aiResponse });
//   } catch (err) {
//     console.error("Text chat error:", err);
//     res.status(500).json({ error: "Failed to process text input" });
//   }
// };

// Handle voice input
export const chatWithBotVoice = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Audio file required" });

    const audioFile = fs.readFileSync(req.file.path);
    const base64Audio = audioFile.toString("base64");

    const result = await voiceModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: "audio/webm", data: base64Audio } },
            {
              text: `
You are a friendly English tutor for voice chats.
Keep answers short, casual, and friendly.
Correct grammar or pronunciation simply if needed.
Ask one follow-up question.
`
            }
          ],
        },
      ],
    });

    const aiResponse = result.response.text();
    fs.unlinkSync(req.file.path); // cleanup temp file
    res.json({ message: aiResponse });
  } catch (err) {
    console.error("Voice chat error:", err);
    res.status(500).json({ error: "Failed to process voice input" });
  }
};

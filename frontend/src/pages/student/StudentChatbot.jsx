// File: src/pages/student/StudentChatbot.jsx
// import React from "react";
// const StudentChatbot = () => (
//   <div>
//     <h1 className="text-2xl font-bold mb-4">Chatbot Assistant</h1>
//     <p>Ask English or academic questions to your AI assistant here.</p>
//   </div>
// );
// export default StudentChatbot;

// src/pages/student/EnglishHelperChat.jsx
import React, { useState } from "react";
import { apiFetch } from "../../services/api";

const StudentChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "student", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // replace /api/student/chat with your real endpoint
      const res = await apiFetch("/api/student/chat", {
        method: "POST",
        body: JSON.stringify({ message: input }),
      });
      const botMessage = { role: "bot", content: res.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      alert("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold text-[#800000] mb-4 text-center">
         English Learning Assistant
      </h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === "student"
                ? "bg-[#800000] text-white self-end"
                : "bg-gray-100 text-gray-800 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-500">Typing...</div>}
      </div>

      <div className="flex mt-2 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask something about English..."
          className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#800000]"
        />
        <button
          onClick={sendMessage}
          className="bg-[#800000] hover:bg-[#660000] text-white px-4 py-2 rounded font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default StudentChatbot;

// src/pages/StudentChatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { apiPost } from "../../services/api.js";

const StudentChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const synth = window.speechSynthesis;
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /** 🎤 Voice Input */
  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition)
      return alert("Your browser does not support speech recognition!");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    let finalTranscript = "";
    setMessages((prev) => [
      ...prev,
      { text: "🎤 Listening...", sender: "user" },
    ]);

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        event.results[i].isFinal
          ? (finalTranscript += transcript)
          : (interimTranscript += transcript);
      }
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, text: finalTranscript + interimTranscript }
            : msg
        )
      );
    };

    recognition.onend = async () => {
      if (!finalTranscript) return;
      try {
        const data = await apiPost("/api/chat", { message: finalTranscript });
        const botMessage = { text: data.message, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);

        const utterance = new SpeechSynthesisUtterance(botMessage.text);
        utterance.lang = "en-US";
        synth.cancel();
        synth.speak(utterance);
      } catch (err) {
        console.error("Voice input error:", err);
      }
    };

    recognition.start();
  };

  /** Send Text Messages */
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setInput("");

    try {
      const data = await apiPost("/api/chat", { message });
      setMessages((prev) => [...prev, { text: data.message, sender: "bot" }]);
    } catch (err) {
      console.error("Text message error:", err);
    }
  };

return (
  <div className="max-w-4xl mx-auto flex flex-col h-screen p-6 bg-gray-50">
    {/* Header */}
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
      🤖 Englo
    </h1>

    {/* Chat Messages */}
    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white rounded-2xl shadow-inner">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex transition-all duration-300 ease-in-out ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-4 rounded-2xl max-w-xs md:max-w-md break-words shadow-sm border border-black transform transition-transform duration-200 ${
              msg.sender === "user"
                ? "bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 text-lg"
                : "bg-gradient-to-r from-green-200 to-green-400 text-green-900  text-lg"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>

    {/* Input & Buttons */}
    <div className="flex items-center mt-4 space-x-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
        placeholder="Type your message..."
        className="flex-grow p-3 border border-black rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-700"
      />

      <button
        onClick={() => handleSendMessage(input)}
        className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 border border-black text-white rounded-full hover:from-blue-300 hover:to-blue-400 shadow-md transition-all flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>

      <button
        onClick={startVoiceInput}
        className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 border border-black text-white rounded-full hover:from-green-300 hover:to-green-400 shadow-md transition-all flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 1C10 1 8 3 8 5v7a4 4 0 0 0 8 0V5c0-2-2-4-4-4zM5 10v2a7 7 0 0 0 14 0v-2M12 19v4"
          />
        </svg>
      </button>
    </div>
  </div>
);
};

export default StudentChatbot;

// import React, { useState, useRef, useEffect } from "react";
// import { apiPost } from "../../services/api.js";

// const StudentChatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const synth = window.speechSynthesis;
//   const recognitionRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   /** 🎤 Start Voice Input */
//   const startVoiceInput = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Your browser does not support speech recognition!");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = true;
//     recognition.continuous = false;
//     recognitionRef.current = recognition;

//     let finalTranscript = "";

//     // Placeholder in chat
//     setMessages((prev) => [
//       ...prev,
//       { text: "🎤 Listening...", sender: "user" },
//     ]);

//     recognition.onresult = (event) => {
//       let interimTranscript = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           finalTranscript += transcript;
//         } else {
//           interimTranscript += transcript;
//         }
//       }

//       // Update placeholder with current transcript
//       setMessages((prev) =>
//         prev.map((msg, idx) =>
//           idx === prev.length - 1
//             ? { ...msg, text: finalTranscript + interimTranscript }
//             : msg
//         )
//       );
//     };

//     recognition.onend = async () => {
//       if (!finalTranscript) return;

//       try {
//         // Send recognized text to backend
//         const data = await apiPost("/api/chat", { message: finalTranscript });
//         const botMessage = { text: data.message, sender: "bot" };
//         setMessages((prev) => [...prev, botMessage]);

//         // TTS only for voice input
//         const utterance = new SpeechSynthesisUtterance(botMessage.text);
//         utterance.lang = "en-US";
//         synth.cancel();
//         synth.speak(utterance);
//       } catch (err) {
//         console.error("Error sending voice text to bot:", err);
//       }
//     };

//     recognition.start();
//   };

//   /** Send Text Messages */
//   const handleSendMessage = async (message) => {
//     if (!message.trim()) return;

//     const userMessage = { text: message, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       const data = await apiPost("/api/chat", { message });
//       const botMessage = { text: data.message, sender: "bot" };
//       setMessages((prev) => [...prev, botMessage]);

//       //  NOT speak for text input
//     } catch (err) {
//       console.error("Error sending text:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50 p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">
//         English Helper Chat
//       </h1>

//       {/* Chat Messages */}
//       <div className="flex-grow overflow-y-auto p-4 space-y-3 border rounded-lg bg-white">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`p-3 rounded-lg max-w-xs md:max-w-md ${
//                 msg.sender === "user"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-100 text-gray-800"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input & Controls */}
//       <div className="flex items-center mt-4 space-x-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
//           className="flex-grow p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Type a message..."
//         />

//         <button
//           onClick={() => handleSendMessage(input)}
//           className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
//         >
//           ➤
//         </button>

//         <button
//           onClick={startVoiceInput}
//           className="p-3 rounded-full bg-purple-500 text-white hover:bg-purple-600"
//         >
//           🎙️
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudentChatbot;

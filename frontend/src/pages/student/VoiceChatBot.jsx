// src/pages/VoiceChatBot.jsx
import React, { useState, useRef } from "react";
import { apiPost } from "../../services/api";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

const VoiceChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunksRef = useRef([]);

  /** Send text input */
  const handleSendMessage = async (msg) => {
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { text: msg, sender: "user" }]);
    setInput("");
    try {
      const data = await apiPost("/api/chat", { message: msg });
      setMessages((prev) => [...prev, { text: data.message, sender: "bot" }]);
    } catch (err) {
      console.error(err);
    }
  };

  /** Start voice recording */
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      if (!blob.size) return;

      const formData = new FormData();
      formData.append("file", blob, "voice.webm");

      try {
        const data = await apiPost("/api/chat/voice", formData, {
          isFormData: true,
        });
        setMessages((prev) => [
          ...prev,
          { text: "🎤 Voice reply received", sender: "bot" },
        ]);

        const audio = new Audio(data.audioPath);
        audio.play();
      } catch (err) {
        console.error(err);
      }
    };

    recorder.start();
    setMediaRecorder(recorder);
  };

  /** Stop recording */
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-[#800000] mb-8 flex items-center justify-center gap-2">
        💬 AI Voice Chat
      </h1>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white rounded-xl shadow-inner">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md p-4 rounded-2xl shadow-md break-words ${
                msg.sender === "user"
                  ? "bg-[#800000] text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center p-4 mt-4 bg-white rounded-xl shadow-md space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
          placeholder="Type your message..."
          className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#800000] transition"
        />

        <button
          onClick={() => handleSendMessage(input)}
          className="p-3 bg-[#800000] text-white rounded-full hover:bg-[#a00000] transition-colors shadow-md"
        >
          <FaPaperPlane />
        </button>

        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          className={`p-3 rounded-full shadow-md transition-colors ${
            mediaRecorder
              ? "bg-red-500 text-white animate-pulse"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          <FaMicrophone />
        </button>
      </div>
    </div>
  );
};

export default VoiceChatBot;

// import React, { useState, useRef } from "react";
// import { apiPost } from "../../services/api";

// const VoiceChatBot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [isListening, setIsListening] = useState(false);

//   const audioChunksRef = useRef([]);

//   /** Send text input */
//   const handleSendMessage = async (msg) => {
//     if (!msg.trim()) return;
//     setMessages((prev) => [...prev, { text: msg, sender: "user" }]);
//     setInput("");
//     try {
//       const data = await apiPost("/api/chat", { message: msg });
//       setMessages((prev) => [...prev, { text: data.message, sender: "bot" }]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /** Start voice recording */
//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const recorder = new MediaRecorder(stream);
//     audioChunksRef.current = [];

//     recorder.ondataavailable = (e) => {
//       if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
//     };

//     recorder.onstop = async () => {
//       const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
//       if (!blob.size) return;

//       const formData = new FormData();
//       formData.append("file", blob, "voice.webm");

//       try {
//         const data = await apiPost("/api/chat/voice", formData, { isFormData: true });
//         setMessages((prev) => [...prev, { text: "🎤 Voice reply received", sender: "bot" }]);

//         // Play the voice response
//         const audio = new Audio(data.audioPath);
//         audio.play();
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     recorder.start();
//     setMediaRecorder(recorder);
//   };

//   /** Stop recording */
//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setMediaRecorder(null);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100 p-4">
//       <div className="flex-grow overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, i) => (
//           <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
//             <div className={`max-w-xs md:max-w-md p-4 rounded-lg shadow-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800"}`}>
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center p-4 space-x-2 bg-white rounded-lg shadow-inner">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
//           className="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Type or speak your message..."
//         />
//         <button onClick={() => handleSendMessage(input)} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">➤</button>

//         <button
//           onMouseDown={startRecording}
//           onMouseUp={stopRecording}
//           className={`p-2 rounded-full transition-colors ${mediaRecorder ? "bg-red-500 text-white" : "bg-purple-500 text-white"}`}
//         >
//           🎙️
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VoiceChatBot;

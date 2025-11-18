// import React, { useState, useRef, useEffect, useCallback } from "react";

// export default function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const API = "https://bbc543bffe48.ngrok-free.app"; 
//   //  Your API key — works for now, but move to .env before deployment
 
// //this is a problem to be solved as this things are to be done by the backend but as w3e don't have one yet we yeet
//   const messagesEndRef = useRef(null);

//   //  Auto-scroll to the latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   //  API call function
//   const generateResponse = useCallback(async (prompt) => {
//     try {
//       const res = await fetch(
//         "https://bbc543bffe48.ngrok-free.app",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
            
//           },
//           body: JSON.stringify({
//             messages: [
//               { role: "system", content: "You are a helpful AI assistant." },
//               { role: "user", content: prompt },
//             ],
//           }),
//         }
//       );
  
//       const data = await res.json();
//       console.log("API Response:", data);
  
//       if (!res.ok) {
//         console.error("API Error:", data);
//         return "⚠️ Error contacting AI.";
//       }
  
//       return data.choices?.[0]?.message?.content || "⚠️ No response received.";
//     } catch (error) {
//       console.error("Network/API Error:", error);
//       return "⚠️ Error contacting AI.";
//     }
//   }, []);
  
  
//   //  Handle sending message
//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     const reply = await generateResponse(input);

//     const botMessage = { role: "assistant", content: reply };
//     setMessages((prev) => [...prev, botMessage]);
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#0C0E14] text-white flex flex-col font-inter">
//       {/*  Chat Messages Area */}
//       <div className="flex-1 px-6 sm:px-10 md:px-20 lg:px-40 py-12 overflow-y-auto space-y-6">
//         <div className="max-w-3xl mx-auto w-full">
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`my-2 ${
//                 msg.role === "user" ? "ml-auto text-right" : "mr-auto text-left"
//               }`}
//             >
//               <div
//                 className={`px-5 py-3 rounded-lg inline-block text-sm md:text-base leading-relaxed border shadow-sm ${
//                   msg.role === "user"
//                     ? "bg-[#1A1F2B] border-white/10"
//                     : "bg-[#141821] border-white/5"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           ))}

//           {/*  Loading Indicator */}
//           {loading && (
//             <div className="bg-[#141821] border border-white/5 px-5 py-3 rounded-lg text-sm opacity-80 max-w-fit animate-pulse">
//               Fetching Response...
//             </div>
//           )}

//           <div ref={messagesEndRef}></div>
//         </div>
//       </div>

//       {/*  Input Bar */}
//       <div className="p-4 md:p-6 border-t border-white/10 bg-[#0C0E14] shadow-[0_-4px_12px_rgba(0,0,0,0.3)]">
//         <div className="max-w-3xl mx-auto flex items-center gap-3">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             className="flex-1 bg-[#141821] border border-white/10 px-4 py-3 rounded-lg outline-none text-white text-sm md:text-base placeholder:text-white/40 focus:border-white/20 transition"
//             placeholder="Type a message..."
//             disabled={loading}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={loading}
//             className={`px-6 py-3 rounded-lg text-sm md:text-base font-medium transition border ${
//               loading
//                 ? "bg-[#1A1F2B] border-white/10 cursor-not-allowed opacity-50"
//                 : "bg-[#1A1F2B] border-white/10 hover:border-white/20"
//             }`}
//           >
//             {loading ? "..." : "Send"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const API = "https://3e5a143542f3.ngrok-free.app";

  const lastResponseRef = useRef("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const res = await fetch(`${API}/get_response`);
        const data = await res.json();

        if (data.response && data.response !== lastResponseRef.current) {
          lastResponseRef.current = data.response;
          setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
          setLoading(false);
        }
      } catch (_) {}
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const text = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setLoading(true);

    await fetch(`${API}/send_prompt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
  };

  return (
    <div className="min-h-screen bg-[#0C0E14] text-white flex flex-col font-inter">
      <div className="flex-1 px-6 py-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
              <div
                className={`px-5 py-3 rounded-lg my-2 inline-block ${
                  msg.role === "user"
                    ? "bg-[#1A1F2B] border border-white/10"
                    : "bg-[#141821] border border-white/5"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="bg-[#141821] border border-white/5 px-5 py-3 rounded-lg opacity-70">
              Fetching response...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-white/10 bg-[#0C0E14]">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            className="flex-1 bg-[#141821] border border-white/10 px-4 py-3 rounded-lg"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-6 py-3 bg-[#1A1F2B] border border-white/10 rounded-lg"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

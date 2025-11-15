import React, { useState, useRef, useEffect, useCallback } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  //  Your API key — works for now, but move to .env before deployment
  const OPENROUTER_KEY =
    "dhappa";
//this is a problem to be solved as this things are to be done by the backend but as w3e don't have one yet we yeet
  const messagesEndRef = useRef(null);

  //  Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //  API call function
  const generateResponse = useCallback(async (prompt) => {
    try {
      const res = await fetch(
        "https://cors-anywhere.herokuapp.com/https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
            "HTTP-Referer": window.location.origin,
            "X-Title": "Nexus",
          },
          body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct",
            messages: [
              { role: "system", content: "You are a helpful AI assistant." },
              { role: "user", content: prompt },
            ],
          }),
        }
      );
  
      const data = await res.json();
      console.log("API Response:", data);
  
      if (!res.ok) {
        console.error("API Error:", data);
        return "⚠️ Error contacting AI.";
      }
  
      return data.choices?.[0]?.message?.content || "⚠️ No response received.";
    } catch (error) {
      console.error("Network/API Error:", error);
      return "⚠️ Error contacting AI.";
    }
  }, []);
  
  
  //  Handle sending message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const reply = await generateResponse(input);

    const botMessage = { role: "assistant", content: reply };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0C0E14] text-white flex flex-col font-inter">
      {/*  Chat Messages Area */}
      <div className="flex-1 px-6 sm:px-10 md:px-20 lg:px-40 py-12 overflow-y-auto space-y-6">
        <div className="max-w-3xl mx-auto w-full">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 ${
                msg.role === "user" ? "ml-auto text-right" : "mr-auto text-left"
              }`}
            >
              <div
                className={`px-5 py-3 rounded-lg inline-block text-sm md:text-base leading-relaxed border shadow-sm ${
                  msg.role === "user"
                    ? "bg-[#1A1F2B] border-white/10"
                    : "bg-[#141821] border-white/5"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/*  Loading Indicator */}
          {loading && (
            <div className="bg-[#141821] border border-white/5 px-5 py-3 rounded-lg text-sm opacity-80 max-w-fit animate-pulse">
              Fetching Response...
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>
      </div>

      {/*  Input Bar */}
      <div className="p-4 md:p-6 border-t border-white/10 bg-[#0C0E14] shadow-[0_-4px_12px_rgba(0,0,0,0.3)]">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-[#141821] border border-white/10 px-4 py-3 rounded-lg outline-none text-white text-sm md:text-base placeholder:text-white/40 focus:border-white/20 transition"
            placeholder="Type a message..."
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className={`px-6 py-3 rounded-lg text-sm md:text-base font-medium transition border ${
              loading
                ? "bg-[#1A1F2B] border-white/10 cursor-not-allowed opacity-50"
                : "bg-[#1A1F2B] border-white/10 hover:border-white/20"
            }`}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

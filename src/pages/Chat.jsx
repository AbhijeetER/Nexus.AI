import React, { useState, useRef, useEffect, useCallback } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // API CALL (memoized to avoid recreation)
  const generateResponse = useCallback(async (prompt) => {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
      });

      const data = await res.json();
      console.log("API response:",data);
      return data.choices?.[0]?.message?.content || "No response.";
    } catch (error) {
      console.error("API Error:", error);
      return "⚠️ Error contacting AI.";
    }
  }, []);

  // Clean message handler
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

  {/* CHAT MESSAGES AREA */}
  <div className="flex-1 px-100 py-10 overflow-y-auto space-y-6">
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`max-w-2xl ${
          msg.role === "user" ? "ml-auto text-right" : "mr-auto"
        }`}
      >
        <div
          className={`px-4 py-3 rounded-lg inline-block text-sm leading-relaxed border ${
            msg.role === "user"
              ? "bg-[#1A1F2B] border-white/10"
              : "bg-[#141821] border-white/5"
          }`}
        >
          {msg.content}
        </div>
      </div>
    ))}

    {loading && (
      <div className="max-w-2xl bg-[#141821] border border-white/5 px-4 py-3 rounded-lg text-xl opacity-80">
        Fetching Response...
      </div>
    )}

    <div ref={messagesEndRef}></div>
  </div>

  {/* INPUT BAR */}
  <div className="p-20 border-t border-white/10 bg-[#0C0E14] shadow-[0_-4px_12px_rgba(0,0,0,0.3)]">
    <div className="max-w-2xl mx-auto flex items-center gap-3">

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        className="flex-1 bg-[#141821] border border-white/10 px-4 py-3 rounded-lg outline-none text-white text-xl placeholder:text-white/40 focus:border-white/20 transition"
        placeholder="Type a message..."
        disabled={loading}
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className={`px-5 py-3 rounded-lg text-sm font-medium transition border ${
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
  )}
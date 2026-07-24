import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Activity, Radio, HelpCircle } from "lucide-react";

interface Message {
  sender: "user" | "ai";
  text: string;
  isFallback?: boolean;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Deep Sea Core Node online. I am the SUBMERGE Intelligence Core. Ask me anything regarding ocean profiles, telemetry, biological species, or chemical levels."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setLoading(true);

    try {
      // 1. Attempt server-side proxy route hit
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { sender: "ai", text: data.response }]);
      } else {
        // Falling back to local offline responder if server route error
        throw new Error("Server route response not ok");
      }
    } catch (err) {
      // 2. Usability Fallback - Keyword Intent Matching Responder
      const reply = getFallbackResponse(userText);
      setMessages((prev) => [...prev, { sender: "ai", text: reply, isFallback: true }]);
    } finally {
      setLoading(false);
    }
  };

  // Local rule-based keyword responder matching core ocean themes
  const getFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("whale") || q.includes("sperm")) {
      return "The Sperm Whale (Physeter macrocephalus) is our primary epipelagic cetacean surveillance target. They hunt giant squid at depths of 2,250m and communicate using complex acoustic click 'codas' which function as regional dialets. We monitor their calls using our Station Alpha deep-sea hydrophone arrays.";
    }
    if (q.includes("shark") || q.includes("whale shark")) {
      return "Our taxonomic directory includes the Whale Shark (Rhincodon typus), a giant filter feeder holding vulnerable/endangered status. We also track Great Whites (Carcharodon carcharias) using electro-receptory telemetry. Their populations are heavily affected by commercial longline bycatch.";
    }
    if (q.includes("jelly") || q.includes("pulsar")) {
      return "The Midnight Pulsar (Atolla wyvillei) is a bioluminescent bathypelagic jellyfish residing at 1,000m - 4,000m depth. When under attack, it emits concentric, neon-glowing wave signals designed to attract larger apex predators to eat its attacker. Incredible survival engineering!";
    }
    if (q.includes("plastic") || q.includes("trash") || q.includes("waste")) {
      return "Global oceans hold an average density of over 12,000 synthetic resin fragments per square kilometer. PET plastic bottles and commercial ghost nets constitute over 59% of retrieved materials. We are deploying a fleet of autonomous micro-filtration booms to absorb these resins in Pacific gyre sills.";
    }
    if (q.includes("chemical") || q.includes("pfas") || q.includes("mercury")) {
      return "Current telemetry shows Mercury (Hg) levels at 0.08 mg/L and PFAS (forever chemicals) compounds at 1.84 µg/L in Pacific Sector 7G, both significantly exceeding safe biological limits. This leads to calcification blockages in Lophelia deep corals and bioaccumulates severely.";
    }
    if (q.includes("recovery") || q.includes("clean") || q.includes("save")) {
      return "Our AI predictive models indicate that by reducing global industrial inputs by 65% and deploying automated filtration booms within 36 months, the Pacific basin can achieve 100% biological recovery within 12 years. View our interactive 'Recovery Plan' module in the Intelligence Core dashboard.";
    }
    if (q.includes("about") || q.includes("company") || q.includes("submerge") || q.includes("abyss")) {
      return "SUBMERGE Deep Sea Exploration Co. was founded in 2020 to merge deep-sea robotics, acoustic monitoring, and automated ecological rehabilitation into a single synchronized surveillance platform.";
    }

    // Default polite response
    return "Fascinating query! In standalone/offline mode, I can explain species (Sperm Whale, Midnight Pulsar, Coral reefs), chemicals (PFAS, Mercury levels), plastic densities, recovery timeline strategies, or company history. Try asking about any of those, or connect your Gemini API key in secrets to unlock global AI reasoning!";
  };

  const presetPrompts = [
    "Tell me about the Sperm Whale.",
    "What is the Midnight Pulsar?",
    "Show Pacific PFAS chemical risk.",
    "How does the Ocean Recovery plan work?"
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-display">
      {/* 1. FLOATING ACTION BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-neon-aqua to-ocean-blue text-deep-black flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.7)] hover:scale-105 active:scale-95 transition-all focus:outline-none relative group min-h-[56px] min-w-[56px]"
        title="Open ABYSS AI Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        <span className="absolute inset-0 rounded-full bg-neon-aqua/20 animate-ping pointer-events-none"></span>

        {/* Floating subtle badge tip */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-safe-green text-[9px] font-black text-deep-black flex items-center justify-center border border-deep-black animate-bounce">
            !
          </span>
        )}
      </button>

      {/* 2. CHAT DRAWER PANEL */}
      {isOpen && (
        <div className="absolute bottom-16 sm:bottom-18 right-0 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] h-[460px] sm:h-[480px] max-h-[75vh] rounded-2xl glass-panel border border-neon-aqua/20 shadow-2xl flex flex-col justify-between overflow-hidden animate-scale-up z-50">
          {/* Header */}
          <div className="p-4 bg-deep-navy/80 border-b border-soft-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-aqua animate-pulse" />
              <div>
                <span className="font-extrabold text-sm text-soft-white tracking-wide block">
                  ABYSS Intelligence Core
                </span>
                <span className="text-[9px] font-mono text-neon-aqua flex items-center gap-1 uppercase tracking-widest leading-none">
                  <Radio className="w-2.5 h-2.5 text-neon-aqua animate-pulse" /> Satellite Synchronized
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-soft-white/40 hover:text-neon-aqua transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Logs Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-deep-black/35 font-sans">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                    msg.sender === "user"
                      ? "bg-neon-aqua/10 border-neon-aqua/20 text-neon-aqua rounded-tr-none"
                      : "bg-deep-navy/40 border-soft-white/5 text-soft-white/80 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.isFallback && (
                  <span className="text-[8px] font-display font-bold uppercase tracking-widest text-soft-white/30 mt-1">
                    Standalone Satellite Backup
                  </span>
                )}
              </div>
            ))}

            {/* Simulated generation pulsing dot */}
            {loading && (
              <div className="mr-auto items-start max-w-[80%] flex flex-col">
                <div className="bg-deep-navy/40 border border-soft-white/5 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-aqua animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-aqua animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-aqua animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Prompt presets list */}
          {messages.length === 1 && (
            <div className="p-3 bg-deep-black/60 border-t border-soft-white/5 space-y-1.5">
              <span className="text-[9px] font-display font-bold uppercase tracking-wider text-soft-white/40 block flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-neon-aqua" /> Research Suggestions:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {presetPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(p)}
                    className="p-2 rounded bg-deep-navy/40 border border-soft-white/5 text-[10px] text-soft-white/70 hover:text-neon-aqua hover:border-neon-aqua/30 transition-all text-left truncate leading-tight"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form message sender input */}
          <form onSubmit={handleSend} className="p-3 bg-deep-navy/80 border-t border-soft-white/10 flex gap-2">
            <input
              type="text"
              required
              placeholder="Query the ABYSS Core node..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow px-3 py-2.5 rounded-xl bg-deep-black/50 border border-soft-white/5 text-soft-white placeholder-soft-white/30 text-xs sm:text-sm focus:outline-none focus:border-neon-aqua/50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3 rounded-xl bg-neon-aqua text-deep-black flex items-center justify-center hover:bg-neon-aqua/80 transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

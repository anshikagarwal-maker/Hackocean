import React, { useState, useEffect } from "react";
import { Mail, ArrowRight, ShieldCheck, Github, Radio, Shield } from "lucide-react";

interface FooterProps {
  setRoute: (route: string) => void;
}

const oceanQuotes = [
  "“The sea, once it casts its spell, holds one in its net of wonder forever.” — Jacques Cousteau",
  "“Deep ocean exploration is not a luxury; it is a vital necessity for the future of our biosphere.”",
  "“With every drop of water you drink, every breath you take, you're connected to the sea.” — Sylvia Earle",
  "“In the dark abyss of the deep, life finds its most radiant bioluminescent ways to shine.”",
  "“We know more about the surface of the Moon than we do about the deepest trenches of our own planet.”",
];

export default function Footer({ setRoute }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Randomize quote every page reload or after 15 seconds
    setQuoteIndex(Math.floor(Math.random() * oceanQuotes.length));
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % oceanQuotes.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");
    }
  };

  const handleNav = (id: string) => {
    setRoute(id);
    window.location.hash = `#/${id}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer role="contentinfo" className="relative bg-deep-black border-t border-neon-aqua/20 pt-20 pb-10 overflow-hidden">
      {/* Submarine water ripple lighting effect in background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,78,146,0.15),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-aqua to-ocean-blue rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-sm text-deep-black">A</span>
              </div>
              <span className="font-display font-black text-2xl tracking-tighter text-neon-aqua">
                ABYSS
              </span>
            </div>
            <p className="text-soft-white/60 text-sm leading-relaxed max-w-sm">
              ABYSS Deep Sea Exploration Co. is a pioneering, fictional ocean intelligence platform dedicated to acoustic surveillance, biodiversity cataloging, and automated environmental recovery simulation.
            </p>
            {/* Rotating Quote Panel */}
            <div className="p-4 rounded-xl bg-deep-navy/30 border border-soft-white/5 italic text-xs text-soft-white/50 leading-relaxed max-w-sm">
              {oceanQuotes[quoteIndex]}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs tracking-[0.2em] text-neon-aqua uppercase">
              Surveillance Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav("explore")}
                  className="text-soft-white/60 hover:text-neon-aqua transition-colors focus:outline-none"
                >
                  Hotspot Telemetry Picker
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("dashboard")}
                  className="text-soft-white/60 hover:text-neon-aqua transition-colors focus:outline-none"
                >
                  Intelligence Core Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("biodiversity")}
                  className="text-soft-white/60 hover:text-neon-aqua transition-colors focus:outline-none"
                >
                  Benthic Taxonomic Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("about")}
                  className="text-soft-white/60 hover:text-neon-aqua transition-colors focus:outline-none"
                >
                  Research Timeline & Mission
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-xs tracking-[0.2em] text-neon-aqua uppercase">
              Telemetry Dispatch
            </h4>
            <p className="text-soft-white/60 text-sm">
              Subscribe to receive weekly encrypted logs of deep-sea discoveries and environmental updates.
            </p>
            {subscribed ? (
              <div className="p-4 rounded-xl bg-safe-green/10 border border-safe-green/20 text-safe-green text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Log established. Station subscription active.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative mt-2">
                <input
                  type="email"
                  required
                  placeholder="enter researcher email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-deep-navy/40 border border-soft-white/10 text-soft-white placeholder-soft-white/30 text-sm focus:outline-none focus:border-neon-aqua/50 pr-12 focus:ring-1 focus:ring-neon-aqua/25"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1.5 rounded-lg bg-neon-aqua text-deep-black hover:bg-neon-aqua/80 transition-colors focus:outline-none"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <div className="flex gap-4 pt-2">
              <span className="text-[10px] text-soft-white/40 flex items-center gap-1.5 uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 text-neon-aqua animate-pulse" /> Nodes online: 12/12
              </span>
              <span className="text-[10px] text-soft-white/40 flex items-center gap-1.5 uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5 text-safe-green" /> SSL Protected Encryption
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-soft-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-soft-white/40 font-display">
          <div>
            <p>© 2026 ABYSS OCEAN INTELLIGENCE PLATFORM. SECURED DEMO CASE STUDY.</p>
            <p className="text-[10px] mt-1 text-soft-white/30">All ecological data and company narratives are simulated for hackathon evaluation.</p>
          </div>
          <div className="flex gap-6">
            <button onClick={() => handleNav("about")} className="hover:text-neon-aqua transition-colors">
              Exploration Manifesto
            </button>
            <button onClick={() => handleNav("contact")} className="hover:text-neon-aqua transition-colors">
              Secure Terminals
            </button>
            <span className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5" /> github.com/abyss-intel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

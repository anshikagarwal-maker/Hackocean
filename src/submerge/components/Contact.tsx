import React, { useState } from "react";
import { MessageSquare, Mail, MapPin, Radio, ShieldCheck, ArrowRight, Activity, Terminal } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sector: "general",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative min-h-screen flex flex-col justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,229,255,0.03),transparent_50%)] pointer-events-none" />

      {/* Header section */}
      <div className="text-center md:text-left max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-aqua/10 text-neon-aqua text-xs font-display font-bold uppercase tracking-widest">
          <MessageSquare className="w-3.5 h-3.5" /> Contact Base Terminal
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-soft-white tracking-tight">
          Secure Command Center
        </h1>
        <p className="text-soft-white/70">
          Have an inquiry regarding deep-sea surveillance nodes, taxonomic catalog partnerships, or automated filtration deployments? Send an encrypted dispatch directly to ABYSS Station Alpha.
        </p>
      </div>

      {/* Grid of Contact form vs Office coordinate details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start my-auto">
        {/* Contact Form Section (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-2xl glass-panel border border-soft-white/5 relative">
          {submitted ? (
            /* Submission Success Panel */
            <div className="py-12 text-center space-y-6 animate-scale-up">
              <div className="w-16 h-16 rounded-full bg-safe-green/10 border border-safe-green/20 flex items-center justify-center mx-auto text-safe-green animate-pulse">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-2xl text-soft-white">
                Dispatch Logged Securely
              </h3>
              <p className="text-soft-white/60 text-sm max-w-md mx-auto leading-relaxed">
                Your message has been converted to an encrypted ultrasonic signal and transmitted to Station Alpha. Our research team will respond on secure satellite channels shortly.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", sector: "general", message: "" });
                  }}
                  className="px-6 py-2.5 rounded-full border border-neon-aqua/20 hover:border-neon-aqua/50 text-neon-aqua text-xs font-display font-bold tracking-wider uppercase transition-colors"
                >
                  TRANSMIT ANOTHER DISPATCH
                </button>
              </div>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-display font-bold uppercase tracking-wider text-soft-white/50 block">
                    Researcher / Entity Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Aronnax"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-deep-navy/40 border border-soft-white/10 text-soft-white placeholder-soft-white/20 text-sm focus:outline-none focus:border-neon-aqua/50 focus:ring-1 focus:ring-neon-aqua/25"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-display font-bold uppercase tracking-wider text-soft-white/50 block">
                    Secure Return Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="aronnax@research-base.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-deep-navy/40 border border-soft-white/10 text-soft-white placeholder-soft-white/20 text-sm focus:outline-none focus:border-neon-aqua/50 focus:ring-1 focus:ring-neon-aqua/25"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-display font-bold uppercase tracking-wider text-soft-white/50 block">
                  Surveillance Category / Subject
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-deep-navy/40 border border-soft-white/10 text-soft-white text-sm focus:outline-none focus:border-neon-aqua/50 focus:ring-1 focus:ring-neon-aqua/25"
                >
                  <option value="general" className="bg-deep-black text-soft-white">General Inquiries / Partnerships</option>
                  <option value="nodes" className="bg-deep-black text-soft-white">Benthic Node Telemetry Access</option>
                  <option value="biodiversity" className="bg-deep-black text-soft-white">Taxonomic Research Collaboration</option>
                  <option value="cleanup" className="bg-deep-black text-soft-white">Autonomous Filtration Booms Deployment</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-display font-bold uppercase tracking-wider text-soft-white/50 block">
                  Encrypted Dispatch Content
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="type your transmission details here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-deep-navy/40 border border-soft-white/10 text-soft-white placeholder-soft-white/20 text-sm focus:outline-none focus:border-neon-aqua/50 focus:ring-1 focus:ring-neon-aqua/25 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-neon-aqua text-deep-black font-display font-black tracking-wider text-xs shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <span>TRANSMIT ENCRYPTED PING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Base office details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-2xl glass-panel border border-soft-white/5 space-y-6">
            <h3 className="font-display font-black text-xl text-soft-white">
              Primary Surveillance Stations
            </h3>

            <div className="space-y-5 text-sm">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-neon-aqua/10 flex items-center justify-center text-neon-aqua flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="font-display font-bold text-soft-white block">Station Alpha (Pacific Hub)</span>
                  <p className="text-xs text-soft-white/60">Located 1,200 nautical miles south of Honshu, Japan. Coordinating deep Mariana Trench node tracking.</p>
                  <span className="text-[10px] font-mono text-neon-aqua block">Coordinates: 11.3493° N | 142.1996° E</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-safe-green/10 flex items-center justify-center text-safe-green flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="font-display font-bold text-soft-white block">Station Beta (Atlantic Shelf)</span>
                  <p className="text-xs text-soft-white/60">Floating platform near the Azores Ridge, tracking biological soundscapes and heavy-metal runoffs.</p>
                  <span className="text-[10px] font-mono text-safe-green block">Coordinates: 38.5393° N | 28.6295° W</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secure system indicators terminal card */}
          <div className="p-6 rounded-2xl bg-deep-black border border-neon-aqua/20 space-y-3 font-mono text-xs text-neon-aqua">
            <div className="flex items-center gap-2 border-b border-soft-white/5 pb-2">
              <Terminal className="w-4 h-4" />
              <span className="font-display font-bold text-[10px] tracking-wider uppercase">Secure System Diagnostics</span>
            </div>
            <div className="space-y-1 text-soft-white/50 text-[11px]">
              <p>&gt; SECURE_SSL_VPN_ON: TRUE</p>
              <p>&gt; ENCRYPTION_SHA256: ACTIVE</p>
              <p>&gt; SATELLITE_LINK_AZORES_ALPHA: BUFF_94%</p>
              <p>&gt; DIRECT_SIGNAL: SECURED_FREQUENCY_94.2MHz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

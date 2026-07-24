import React, { useState } from "react";
import { Info, Award, Compass, Heart, Anchor, ShieldCheck, Check, HelpCircle, Activity } from "lucide-react";
import { timelineMilestones } from "../data/mockData";

export default function About() {
  const [activeYear, setActiveYear] = useState<string>("2024");

  const activeMilestone = timelineMilestones.find((m) => m.year === activeYear) || timelineMilestones[0];

  return (
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative min-h-screen">
      {/* Ambient background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.04),transparent_50%)] pointer-events-none" />

      {/* Header section */}
      <div className="text-center md:text-left max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-aqua/10 text-neon-aqua text-xs font-display font-bold uppercase tracking-widest">
          <Info className="w-3.5 h-3.5" /> Exploration Manifesto
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-soft-white tracking-tight">
          About SUBMERGE Exploration Co.
        </h1>
        <p className="text-soft-white/70">
          We are pioneers of deep-sea acoustic monitoring and automated ecological preservation. Leveraging state-of-the-art sensory grids and robotic fleets, we reveal the mysteries of the subsea ocean.
        </p>
      </div>

      {/* Mission & Vision Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl glass-panel border border-soft-white/5 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-neon-aqua/10 flex items-center justify-center text-neon-aqua">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <h3 className="font-display font-black text-2xl text-soft-white">
            Our Core Exploration Mission
          </h3>
          <p className="text-soft-white/70 text-sm leading-relaxed">
            To map the unknown, catalog planetary biodiversity in deep benthic trenches, and monitor structural chemical changes across core oceanic basins. We believe deep-sea surveillance is a crucial scientific baseline for safeguarding the biosphere.
          </p>
          <ul className="space-y-2 text-xs text-soft-white/60 font-display">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-aqua" />
              <span>Full compliance with maritime non-intrusion directives.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-aqua" />
              <span>Acoustic tracking of apex species with zero auditory disruption.</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl glass-panel border border-soft-white/5 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-safe-green/10 flex items-center justify-center text-safe-green">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-display font-black text-2xl text-soft-white">
            Ecosystem Preservation Vision
          </h3>
          <p className="text-soft-white/70 text-sm leading-relaxed">
            Developing next-generation autonomous micro-filtration platforms to sweep toxic forever-chemicals and floating resins. We envision a future where sovereign marine sanctuaries are digitally monitored and actively restored in real time.
          </p>
          <ul className="space-y-2 text-xs text-soft-white/60 font-display">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-safe-green" />
              <span>Autonomous solar-powered ocean-filtration booms.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-safe-green" />
              <span>Collaborative modeling with leading maritime science unions.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* TIMELINE SECTION */}
      <section className="space-y-8">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-[10px] font-display font-bold tracking-wider text-soft-white/40 uppercase">
            Active Archives
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-soft-white">
            Milestones & Surveillance Roadmap
          </h3>
          <p className="text-sm text-soft-white/60">
            Select a milestone year on our active roadmap to retrieve chronological achievement summaries.
          </p>
        </div>

        {/* Timeline year nodes selector */}
        <div className="flex justify-center sm:justify-start overflow-x-auto hide-scrollbar border-b border-soft-white/10 pb-4 gap-2 sm:gap-4">
          {timelineMilestones.map((m) => (
            <button
              key={m.year}
              onClick={() => setActiveYear(m.year)}
              className={`px-5 py-2.5 rounded-xl font-display text-sm font-bold tracking-wider uppercase border transition-all ${
                activeYear === m.year
                  ? "bg-neon-aqua text-deep-black border-neon-aqua shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                  : "bg-deep-navy/30 border-soft-white/5 text-soft-white/60 hover:text-neon-aqua hover:border-neon-aqua/30"
              }`}
            >
              {m.year}
            </button>
          ))}
        </div>

        {/* Active year milestone card */}
        {activeMilestone && (
          <div className="p-8 rounded-2xl glass-panel border border-neon-aqua/10 shadow-xl bg-gradient-to-r from-deep-navy/40 to-deep-black grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-scale-up">
            <div className="md:col-span-3 text-center md:text-left space-y-1">
              <span className="font-display font-black text-6xl sm:text-8xl text-neon-aqua tracking-tighter drop-shadow-[0_0_15px_rgba(0,229,255,0.25)] block">
                {activeMilestone.year}
              </span>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider border ${
                activeMilestone.status === "completed"
                  ? "bg-safe-green/10 border-safe-green/20 text-safe-green"
                  : activeMilestone.status === "ongoing"
                  ? "bg-neon-aqua/10 border-neon-aqua/20 text-neon-aqua"
                  : "bg-warning-yellow/10 border-warning-yellow/20 text-warning-yellow"
              }`}>
                {activeMilestone.status === "completed" ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Accomplished
                  </>
                ) : (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-pulse" /> Active Deployment
                  </>
                )}
              </span>
            </div>

            <div className="md:col-span-9 space-y-4">
              <h4 className="font-display font-black text-2xl sm:text-3xl text-soft-white leading-tight">
                {activeMilestone.title}
              </h4>
              <p className="text-soft-white/70 text-sm leading-relaxed">
                {activeMilestone.description}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Strategic Vision statement strip */}
      <section className="p-8 rounded-2xl glass-panel border border-soft-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 bg-deep-black text-xs text-soft-white/40 font-display">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-safe-green" />
          <span>Fictional platform framework optimized for hackathon evaluation and technical audits.</span>
        </div>
        <div className="flex items-center gap-1.5 uppercase font-bold text-soft-white tracking-widest">
          <Anchor className="w-4 h-4 text-neon-aqua" /> SECURED CODES ACTIVE
        </div>
      </section>
    </div>
  );
}

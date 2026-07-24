import React, { useState } from "react";
import { Shield, Eye, Scale, Compass, Filter, Sparkles, X, Activity, Info, MapPin } from "lucide-react";
import { speciesData } from "../data/mockData";
import { Species } from "../types";

export default function Biodiversity() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  const categories = [
    { id: "all", label: "All Species" },
    { id: "whales", label: "Whales & Cetaceans" },
    { id: "sharks", label: "Apex Sharks" },
    { id: "deepsea", label: "Bioluminescent / Deep Sea" },
    { id: "corals", label: "Fragile Corals" },
  ];

  const filteredSpecies =
    selectedCategory === "all"
      ? speciesData
      : speciesData.filter((s) => s.category === selectedCategory);

  const getThreatColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "critical":
      case "critically endangered":
      case "endangered":
        return "bg-danger-red/10 text-danger-red border-danger-red/20 shadow-[0_0_10px_rgba(255,75,43,0.1)]";
      case "high":
      case "vulnerable":
        return "bg-warning-yellow/10 text-warning-yellow border-warning-yellow/20";
      default:
        return "bg-safe-green/10 text-safe-green border-safe-green/20";
    }
  };

  return (
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative min-h-screen">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,126,167,0.06),transparent_60%)] pointer-events-none" />

      {/* Header section */}
      <div className="text-center md:text-left max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-aqua/10 text-neon-aqua text-xs font-display font-bold uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" /> Benthic Taxonomic Directory
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-soft-white tracking-tight">
          Species Biodiversity Explorer
        </h1>
        <p className="text-soft-white/70">
          Trace pelagic migration corridors and examine biological specifics. Explore the physical dimensions, feeding profiles, and ecological threat ratings of deep-sea organisms cataloged by SUBMERGE.
        </p>
      </div>

      {/* Filters/Categories List */}
      <div className="flex flex-wrap gap-2 items-center border-b border-soft-white/10 pb-4">
        <span className="text-xs font-display font-bold uppercase tracking-widest text-soft-white/40 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-neon-aqua" /> Filter By:
        </span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full font-display text-xs font-bold tracking-wider uppercase transition-all border ${
              selectedCategory === cat.id
                ? "bg-neon-aqua text-deep-black border-neon-aqua shadow-[0_0_12px_rgba(0,229,255,0.25)]"
                : "bg-deep-navy/30 border-soft-white/5 text-soft-white/60 hover:text-neon-aqua hover:border-neon-aqua/30"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Species Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSpecies.map((species) => (
          <div
            key={species.id}
            onClick={() => setSelectedSpecies(species)}
            className="group rounded-2xl overflow-hidden glass-panel border border-soft-white/5 cursor-pointer shadow-lg hover:border-neon-aqua/30 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Container with Zoom effect */}
            <div className="relative h-56 overflow-hidden bg-deep-navy/40">
              <img
                src={species.imageUrl}
                alt={species.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-transparent to-transparent" />

              {/* Float Category Tag */}
              <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-deep-black/60 backdrop-blur border border-soft-white/10 text-[9px] font-display font-bold tracking-wider uppercase text-neon-aqua">
                {species.category}
              </span>
            </div>

            {/* Profile Info block */}
            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-display font-black text-xl text-soft-white group-hover:text-neon-aqua transition-colors">
                    {species.name}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-display font-bold uppercase border ${getThreatColor(species.conservationStatus)}`}>
                    {species.conservationStatus}
                  </span>
                </div>
                <p className="font-display italic text-xs text-soft-white/40 leading-none">
                  {species.scientificName}
                </p>
              </div>

              {/* Technical indicators */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-soft-white/5 font-display text-xs">
                <div>
                  <span className="text-[10px] text-soft-white/40 uppercase block tracking-wider">Depth Range:</span>
                  <span className="text-soft-white font-bold">{species.depthRangeM}</span>
                </div>
                <div>
                  <span className="text-[10px] text-soft-white/40 uppercase block tracking-wider">Primary Diet:</span>
                  <span className="text-soft-white font-bold truncate block" title={species.diet}>{species.diet}</span>
                </div>
              </div>

              {/* View detail hover tip */}
              <div className="pt-2 flex justify-end text-[10px] font-display font-bold uppercase tracking-widest text-neon-aqua opacity-0 group-hover:opacity-100 transition-opacity items-center gap-1">
                <span>Synchronize logs</span> <Eye className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAILED TAXONOMIC MODAL OVERLAY */}
      {selectedSpecies && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-4xl rounded-2xl glass-panel border border-neon-aqua/20 overflow-hidden shadow-2xl animate-scale-up my-8 max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSpecies(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-deep-black/60 border border-soft-white/10 text-soft-white/80 hover:text-neon-aqua transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto custom-scrollbar">
              {/* Image banner */}
              <div className="relative h-64 sm:h-80 w-full bg-deep-navy/30">
                <img
                  src={selectedSpecies.imageUrl}
                  alt={selectedSpecies.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 sm:left-10 space-y-1">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-display font-black uppercase tracking-wider border ${getThreatColor(selectedSpecies.conservationStatus)}`}>
                    {selectedSpecies.conservationStatus}
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-5xl text-soft-white">
                    {selectedSpecies.name}
                  </h2>
                  <p className="font-display italic text-sm sm:text-base text-neon-aqua/80">
                    {selectedSpecies.scientificName}
                  </p>
                </div>
              </div>

              {/* Body particulars Grid */}
              <div className="p-6 sm:p-10 space-y-8">
                {/* Specific stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-deep-navy/30 border border-soft-white/5">
                    <span className="text-[10px] font-display font-bold text-soft-white/40 uppercase tracking-wider block">Zone Depth Range:</span>
                    <span className="font-display font-bold text-sm text-soft-white mt-1 block">{selectedSpecies.depthRangeM}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-deep-navy/30 border border-soft-white/5">
                    <span className="text-[10px] font-display font-bold text-soft-white/40 uppercase tracking-wider block">Consumables profile:</span>
                    <span className="font-display font-bold text-xs text-soft-white mt-1 block truncate" title={selectedSpecies.diet}>{selectedSpecies.diet}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-deep-navy/30 border border-soft-white/5">
                    <span className="text-[10px] font-display font-bold text-soft-white/40 uppercase tracking-wider block">Bathyal Habitat:</span>
                    <span className="font-display font-bold text-xs text-soft-white mt-1 block truncate" title={selectedSpecies.habitat}>{selectedSpecies.habitat}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-deep-navy/30 border border-soft-white/5">
                    <span className="text-[10px] font-display font-bold text-soft-white/40 uppercase tracking-wider block">Eco Threat Level:</span>
                    <span className="font-display font-bold text-sm text-warning-yellow mt-1 block flex items-center gap-1">
                      <Activity className="w-4 h-4 text-warning-yellow" /> {selectedSpecies.threatLevel}
                    </span>
                  </div>
                </div>

                {/* Biological specific facts */}
                <div className="space-y-4">
                  <h4 className="font-display font-extrabold text-lg text-neon-aqua flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-neon-aqua animate-pulse" /> Diagnostic Field Facts
                  </h4>
                  <div className="space-y-3">
                    {selectedSpecies.facts.map((fact, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-deep-black border border-soft-white/5 flex gap-3 text-xs leading-relaxed text-soft-white/80"
                      >
                        <span className="text-neon-aqua font-bold font-display text-sm">0{index + 1} //</span>
                        <p>{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance banner */}
                <div className="p-4 rounded-xl bg-neon-aqua/5 border border-neon-aqua/10 flex items-center gap-2.5 text-xs text-soft-white/50 leading-relaxed font-sans">
                  <Info className="w-5 h-5 text-neon-aqua flex-shrink-0" />
                  <span>Telemetry logged via Station Alpha. Taxonomic data models are constantly synchronized with global marine sanctuaries.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Compass, MapPin, Radio, Activity, ArrowRight, Shield, Anchor } from "lucide-react";
import { oceanProfiles, liveTelemetries } from "../data/mockData";
import { CircularGauge } from "./CustomChart";

interface ExploreProps {
  setRoute: (route: string) => void;
  setSelectedOceanId: (id: string) => void;
}

export default function Explore({ setRoute, setSelectedOceanId }: ExploreProps) {
  const [selectedOceanId, LocalSetSelectedOceanId] = useState<string | null>("pacific");

  const selectedOcean = oceanProfiles.find((o) => o.id === selectedOceanId);
  const selectedTelemetry = liveTelemetries.find((t) => t.oceanId === selectedOceanId);

  const hotspots = [
    { id: "pacific", name: "Pacific Ocean Zone", top: "45%", left: "15%", health: 62 },
    { id: "atlantic", name: "Atlantic Ocean Zone", top: "35%", left: "45%", health: 58 },
    { id: "indian", name: "Indian Ocean Zone", top: "55%", left: "68%", health: 68 },
    { id: "arctic", name: "Arctic Cryosphere Zone", top: "12%", left: "50%", health: 48 },
    { id: "southern", name: "Southern Antarctic Zone", top: "85%", left: "50%", health: 88 },
  ];

  const handleHotspotClick = (id: string) => {
    LocalSetSelectedOceanId(id);
  };

  const handleDeepDive = (id: string) => {
    setSelectedOceanId(id);
    setRoute(`ocean/${id}`);
    window.location.hash = `#/ocean/${id}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative min-h-screen flex flex-col justify-between gap-8 sm:gap-12">
      {/* Page Header */}
      <div className="text-center md:text-left max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-aqua/10 text-neon-aqua text-xs font-display font-bold uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5 animate-spin-slow" /> Hotspot Telemetry Picker
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-soft-white tracking-tight">
          Global Oceans Surveillance Map
        </h1>
        <p className="text-soft-white/70">
          Synchronize with deep-sea nodes. Select a biological surveillance target hotspot on the vector grid to retrieve live physical, chemical, and ecological health telemetry.
        </p>
      </div>

      {/* Main Map & Profile Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        {/* Interactive Map Visual (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl glass-panel relative h-[360px] sm:h-[480px] border border-soft-white/5 overflow-hidden flex items-center justify-center">
          {/* Neon Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* Abstract Ocean Map Vector Illustration */}
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full opacity-20 pointer-events-none scale-105"
            fill="none"
            stroke="rgba(0, 229, 255, 0.15)"
            strokeWidth={1.5}
          >
            {/* Outline Continent 1 (North America / South America) */}
            <path d="M 120,50 C 140,40 180,60 160,110 C 140,160 180,210 200,240 C 220,270 230,340 210,380 C 190,420 170,450 150,470 L 140,470 C 130,420 120,380 130,320 C 140,260 110,210 100,160 C 90,110 100,60 120,50 Z" />
            {/* Outline Continent 2 (Eurasia / Africa) */}
            <path d="M 450,40 C 490,40 550,50 620,60 C 690,70 750,110 740,160 C 730,210 680,220 650,260 C 620,300 660,350 640,390 C 620,430 550,450 510,430 C 470,410 480,360 460,320 C 440,280 410,270 410,220 C 410,170 430,120 420,80 C 410,40 430,40 450,40 Z" />
            {/* Outline Continent 3 (Australia) */}
            <path d="M 800,320 C 830,310 860,330 850,360 C 840,390 810,410 780,390 C 750,370 770,330 800,320 Z" />
            {/* Depth trench circles */}
            <circle cx="210" cy="220" r="100" stroke="rgba(0, 78, 146, 0.08)" strokeWidth="4" strokeDasharray="5,5" />
            <circle cx="580" cy="240" r="120" stroke="rgba(0, 78, 146, 0.08)" strokeWidth="4" strokeDasharray="5,5" />
          </svg>

          {/* Interactive hotspots overlay */}
          {hotspots.map((spot) => {
            const isSelected = selectedOceanId === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => handleHotspotClick(spot.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none z-20 group"
                style={{ top: spot.top, left: spot.left }}
              >
                {/* Ping rings */}
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isSelected
                        ? "bg-neon-aqua/30 animate-pulse-ring"
                        : "bg-soft-white/10 group-hover:bg-neon-aqua/20"
                    }`}
                  />
                  <div
                    className={`w-3.5 h-3.5 rounded-full border border-deep-black shadow-md transition-all duration-300 ${
                      isSelected
                        ? "bg-neon-aqua scale-125 shadow-[0_0_15px_#00E5FF]"
                        : "bg-soft-white/50 group-hover:bg-neon-aqua"
                    }`}
                  />
                  {/* Label Tooltip */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-deep-black/90 backdrop-blur border border-soft-white/10 px-2.5 py-1 rounded-md text-[10px] font-display font-bold tracking-wider uppercase text-soft-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                    {spot.name}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Bottom Left Grid coordinates indicator */}
          <div className="absolute bottom-4 left-4 font-display text-[9px] text-soft-white/30 tracking-widest uppercase">
            Surveillance Grid: L3-HADOPELAGIC | NODE_STATION_ALPHA
          </div>
        </div>

        {/* Selected Hotspot Profile Panel (4 cols) */}
        {selectedOcean && selectedTelemetry && (
          <div className="lg:col-span-4 p-8 rounded-2xl glass-panel border border-neon-aqua/10 shadow-xl space-y-6 flex flex-col justify-between min-h-[480px]">
            {/* Header / Name */}
            <div className="space-y-1.5 pb-4 border-b border-soft-white/5">
              <span className="text-[10px] font-display font-black tracking-[0.2em] text-neon-aqua uppercase flex items-center gap-1">
                <Radio className="w-3 h-3 text-neon-aqua animate-pulse" /> Live Telemetry Synced
              </span>
              <h2 className="font-display font-black text-3xl text-soft-white">
                {selectedOcean.name}
              </h2>
              <div className="flex gap-4 pt-1 font-display text-[10px] text-soft-white/40 tracking-wider uppercase">
                <span>Lat: {selectedOcean.id === "pacific" ? "11.34° N" : selectedOcean.id === "atlantic" ? "18.22° N" : "24.50° S"}</span>
                <span>Long: {selectedOcean.id === "pacific" ? "142.20° E" : selectedOcean.id === "atlantic" ? "66.45° W" : "78.15° E"}</span>
              </div>
            </div>

            {/* Health Meter circular gauge overlay */}
            <div className="flex items-center justify-between gap-4 py-2">
              <div className="space-y-1">
                <div className="text-xs font-display font-bold text-soft-white/40 uppercase tracking-widest">
                  Overall Health Score
                </div>
                <div className="text-2xl font-display font-black text-neon-aqua">
                  {selectedTelemetry.oceanHealth >= 70 ? "Healthy" : selectedTelemetry.oceanHealth >= 50 ? "Moderate" : "Critical"}
                </div>
                <p className="text-[11px] text-soft-white/50 leading-snug">
                  Composite metrics representing chemical, coral, and biodiversity health index levels.
                </p>
              </div>
              <CircularGauge
                percentage={selectedTelemetry.oceanHealth}
                size={96}
                strokeWidth={7}
                glowColor={
                  selectedTelemetry.oceanHealth >= 80
                    ? "#00FF94"
                    : selectedTelemetry.oceanHealth >= 55
                    ? "#00E5FF"
                    : "#FF4B2B"
                }
                subtitle="Health"
              />
            </div>

            {/* Quick Profile stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-deep-navy/30 rounded-xl border border-soft-white/5">
                <div className="text-[9px] font-display font-bold text-soft-white/40 uppercase tracking-wider">
                  Oceanic Area Size
                </div>
                <div className="font-display font-black text-sm text-soft-white mt-1">
                  {(selectedOcean.areaKm2 / 1000000).toFixed(1)}M sq km
                </div>
              </div>

              <div className="p-3 bg-deep-navy/30 rounded-xl border border-soft-white/5">
                <div className="text-[9px] font-display font-bold text-soft-white/40 uppercase tracking-wider">
                  Deepest Point
                </div>
                <div className="font-display font-black text-xs text-soft-white mt-1 leading-tight truncate" title={selectedOcean.deepestPointName}>
                  {selectedOcean.deepestPointName}
                </div>
                <div className="font-display text-[10px] text-neon-aqua">
                  {selectedOcean.deepestPointM.toLocaleString()} m
                </div>
              </div>

              <div className="p-3 bg-deep-navy/30 rounded-xl border border-soft-white/5">
                <div className="text-[9px] font-display font-bold text-soft-white/40 uppercase tracking-wider">
                  Marine Species Catalog
                </div>
                <div className="font-display font-black text-sm text-soft-white mt-1">
                  {selectedOcean.marineSpeciesCount.toLocaleString()}+
                </div>
              </div>

              <div className="p-3 bg-deep-navy/30 rounded-xl border border-soft-white/5">
                <div className="text-[9px] font-display font-bold text-soft-white/40 uppercase tracking-wider">
                  Station Base Count
                </div>
                <div className="font-display font-black text-sm text-soft-white mt-1">
                  {selectedOcean.researchStations} active stations
                </div>
              </div>
            </div>

            {/* Deep dive CTA */}
            <button
              onClick={() => handleDeepDive(selectedOcean.id)}
              className="w-full py-4 rounded-xl bg-neon-aqua text-deep-black font-display font-extrabold tracking-wider text-xs shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>SYNC INTELLIGENCE NODE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Mandatory compliance check badge */}
      <div className="mt-12 p-4 rounded-xl bg-deep-navy/20 border border-soft-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-soft-white/40 font-display">
        <div className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-safe-green" />
          <span>Active GPS-tagged surveillance grid covering all 5 core deep-sea basins globally.</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-neon-aqua animate-pulse" /> 12 SECURE NODES ACTIVE
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Activity,
  Trash2,
  Compass,
  AlertTriangle,
  Award,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Info,
  Layers,
  Thermometer,
  Sparkles,
  Droplet,
  Percent,
  CheckSquare,
  ShieldAlert,
  Zap,
  DollarSign
} from "lucide-react";
import {
  oceanProfiles,
  liveTelemetries,
  wasteAnalyticsData,
  wasteMaterials,
  chemicalsData,
  healthIndices,
  recoveryPlans,
  waterReuseAssessments,
  pollutionSourcesData,
  aiReports
} from "../data/mockData";
import { CircularGauge, LineAreaChart, HorizontalProgressBar, RadarChart } from "./CustomChart";

interface DashboardProps {
  oceanId?: string;
}

export default function Dashboard({ oceanId = "pacific" }: DashboardProps) {
  const [currentOceanId, setCurrentOceanId] = useState<string>(oceanId);
  const [timeRange, setTimeRange] = useState<"weekly" | "monthly">("monthly");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When external prop changes, update current ocean
    setCurrentOceanId(oceanId);
  }, [oceanId]);

  const handleOceanChange = (id: string) => {
    setLoading(true);
    setCurrentOceanId(id);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450); // Simulated sonar sync delay
    return () => clearTimeout(timer);
  };

  // Get current dataset
  const profile = oceanProfiles.find((o) => o.id === currentOceanId) || oceanProfiles[0];
  const telemetry = liveTelemetries.find((t) => t.oceanId === currentOceanId) || liveTelemetries[0];
  const wasteAnalytics = wasteAnalyticsData.find((w) => w.oceanId === currentOceanId) || wasteAnalyticsData[0];
  const chemicals = chemicalsData[currentOceanId] || chemicalsData["pacific"];
  const healthIndex = healthIndices.find((h) => h.oceanId === currentOceanId) || healthIndices[0];
  const recovery = recoveryPlans.find((r) => r.oceanId === currentOceanId) || recoveryPlans[0];
  const pollutionSources = pollutionSourcesData[currentOceanId] || pollutionSourcesData["pacific"];
  const aiReport = aiReports[currentOceanId] || aiReports["pacific"];

  return (
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.05),transparent_50%)] pointer-events-none" />

      {/* TOP NAVIGATION CHIPS SELECTOR */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-soft-white/10">
        <div className="text-left space-y-1.5 w-full sm:w-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-aqua/10 text-neon-aqua text-xs font-display font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> Intelligence Core Synced
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-soft-white tracking-tight">
            Surveillance Telemetry Dashboard
          </h1>
          <p className="text-xs text-soft-white/50 tracking-wider font-display uppercase">
            Active Ocean Node: <span className="text-neon-aqua">{profile.name}</span>
          </p>
        </div>

        {/* Ocean Selector Tabs */}
        <div className="flex flex-wrap gap-2 justify-start sm:justify-end w-full sm:w-auto overflow-x-auto hide-scrollbar pb-1">
          {oceanProfiles.map((ocean) => (
            <button
              key={ocean.id}
              onClick={() => handleOceanChange(ocean.id)}
              className={`px-4 py-2 rounded-full font-display text-xs font-bold tracking-wider uppercase transition-all duration-300 border ${
                currentOceanId === ocean.id
                  ? "bg-neon-aqua text-deep-black border-neon-aqua shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                  : "bg-deep-navy/40 border-soft-white/5 text-soft-white/60 hover:text-neon-aqua hover:border-neon-aqua/30"
              }`}
            >
              {ocean.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        /* SKELETON LOADER WITH SONAR SWEEP */
        <div className="py-40 flex flex-col items-center justify-center space-y-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-2 border-neon-aqua rounded-full animate-pulse-ring"></div>
            <div className="absolute inset-2 border border-neon-aqua/50 rounded-full animate-spin"></div>
            <div className="absolute inset-4 bg-neon-aqua rounded-full animate-pulse"></div>
          </div>
          <div className="font-display font-bold text-xs tracking-[0.25em] text-neon-aqua uppercase animate-pulse">
            Establishing Satellite Uplink...
          </div>
        </div>
      ) : (
        /* MAIN BENTO DASHBOARD GRID */
        <div className="space-y-10">
          {/* 10.A & 10.B SECTION: OVERVIEW & TELEMETRY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 10.A Ocean Overview Card (4 cols) */}
            <div className="lg:col-span-4 p-8 rounded-2xl glass-panel border border-soft-white/5 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-display font-bold tracking-wider text-soft-white/40 uppercase">
                  Section 10.A // Benthic Profile
                </span>
                <h2 className="font-display font-black text-3xl text-soft-white">
                  {profile.name}
                </h2>
                <p className="text-sm text-soft-white/60 leading-relaxed">
                  Deep oceanic profile cataloged during Project SUBMERGE. Under continuous autonomous surveillance.
                </p>
              </div>

              {/* Data parameters list */}
              <div className="space-y-3 pt-4 border-t border-soft-white/5 text-xs font-display">
                <div className="flex justify-between">
                  <span className="text-soft-white/50 uppercase">Area Size:</span>
                  <span className="text-soft-white font-bold">{(profile.areaKm2 / 1000000).toFixed(1)}M km²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-white/50 uppercase">Avg Depth:</span>
                  <span className="text-soft-white font-bold">{profile.averageDepthM.toLocaleString()} m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-white/50 uppercase">Deepest Point:</span>
                  <span className="text-neon-aqua font-bold">{profile.deepestPointName} ({profile.deepestPointM.toLocaleString()}m)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-white/50 uppercase">Base Temperature:</span>
                  <span className="text-soft-white font-bold">{profile.averageTempC}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-white/50 uppercase">Mean Salinity:</span>
                  <span className="text-soft-white font-bold">{profile.salinityPpt} ppt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-white/50 uppercase">Protected Zones:</span>
                  <span className="text-safe-green font-bold">{profile.protectedZones} sectors</span>
                </div>
              </div>
            </div>

            {/* 10.B Live Telemetry Cards (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Health block */}
              <div className="p-6 rounded-2xl glass-panel border border-soft-white/5 relative overflow-hidden group">
                <div className="absolute top-4 right-4 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-safe-green"></span>
                </div>
                <div className="text-[9px] font-display font-bold text-soft-white/40 uppercase tracking-widest">
                  Live Ocean Health Index
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display font-black text-4xl text-soft-white">
                    {telemetry.oceanHealth}
                  </span>
                  <span className="text-xs text-soft-white/40">/ 100</span>
                </div>
                {/* Trend sparkline simulation */}
                <div className="mt-4 flex gap-1 items-end h-8">
                  {telemetry.oceanHealthTrend.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-neon-aqua/20 hover:bg-neon-aqua transition-colors rounded-sm"
                      style={{ height: `${t}%` }}
                      title={`Trend point: ${t}%`}
                    />
                  ))}
                </div>
              </div>

              {/* Pollution index block */}
              <div className="p-6 rounded-2xl glass-panel border border-soft-white/5 relative overflow-hidden">
                <div className="text-[9px] font-display font-bold text-soft-white/40 uppercase tracking-widest">
                  Toxic Pollution Index
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display font-black text-4xl text-warning-yellow">
                    {telemetry.pollutionIndex}
                  </span>
                  <span className="text-xs text-soft-white/40">/ 100</span>
                </div>
                {/* Sparkline */}
                <div className="mt-4 flex gap-1 items-end h-8">
                  {telemetry.pollutionIndexTrend.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-warning-yellow/20 hover:bg-warning-yellow transition-colors rounded-sm"
                      style={{ height: `${t}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Water Temperature block */}
              <div className="p-6 rounded-2xl glass-panel border border-soft-white/5">
                <div className="text-[9px] font-display font-bold text-soft-white/40 uppercase tracking-widest flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-neon-aqua" /> Epipelagic Temperature
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display font-black text-4xl text-soft-white">
                    {telemetry.waterTempC}°C
                  </span>
                  <span className="text-xs text-soft-white/40">Mean Surface</span>
                </div>
                {/* Sparkline */}
                <div className="mt-4 flex gap-1 items-end h-8">
                  {telemetry.waterTempCTrend.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-neon-aqua/20 hover:bg-neon-aqua transition-colors rounded-sm"
                      style={{ height: `${t * 4}%` }} // Scale factor for presentation
                    />
                  ))}
                </div>
              </div>

              {/* Coral Health block */}
              <div className="p-6 rounded-2xl glass-panel border border-soft-white/5">
                <div className="text-[9px] font-display font-bold text-soft-white/40 uppercase tracking-widest">
                  Coral Reef Health Score
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display font-black text-4xl text-soft-white">
                    {telemetry.coralHealth}%
                  </span>
                  <span className="text-xs text-soft-white/40">Calcification</span>
                </div>
                {/* Sparkline */}
                <div className="mt-4 flex gap-1 items-end h-8">
                  {telemetry.coralHealthTrend.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-neon-aqua/20 hover:bg-neon-aqua transition-colors rounded-sm"
                      style={{ height: `${t}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Plastic density block */}
              <div className="p-6 rounded-2xl glass-panel border border-soft-white/5">
                <div className="text-[9px] font-display font-bold text-soft-white/40 uppercase tracking-widest">
                  Plastic Density / km²
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display font-black text-3xl text-warning-yellow">
                    {telemetry.plasticDensityPerKm2.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-soft-white/40">Resin count</span>
                </div>
                <div className="mt-4 p-2 bg-deep-black/30 border border-soft-white/5 rounded-xl text-[10px] flex justify-between items-center text-soft-white/60">
                  <span>Current Flow Rate:</span>
                  <span className="text-neon-aqua font-display font-bold tracking-wider">CRITICAL</span>
                </div>
              </div>

              {/* Expedition status block */}
              <div className="p-6 rounded-2xl glass-panel border border-soft-white/5 flex flex-col justify-between">
                <div>
                  <div className="text-[9px] font-display font-bold text-soft-white/40 uppercase tracking-widest">
                    Expedition Status
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-aqua/10 text-neon-aqua text-xs font-display font-bold uppercase mt-2 border border-neon-aqua/20">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> {telemetry.expeditionStatus}
                  </div>
                </div>
                <div className="text-[10px] text-soft-white/40 leading-snug">
                  Sat-linked echo probes reporting active biological sweeps.
                </div>
              </div>
            </div>
          </div>

          {/* 10.C & 10.D SECTION: WASTE PRODUCTION & MATERIALS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 10.C Waste Production Analytics (7 cols) */}
            <div className="lg:col-span-7 p-8 rounded-2xl glass-panel border border-soft-white/5 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-display font-bold tracking-wider text-soft-white/40 uppercase">
                    Section 10.C // Surrounding Residue
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-soft-white">
                    Waste Accumulation Analytics
                  </h3>
                </div>
                {/* Time frame toggle */}
                <div className="flex gap-1.5 p-1 bg-deep-navy/40 rounded-full border border-soft-white/5">
                  <button
                    onClick={() => setTimeRange("weekly")}
                    className={`px-3 py-1 rounded-full font-display text-[10px] font-bold tracking-wider uppercase transition-colors ${
                      timeRange === "weekly"
                        ? "bg-neon-aqua text-deep-black"
                        : "text-soft-white/60 hover:text-soft-white"
                    }`}
                  >
                    7D
                  </button>
                  <button
                    onClick={() => setTimeRange("monthly")}
                    className={`px-3 py-1 rounded-full font-display text-[10px] font-bold tracking-wider uppercase transition-colors ${
                      timeRange === "monthly"
                        ? "bg-neon-aqua text-deep-black"
                        : "text-soft-white/60 hover:text-soft-white"
                    }`}
                  >
                    30D
                  </button>
                </div>
              </div>

              {/* Interactive Line area chart */}
              <div className="pt-4">
                <LineAreaChart
                  data={wasteAnalytics.timeSeries}
                  dataKeys={["plastic", "ghostNets", "industrial"]}
                  colors={["#00E5FF", "#FFD200", "#FF4B2B"]}
                  height={200}
                />
              </div>

              {/* Custom Legends */}
              <div className="flex justify-center gap-6 text-xs pt-2">
                <div className="flex items-center gap-1.5 text-soft-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-aqua" />
                  <span>Plastic Bottle Resins</span>
                </div>
                <div className="flex items-center gap-1.5 text-soft-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-warning-yellow" />
                  <span>Nylon Fishing Nets</span>
                </div>
                <div className="flex items-center gap-1.5 text-soft-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-danger-red" />
                  <span>Heavy Metal Industrial Runoffs</span>
                </div>
              </div>
            </div>

            {/* Fictional Companies disclaimer / Sector focus (5 cols) */}
            <div className="lg:col-span-5 p-8 rounded-2xl glass-panel border border-soft-white/5 flex flex-col justify-between space-y-6 bg-gradient-to-br from-deep-navy/30 to-deep-black">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-danger-red/10 border border-danger-red/20 text-danger-red text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-display font-bold">ETHICAL WATCH PROTOCOL ACTIVE</span>
                </div>
                <h3 className="font-display font-extrabold text-xl text-soft-white">
                  General Industrial Sectors Focus
                </h3>
                <p className="text-soft-white/70 text-sm leading-relaxed">
                  In compliance with safety and non-relational guidelines, our models trace global waste inputs solely by industrial sectors.
                </p>
                <p className="text-soft-white/70 text-sm leading-relaxed">
                  If simulated corporate entities are referenced for telemetry modeling (e.g., <span className="text-neon-aqua font-semibold">OceanPlast Industries</span> or <span className="text-neon-aqua font-semibold">BlueWave Shipping</span>), these represent strictly synthetic datasets designed to evaluate predictive confidence levels without implicating real-world companies.
                </p>
              </div>

              <div className="pt-4 border-t border-soft-white/5 flex items-center gap-2.5 text-xs text-soft-white/40 uppercase font-display tracking-widest">
                <ShieldCheck className="w-4.5 h-4.5 text-safe-green" /> 100% RELIABLE SIMULATION SHIELD
              </div>
            </div>
          </div>

          {/* 10.D SECTION: WASTE MATERIAL BREAKDOWN */}
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-display font-bold tracking-wider text-soft-white/40 uppercase">
                Section 10.D // Material Breakdown
              </span>
              <h3 className="font-display font-extrabold text-2xl text-soft-white">
                Active Benthic Waste Materials
              </h3>
              <p className="text-sm text-soft-white/60">
                Detailed catalog of the most prevalent synthetic compounds retrieved and classified by our autonomous benthic cleanup probes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wasteMaterials.map((material) => (
                <div
                  key={material.id}
                  className="p-6 rounded-2xl glass-panel glass-panel-hover border border-soft-white/5 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-display font-bold text-base text-neon-aqua leading-snug">
                        {material.name}
                      </h4>
                      <span className="px-2.5 py-1 rounded bg-neon-aqua/10 border border-neon-aqua/20 text-neon-aqua font-display font-bold text-xs tracking-wider">
                        {material.percentage}%
                      </span>
                    </div>
                    <div className="text-[10px] font-display font-bold tracking-wider text-soft-white/40 uppercase">
                      Primary Source: <span className="text-soft-white/60">{material.source}</span>
                    </div>
                  </div>

                  <p className="text-xs text-soft-white/70 leading-relaxed italic">
                    {material.impact}
                  </p>

                  <div className="pt-3 border-t border-soft-white/5 flex justify-between items-center text-[10px] font-display tracking-wider">
                    <span className="text-soft-white/40 uppercase">Decomposition Cycle:</span>
                    <span className="text-warning-yellow font-bold">{material.decompositionTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 10.E & 10.F SECTION: CHEMICAL COMPOSITION & OVERALL INDEX */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 10.E Chemical Composition Analysis (7 cols) */}
            <div className="lg:col-span-7 p-8 rounded-2xl glass-panel border border-soft-white/5 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-display font-bold tracking-wider text-soft-white/40 uppercase">
                  Section 10.E // Aquatic Chemistry
                </span>
                <h3 className="font-display font-extrabold text-xl text-soft-white">
                  Chemical Compound Analytics
                </h3>
                <p className="text-xs text-soft-white/50 leading-relaxed">
                  Real-time molecular load tracking inside current sector layers, evaluating potential reproductive and calcification failure risks.
                </p>
              </div>

              <div className="space-y-5 pt-2">
                {chemicals.map((chem) => (
                  <div key={chem.id} className="space-y-2 p-4 rounded-xl bg-deep-navy/20 border border-soft-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-extrabold text-neon-aqua">{chem.name}</span>
                        <span className="text-[10px] font-mono opacity-40">({chem.formula})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-soft-white/50">Current:</span>
                        <span className={`font-display font-bold ${
                          chem.dangerLevel === "critical" ? "text-danger-red" : chem.dangerLevel === "warning" ? "text-warning-yellow" : "text-safe-green"
                        }`}>
                          {chem.currentLevel} {chem.unit}
                        </span>
                        <span className="text-soft-white/30 text-[10px]">(Safe limit: {chem.safeLimit})</span>
                      </div>
                    </div>
                    {/* Progress representation */}
                    <div className="h-1.5 w-full bg-deep-black/50 rounded-full overflow-hidden relative">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          chem.dangerLevel === "critical"
                            ? "bg-danger-red shadow-[0_0_8px_#FF4B2B]"
                            : chem.dangerLevel === "warning"
                            ? "bg-warning-yellow"
                            : "bg-safe-green"
                        }`}
                        style={{ width: `${Math.min((chem.currentLevel / (chem.safeLimit || 1)) * 30, 100)}%` }} // Scaling for graphical fit
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-[10px] text-soft-white/50 pt-1 font-sans">
                      <div>
                        <span className="font-display font-bold uppercase tracking-wider block text-soft-white/30 text-[9px]">Marine impact:</span>
                        <p className="leading-snug text-[11px]">{chem.marineImpact}</p>
                      </div>
                      <div>
                        <span className="font-display font-bold uppercase tracking-wider block text-soft-white/30 text-[9px]">Trophic hazard:</span>
                        <p className="leading-snug text-[11px]">{chem.humanImpact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 10.F Ocean Health Index overall gauge (5 cols) */}
            <div className="lg:col-span-5 p-8 rounded-2xl glass-panel border border-soft-white/5 space-y-6 flex flex-col justify-between items-center text-center">
              <div className="space-y-1 w-full text-left">
                <span className="text-[10px] font-display font-bold tracking-wider text-soft-white/40 uppercase">
                  Section 10.F // Index Compilation
                </span>
                <h3 className="font-display font-extrabold text-xl text-soft-white">
                  Ocean Health Index (OHI)
                </h3>
              </div>

              <div className="relative my-auto py-4">
                <CircularGauge
                  percentage={healthIndex.overallScore}
                  size={160}
                  strokeWidth={11}
                  glowColor={
                    healthIndex.classification === "Healthy"
                      ? "#00FF94"
                      : healthIndex.classification === "Moderate"
                      ? "#00E5FF"
                      : "#FF4B2B"
                  }
                  subtitle={healthIndex.classification}
                />
              </div>

              {/* Sub-metrics bars */}
              <div className="w-full space-y-3.5 pt-4 border-t border-soft-white/5">
                <HorizontalProgressBar
                  label="Water Purity Index"
                  value={healthIndex.waterQuality}
                  max={100}
                />
                <HorizontalProgressBar
                  label="Cold/Bathyal Coral Calcification"
                  value={healthIndex.coralHealth}
                  max={100}
                  colorClass="bg-safe-green"
                />
                <HorizontalProgressBar
                  label="Benthic Biodiversity Rating"
                  value={healthIndex.biodiversity}
                  max={100}
                  colorClass="bg-neon-aqua"
                />
                <div className="flex justify-between text-[10px] font-display tracking-widest text-soft-white/40 uppercase pt-1">
                  <span>Chemical Risk: {100 - healthIndex.chemicalRisk}%</span>
                  <span>Oxygen Content: {healthIndex.oxygenLevel}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 10.G AI RECOVERY RECOMMENDATION TIMELINE */}
          <section className="p-8 rounded-2xl glass-panel border border-soft-white/5 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-display font-bold tracking-wider text-soft-white/40 uppercase">
                Section 10.G // Ecological Mitigation
              </span>
              <h3 className="font-display font-extrabold text-2xl text-soft-white">
                AI Simulated Ecosystem Recovery Plan
              </h3>
            </div>

            {recovery.recoverable ? (
              /* RECOVERABLE LAYOUT */
              <div className="space-y-6">
                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                  <div className="p-4 rounded-xl bg-deep-navy/30 border border-soft-white/5">
                    <div className="text-[10px] font-display font-bold text-soft-white/40 uppercase tracking-wider">
                      Projected Recovery Time
                    </div>
                    <div className="font-display font-black text-2xl text-neon-aqua mt-1">
                      {recovery.estimatedRecoveryTimeYears} Years
                    </div>
                    <p className="text-[11px] text-soft-white/50 mt-1">Simulated time under constant filtration intervention.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-deep-navy/30 border border-soft-white/5">
                    <div className="text-[10px] font-display font-bold text-soft-white/40 uppercase tracking-wider">
                      Required Cleanups
                    </div>
                    <div className="font-display font-black text-2xl text-neon-aqua mt-1">
                      {recovery.requiredCleanupTons?.toLocaleString()} Tons
                    </div>
                    <p className="text-[11px] text-soft-white/50 mt-1">Estimated synthetic resin mass required for removal.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-deep-navy/30 border border-soft-white/5">
                    <div className="text-[10px] font-display font-bold text-soft-white/40 uppercase tracking-wider">
                      Projected Improvement
                    </div>
                    <div className="font-display font-black text-2xl text-safe-green mt-1">
                      +{recovery.expectedHealthImprovementPercent}% Health
                    </div>
                    <p className="text-[11px] text-soft-white/50 mt-1">Overall OHI score improvement within active zones.</p>
                  </div>
                </div>

                {/* Checklist Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-5 rounded-xl bg-deep-black/40 border border-soft-white/5 space-y-3">
                    <span className="text-[11px] font-display font-bold tracking-wider text-neon-aqua uppercase flex items-center gap-1.5">
                      <CheckSquare className="w-4 h-4" /> Technical/Marine Actions
                    </span>
                    <ul className="space-y-2 text-xs text-soft-white/70">
                      {(recovery.conservationSteps ?? []).map((step, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-neon-aqua font-bold">&gt;&gt;</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-deep-black/40 border border-soft-white/5 space-y-3">
                    <span className="text-[11px] font-display font-bold tracking-wider text-neon-aqua uppercase flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-safe-green" /> Legal / Sovereign Protections
                    </span>
                    <ul className="space-y-2 text-xs text-soft-white/70">
                      {(recovery.governmentMeasures ?? []).map((measure, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-safe-green font-bold">&gt;&gt;</span>
                          <span>{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              /* NON-RECOVERABLE LAYOUT */
              <div className="p-6 rounded-xl bg-danger-red/10 border border-danger-red/30 space-y-6">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-8 h-8 text-danger-red animate-pulse" />
                  <div>
                    <h4 className="font-display font-black text-lg text-danger-red uppercase tracking-wider">
                      {recovery.criticalWarning}
                    </h4>
                    <p className="text-xs text-soft-white/60">Ecosystem has breached critical irreversible tipping cycles.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-3">
                    <span className="text-xs font-display font-black text-soft-white uppercase tracking-wider block">
                      Emergency Isolation Mandates:
                    </span>
                    <ul className="space-y-2 text-xs text-soft-white/70">
                      {recovery.emergencyMeasures?.map((m, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-danger-red font-bold">&gt;&gt;</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-display font-black text-soft-white uppercase tracking-wider block">
                      Long-Term Preservations:
                    </span>
                    <p className="text-xs text-soft-white/70 leading-relaxed bg-deep-black/30 p-3 rounded-lg border border-soft-white/5">
                      {recovery.longTermRecoveryPlan}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {recovery.suggestedConservationZones?.map((z, i) => (
                        <span key={i} className="text-[9px] font-display font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-danger-red/10 border border-danger-red/20 text-danger-red">
                          {z}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 10.H SECTION: WATER REUSABILITY ASSESSMENT */}
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-display font-bold tracking-wider text-soft-white/40 uppercase">
                Section 10.H // Water Reusability
              </span>
              <h3 className="font-display font-extrabold text-2xl text-soft-white">
                Extracted Water Reusability Index
              </h3>
              <p className="text-sm text-soft-white/60">
                Evaluating physical, chemical, and micro-particle purity to assess suitability of recovered oceanside runoffs for domestic, industrial, and agricultural usage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {waterReuseAssessments.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl glass-panel glass-panel-hover border border-soft-white/5 space-y-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-display font-bold text-base text-soft-white">
                      {item.application}
                    </h4>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-display font-black uppercase tracking-wider border ${
                      item.safetyRating === "Excellent"
                        ? "bg-safe-green/10 border-safe-green/20 text-safe-green"
                        : item.safetyRating === "Good"
                        ? "bg-neon-aqua/10 border-neon-aqua/20 text-neon-aqua"
                        : "bg-warning-yellow/10 border-warning-yellow/20 text-warning-yellow"
                    }`}>
                      {item.safetyRating}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-display text-soft-white/40 uppercase">Suitability Rating:</span>
                      <span className="font-display font-black text-xl text-neon-aqua">{item.suitabilityScore}%</span>
                    </div>
                    {/* Tiny visual progress bar */}
                    <div className="h-1 w-full bg-deep-black/30 rounded-full overflow-hidden">
                      <div className="h-full bg-neon-aqua rounded-full" style={{ width: `${item.suitabilityScore}%` }} />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-soft-white/5 flex justify-between items-center text-xs font-display text-soft-white/50">
                    <div className="flex items-center gap-1.5">
                      <Droplet className="w-3.5 h-3.5 text-soft-white/30" />
                      <span>{item.treatmentLevel.split("&")[0]}</span>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-soft-white text-xs">
                      <DollarSign className="w-3.5 h-3.5 text-safe-green" />
                      <span>{item.estimatedCostUsdPerM3.toFixed(2)}/m³</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 10.I & 10.J SECTION: POLLUTION SOURCES & AI REPORT PANEL */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 10.I Pollution Source Analysis Radar (5 cols) */}
            <div className="lg:col-span-5 p-8 rounded-2xl glass-panel border border-soft-white/5 flex flex-col justify-between space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-display font-bold tracking-wider text-soft-white/40 uppercase">
                  Section 10.I // Input Vectors
                </span>
                <h3 className="font-display font-extrabold text-xl text-soft-white">
                  Industrial Sector Contributions
                </h3>
                <p className="text-xs text-soft-white/50 leading-relaxed">
                  Percentage metrics measuring pollution contribution index factors across general industrial sectors globally.
                </p>
              </div>

              {/* Spiderweb Radar chart */}
              <div className="py-4">
                <RadarChart data={pollutionSources} height={200} />
              </div>

              {/* Warning label */}
              <div className="p-3.5 rounded-xl bg-deep-black/30 border border-soft-white/5 text-[10px] leading-snug text-soft-white/40 font-display">
                <span className="font-bold text-warning-yellow uppercase block mb-0.5">Surveillance Notice:</span>
                Calculated based on active sonar mass spectroscopy logs. Confidence factor exceeds 88% globally.
              </div>
            </div>

            {/* 10.J AI Environmental Report Panel (7 cols) */}
            <div className="lg:col-span-7 p-8 rounded-2xl glass-panel border border-soft-white/5 flex flex-col justify-between space-y-6">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-display font-bold tracking-wider text-soft-white/40 uppercase">
                    Section 10.J // AI synthesis
                  </span>
                  <span className="text-[9px] font-mono opacity-30">LOG_ID: SURV_NODE_{profile.id.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2 text-neon-aqua">
                  <Sparkles className="w-5 h-5 text-neon-aqua animate-pulse" />
                  <h3 className="font-display font-extrabold text-xl text-soft-white">
                    AI Ecological Diagnosis Summary
                  </h3>
                </div>
              </div>

              {/* Typed Terminal Output */}
              <div className="p-6 rounded-xl bg-deep-black border border-neon-aqua/20 space-y-4 font-mono text-xs text-neon-aqua relative overflow-hidden flex-grow flex flex-col justify-center min-h-[180px]">
                {/* Horizontal scanner beam animation */}
                <div className="absolute inset-x-0 h-0.5 bg-neon-aqua/10 top-0 animate-bounce" />

                <div className="text-soft-white/70 space-y-3 leading-relaxed">
                  <p>
                    <span className="text-neon-aqua font-bold">&gt; DIAGNOSIS:</span> {aiReport.condition}
                  </p>
                  <p>
                    <span className="text-neon-aqua font-bold">&gt; FUTURE ESTIMATES (2030-2050):</span> {aiReport.futurePrediction}
                  </p>
                  <p>
                    <span className="text-neon-aqua font-bold">&gt; BIO-RESILIENT STATUS:</span> {aiReport.biodiversityStatus}
                  </p>
                </div>

                <div className="pt-2 border-t border-soft-white/5 flex flex-wrap gap-2 text-[10px]">
                  <span className="text-soft-white/40 font-display uppercase font-bold">Suggested Actions:</span>
                  {aiReport.suggestedActions.map((act, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-neon-aqua/10 text-neon-aqua">
                      {act.split(" ").slice(0, 3).join(" ")}...
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-soft-white/40 uppercase font-display tracking-widest pt-1">
                <Zap className="w-4 h-4 text-neon-aqua animate-bounce" /> Generated automatically via Station Alpha core modules.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

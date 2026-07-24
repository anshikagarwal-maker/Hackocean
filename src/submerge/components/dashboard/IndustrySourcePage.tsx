import { useMemo, useState } from "react";
import {
  Factory,
  Shirt,
  Pickaxe,
  Fuel,
  Newspaper,
  Zap,
  Wheat,
  UtensilsCrossed,
  Ship,
  Flame,
  Download,
  FileText,
  FileSpreadsheet,
  Presentation,
  AlertTriangle,
  MapPin,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Activity,
  ShieldAlert,
  Fish,
  Waves,
  Bird,
  Leaf,
  Droplets,
  type LucideIcon,
} from "lucide-react";
import { oceanProfiles } from "../../data/mockData";

interface Props {
  oceanId: string;
}

/* --- deterministic per-ocean variation --- */
function hashSeed(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function jitter(seed: number, i: number, base: number, spread = 8) {
  const n = ((seed * 9301 + i * 49297) % 233280) / 233280;
  return Math.max(1, Math.min(99, Math.round(base + (n - 0.5) * spread * 2)));
}

type RiskLevel = "Low" | "Moderate" | "High" | "Critical";
const riskFromScore = (s: number): RiskLevel =>
  s >= 85 ? "Critical" : s >= 70 ? "High" : s >= 50 ? "Moderate" : "Low";
const riskColor: Record<RiskLevel, string> = {
  Low: "text-safe-green border-safe-green/40 bg-safe-green/10",
  Moderate: "text-yellow-300 border-yellow-300/40 bg-yellow-300/10",
  High: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  Critical: "text-coral border-coral/40 bg-coral/10",
};
const riskDot: Record<RiskLevel, string> = {
  Low: "bg-safe-green",
  Moderate: "bg-yellow-300",
  High: "bg-orange-400",
  Critical: "bg-coral",
};

/* --- circular gauge --- */
function Gauge({ value, size = 220 }: { value: number; size?: number }) {
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  const risk = riskFromScore(value);
  const stroke =
    risk === "Critical" ? "#ff6b6b" : risk === "High" ? "#fb923c" : risk === "Moderate" ? "#fde047" : "#34d399";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={12} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={stroke}
          strokeWidth={12}
          fill="none"
          strokeDasharray={`${dash} ${c}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1.2s ease-out", filter: `drop-shadow(0 0 10px ${stroke})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[9px] font-display tracking-[0.3em] uppercase text-soft-white/50">Risk Score</div>
        <div className="text-5xl font-display font-black text-soft-white mt-1">{value}%</div>
        <div className={`mt-2 px-2 py-0.5 rounded-full text-[9px] font-display font-bold tracking-[0.2em] uppercase border ${riskColor[risk]}`}>
          {risk}
        </div>
      </div>
    </div>
  );
}

/* --- content data --- */
const INDUSTRIES: { name: string; icon: LucideIcon; base: number; pollutants: string }[] = [
  { name: "Chemical Manufacturing", icon: Factory, base: 91, pollutants: "Solvents, phenols, heavy metals" },
  { name: "Textile Industry", icon: Shirt, base: 84, pollutants: "Chromium, dyes, surfactants" },
  { name: "Mining Operations", icon: Pickaxe, base: 79, pollutants: "Mercury, lead, cadmium, sediment" },
  { name: "Oil & Gas Refinery", icon: Fuel, base: 72, pollutants: "Hydrocarbons, oil, benzene" },
  { name: "Paper & Pulp Industry", icon: Newspaper, base: 66, pollutants: "Chlorine, lignin, dioxins" },
  { name: "Electroplating Industry", icon: Zap, base: 61, pollutants: "Nickel, chromium, cyanide" },
  { name: "Agricultural Runoff", icon: Wheat, base: 59, pollutants: "Nitrate, phosphate, pesticides" },
  { name: "Food Processing Plants", icon: UtensilsCrossed, base: 42, pollutants: "Organic waste, ammonia" },
  { name: "Shipyards & Ports", icon: Ship, base: 38, pollutants: "Oil residue, antifouling paint" },
  { name: "Power Plants", icon: Flame, base: 31, pollutants: "Thermal load, mercury, ash" },
];

const SIGNATURE_GROUPS: { title: string; icon: LucideIcon; params: { name: string; value: string; safe: string; risk: RiskLevel; trend: "up" | "down" | "flat" }[] }[] = [
  {
    title: "Heavy Metals",
    icon: ShieldAlert,
    params: [
      { name: "Mercury (Hg)", value: "0.08 mg/L", safe: "< 0.001", risk: "Critical", trend: "up" },
      { name: "Lead (Pb)", value: "0.06 mg/L", safe: "< 0.01", risk: "High", trend: "up" },
      { name: "Cadmium (Cd)", value: "0.02 mg/L", safe: "< 0.005", risk: "High", trend: "up" },
      { name: "Chromium (Cr)", value: "0.14 mg/L", safe: "< 0.05", risk: "Critical", trend: "up" },
      { name: "Nickel (Ni)", value: "0.09 mg/L", safe: "< 0.02", risk: "High", trend: "flat" },
      { name: "Copper (Cu)", value: "0.04 mg/L", safe: "< 0.02", risk: "Moderate", trend: "down" },
    ],
  },
  {
    title: "Organic Pollutants",
    icon: Droplets,
    params: [
      { name: "Oil", value: "3.2 mg/L", safe: "< 0.5", risk: "Critical", trend: "up" },
      { name: "Grease", value: "1.8 mg/L", safe: "< 0.5", risk: "High", trend: "up" },
      { name: "Phenols", value: "0.11 mg/L", safe: "< 0.01", risk: "Critical", trend: "up" },
      { name: "Hydrocarbons", value: "2.6 mg/L", safe: "< 0.3", risk: "High", trend: "up" },
      { name: "Industrial Solvents", value: "0.42 mg/L", safe: "< 0.05", risk: "High", trend: "flat" },
    ],
  },
  {
    title: "Agricultural Chemicals",
    icon: Leaf,
    params: [
      { name: "Nitrate", value: "12.4 mg/L", safe: "< 10", risk: "Moderate", trend: "up" },
      { name: "Nitrite", value: "0.9 mg/L", safe: "< 1", risk: "Moderate", trend: "flat" },
      { name: "Phosphate", value: "1.6 mg/L", safe: "< 0.5", risk: "High", trend: "up" },
      { name: "Ammonia", value: "0.7 mg/L", safe: "< 0.5", risk: "Moderate", trend: "up" },
      { name: "Pesticides", value: "0.08 µg/L", safe: "< 0.05", risk: "High", trend: "up" },
      { name: "Fertilizers", value: "9.3 mg/L", safe: "< 5", risk: "High", trend: "up" },
    ],
  },
  {
    title: "Microplastics",
    icon: Waves,
    params: [
      { name: "Plastic fibers", value: "312 /m³", safe: "< 20", risk: "Critical", trend: "up" },
      { name: "Plastic pellets", value: "84 /m³", safe: "< 10", risk: "Critical", trend: "up" },
      { name: "Synthetic polymers", value: "1.9 mg/L", safe: "< 0.2", risk: "High", trend: "up" },
    ],
  },
  {
    title: "Biological Indicators",
    icon: Activity,
    params: [
      { name: "Algae bloom index", value: "7.2 / 10", safe: "< 3", risk: "High", trend: "up" },
      { name: "Dissolved oxygen", value: "4.1 mg/L", safe: "> 6", risk: "High", trend: "down" },
      { name: "Bacterial count", value: "2,400 CFU", safe: "< 500", risk: "Critical", trend: "up" },
      { name: "Coral stress index", value: "6.8 / 10", safe: "< 3", risk: "High", trend: "up" },
    ],
  },
];

const FINGERPRINTS = [
  { pollutant: "Chromium", industry: "Textile Industry", confidence: 92, evidence: "Dye residues + Cr spikes near coastal outfalls", risk: "Critical" as RiskLevel },
  { pollutant: "Mercury", industry: "Mining Operations", confidence: 88, evidence: "Sediment plumes + upstream tailings", risk: "Critical" as RiskLevel },
  { pollutant: "Oil Residue", industry: "Oil & Gas Refinery", confidence: 84, evidence: "Hydrocarbon slicks near shipping lanes", risk: "High" as RiskLevel },
  { pollutant: "Nitrate", industry: "Agricultural Runoff", confidence: 79, evidence: "Seasonal river discharge correlation", risk: "High" as RiskLevel },
  { pollutant: "Plastic Pellets", industry: "Plastic Manufacturing", confidence: 86, evidence: "Nurdle density at estuary intake", risk: "High" as RiskLevel },
];

const ZONES = [
  { name: "Meridian Chemical Complex", type: "Chemical Plant", km: 6, pollutants: "Solvents, phenols", risk: 92, x: 22, y: 34 },
  { name: "Delta Textile Park", type: "Industrial Park", km: 12, pollutants: "Chromium, dyes", risk: 84, x: 44, y: 58 },
  { name: "Northrock Mining Site", type: "Mining Area", km: 38, pollutants: "Mercury, sediment", risk: 79, x: 68, y: 22 },
  { name: "Cape Refinery Terminal", type: "Oil Refinery", km: 4, pollutants: "Hydrocarbons", risk: 72, x: 80, y: 66 },
  { name: "Harborline Container Port", type: "Port", km: 2, pollutants: "Oil residue, paint", risk: 61, x: 30, y: 74 },
  { name: "Grid-7 Power Station", type: "Power Plant", km: 9, pollutants: "Thermal, mercury", risk: 47, x: 55, y: 40 },
  { name: "Basin Wastewater Facility", type: "Treatment Plant", km: 3, pollutants: "Nutrients, bacteria", risk: 54, x: 14, y: 62 },
  { name: "Estuary River Outfall", type: "River Outfall", km: 0.5, pollutants: "Mixed runoff", risk: 66, x: 60, y: 82 },
];

const IMPACT_TARGETS = [
  { name: "Fish", icon: Fish, current: "High", future: "Critical", difficulty: "Hard", time: "8–12 yrs" },
  { name: "Corals", icon: Waves, current: "Critical", future: "Critical", difficulty: "Very Hard", time: "20+ yrs" },
  { name: "Marine Mammals", icon: Fish, current: "High", future: "High", difficulty: "Hard", time: "10–15 yrs" },
  { name: "Sea Turtles", icon: Fish, current: "High", future: "Critical", difficulty: "Hard", time: "12 yrs" },
  { name: "Seabirds", icon: Bird, current: "Moderate", future: "High", difficulty: "Moderate", time: "6 yrs" },
  { name: "Plankton", icon: Sparkles, current: "High", future: "Critical", difficulty: "Moderate", time: "4 yrs" },
  { name: "Mangroves", icon: Leaf, current: "Moderate", future: "High", difficulty: "Moderate", time: "8 yrs" },
  { name: "Sea Grass", icon: Leaf, current: "High", future: "Critical", difficulty: "Hard", time: "10 yrs" },
];

const REASONING = [
  "Detected elevated chromium and textile dyes suggest wastewater discharge commonly associated with textile manufacturing.",
  "High mercury concentration combined with increased sediment contamination may indicate mining activity upstream.",
  "Large hydrocarbon signatures near shipping routes increase the probability of oil refinery or shipping-related pollution.",
  "High nitrate and phosphate concentrations are consistent with agricultural fertilizer runoff entering coastal waters.",
  "Persistent microplastic pellet density near estuary intakes points to nearby plastic manufacturing effluent.",
];

const RECOMMENDATIONS = [
  "Increase wastewater treatment monitoring at Delta Textile Park.",
  "Investigate textile dye discharge in coastal outfall zones.",
  "Inspect upstream mining regions for mercury tailings.",
  "Monitor refinery pipelines for hydrocarbon leakage.",
  "Deploy floating plastic collection systems near estuary outfalls.",
  "Increase dissolved oxygen monitoring across affected basins.",
  "Install additional coastal sensor stations at 5 km intervals.",
  "Recommend stricter industrial discharge inspections quarterly.",
];

/* --- small helpers --- */
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`glass-panel border border-white/10 rounded-2xl p-5 ${className}`}>{children}</div>
);

const SectionTitle: React.FC<{ eyebrow?: string; title: string; sub?: string }> = ({ eyebrow, title, sub }) => (
  <div className="mb-4">
    {eyebrow && (
      <div className="text-[9px] font-display font-bold tracking-[0.3em] uppercase text-neon-aqua/80">{eyebrow}</div>
    )}
    <h2 className="text-xl font-display font-black text-soft-white tracking-tight">{title}</h2>
    {sub && <p className="text-xs text-soft-white/60 mt-1 max-w-2xl">{sub}</p>}
  </div>
);

/* --- main page --- */
export default function IndustrySourcePage({ oceanId }: Props) {
  const ocean = oceanProfiles.find((o) => o.id === oceanId) ?? oceanProfiles[0];
  const seed = hashSeed(oceanId);
  const [selectedZone, setSelectedZone] = useState<number | null>(0);

  const industries = useMemo(
    () =>
      INDUSTRIES.map((it, i) => {
        const conf = jitter(seed, i, it.base, 6);
        return { ...it, confidence: conf, risk: riskFromScore(conf) };
      }).sort((a, b) => b.confidence - a.confidence),
    [seed]
  );

  const overallRisk = useMemo(() => {
    const avg = industries.slice(0, 5).reduce((s, x) => s + x.confidence, 0) / 5;
    return Math.round(avg);
  }, [industries]);

  const trendLine = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < 24; i++) arr.push(jitter(seed, i + 100, 55 + i * 1.2, 18));
    return arr;
  }, [seed]);

  const forecast = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < 5; i++) arr.push(jitter(seed, i + 500, overallRisk + i * 2, 6));
    return arr;
  }, [seed, overallRisk]);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <div className="text-[10px] font-display font-bold tracking-[0.35em] uppercase text-neon-aqua">
            Environmental Intelligence · {ocean.name}
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-black text-soft-white tracking-tight mt-1">
            Industry Source Detection
          </h1>
          <p className="text-sm text-soft-white/60 mt-2 max-w-2xl">
            Identify probable industrial pollution sources using AI-powered environmental analysis of water quality,
            heavy metals, chemistry, satellite observations and nearby industrial zones.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-neon-aqua/40 text-xs font-display font-bold text-soft-white/80 hover:text-neon-aqua transition inline-flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" /> PDF
          </button>
          <button className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-neon-aqua/40 text-xs font-display font-bold text-soft-white/80 hover:text-neon-aqua transition inline-flex items-center gap-2">
            <FileSpreadsheet className="w-3.5 h-3.5" /> CSV
          </button>
          <button className="px-3 py-2 rounded-xl bg-neon-aqua text-deep-black text-xs font-display font-black tracking-wide hover:bg-neon-aqua/80 transition inline-flex items-center gap-2">
            <Presentation className="w-3.5 h-3.5" /> Export Report
          </button>
        </div>
      </div>

      {/* Gauge + Top ranking summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col items-center justify-center">
          <div className="text-[9px] font-display font-bold tracking-[0.3em] uppercase text-soft-white/50 mb-3">
            Overall Industrial Pollution Risk
          </div>
          <Gauge value={overallRisk} />
          <div className="mt-5 grid grid-cols-4 gap-2 w-full">
            {(["Low", "Moderate", "High", "Critical"] as RiskLevel[]).map((r) => (
              <div key={r} className="text-center">
                <div className={`w-full h-1.5 rounded-full ${riskDot[r]}`} />
                <div className="text-[9px] font-display font-bold tracking-widest uppercase text-soft-white/60 mt-1.5">
                  {r}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <SectionTitle
            eyebrow="AI Confidence"
            title="Industry Probability Ranking"
            sub="Ranked probability that each industry contributes to the observed pollution signature."
          />
          <div className="space-y-2.5 max-h-[420px] overflow-y-auto hide-scrollbar pr-1">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.name}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-neon-aqua/30 transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-aqua/20 to-bioluminescent/10 border border-neon-aqua/20 flex items-center justify-center text-neon-aqua shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-display font-bold text-sm text-soft-white truncate">{ind.name}</div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-display font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${riskColor[ind.risk]}`}>
                          {ind.risk}
                        </span>
                        <span className="font-display font-black text-neon-aqua text-sm w-10 text-right">{ind.confidence}%</span>
                      </div>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-neon-aqua to-bioluminescent"
                        style={{ width: `${ind.confidence}%`, transition: "width 1s ease-out", boxShadow: "0 0 10px rgba(0,229,255,0.5)" }}
                      />
                    </div>
                    <div className="text-[10px] text-soft-white/50 mt-1 truncate">{ind.pollutants}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Water Signature */}
      <Card>
        <SectionTitle
          eyebrow="Sensor Fusion"
          title="Water Signature Analysis"
          sub="AI breakdown of detected chemical, biological and physical parameters against safe thresholds."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {SIGNATURE_GROUPS.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.title} className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-neon-aqua/10 border border-neon-aqua/20 flex items-center justify-center text-neon-aqua">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="font-display font-black text-xs tracking-widest uppercase text-soft-white">{g.title}</div>
                </div>
                <div className="space-y-2">
                  {g.params.map((p) => (
                    <div key={p.name} className="flex items-center justify-between text-xs">
                      <div className="min-w-0">
                        <div className="text-soft-white/90 font-medium truncate">{p.name}</div>
                        <div className="text-[10px] text-soft-white/40">Safe {p.safe}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-soft-white font-display font-bold">{p.value}</span>
                        {p.trend === "up" ? (
                          <TrendingUp className="w-3.5 h-3.5 text-coral" />
                        ) : p.trend === "down" ? (
                          <TrendingDown className="w-3.5 h-3.5 text-safe-green" />
                        ) : (
                          <Activity className="w-3.5 h-3.5 text-soft-white/40" />
                        )}
                        <span className={`w-1.5 h-1.5 rounded-full ${riskDot[p.risk]}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Reasoning + Fingerprint */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="Explainability" title="AI Reasoning" sub="Why each industry is suspected." />
          <ul className="space-y-3">
            {REASONING.map((r, i) => (
              <li key={i} className="flex gap-3 text-xs text-soft-white/80 leading-relaxed">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-neon-aqua shrink-0 shadow-[0_0_8px_rgba(0,229,255,0.7)]" />
                {r}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-3">
          <SectionTitle
            eyebrow="Correlation Matrix"
            title="Pollution Fingerprint Matching"
            sub="Detected pollutants matched to probable industrial sources."
          />
          <div className="overflow-x-auto submerge-scroll rounded-xl">
            <table className="w-full text-xs min-w-[600px]">
              <thead>
                <tr className="text-[9px] font-display font-bold tracking-[0.2em] uppercase text-soft-white/50 border-b border-white/10">
                  <th className="text-left py-2 pr-2">Pollutant</th>
                  <th className="text-left py-2 pr-2">Matched Industry</th>
                  <th className="text-left py-2 pr-2">Confidence</th>
                  <th className="text-left py-2 pr-2">Evidence</th>
                  <th className="text-left py-2">Risk</th>
                </tr>
              </thead>
              <tbody>
                {FINGERPRINTS.map((f) => (
                  <tr key={f.pollutant} className="border-b border-white/5 hover:bg-white/[0.03] transition">
                    <td className="py-2.5 pr-2 font-display font-bold text-soft-white">{f.pollutant}</td>
                    <td className="py-2.5 pr-2 text-soft-white/80">{f.industry}</td>
                    <td className="py-2.5 pr-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-neon-aqua to-bioluminescent"
                            style={{ width: `${f.confidence}%` }}
                          />
                        </div>
                        <span className="text-neon-aqua font-display font-black">{f.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-2 text-soft-white/60">{f.evidence}</td>
                    <td className="py-2.5">
                      <span className={`text-[9px] font-display font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${riskColor[f.risk]}`}>
                        {f.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Industrial Zone Map */}
      <Card>
        <SectionTitle
          eyebrow="Geospatial"
          title="Nearby Industrial Zone Analysis"
          sub="Factories, ports, refineries and outfalls in proximity. Markers glow by estimated risk."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#031425] via-[#052033] to-[#062a3f]">
            {/* grid */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,229,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.08) 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* coastline */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path
                d="M0 70 Q 20 55, 35 65 T 65 60 T 100 75 L 100 100 L 0 100 Z"
                fill="rgba(52,211,153,0.08)"
                stroke="rgba(52,211,153,0.4)"
                strokeWidth="0.3"
              />
            </svg>
            {ZONES.map((z, i) => {
              const risk = riskFromScore(z.risk);
              const color =
                risk === "Critical" ? "#ff6b6b" : risk === "High" ? "#fb923c" : risk === "Moderate" ? "#fde047" : "#34d399";
              const active = selectedZone === i;
              return (
                <button
                  key={z.name}
                  onClick={() => setSelectedZone(i)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${z.x}%`, top: `${z.y}%` }}
                >
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ backgroundColor: color, opacity: 0.4, width: 18, height: 18, transform: "translate(-50%,-50%)" }}
                  />
                  <span
                    className="relative block rounded-full border-2"
                    style={{
                      width: active ? 16 : 12,
                      height: active ? 16 : 12,
                      backgroundColor: color,
                      borderColor: "rgba(255,255,255,0.85)",
                      boxShadow: `0 0 ${active ? 22 : 12}px ${color}`,
                    }}
                  />
                </button>
              );
            })}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/40 border border-white/10 text-[9px] font-display font-bold tracking-widest uppercase text-neon-aqua">
              <MapPin className="w-3 h-3" /> {ocean.name} Coastal Sector
            </div>
          </div>

          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
            {selectedZone !== null && (() => {
              const z = ZONES[selectedZone];
              const risk = riskFromScore(z.risk);
              return (
                <div>
                  <div className="text-[9px] font-display font-bold tracking-[0.3em] uppercase text-soft-white/50">
                    Selected Facility
                  </div>
                  <div className="font-display font-black text-lg text-soft-white mt-1">{z.name}</div>
                  <div className="text-xs text-neon-aqua font-display font-bold mt-0.5">{z.type}</div>

                  <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-soft-white/40 font-display font-bold">Distance</div>
                      <div className="text-soft-white font-bold">{z.km} km</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-soft-white/40 font-display font-bold">Est. Risk</div>
                      <div className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${riskColor[risk]}`}>
                        {risk} · {z.risk}%
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[9px] uppercase tracking-widest text-soft-white/40 font-display font-bold">Potential Pollutants</div>
                      <div className="text-soft-white/80">{z.pollutants}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[9px] uppercase tracking-widest text-soft-white/40 font-display font-bold">Historical Risk</div>
                      <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-neon-aqua to-coral"
                          style={{ width: `${Math.min(100, z.risk + 5)}%` }}
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[9px] uppercase tracking-widest text-soft-white/40 font-display font-bold">Estimated Impact</div>
                      <div className="text-soft-white/80 leading-relaxed">
                        Continuous discharge estimated to affect a {Math.round(z.risk / 5)}-km radius of coastal habitat with
                        cumulative bioaccumulation risk in filter feeders and reef systems.
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </Card>

      {/* Risk Assessment + Environmental Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <SectionTitle eyebrow="AI Synthesis" title="Risk Assessment" />
          <div className="space-y-3 text-xs">
            {[
              { label: "Primary Risk", value: "Heavy metal contamination", tone: "Critical" as RiskLevel },
              { label: "Secondary Risk", value: "Microplastic accumulation", tone: "High" as RiskLevel },
              { label: "Long-Term Risk", value: "Marine biodiversity decline", tone: "High" as RiskLevel },
              { label: "Ecosystem Risk", value: "Coral bleaching escalation", tone: "Critical" as RiskLevel },
              { label: "Trophic Risk", value: "Food chain contamination", tone: "High" as RiskLevel },
              { label: "Human Health", value: "Fish toxicity exposure", tone: "High" as RiskLevel },
            ].map((r) => (
              <div key={r.label} className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <div className="flex items-center justify-between">
                  <div className="text-[9px] font-display font-bold tracking-widest uppercase text-soft-white/50">
                    {r.label}
                  </div>
                  <span className={`text-[9px] font-display font-bold px-2 py-0.5 rounded-full border ${riskColor[r.tone]}`}>
                    {r.tone}
                  </span>
                </div>
                <div className="text-soft-white font-display font-bold mt-1">{r.value}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="Ecosystem" title="Environmental Impact" sub="Predicted effect on key marine groups." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {IMPACT_TARGETS.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.name} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-neon-aqua/30 transition group">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-neon-aqua/10 border border-neon-aqua/20 flex items-center justify-center text-neon-aqua group-hover:scale-110 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="font-display font-bold text-sm text-soft-white">{t.name}</div>
                  </div>
                  <div className="mt-3 space-y-1.5 text-[10px]">
                    <div className="flex justify-between text-soft-white/60">
                      <span>Current</span>
                      <span className="text-soft-white font-bold">{t.current}</span>
                    </div>
                    <div className="flex justify-between text-soft-white/60">
                      <span>Predicted</span>
                      <span className="text-coral font-bold">{t.future}</span>
                    </div>
                    <div className="flex justify-between text-soft-white/60">
                      <span>Recovery</span>
                      <span className="text-soft-white font-bold">{t.difficulty}</span>
                    </div>
                    <div className="flex justify-between text-soft-white/60">
                      <span>Time</span>
                      <span className="text-neon-aqua font-bold">{t.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Time series */}
      <Card>
        <SectionTitle
          eyebrow="Temporal Trends"
          title="Time-Series Analysis"
          sub="Historical trajectory and AI forecast of industrial pollution stress."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-64 rounded-xl bg-white/[0.03] border border-white/5 p-4">
            <div className="text-[9px] font-display font-bold tracking-widest uppercase text-soft-white/50 mb-2">
              Combined Pollution Stress · 24 months
            </div>
            <svg viewBox="0 0 300 150" className="w-full h-[calc(100%-1.5rem)]">
              <defs>
                <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 25, 50, 75, 100].map((y) => (
                <line key={y} x1="0" x2="300" y1={y * 1.4 + 5} y2={y * 1.4 + 5} stroke="rgba(255,255,255,0.05)" />
              ))}
              {(() => {
                const pts = trendLine.map((v, i) => `${(i / (trendLine.length - 1)) * 300},${145 - v * 1.35}`).join(" ");
                return (
                  <>
                    <polygon points={`0,145 ${pts} 300,145`} fill="url(#areaGrad)" />
                    <polyline points={pts} fill="none" stroke="#00e5ff" strokeWidth="2" style={{ filter: "drop-shadow(0 0 6px #00e5ff)" }} />
                  </>
                );
              })()}
            </svg>
          </div>
          <div className="h-64 rounded-xl bg-white/[0.03] border border-white/5 p-4">
            <div className="text-[9px] font-display font-bold tracking-widest uppercase text-soft-white/50 mb-2">
              AI Forecast · Next 5 years
            </div>
            <div className="flex items-end justify-between h-[calc(100%-1.5rem)] gap-3">
              {forecast.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-[10px] font-display font-bold text-neon-aqua">{v}%</div>
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-neon-aqua/30 to-coral/70" style={{ height: `${v}%`, boxShadow: "0 0 12px rgba(255,107,107,0.4)" }} />
                  <div className="text-[9px] font-display font-bold uppercase text-soft-white/50">Y{i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card>
        <SectionTitle eyebrow="Action Plan" title="AI Recommendations" sub="Personalized mitigation actions ranked by projected impact." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {RECOMMENDATIONS.map((r, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-neon-aqua/30 transition">
              <div className="w-7 h-7 rounded-md bg-neon-aqua/10 border border-neon-aqua/20 flex items-center justify-center text-neon-aqua font-display font-black text-xs shrink-0">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-sm text-soft-white/85 leading-relaxed">{r}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Export Report */}
      <Card>
        <SectionTitle eyebrow="Reporting" title="Report Generation" sub="Bundle detected pollutants, rankings, water quality, risk, impact, charts, maps, AI conclusions and suggested actions." />
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-neon-aqua/40 text-xs font-display font-bold text-soft-white/80 hover:text-neon-aqua transition inline-flex items-center gap-2">
            <FileText className="w-4 h-4" /> Export PDF
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-neon-aqua/40 text-xs font-display font-bold text-soft-white/80 hover:text-neon-aqua transition inline-flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" /> Export CSV
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-neon-aqua/40 text-xs font-display font-bold text-soft-white/80 hover:text-neon-aqua transition inline-flex items-center gap-2">
            <Presentation className="w-4 h-4" /> Presentation-Ready
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-neon-aqua text-deep-black text-xs font-display font-black tracking-wide hover:bg-neon-aqua/80 transition inline-flex items-center gap-2">
            <Download className="w-4 h-4" /> Download Full Report
          </button>
        </div>
      </Card>

      {/* Disclaimer */}
      <div className="rounded-2xl border border-yellow-300/20 bg-yellow-300/[0.03] p-4 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
        <div className="text-[11px] text-soft-white/70 leading-relaxed">
          <span className="font-display font-black text-yellow-300 tracking-widest uppercase text-[10px] block mb-1">
            Scientific Disclaimer
          </span>
          This module provides AI-assisted environmental risk assessment based on pollution signatures, environmental
          sensor data, and publicly available geographic information. Industry rankings represent probable source
          categories rather than confirmed responsibility. Verification through environmental investigations and
          regulatory authorities is required before drawing legal conclusions.
        </div>
      </div>
    </div>
  );
}

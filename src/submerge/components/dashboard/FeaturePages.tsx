import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Fish,
  Waves,
  Trash2,
  FlaskConical,
  Gauge,
  Sprout,
  Map as MapIcon,
  FileText,
  Settings as SettingsIcon,
  Download,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import {
  liveTelemetries,
  wasteMaterials,
  chemicalsData,
  recoveryPlans,
  healthIndices,
  speciesData,
  oceanProfiles,
  pollutionSourcesData,
} from "../../data/mockData";

/* Shared panel */
function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5">
      <div className="mb-4">
        <h3 className="font-display font-bold text-sm text-soft-white tracking-wide">{title}</h3>
        {subtitle && <p className="text-[10px] uppercase tracking-widest text-soft-white/40 font-display font-semibold mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function PageHeader({ title, tag, icon: Icon }: { title: string; tag: string; icon: any }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="w-12 h-12 rounded-2xl bg-neon-aqua/15 border border-neon-aqua/30 flex items-center justify-center text-neon-aqua shadow-[0_0_20px_rgba(0,229,255,0.25)]">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.4em] text-neon-aqua/80 font-display font-bold">{tag}</div>
        <h1 className="mt-1 font-display font-black text-3xl text-soft-white">{title}</h1>
      </div>
    </div>
  );
}

function MetricTile({ label, value, unit, tone = "cyan" }: { label: string; value: string | number; unit?: string; tone?: "cyan" | "green" | "yellow" | "red" }) {
  const c = tone === "green" ? "#7cffcb" : tone === "yellow" ? "#ffb300" : tone === "red" ? "#ff6b6b" : "#00e5ff";
  return (
    <div className="glass-panel rounded-xl p-4">
      <div className="text-[10px] uppercase tracking-widest text-soft-white/50 font-display font-bold">{label}</div>
      <div className="mt-2 font-display font-black text-2xl" style={{ color: c }}>
        {value}
        {unit && <span className="text-sm text-soft-white/60 ml-1 font-bold">{unit}</span>}
      </div>
    </div>
  );
}

function Bar({ value, max = 100, tone = "cyan" }: { value: number; max?: number; tone?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  const color = tone === "red" ? "#ff6b6b" : tone === "yellow" ? "#ffb300" : tone === "green" ? "#7cffcb" : "#00e5ff";
  return (
    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 8px ${color}` }} />
    </div>
  );
}

/* -------------------- PAGES -------------------- */

export function PollutionPage({ oceanId }: { oceanId: string }) {
  const telem = liveTelemetries.find((t) => t.oceanId === oceanId) ?? liveTelemetries[0];
  const sources = pollutionSourcesData[oceanId] ?? pollutionSourcesData.pacific;
  return (
    <div>
      <PageHeader tag="Pollution Analysis" title="Waste & Pollution Intelligence" icon={Trash2} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricTile label="Plastic Density" value={telem.plasticDensityPerKm2.toLocaleString()} unit="/km²" tone="red" />
        <MetricTile label="Microplastic Index" value={Math.round(telem.pollutionIndex * 0.7)} unit="/100" tone="yellow" />
        <MetricTile label="Pollution Index" value={telem.pollutionIndex} unit="%" tone="red" />
        <MetricTile label="Hotspots" value={sources.length} tone="cyan" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Waste Hotspots" subtitle="Detected industrial sources">
          <ul className="space-y-3">
            {sources.map((s) => (
              <li key={s.industry} className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-display font-bold text-sm text-soft-white">{s.industry}</span>
                  <span className="text-xs font-mono text-neon-aqua">{s.pollutionContributionPercent}%</span>
                </div>
                <Bar value={s.pollutionContributionPercent} tone="red" />
                <p className="mt-2 text-[11px] text-soft-white/60 leading-relaxed">{s.environmentalImpact}</p>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Collection Statistics" subtitle="Cleanup progression">
          <div className="space-y-4">
            {[
              { label: "Plastic bottles retrieved", v: 62 },
              { label: "Ghost nets removed", v: 48 },
              { label: "Chemical drums neutralized", v: 34 },
              { label: "Micro-particulates filtered", v: 71 },
              { label: "AI-predicted next-week pollution", v: telem.pollutionIndex + 2, tone: "yellow" as const },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-xs mb-1.5 text-soft-white/80">
                  <span>{r.label}</span>
                  <span className="font-mono text-neon-aqua">{r.v}%</span>
                </div>
                <Bar value={r.v} tone={r.tone as any} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

export function MarineLifePage({ oceanId }: { oceanId: string }) {
  const ocean = oceanProfiles.find((o) => o.id === oceanId) ?? oceanProfiles[0];
  const telem = liveTelemetries.find((t) => t.oceanId === oceanId) ?? liveTelemetries[0];
  return (
    <div>
      <PageHeader tag="Marine Life" title="Species & Migration Intelligence" icon={Fish} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricTile label="Species Tracked" value={ocean.marineSpeciesCount.toLocaleString()} tone="cyan" />
        <MetricTile label="Threatened" value={Math.round(ocean.marineSpeciesCount * 0.06).toLocaleString()} tone="red" />
        <MetricTile label="Life Index" value={telem.marineLifeIndex} unit="%" tone="green" />
        <MetricTile label="Biodiversity" value={telem.biodiversityScore} unit="%" tone="cyan" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speciesData.slice(0, 6).map((s) => (
          <div key={s.id} className="glass-panel glass-panel-hover rounded-2xl overflow-hidden">
            <div className="h-40 w-full overflow-hidden">
              <img src={s.imageUrl} alt={s.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-soft-white">{s.name}</h4>
                <span className={`text-[9px] font-display font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  s.threatLevel === "Critical" ? "bg-coral/15 text-coral" :
                  s.threatLevel === "High" ? "bg-warning-yellow/15 text-warning-yellow" :
                  "bg-safe-green/15 text-safe-green"
                }`}>{s.conservationStatus}</span>
              </div>
              <p className="mt-1 text-[10px] italic text-soft-white/50">{s.scientificName}</p>
              <div className="mt-3 text-[11px] text-soft-white/70 space-y-1">
                <div><span className="text-soft-white/40">Depth:</span> {s.depthRangeM}</div>
                <div><span className="text-soft-white/40">Diet:</span> {s.diet}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CoralPage({ oceanId }: { oceanId: string }) {
  const telem = liveTelemetries.find((t) => t.oceanId === oceanId) ?? liveTelemetries[0];
  const health = telem.coralHealth;
  return (
    <div>
      <PageHeader tag="Coral Health" title="Reef & Recovery Tracking" icon={Waves} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricTile label="Healthy Coral" value={health} unit="%" tone="green" />
        <MetricTile label="Bleached" value={Math.max(0, 60 - health)} unit="%" tone="yellow" />
        <MetricTile label="Recovery Zones" value={8} tone="cyan" />
        <MetricTile label="Disease Alerts" value={3} tone="red" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Coral Health Trend" subtitle="7-day rolling">
          <div className="space-y-3">
            {telem.coralHealthTrend.map((v, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1 text-soft-white/70">
                  <span>Day {i + 1}</span>
                  <span className="font-mono text-neon-aqua">{v}%</span>
                </div>
                <Bar value={v} tone={v > 60 ? "green" : v > 40 ? "yellow" : "red"} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Temperature Stress" subtitle="Bleaching threshold">
          <div className="text-center py-6">
            <div className="font-display font-black text-6xl text-warning-yellow drop-shadow-[0_0_20px_rgba(255,179,0,0.4)]">
              {telem.waterTempC.toFixed(1)}°C
            </div>
            <div className="mt-2 text-xs text-soft-white/60">
              Threshold {(telem.waterTempC + 2).toFixed(1)}°C · {telem.waterTempC > 20 ? "Elevated" : "Stable"}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

export function WastePage({ oceanId }: { oceanId: string }) {
  return (
    <div>
      <PageHeader tag="Waste Detection" title="AI-Detected Waste Objects" icon={Trash2} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {wasteMaterials.map((m) => (
          <div key={m.id} className="glass-panel glass-panel-hover rounded-2xl p-5">
            <div className="flex justify-between items-baseline mb-2">
              <h4 className="font-display font-bold text-soft-white">{m.name}</h4>
              <span className="text-neon-aqua font-mono font-bold">{m.percentage}%</span>
            </div>
            <Bar value={m.percentage} tone="cyan" />
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-soft-white/40">Source:</span> <span className="text-soft-white/80">{m.source}</span></div>
              <div><span className="text-soft-white/40">Decomp:</span> <span className="text-warning-yellow">{m.decompositionTime}</span></div>
            </div>
            <p className="mt-2 text-[11px] text-soft-white/60 leading-relaxed">{m.impact}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-display font-bold text-safe-green uppercase tracking-widest">
              <CheckCircle2 className="w-3 h-3" /> AI Confidence {80 + Math.round(Math.random() * 18)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChemicalPage({ oceanId }: { oceanId: string }) {
  const chems = chemicalsData[oceanId] ?? chemicalsData.pacific;
  return (
    <div>
      <PageHeader tag="Chemical Composition" title="Toxin & Trace Element Levels" icon={FlaskConical} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chems.map((c) => {
          const ratio = c.currentLevel / c.safeLimit;
          const tone = c.dangerLevel === "critical" ? "red" : c.dangerLevel === "warning" ? "yellow" : c.dangerLevel === "moderate" ? "cyan" : "green";
          return (
            <div key={c.id} className="glass-panel glass-panel-hover rounded-2xl p-5">
              <div className="flex justify-between items-baseline">
                <div>
                  <h4 className="font-display font-bold text-soft-white">{c.name}</h4>
                  <span className="font-mono text-[10px] text-soft-white/50">{c.formula}</span>
                </div>
                <span className={`text-[9px] font-display font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                  c.dangerLevel === "critical" ? "bg-coral/15 text-coral" :
                  c.dangerLevel === "warning" ? "bg-warning-yellow/15 text-warning-yellow" :
                  "bg-safe-green/15 text-safe-green"
                }`}>{c.dangerLevel}</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display font-black text-2xl text-soft-white">{c.currentLevel}</span>
                <span className="text-xs text-soft-white/60">{c.unit}</span>
                <span className="text-[10px] text-soft-white/40 ml-2">safe {c.safeLimit}{c.unit}</span>
              </div>
              <div className="mt-2"><Bar value={Math.min(100, ratio * 20)} tone={tone as any} /></div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-[11px]">
                <div><div className="text-soft-white/40 uppercase tracking-widest text-[9px] mb-1">Marine</div><p className="text-soft-white/70">{c.marineImpact}</p></div>
                <div><div className="text-soft-white/40 uppercase tracking-widest text-[9px] mb-1">Human</div><p className="text-soft-white/70">{c.humanImpact}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WaterQualityPage({ oceanId }: { oceanId: string }) {
  const telem = liveTelemetries.find((t) => t.oceanId === oceanId) ?? liveTelemetries[0];
  const ocean = oceanProfiles.find((o) => o.id === oceanId) ?? oceanProfiles[0];
  return (
    <div>
      <PageHeader tag="Water Quality" title="Live Physicochemical Readings" icon={Gauge} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricTile label="Temperature" value={telem.waterTempC.toFixed(1)} unit="°C" tone="yellow" />
        <MetricTile label="Salinity" value={ocean.salinityPpt} unit="ppt" tone="cyan" />
        <MetricTile label="Dissolved O₂" value={Math.round(100 - telem.pollutionIndex / 2)} unit="%" tone="green" />
        <MetricTile label="Turbidity" value={(telem.pollutionIndex / 25).toFixed(1)} unit="NTU" tone={telem.pollutionIndex > 60 ? "red" : "cyan"} />
      </div>
      <Panel title="Risk Indicator" subtitle="Real-time water safety">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${telem.pollutionIndex > 70 ? "bg-coral/20 text-coral" : telem.pollutionIndex > 40 ? "bg-warning-yellow/20 text-warning-yellow" : "bg-safe-green/20 text-safe-green"}`}>
            {telem.pollutionIndex > 70 ? <AlertTriangle /> : <CheckCircle2 />}
          </div>
          <div>
            <div className="font-display font-black text-2xl text-soft-white">
              {telem.pollutionIndex > 70 ? "Critical" : telem.pollutionIndex > 40 ? "Moderate" : "Safe"}
            </div>
            <div className="text-xs text-soft-white/60">Composite score {telem.oceanHealth}/100</div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export function RecoveryPage({ oceanId }: { oceanId: string }) {
  const plan = recoveryPlans.find((p) => p.oceanId === oceanId) ?? recoveryPlans[0];
  return (
    <div>
      <PageHeader tag="Recovery Solutions" title="AI-Powered Restoration Plan" icon={Sprout} />
      {!plan.recoverable && plan.criticalWarning && (
        <div className="mb-6 p-4 rounded-2xl bg-coral/10 border border-coral/40 text-coral">
          <div className="flex items-center gap-2 font-display font-black text-sm">
            <ShieldAlert className="w-4 h-4" /> {plan.criticalWarning}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="AI Recommendations" subtitle="Actionable strategy">
          <ul className="space-y-2 text-sm text-soft-white/80">
            {(plan.conservationSteps ?? plan.emergencyMeasures ?? []).map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-aqua shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Government Measures" subtitle="Policy strategy">
          <ul className="space-y-2 text-sm text-soft-white/80">
            {(plan.governmentMeasures ?? plan.suggestedConservationZones ?? []).map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-bioluminescent shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Industrial Regulations" subtitle="Sector controls">
          <ul className="space-y-2 text-sm text-soft-white/80">
            {(plan.industrialRegulations ?? plan.priorityRegions ?? []).map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-warning-yellow shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Marine Protection" subtitle="Direct actions">
          <ul className="space-y-2 text-sm text-soft-white/80">
            {(plan.marineProtectionActions ?? []).map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-safe-green shrink-0" />
                <span>{s}</span>
              </li>
            ))}
            {plan.longTermRecoveryPlan && <li className="text-soft-white/60">{plan.longTermRecoveryPlan}</li>}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

export function MapPage({ oceanId, setOceanId }: { oceanId: string; setOceanId: (id: string) => void }) {
  const [rot, setRot] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRot((r) => (r + 0.3) % 360), 40);
    return () => clearInterval(id);
  }, []);
  const positions: Record<string, { cx: number; cy: number }> = {
    pacific: { cx: 130, cy: 140 },
    atlantic: { cx: 210, cy: 130 },
    indian: { cx: 250, cy: 160 },
    arctic: { cx: 180, cy: 60 },
    southern: { cx: 180, cy: 240 },
  };
  return (
    <div>
      <PageHeader tag="Global Ocean Map" title="Interactive Planetary View" icon={MapIcon} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 flex items-center justify-center min-h-[500px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08),transparent_60%)]" />
          <svg width="380" height="380" viewBox="0 0 360 360" className="relative">
            <defs>
              <radialGradient id="globeGrad" cx="40%" cy="35%">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#004e92" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#010409" stopOpacity="0.9" />
              </radialGradient>
            </defs>
            <circle cx="180" cy="180" r="150" fill="url(#globeGrad)" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
            {/* meridians */}
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <ellipse key={deg} cx="180" cy="180" rx={Math.abs(Math.cos(((deg + rot) * Math.PI) / 180) * 150)} ry="150" fill="none" stroke="rgba(0,229,255,0.15)" />
            ))}
            {/* latitudes */}
            {[40, 80, 120].map((r) => (
              <ellipse key={r} cx="180" cy="180" rx="150" ry={r} fill="none" stroke="rgba(0,229,255,0.12)" />
            ))}
            {Object.entries(positions).map(([id, p]) => (
              <g key={id} onClick={() => setOceanId(id)} className="cursor-pointer">
                <circle cx={p.cx} cy={p.cy} r={id === oceanId ? 10 : 6} fill={id === oceanId ? "#7cffcb" : "#00e5ff"} className="drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
                <circle cx={p.cx} cy={p.cy} r="16" fill="none" stroke="#00e5ff" opacity="0.5" className="animate-ping" />
                <text x={p.cx + 14} y={p.cy + 4} fill="#f5f7fa" fontSize="9" fontFamily="Space Grotesk" fontWeight="700">
                  {oceanProfiles.find((o) => o.id === id)?.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="space-y-3">
          {oceanProfiles.map((o) => {
            const t = liveTelemetries.find((tt) => tt.oceanId === o.id);
            return (
              <button
                key={o.id}
                onClick={() => setOceanId(o.id)}
                className={`w-full text-left glass-panel rounded-xl p-4 transition ${o.id === oceanId ? "border-neon-aqua/50 shadow-[0_0_20px_rgba(0,229,255,0.25)]" : "hover:border-neon-aqua/30"}`}
              >
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-bold text-sm text-soft-white">{o.name}</span>
                  <span className="text-[10px] text-neon-aqua font-mono">{t?.oceanHealth}%</span>
                </div>
                <div className="mt-2"><Bar value={t?.oceanHealth ?? 0} tone={(t?.oceanHealth ?? 0) > 70 ? "green" : (t?.oceanHealth ?? 0) > 50 ? "cyan" : "red"} /></div>
                <div className="mt-2 text-[10px] text-soft-white/50">Protected zones: {o.protectedZones} · Stations: {o.researchStations}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ReportsPage({ oceanId }: { oceanId: string }) {
  const ocean = oceanProfiles.find((o) => o.id === oceanId) ?? oceanProfiles[0];
  const health = healthIndices.find((h) => h.oceanId === oceanId) ?? healthIndices[0];
  return (
    <div>
      <PageHeader tag="Research Reports" title="Downloadable Intelligence Packages" icon={FileText} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title={`${ocean.name} · Health Snapshot`} subtitle="AI-generated summary">
          <div className="space-y-3 text-sm text-soft-white/80">
            <p>
              Composite classification: <span className={`font-bold ${health.classification === "Healthy" ? "text-safe-green" : health.classification === "Moderate" ? "text-warning-yellow" : "text-coral"}`}>{health.classification}</span>
            </p>
            <p>Water quality {health.waterQuality}/100, coral health {health.coralHealth}/100, biodiversity {health.biodiversity}/100.</p>
            <p>Recommended action window: 24–36 months to prevent regression into critical thresholds.</p>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="glass-button px-4 py-2 rounded-lg font-display font-bold text-xs text-neon-aqua inline-flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
            <button className="glass-button px-4 py-2 rounded-lg font-display font-bold text-xs text-neon-aqua inline-flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </Panel>
        <Panel title="Ocean Comparison Matrix" subtitle="All five basins">
          <div className="overflow-x-auto submerge-scroll rounded-xl">
            <table className="w-full text-xs min-w-[360px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-soft-white/40 font-display font-bold">
                  <th className="text-left py-1.5">Ocean</th>
                  <th className="text-center">Health</th>
                  <th className="text-center">Coral</th>
                  <th className="text-center">Biodiv</th>
                  <th className="text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {healthIndices.map((h) => {
                  const name = oceanProfiles.find((o) => o.id === h.oceanId)?.name ?? h.oceanId;
                  return (
                    <tr key={h.oceanId} className="border-t border-white/5">
                      <td className="py-2 font-display font-semibold text-soft-white">{name}</td>
                      <td className="text-center text-neon-aqua font-mono">{h.overallScore}</td>
                      <td className="text-center text-soft-white/70 font-mono">{h.coralHealth}</td>
                      <td className="text-center text-soft-white/70 font-mono">{h.biodiversity}</td>
                      <td className="text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          h.classification === "Healthy" ? "bg-safe-green/15 text-safe-green" :
                          h.classification === "Moderate" ? "bg-warning-yellow/15 text-warning-yellow" :
                          "bg-coral/15 text-coral"
                        }`}>{h.classification}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}

export function SettingsPage() {
  return (
    <div>
      <PageHeader tag="Settings" title="Platform Preferences" icon={SettingsIcon} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Interface" subtitle="Visual preferences">
          {[
            { label: "Cinematic ocean background", on: true },
            { label: "Ambient sound", on: false },
            { label: "Reduced motion", on: false },
            { label: "High-contrast mode", on: false },
          ].map((p) => (
            <div key={p.label} className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0">
              <span className="text-sm text-soft-white/80">{p.label}</span>
              <span className={`w-10 h-5 rounded-full ${p.on ? "bg-neon-aqua" : "bg-white/10"} relative transition`}>
                <span className={`absolute top-0.5 ${p.on ? "right-0.5" : "left-0.5"} w-4 h-4 rounded-full bg-deep-black transition-all`} />
              </span>
            </div>
          ))}
        </Panel>
        <Panel title="Data & Sensors" subtitle="Telemetry preferences">
          <div className="space-y-4">
            <div>
              <div className="text-xs text-soft-white/60 mb-1">Refresh interval</div>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-soft-white">
                <option>Live · 1s</option>
                <option>Fast · 5s</option>
                <option>Standard · 30s</option>
              </select>
            </div>
            <div>
              <div className="text-xs text-soft-white/60 mb-1">Default ocean</div>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-soft-white">
                {oceanProfiles.map((o) => (
                  <option key={o.id}>{o.name}</option>
                ))}
              </select>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

export function AIPage() {
  return (
    <div>
      <PageHeader tag="AI Assistant" title="Deep-Sea Intelligence Core" icon={FileText} />
      <div className="glass-panel rounded-2xl p-6">
        <p className="text-sm text-soft-white/70 mb-4">
          Ask questions in natural language. Try prompts like:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {[
            "Which ocean is most polluted?",
            "Show coral recovery in the Pacific.",
            "Predict pollution levels five years from now.",
            "Recommend a cleanup strategy for the Atlantic.",
            "Explain marine biodiversity trends.",
            "Generate a report on chemical risks.",
          ].map((q) => (
            <li key={q} className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-neon-aqua/40 transition cursor-pointer text-soft-white/80">
              {q}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[11px] text-soft-white/50">
          Open the floating assistant in the bottom-right to start a live conversation.
        </p>
      </div>
    </div>
  );
}

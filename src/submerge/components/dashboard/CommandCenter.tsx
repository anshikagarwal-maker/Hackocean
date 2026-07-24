import { useEffect, useState } from "react";
import {
  Trash2,
  Waves,
  Fish,
  FlaskConical,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  liveTelemetries,
  wasteAnalyticsData,
  pollutionSourcesData,
  oceanProfiles,
} from "../../data/mockData";

interface Props {
  oceanId: string;
}

/* --- tiny helpers --- */
function useCountUp(target: number, duration = 1500) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setN(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}

function Gauge({ value }: { value: number }) {
  const size = 220;
  const r = 92;
  const c = 2 * Math.PI * r;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(t);
  }, [value]);
  const color = value >= 75 ? "#34d399" : value >= 55 ? "#00e5ff" : value >= 35 ? "#ffb300" : "#ff6b6b";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-[0_0_20px_rgba(0,229,255,0.35)]">
      <defs>
        <linearGradient id="gaugeGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor="#7cffcb" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth="14" fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="url(#gaugeGrad)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={c - (progress / 100) * c}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)" }}
      />
      <text x="50%" y="48%" textAnchor="middle" fill="#f5f7fa" fontSize="42" fontWeight="900" fontFamily="Space Grotesk">
        {Math.round(progress)}%
      </text>
      <text x="50%" y="62%" textAnchor="middle" fill="rgba(245,247,250,0.5)" fontSize="10" letterSpacing="4">
        OCEAN HEALTH
      </text>
    </svg>
  );
}

function Sparkline({ data, color = "#00e5ff" }: { data: number[]; color?: string }) {
  const w = 120;
  const h = 40;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* --- pie / donut --- */
function polarToCart(cx: number, cy: number, r: number, a: number) {
  const rad = ((a - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function arcPath(cx: number, cy: number, r: number, start: number, end: number, inner = 0) {
  const s = polarToCart(cx, cy, r, end);
  const e = polarToCart(cx, cy, r, start);
  const large = end - start <= 180 ? 0 : 1;
  if (inner === 0) {
    return `M ${cx} ${cy} L ${e.x} ${e.y} A ${r} ${r} 0 ${large} 0 ${s.x} ${s.y} Z`;
  }
  const s2 = polarToCart(cx, cy, inner, end);
  const e2 = polarToCart(cx, cy, inner, start);
  return `M ${e.x} ${e.y} A ${r} ${r} 0 ${large} 0 ${s.x} ${s.y} L ${s2.x} ${s2.y} A ${inner} ${inner} 0 ${large} 1 ${e2.x} ${e2.y} Z`;
}

const PALETTE = ["#00e5ff", "#7cffcb", "#34d399", "#ffb300", "#ff6b6b", "#a78bfa"];

function PieChart({ data, donut = false }: { data: { name: string; value: number }[]; donut?: boolean }) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 92;
  const inner = donut ? 56 : 0;
  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = 0;
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
      <div className="shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {data.map((d, i) => {
            const slice = (d.value / total) * 360;
            const p = arcPath(cx, cy, r, angle, angle + slice, inner);
            angle += slice;
            return <path key={i} d={p} fill={PALETTE[i % PALETTE.length]} opacity={0.9} className="transition hover:opacity-100" />;
          })}
          {donut && (
            <text x="50%" y="52%" textAnchor="middle" fill="#f5f7fa" fontSize="18" fontWeight="900" fontFamily="Space Grotesk">
              {total.toFixed(0)}%
            </text>
          )}
        </svg>
      </div>
      <ul className="space-y-1.5 text-xs w-full sm:w-auto">
        {data.map((d, i) => (
          <li key={i} className="flex items-center gap-2 text-soft-white/80">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
            <span className="flex-1 truncate">{d.name}</span>
            <span className="font-mono font-bold text-soft-white shrink-0">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BarChart({ data, labelKey = "label" }: { data: any[]; labelKey?: string }) {
  const w = 480;
  const h = 200;
  const pad = 28;
  const max = Math.max(...data.map((d) => d.plastic + d.ghostNets + d.industrial)) * 1.05;
  const bw = (w - pad * 2) / data.length - 8;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`}>
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="rgba(255,255,255,0.1)" />
      {data.map((d, i) => {
        const x = pad + i * ((w - pad * 2) / data.length) + 4;
        const totalV = d.plastic + d.ghostNets + d.industrial;
        const bh = ((totalV / max) * (h - pad * 2));
        return (
          <g key={i}>
            <rect
              x={x}
              y={h - pad - bh}
              width={bw}
              height={bh}
              fill="url(#barGrad)"
              rx="3"
              style={{ transition: "all 1s ease" }}
            />
            <text x={x + bw / 2} y={h - pad + 14} textAnchor="middle" fill="rgba(245,247,250,0.5)" fontSize="10">
              {d[labelKey]}
            </text>
          </g>
        );
      })}
      <defs>
        <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#004e92" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LineChart({ data, color = "#00e5ff", fill = true }: { data: number[]; color?: string; fill?: boolean }) {
  const w = 480;
  const h = 180;
  const pad = 20;
  const min = Math.min(...data) - 1;
  const max = Math.max(...data) + 1;
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  const poly = pts.join(" ");
  const area = `${pad},${h - pad} ${poly} ${w - pad},${h - pad}`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`}>
      {fill && (
        <>
          <defs>
            <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={area} fill="url(#areaGrad)" />
        </>
      )}
      <polyline points={poly} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {data.map((_, i) => {
        const [x, y] = pts[i].split(",");
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );
}

function Radar({ values }: { values: { label: string; v: number }[] }) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 85;
  const n = values.length;
  const pts = values.map((val, i) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    const rv = (val.v / 100) * r;
    return `${cx + rv * Math.cos(a)},${cy + rv * Math.sin(a)}`;
  });
  const rings = [0.25, 0.5, 0.75, 1];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {rings.map((f, i) => {
        const rp = values.map((_, j) => {
          const a = (Math.PI * 2 * j) / n - Math.PI / 2;
          return `${cx + r * f * Math.cos(a)},${cy + r * f * Math.sin(a)}`;
        }).join(" ");
        return <polygon key={i} points={rp} fill="none" stroke="rgba(255,255,255,0.08)" />;
      })}
      {values.map((val, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="rgba(255,255,255,0.08)" />
            <text x={cx + (r + 12) * Math.cos(a)} y={cy + (r + 12) * Math.sin(a)} textAnchor="middle" fill="rgba(245,247,250,0.6)" fontSize="9">
              {val.label}
            </text>
          </g>
        );
      })}
      <polygon points={pts.join(" ")} fill="rgba(0,229,255,0.25)" stroke="#00e5ff" strokeWidth="2" />
    </svg>
  );
}

/* --- panel wrapper --- */
function Panel({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-panel glass-panel-hover rounded-2xl p-5 ${className}`}>
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-sm text-soft-white tracking-wide">{title}</h3>
          {subtitle && (
            <p className="text-[10px] uppercase tracking-widest text-soft-white/40 font-display font-semibold mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

function StatCard({
  label,
  target,
  suffix,
  icon: Icon,
  trend,
  color,
  trendData,
}: {
  label: string;
  target: number;
  suffix?: string;
  icon: any;
  trend: number;
  color: string;
  trendData: number[];
}) {
  const n = useCountUp(target);
  const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;
  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-soft-white/50 font-display font-bold">
            {label}
          </div>
          <div className="mt-2 font-display font-black text-3xl text-soft-white">
            {n.toLocaleString()}
            {suffix && <span className="text-base text-soft-white/60 ml-1">{suffix}</span>}
          </div>
          <div className={`mt-2 inline-flex items-center gap-1 text-[10px] font-mono font-bold ${trend >= 0 ? "text-safe-green" : "text-coral"}`}>
            <TrendIcon className="w-3 h-3" />
            {trend >= 0 ? "+" : ""}
            {trend}% vs last week
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, color }}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-3 -mx-1">
        <Sparkline data={trendData} color={color} />
      </div>
    </div>
  );
}

export default function CommandCenter({ oceanId }: Props) {
  const telem = liveTelemetries.find((t) => t.oceanId === oceanId) ?? liveTelemetries[0];
  const ocean = oceanProfiles.find((o) => o.id === oceanId) ?? oceanProfiles[0];
  const waste = wasteAnalyticsData.find((w) => w.oceanId === oceanId) ?? wasteAnalyticsData[0];
  const sources = pollutionSourcesData[oceanId] ?? pollutionSourcesData.pacific;

  const pieData = waste.categories.map((c) => ({ name: c.name, value: c.percentage }));
  const donutData = sources.map((s) => ({ name: s.industry, value: s.pollutionContributionPercent }));

  const radar = [
    { label: "Water", v: telem.marineLifeIndex },
    { label: "Coral", v: telem.coralHealth },
    { label: "Biodiv", v: telem.biodiversityScore },
    { label: "Oxygen", v: 100 - telem.pollutionIndex / 2 },
    { label: "Chem", v: 100 - telem.pollutionIndex * 0.6 },
    { label: "Purity", v: 100 - telem.pollutionIndex },
  ];

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div>
        <div className="text-[10px] uppercase tracking-[0.4em] text-neon-aqua/80 font-display font-bold">
          Command Center · {ocean.name}
        </div>
        <h1 className="mt-2 font-display font-black text-3xl md:text-4xl text-soft-white">
          Real-Time Ocean Intelligence
        </h1>
      </div>

      {/* Gauge + stat cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-center justify-center">
          <Gauge value={telem.oceanHealth} />
          <div className="mt-3 text-center">
            <div className="text-[10px] uppercase tracking-widest text-soft-white/50 font-display font-bold">
              Composite Score
            </div>
            <div className="mt-1 text-xs text-soft-white/70">
              {telem.oceanHealth >= 75 ? "Healthy" : telem.oceanHealth >= 55 ? "Moderate" : "Critical"} classification
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <StatCard
            label="Plastic Waste"
            target={telem.plasticDensityPerKm2}
            suffix="/km²"
            icon={Trash2}
            trend={-4}
            color="#ff6b6b"
            trendData={telem.pollutionIndexTrend}
          />
          <StatCard
            label="Coral Coverage"
            target={telem.coralHealth}
            suffix="%"
            icon={Waves}
            trend={+2}
            color="#7cffcb"
            trendData={telem.coralHealthTrend}
          />
          <StatCard
            label="Marine Species"
            target={ocean.marineSpeciesCount}
            icon={Fish}
            trend={+1}
            color="#00e5ff"
            trendData={telem.oceanHealthTrend}
          />
          <StatCard
            label="Chemical Risk"
            target={Math.round(telem.pollutionIndex * 0.8)}
            suffix="%"
            icon={FlaskConical}
            trend={+3}
            color="#ffb300"
            trendData={telem.pollutionIndexTrend}
          />
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Plastic Waste Distribution" subtitle="By material type">
          <PieChart data={pieData} />
        </Panel>
        <Panel title="Ocean Pollution Sources" subtitle="Industry contribution">
          <PieChart data={donutData} donut />
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Waste Collected · Monthly" subtitle="Stacked composition">
          <BarChart data={waste.timeSeries} />
        </Panel>
        <Panel title="Ocean Temperature Trend" subtitle="7-day rolling avg">
          <LineChart data={telem.waterTempCTrend} color="#ffb300" />
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Dissolved Oxygen" subtitle="Area · saturation">
          <LineChart data={telem.oceanHealthTrend.map((v) => v * 1.1)} color="#7cffcb" />
        </Panel>
        <Panel title="Ocean Acidity (pH)" subtitle="Comparison">
          <LineChart data={[8.1, 8.05, 8.0, 7.98, 7.95, 7.94, 7.92]} color="#a78bfa" />
        </Panel>
        <Panel title="Biodiversity Radar" subtitle="Multi-vector">
          <Radar values={radar} />
        </Panel>
      </div>
    </div>
  );
}

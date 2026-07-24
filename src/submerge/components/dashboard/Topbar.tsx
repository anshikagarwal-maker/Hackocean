import { Bell, Search, User, Radio, ChevronDown, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { oceanProfiles, liveTelemetries } from "../../data/mockData";

interface TopbarProps {
  oceanId: string;
  setOceanId: (id: string) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (v: boolean) => void;
}

export default function Topbar({
  oceanId,
  setOceanId,
  mobileOpen,
  setMobileOpen,
}: TopbarProps) {
  const ocean = oceanProfiles.find((o) => o.id === oceanId) ?? oceanProfiles[0];
  const telem = liveTelemetries.find((t) => t.oceanId === oceanId) ?? liveTelemetries[0];
  const [now, setNow] = useState(() => new Date());
  const [oceanOpen, setOceanOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { label: "Depth", value: `−${(ocean.averageDepthM).toLocaleString()}m` },
    { label: "Temp", value: `${telem.waterTempC.toFixed(1)}°C` },
    { label: "Salinity", value: `${ocean.salinityPpt} ppt` },
    { label: "Mission", value: telem.expeditionStatus.toUpperCase() },
  ];

  return (
    <header className="sticky top-0 z-20 h-16 glass-panel !rounded-none border-b border-neon-aqua/15 flex items-center px-3 sm:px-4 gap-2 sm:gap-4">
      {/* Mobile Drawer Hamburger Button */}
      <button
        onClick={() => setMobileOpen?.(!mobileOpen)}
        className="lg:hidden p-2 rounded-lg text-soft-white/80 hover:text-neon-aqua hover:bg-white/5 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
        aria-label="Toggle navigation drawer"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Ocean picker */}
      <div className="relative shrink-0">
        <button
          onClick={() => setOceanOpen((v) => !v)}
          className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-neon-aqua/40 transition min-h-[36px]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-aqua animate-pulse shrink-0" />
          <span className="font-display font-bold text-xs tracking-wide text-soft-white truncate max-w-[110px] sm:max-w-none">
            {ocean.name}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-soft-white/60 shrink-0" />
        </button>
        {oceanOpen && (
          <div className="absolute top-full left-0 mt-2 w-56 rounded-xl glass-panel border border-neon-aqua/20 p-1.5 shadow-2xl z-50">
            {oceanProfiles.map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setOceanId(o.id);
                  setOceanOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-display font-semibold transition ${
                  o.id === oceanId
                    ? "bg-neon-aqua/15 text-neon-aqua"
                    : "text-soft-white/80 hover:bg-white/5"
                }`}
              >
                {o.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Live stats row (visible on md+) */}
      <div className="hidden md:flex items-center gap-4 pl-4 border-l border-white/10 shrink-0">
        {stats.map((s) => (
          <div key={s.label} className="text-[10px] font-display tracking-widest uppercase">
            <div className="text-soft-white/40">{s.label}</div>
            <div className="text-soft-white font-bold text-xs">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Live indicator */}
      <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-safe-green/10 border border-safe-green/30 text-safe-green text-[9px] font-display font-bold tracking-[0.2em] uppercase shrink-0">
        <Radio className="w-3 h-3 animate-pulse" /> Live Sensors
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 focus-within:border-neon-aqua/50 transition w-36 md:w-56 shrink-0">
        <Search className="w-3.5 h-3.5 text-soft-white/50 shrink-0" />
        <input
          placeholder="Search telemetry..."
          className="bg-transparent outline-none text-xs text-soft-white placeholder:text-soft-white/40 min-w-0 flex-1"
        />
      </div>

      {/* Notifications */}
      <button className="relative p-2 rounded-lg hover:bg-white/5 text-soft-white/70 hover:text-neon-aqua transition min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0">
        <Bell className="w-4 h-4" />
        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-coral shadow-[0_0_6px_#ff6b6b]" />
      </button>

      {/* Date + time */}
      <div className="hidden lg:block text-right text-[10px] font-display tracking-widest uppercase shrink-0">
        <div className="text-soft-white/50">
          {now.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })}
        </div>
        <div className="text-neon-aqua font-bold">
          {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </div>
      </div>

      {/* Profile */}
      <button className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-white/10 shrink-0 min-h-[44px]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-aqua to-bioluminescent flex items-center justify-center text-deep-black">
          <User className="w-4 h-4" />
        </div>
      </button>
    </header>
  );
}


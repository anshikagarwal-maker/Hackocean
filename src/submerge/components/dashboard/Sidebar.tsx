import {
  LayoutDashboard,
  Globe2,
  Droplet,
  Fish,
  Waves,
  Trash2,
  FlaskConical,
  Gauge,
  Sprout,
  Map,
  FileText,
  Bot,
  Settings,
  ChevronLeft,
  ChevronDown,
  Factory,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

type NavItem = { id: string; label: string; icon: LucideIcon };
type NavSection = { id: string; label: string; items: NavItem[] };

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "overview", label: "Ocean Overview", icon: Globe2 },
      { id: "map", label: "Global Ocean Map", icon: Map },
    ],
  },
  {
    id: "analysis",
    label: "Analysis",
    items: [
      { id: "pollution", label: "Pollution Analysis", icon: Droplet },
      { id: "chemical", label: "Chemical Composition", icon: FlaskConical },
      { id: "water", label: "Water Quality", icon: Gauge },
      { id: "waste", label: "Waste Detection", icon: Trash2 },
      { id: "industry", label: "Industry Source", icon: Factory },
    ],
  },
  {
    id: "ecosystem",
    label: "Ecosystem",
    items: [
      { id: "marine", label: "Marine Life", icon: Fish },
      { id: "coral", label: "Coral Health", icon: Waves },
      { id: "recovery", label: "Recovery Solutions", icon: Sprout },
    ],
  },
  {
    id: "intel",
    label: "Intelligence",
    items: [
      { id: "reports", label: "Research Reports", icon: FileText },
      { id: "ai", label: "AI Assistant", icon: Bot },
    ],
  },
];

// Flat list preserved for backward-compat with any existing imports
export const NAV_ITEMS = NAV_SECTIONS.flatMap((s) => s.items);

interface SidebarProps {
  currentRoute: string;
  setRoute: (r: string) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (v: boolean) => void;
}

export default function Sidebar({
  currentRoute,
  setRoute,
  mobileOpen = false,
  setMobileOpen,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(NAV_SECTIONS.map((s) => [s.id, true]))
  );

  const toggleSection = (id: string) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const go = (id: string) => {
    setRoute(id);
    window.location.hash = `#/${id}`;
    if (setMobileOpen) setMobileOpen(false);
  };

  const renderItem = (item: NavItem, isMobileNav = false) => {
    const active = currentRoute === item.id;
    const Icon = item.icon;
    const isCollapsed = isMobileNav ? false : collapsed;

    return (
      <button
        key={item.id}
        onClick={() => go(item.id)}
        title={item.label}
        className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ease-out min-h-[44px] ${
          active
            ? "bg-neon-aqua/15 text-neon-aqua shadow-[inset_0_0_0_1px_rgba(0,229,255,0.35),0_0_18px_-4px_rgba(0,229,255,0.55)]"
            : "text-soft-white/70 hover:text-soft-white hover:bg-white/[0.06] hover:translate-x-1"
        }`}
      >
        {active && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-gradient-to-b from-neon-aqua to-bioluminescent shadow-[0_0_10px_rgba(0,229,255,0.9)]" />
        )}
        <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? "text-neon-aqua" : "group-hover:text-neon-aqua/80"}`} />
        {!isCollapsed && (
          <span className="font-display font-semibold text-[11px] tracking-wide truncate">
            {item.label}
          </span>
        )}
      </button>
    );
  };

  const sidebarContent = (isMobileNav = false) => {
    const isCollapsed = isMobileNav ? false : collapsed;
    return (
      <div className="h-full flex flex-col glass-panel !rounded-none border-r border-neon-aqua/15">
        {/* Brand — fixed */}
        <div className="shrink-0 flex items-center gap-2 px-4 h-16 border-b border-white/5 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-aqua to-bioluminescent shadow-[0_0_20px_rgba(0,229,255,0.55)] flex items-center justify-center text-deep-black">
              <Waves className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-display font-black text-sm tracking-widest text-soft-white leading-none">
                  SUBMERGE
                </div>
                <div className="mt-1 font-display font-bold text-[8px] tracking-[0.3em] text-neon-aqua/70 uppercase">
                  Ocean Intel
                </div>
              </div>
            )}
          </div>

          {isMobileNav ? (
            <button
              onClick={() => setMobileOpen?.(false)}
              className="p-2 rounded-md text-soft-white/60 hover:text-neon-aqua hover:bg-white/5 transition"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="p-1 rounded-md text-soft-white/50 hover:text-neon-aqua hover:bg-white/5 transition"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>

        {/* Scrollable feature list */}
        <nav className="submerge-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain py-3 px-2">
          {NAV_SECTIONS.map((section) => {
            const open = openSections[section.id];
            return (
              <div key={section.id} className="mb-3">
                {!isCollapsed && (
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-2 py-1.5 text-[9px] font-display font-bold tracking-[0.25em] uppercase text-soft-white/40 hover:text-neon-aqua/80 transition"
                  >
                    <span>{section.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${open ? "" : "-rotate-90"}`}
                    />
                  </button>
                )}
                <div
                  className={`space-y-1 overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                    open || isCollapsed ? "max-h-[600px] opacity-100 mt-1" : "max-h-0 opacity-0"
                  }`}
                >
                  {section.items.map((item) => renderItem(item, isMobileNav))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer — fixed */}
        <div className="shrink-0 border-t border-white/5 p-2 space-y-1">
          {renderItem({ id: "settings", label: "Settings", icon: Settings }, isMobileNav)}
          <div className={`flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.03] ${isCollapsed ? "justify-center" : ""}`}>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-aqua/40 to-bioluminescent/30 border border-neon-aqua/40 flex items-center justify-center text-soft-white shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-display font-semibold text-soft-white truncate">
                  Dr. A. Reyes
                </div>
                <div className="flex items-center gap-1 text-[9px] font-display tracking-widest uppercase text-safe-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-safe-green animate-pulse shadow-[0_0_6px_#34d399]" />
                  Online
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen?.(false)}
          className="fixed inset-0 z-40 bg-deep-black/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Mobile Drawer Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 h-full lg:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent(true)}
      </aside>

      {/* Desktop Sticky Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 h-screen sticky top-0 z-30 transition-[width] duration-300 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        {sidebarContent(false)}
      </aside>
    </>
  );
}


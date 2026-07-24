import React, { useState, useEffect } from "react";
import { Menu, X, Compass, Anchor, Info, MessageSquare, Shield, Activity } from "lucide-react";

interface NavbarProps {
  currentRoute: string;
  setRoute: (route: string) => void;
}

export default function Navbar({ currentRoute, setRoute }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: Anchor },
    { id: "explore", label: "Explore Hotspots", icon: Compass },
    { id: "dashboard", label: "Intelligence Core", icon: Activity },
    { id: "biodiversity", label: "Biodiversity", icon: Shield },
    { id: "about", label: "About SUBMERGE", icon: Info },
    { id: "contact", label: "Contact Base", icon: MessageSquare },
  ];

  const handleNavClick = (id: string) => {
    setRoute(id);
    window.location.hash = `#/${id}`;
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-deep-black/85 backdrop-blur-md border-b border-neon-aqua/20 shadow-[0_0_20px_rgba(0,229,255,0.15)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 focus:outline-none group"
          >
            <div className="relative w-10 h-10 bg-gradient-to-br from-neon-aqua to-ocean-blue rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-transform duration-300 group-hover:scale-110">
              <span className="font-display font-bold text-lg text-deep-black">S</span>
              <div className="absolute inset-0 rounded-lg border border-neon-aqua/50 animate-pulse"></div>
            </div>
            <div className="text-left">
              <span className="font-display font-black text-2xl tracking-tighter text-neon-aqua block leading-none">
                SUBMERGE
              </span>
              <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-soft-white/60 block uppercase">
                Ocean Intel
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id || (item.id === "dashboard" && currentRoute.startsWith("dashboard"));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-full font-display text-sm tracking-wide transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "text-neon-aqua bg-neon-aqua/10 border border-neon-aqua/20 shadow-[0_0_10px_rgba(0,229,255,0.1)]"
                      : "text-soft-white/75 hover:text-neon-aqua hover:bg-soft-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Connect Station Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => handleNavClick("dashboard")}
              className="relative overflow-hidden group px-5 py-2.5 rounded-full font-display font-semibold text-xs tracking-wider text-deep-black bg-neon-aqua shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">CONNECT STATION</span>
              <div className="absolute inset-0 bg-gradient-to-r from-soft-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-soft-white/80 hover:text-neon-aqua hover:bg-soft-white/5 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-16 z-40 bg-deep-black/80 backdrop-blur-sm md:hidden"
          />
          <div className="relative z-50 md:hidden bg-deep-black/95 backdrop-blur-xl border-b border-neon-aqua/20 py-4 px-4 shadow-2xl animate-fade-in">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentRoute === item.id || (item.id === "dashboard" && currentRoute.startsWith("dashboard"));
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-display text-base min-h-[44px] ${
                      isActive
                        ? "text-neon-aqua bg-neon-aqua/10 border border-neon-aqua/20"
                        : "text-soft-white/70 hover:text-neon-aqua hover:bg-soft-white/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 border-t border-soft-white/10 mt-3">
                <button
                  onClick={() => handleNavClick("dashboard")}
                  className="w-full text-center py-3.5 rounded-xl bg-neon-aqua text-deep-black font-display font-bold tracking-wider text-sm shadow-[0_0_15px_rgba(0,229,255,0.3)] min-h-[44px]"
                >
                  CONNECT STATION
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

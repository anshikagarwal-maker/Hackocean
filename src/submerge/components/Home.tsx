import { ArrowRight } from "lucide-react";

interface HomeProps {
  setRoute: (route: string) => void;
  setSelectedOceanId?: (id: string) => void;
}

/**
 * Clean, minimal landing page — no ambient animations or decorative objects.
 * Large centered title, subtitle, short description, one CTA.
 */
export default function Home({ setRoute }: HomeProps) {
  const go = (r: string) => {
    setRoute(r);
    window.location.hash = `#/${r}`;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="font-display font-extrabold text-4xl xs:text-5xl sm:text-7xl lg:text-[9rem] leading-[0.95] tracking-[-0.04em]">
          <span className="text-gradient-cyan drop-shadow-[0_0_50px_rgba(0,229,255,0.35)]">
            SUBMERGE
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 font-display font-semibold text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase text-neon-aqua/80">
          Ocean Intelligence Platform
        </p>

        <p className="mt-6 sm:mt-8 max-w-xl mx-auto text-soft-white/60 text-xs sm:text-base leading-relaxed">
          A research-grade environment for monitoring ocean pollution, marine
          ecosystems, biodiversity, and recovery progress through unified data
          intelligence.
        </p>

        <button
          onClick={() => go("dashboard")}
          className="group mt-8 sm:mt-12 inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 rounded-full font-display font-bold text-xs tracking-[0.2em] sm:tracking-[0.3em] text-deep-black bg-neon-aqua shadow-[0_0_30px_rgba(0,229,255,0.35)] hover:shadow-[0_0_50px_rgba(0,229,255,0.55)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 min-h-[44px]"
        >
          <span>ENTER DASHBOARD</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

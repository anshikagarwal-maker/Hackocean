import { useEffect, useState } from "react";
import { ArrowRight, Waves } from "lucide-react";
import oceanVideo from "@/assets/ocean.mp4";

interface IntroSequenceProps {
  onComplete: () => void;
}

/**
 * Cinematic dive intro — bright morning ocean, sunrise glare, waves, floating trash,
 * SUBMERGE emerging from the sea with splash + ripple + glow + drips, then a
 * gentle dive-transition into the underwater dashboard shell.
 * NO interactive floating icons / scan chips (removed per redesign).
 */
export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<"surface" | "title" | "dive">("surface");
  const [diving, setDiving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("title"), 1400);
    return () => clearTimeout(t1);
  }, []);

  const handleDive = () => {
    if (diving) return;
    setDiving(true);
    setPhase("dive");
    // Let the dive animation play, then swap out to the app.
    setTimeout(onComplete, 1600);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-abyss text-soft-white select-none">
      {/* Ocean video plate — bright morning surface look */}
      <video
        src={oceanVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(1.25) contrast(1.05) brightness(1.05)" }}
      />

      {/* Sunrise sky wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-200/25 via-sky-300/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(255,214,150,0.35),transparent_45%)]" />
      {/* Sun glare */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-white/70 blur-3xl opacity-70" />
      {/* Ocean shimmer band */}
      <div
        className="absolute top-[38%] left-0 right-0 h-24 mix-blend-screen opacity-70"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer 6s linear infinite",
        }}
      />

      {/* Dive tint that intensifies during the dive phase */}
      <div
        className="absolute inset-0 transition-all duration-[1600ms] ease-in-out pointer-events-none"
        style={{
          background:
            phase === "dive"
              ? "linear-gradient(180deg, rgba(1,20,40,0.85), rgba(1,4,9,1))"
              : "linear-gradient(180deg, rgba(1,20,40,0.15), rgba(1,4,9,0.5))",
        }}
      />

      {/* Caustics */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 30%, rgba(124,255,203,0.28) 0%, transparent 22%), radial-gradient(circle at 75% 65%, rgba(0,229,255,0.22) 0%, transparent 28%)",
          animation: "caustics-drift 14s ease-in-out infinite",
        }}
      />

      {/* Atmospheric fog band */}
      <div className="absolute inset-x-0 top-[35%] h-40 bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-2xl pointer-events-none" />


      {/* Title emerging + splash + ripple */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div
          className={`transition-all duration-[1400ms] ease-out ${
            phase === "surface" ? "translate-y-24 opacity-0 blur-md" : "translate-y-0 opacity-100 blur-0"
          } ${phase === "dive" ? "-translate-y-32 opacity-0 blur-sm scale-110" : ""}`}
        >
          {/* Ripple */}
          <div className="relative flex items-center justify-center">
            {phase !== "surface" && (
              <>
                <span className="absolute w-40 h-40 rounded-full border border-white/40 animate-[ripple_2s_ease-out_infinite]" />
                <span className="absolute w-40 h-40 rounded-full border border-neon-aqua/40 animate-[ripple_2.4s_ease-out_infinite]" style={{ animationDelay: "0.5s" }} />
              </>
            )}
            {/* Splash burst */}
            {phase === "title" && (
              <div className="absolute w-72 h-72">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 w-1.5 h-8 -ml-[3px] -mt-4 bg-white/70 rounded-full origin-bottom"
                    style={{
                      transform: `rotate(${(360 / 14) * i}deg) translateY(-30px)`,
                      animation: `float 1.6s ease-out forwards`,
                      opacity: 0.85,
                    }}
                  />
                ))}
              </div>
            )}
            <h1 className="relative font-display font-black text-4xl xs:text-5xl sm:text-7xl lg:text-[10rem] tracking-tighter leading-none max-w-full overflow-visible">
              <span className="text-gradient-cyan drop-shadow-[0_0_60px_rgba(0,229,255,0.7)]">
                SUBMERGE
              </span>
              {/* Dripping water */}
              <span className="absolute -bottom-3 left-[18%] w-[3px] h-6 bg-gradient-to-b from-white/80 to-transparent rounded-full animate-[float_2s_ease-in-out_infinite]" />
              <span className="absolute -bottom-4 left-[42%] w-[3px] h-8 bg-gradient-to-b from-white/70 to-transparent rounded-full animate-[float_2.4s_ease-in-out_infinite]" style={{ animationDelay: "0.4s" }} />
              <span className="absolute -bottom-2 left-[68%] w-[3px] h-5 bg-gradient-to-b from-white/80 to-transparent rounded-full animate-[float_1.8s_ease-in-out_infinite]" style={{ animationDelay: "0.8s" }} />
              <span className="absolute -bottom-4 left-[82%] w-[3px] h-7 bg-gradient-to-b from-white/70 to-transparent rounded-full animate-[float_2.2s_ease-in-out_infinite]" style={{ animationDelay: "1.1s" }} />
            </h1>
          </div>

          <p className="mt-4 sm:mt-6 font-display font-semibold text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.45em] uppercase text-gradient max-w-xs sm:max-w-none mx-auto">
            AI Powered Ocean Intelligence Platform
          </p>

          <button
            onClick={handleDive}
            disabled={diving}
            className="mt-8 sm:mt-12 inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-display font-black text-xs tracking-[0.25em] sm:tracking-[0.3em] text-deep-black bg-neon-aqua shadow-[0_0_40px_rgba(0,229,255,0.5)] hover:shadow-[0_0_80px_rgba(0,229,255,0.9)] transition-all duration-500 hover:scale-105 active:scale-95 disabled:opacity-50 min-h-[44px]"
          >
            <Waves className="w-4 h-4" />
            <span>DIVE IN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dive descent overlay — sweep of deep blue that drops the viewer under */}
      <div
        className={`absolute inset-0 pointer-events-none transition-transform duration-[1600ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
          phase === "dive" ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(0,60,110,0.0) 0%, rgba(0,40,80,0.9) 40%, rgba(1,4,9,1) 100%)",
        }}
      />
    </div>
  );
}

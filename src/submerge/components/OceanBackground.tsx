import React, { useMemo } from "react";
import oceanVideo from "@/assets/ocean.mp4";
import whaleImg from "@/assets/whale-silhouette.jpg";
import jellyImg from "@/assets/jellyfish-glow.jpg";

interface OceanBackgroundProps {
  variant?: "intro" | "app";
}

/**
 * Persistent hyperrealistic ocean background:
 * - Live ocean.mp4 video plate
 * - Caustic light + tint + vignette shaders
 * - Drifting whale silhouette + bioluminescent jelly
 * - Rising bubble field
 */
export default function OceanBackground({ variant = "app" }: OceanBackgroundProps) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        left: `${(i * 37) % 100}%`,
        size: 4 + ((i * 13) % 14),
        delay: `${(i * 0.7) % 12}s`,
        duration: `${10 + ((i * 3) % 12)}s`,
        opacity: 0.25 + ((i % 5) * 0.1),
      })),
    []
  );

  const intensity = variant === "intro" ? 1 : 0.75;

  return (
    <div className="ocean-stage" aria-hidden="true">
      {/* Live ocean video plate */}
      <video
        src={oceanVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ opacity: variant === "intro" ? 0.85 : 0.35, filter: "saturate(1.15) contrast(1.05)" }}
      />

      {/* Deep tint over video for readability */}
      <div className="tint" style={{ opacity: variant === "intro" ? 0.55 : 0.85 }} />

      {/* Animated caustic light */}
      <div className="caustics" style={{ opacity: 0.5 * intensity }} />

      {/* Drifting whale silhouette (very slow, very deep) */}
      <img
        src={whaleImg}
        alt=""
        className="drifter"
        style={{
          top: "42%",
          left: 0,
          width: "70vw",
          height: "auto",
          opacity: 0.18,
          mixBlendMode: "screen",
          animation: "fish-swim 90s linear infinite",
        }}
      />

      {/* Bioluminescent jelly, drifting */}
      <img
        src={jellyImg}
        alt=""
        className="drifter"
        style={{
          top: "12%",
          right: "8%",
          width: "24vw",
          height: "auto",
          opacity: 0.35,
          mixBlendMode: "screen",
          animation: "jelly-drift 12s ease-in-out infinite",
        }}
      />

      {/* Rising bubble field */}
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        />
      ))}

      {/* Vignette */}
      <div className="vignette" />
    </div>
  );
}

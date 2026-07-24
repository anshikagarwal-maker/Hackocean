import React, { useState } from "react";

// ==========================================
// 1. AREA / LINE CHART (SVG-Based & Fully Responsive)
// ==========================================
interface DataPoint {
  label: string;
  [key: string]: number | string;
}

interface LineAreaChartProps {
  data: DataPoint[];
  dataKeys: string[];
  colors: string[];
  height?: number;
}

export function LineAreaChart({ data, dataKeys, colors, height = 240 }: LineAreaChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartHeight = height - padding.top - padding.bottom;
  const chartWidth = 500; // Reflected coordinate system inside viewBox

  // Find max value in data to scale properly
  let maxValue = 0;
  data.forEach((d) => {
    dataKeys.forEach((key) => {
      const val = Number(d[key]);
      if (val > maxValue) maxValue = val;
    });
  });
  maxValue = Math.ceil(maxValue * 1.15) || 100; // Give some padding at the top

  const getCoordinates = (index: number, value: number) => {
    const x = padding.left + (index / (data.length - 1)) * (chartWidth - padding.left - padding.right);
    const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
    return { x, y };
  };

  // Generate paths for each key
  const paths = dataKeys.map((key, keyIdx) => {
    let linePath = "";
    let areaPath = "";

    data.forEach((point, index) => {
      const val = Number(point[key]);
      const { x, y } = getCoordinates(index, val);

      if (index === 0) {
        linePath = `M ${x} ${y}`;
        areaPath = `M ${x} ${padding.top + chartHeight} L ${x} ${y}`;
      } else {
        linePath += ` L ${x} ${y}`;
        areaPath += ` L ${x} ${y}`;
      }

      if (index === data.length - 1) {
        areaPath += ` L ${x} ${padding.top + chartHeight} Z`;
      }
    });

    return { key, linePath, areaPath, color: colors[keyIdx] || "#00E5FF" };
  });

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <svg
        viewBox={`0 0 ${chartWidth} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          {paths.map((p, idx) => (
            <linearGradient key={`grad-${idx}`} id={`areaGrad-${idx}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={p.color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={p.color} stopOpacity={0.0} />
            </linearGradient>
          ))}
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding.top + chartHeight * ratio;
          const labelVal = Math.round(maxValue * (1 - ratio));
          return (
            <g key={i} className="opacity-20">
              <line
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="#F5F7FA"
                strokeDasharray="4,4"
                strokeWidth={1}
              />
              <text
                x={padding.left - 8}
                y={y + 4}
                fill="#F5F7FA"
                fontSize="10"
                textAnchor="end"
                fontFamily="var(--font-display)"
              >
                {labelVal}
              </text>
            </g>
          );
        })}

        {/* Render areas */}
        {paths.map((p, idx) => (
          <path
            key={`area-${idx}`}
            d={p.areaPath}
            fill={`url(#areaGrad-${idx})`}
            className="transition-all duration-700 ease-out"
          />
        ))}

        {/* Render lines */}
        {paths.map((p, idx) => (
          <path
            key={`line-${idx}`}
            d={p.linePath}
            fill="none"
            stroke={p.color}
            strokeWidth={2.5}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        ))}

        {/* Interactive Vertical line on mouse hover */}
        {hoveredIndex !== null && (
          <line
            x1={getCoordinates(hoveredIndex, 0).x}
            y1={padding.top}
            x2={getCoordinates(hoveredIndex, 0).x}
            y2={padding.top + chartHeight}
            stroke="rgba(0, 229, 255, 0.4)"
            strokeWidth={1}
            strokeDasharray="3,3"
          />
        )}

        {/* Hover points */}
        {paths.map((p, idx) =>
          data.map((point, index) => {
            const val = Number(point[p.key]);
            const { x, y } = getCoordinates(index, val);
            const isHovered = hoveredIndex === index;

            return (
              <circle
                key={`dot-${idx}-${index}`}
                cx={x}
                cy={y}
                r={isHovered ? 5 : 3}
                fill={isHovered ? p.color : "transparent"}
                stroke={p.color}
                strokeWidth={2}
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={() => setHoveredIndex(index)}
              />
            );
          })
        )}

        {/* X Axis Labels */}
        {data.map((point, index) => {
          const { x } = getCoordinates(index, 0);
          return (
            <text
              key={index}
              x={x}
              y={padding.top + chartHeight + 16}
              fill="#F5F7FA"
              fontSize="9"
              textAnchor="middle"
              className="opacity-40 font-display"
            >
              {point.label}
            </text>
          );
        })}
      </svg>

      {/* Dynamic Hover Tooltip Overlay */}
      {hoveredIndex !== null && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-deep-black/90 backdrop-blur border border-neon-aqua/30 p-2.5 rounded-lg text-xs space-y-1 shadow-lg pointer-events-none z-10 flex flex-col gap-0.5">
          <div className="font-display font-bold text-soft-white/60 mb-0.5">
            {data[hoveredIndex].label} Timeline
          </div>
          {dataKeys.map((key, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[idx] }} />
              <span className="text-soft-white/80 capitalize">{key}:</span>
              <span className="font-display font-semibold text-neon-aqua">
                {data[hoveredIndex][key]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. GLOWING CIRCULAR GAUGE COMPONENT
// ==========================================
interface CircularGaugeProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  glowColor?: string;
  subtitle?: string;
}

export function CircularGauge({
  percentage,
  size = 140,
  strokeWidth = 10,
  glowColor = "#00E5FF",
  subtitle = "Score"
}: CircularGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(245, 247, 250, 0.05)"
          strokeWidth={strokeWidth}
        />
        {/* Glowing Value Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={glowColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 4px ${glowColor}50)`
          }}
        />
      </svg>
      {/* Inner Text Labels */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display font-extrabold text-2xl tracking-tighter text-soft-white">
          {percentage}%
        </span>
        <span className="text-[9px] font-sans font-bold tracking-wider text-soft-white/40 uppercase">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 3. HORIZONTAL PROGRESS BARS
// ==========================================
interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  unit?: string;
  colorClass?: string;
}

export function HorizontalProgressBar({ label, value, max, unit = "%", colorClass = "bg-neon-aqua" }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-center text-xs">
        <span className="font-sans font-medium text-soft-white/70">{label}</span>
        <span className="font-display font-semibold text-soft-white">
          {value}
          <span className="text-[10px] text-soft-white/40 ml-0.5">{unit}</span>
        </span>
      </div>
      <div className="h-2 w-full bg-deep-navy/40 rounded-full overflow-hidden border border-soft-white/5 relative">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ==========================================
// 4. RADAR CHART / SPIDERWEB CHART (SVG)
// ==========================================
interface RadarData {
  industry: string;
  pollutionContributionPercent: number;
}

interface RadarChartProps {
  data: RadarData[];
  height?: number;
}

export function RadarChart({ data, height = 240 }: RadarChartProps) {
  const size = height;
  const center = size / 2;
  const maxVal = 50; // Map range to 50% max
  const radius = size * 0.35;

  const numSides = data.length;
  const angleStep = (Math.PI * 2) / numSides;

  // Compute spider web grid polygons
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const gridPolygons = gridLevels.map((level) => {
    const points: string[] = [];
    for (let i = 0; i < numSides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = center + radius * level * Math.cos(angle);
      const y = center + radius * level * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  });

  // Compute actual data polygon points
  const dataPoints: string[] = [];
  data.forEach((d, i) => {
    const ratio = Math.min(d.pollutionContributionPercent / maxVal, 1.2);
    const angle = i * angleStep - Math.PI / 2;
    const x = center + radius * ratio * Math.cos(angle);
    const y = center + radius * ratio * Math.sin(angle);
    dataPoints.push(`${x},${y}`);
  });
  const dataPolygon = dataPoints.join(" ");

  return (
    <div className="relative flex items-center justify-center w-full" style={{ height: `${height}px` }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Draw concentric web polygons */}
        {gridPolygons.map((poly, idx) => (
          <polygon
            key={idx}
            points={poly}
            fill="none"
            stroke="rgba(245, 247, 250, 0.08)"
            strokeWidth={1}
          />
        ))}

        {/* Axis Lines from center */}
        {data.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(245, 247, 250, 0.08)"
              strokeWidth={1}
            />
          );
        })}

        {/* Outer Data Polygon */}
        <polygon
          points={dataPolygon}
          fill="rgba(0, 229, 255, 0.15)"
          stroke="#00E5FF"
          strokeWidth={2}
          style={{ filter: "drop-shadow(0 0 4px rgba(0, 229, 255, 0.3))" }}
          className="transition-all duration-1000 ease-out"
        />

        {/* Vertices/Data Dots */}
        {data.map((d, i) => {
          const ratio = Math.min(d.pollutionContributionPercent / maxVal, 1.2);
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * ratio * Math.cos(angle);
          const y = center + radius * ratio * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={3.5}
              fill="#00E5FF"
              className="hover:scale-150 transition-transform cursor-help"
            />
          );
        })}

        {/* Labels at outer vertices */}
        {data.map((d, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const offsetDist = 18;
          const x = center + (radius + offsetDist) * Math.cos(angle);
          const y = center + (radius + offsetDist) * Math.sin(angle);

          // Simple alignment logic
          let textAnchor: "start" | "middle" | "end" = "middle";
          if (Math.cos(angle) > 0.1) textAnchor = "start";
          if (Math.cos(angle) < -0.1) textAnchor = "end";

          return (
            <text
              key={i}
              x={x}
              y={y + 3}
              fill="#F5F7FA"
              fontSize="8"
              textAnchor={textAnchor}
              className="opacity-60 font-display font-medium uppercase tracking-wider"
            >
              {d.industry.split(" ")[0]} ({d.pollutionContributionPercent}%)
            </text>
          );
        })}
      </svg>
    </div>
  );
}

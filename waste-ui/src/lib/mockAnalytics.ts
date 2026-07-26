// Categorical order/hex values validated against the app's dark card surface
// (#1A2E1C) with scripts/validate_palette.js from the dataviz skill — 7 hues,
// fixed order, worst adjacent CVD ΔE 8.4 / normal-vision ΔE 19.3. "Green" is
// intentionally excluded from this set since it's reserved for the brand
// accent and the "recyclable" status token.
export const CATEGORY_COLORS: Record<string, string> = {
  Plastic: "#3987e5",
  Paper: "#d95926",
  Cardboard: "#199e70",
  Glass: "#c98500",
  Metal: "#d55181",
  Organic: "#9085e9",
  Trash: "#e66767",
};

export interface DonutSlice {
  name: string;
  value: number;
  color: string;
}

export interface HourlyVolume {
  hour: string;
  count: number;
}

export interface ConfidencePoint {
  index: number;
  confidence: number;
}

export interface AnalyticsSnapshot {
  donut: DonutSlice[];
  hourly: HourlyVolume[];
  confidenceSeries: ConfidencePoint[];
  totalClassified: number;
  mostCommon: string;
  avgConfidence: number;
  avgProcessingMs: number;
}

// Deterministic seeded RNG (mulberry32) so the server-rendered snapshot and
// the client's first hydration pass produce identical output — real
// randomness is only introduced afterward, via tick(), on the client.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HOURS = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];

export function generateSnapshot(seed = 42): AnalyticsSnapshot {
  const rand = mulberry32(seed);

  const donutBase = [
    { name: "Plastic", weight: 32 },
    { name: "Paper", weight: 22 },
    { name: "Cardboard", weight: 16 },
    { name: "Glass", weight: 12 },
    { name: "Metal", weight: 9 },
    { name: "Organic", weight: 6 },
    { name: "Trash", weight: 3 },
  ];
  const donut: DonutSlice[] = donutBase.map((d) => ({
    name: d.name,
    value: Math.round(d.weight + (rand() - 0.5) * 4),
    color: CATEGORY_COLORS[d.name],
  }));

  const hourly: HourlyVolume[] = HOURS.map((hour, i) => {
    const peak = Math.exp(-Math.pow(i - 6, 2) / 18);
    return { hour, count: Math.round(20 + peak * 60 + rand() * 12) };
  });

  const confidenceSeries: ConfidencePoint[] = Array.from({ length: 20 }, (_, i) => ({
    index: i + 1,
    confidence: Math.round((0.86 + rand() * 0.12) * 1000) / 1000,
  }));

  const totalClassified = hourly.reduce((sum, h) => sum + h.count, 0) * 8 + Math.round(rand() * 50);
  const mostCommon = [...donut].sort((a, b) => b.value - a.value)[0].name;
  const avgConfidence =
    Math.round(
      (confidenceSeries.reduce((s, c) => s + c.confidence, 0) / confidenceSeries.length) * 1000
    ) / 1000;
  const avgProcessingMs = 230 + Math.round(rand() * 40);

  return { donut, hourly, confidenceSeries, totalClassified, mostCommon, avgConfidence, avgProcessingMs };
}

/** Nudges a snapshot slightly so the dashboard feels alive between polls (client-only). */
export function tick(snapshot: AnalyticsSnapshot): AnalyticsSnapshot {
  const bump = Math.floor(Math.random() * snapshot.donut.length);
  const donut = snapshot.donut.map((slice, i) =>
    i === bump ? { ...slice, value: slice.value + 1 } : slice
  );

  const confidenceSeries = [
    ...snapshot.confidenceSeries.slice(1),
    {
      index: snapshot.confidenceSeries[snapshot.confidenceSeries.length - 1].index + 1,
      confidence: Math.round((0.86 + Math.random() * 0.12) * 1000) / 1000,
    },
  ];

  return {
    ...snapshot,
    donut,
    confidenceSeries,
    totalClassified: snapshot.totalClassified + 1,
    avgConfidence:
      Math.round(
        (confidenceSeries.reduce((s, c) => s + c.confidence, 0) / confidenceSeries.length) * 1000
      ) / 1000,
  };
}

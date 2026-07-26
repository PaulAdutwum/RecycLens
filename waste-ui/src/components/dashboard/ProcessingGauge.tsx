"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

const MAX_MS = 600;

function speedColor(ms: number) {
  if (ms <= 300) return "#22C55E";
  if (ms <= 450) return "#EAB308";
  return "#EF4444";
}

export default function ProcessingGauge({ ms }: { ms: number }) {
  const color = speedColor(ms);
  const data = [{ name: "speed", value: ms, fill: color }];

  return (
    <div className="relative h-48">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          startAngle={210}
          endAngle={-30}
          innerRadius="72%"
          outerRadius="100%"
          barSize={14}
        >
          <PolarAngleAxis type="number" domain={[0, MAX_MS]} angleAxisId={0} tick={false} />
          <RadialBar
            dataKey="value"
            background={{ fill: "rgba(255,255,255,0.08)" }}
            cornerRadius={7}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
        <span className="font-display text-3xl font-bold text-text-primary tabular-nums">
          {ms}
          <span className="text-base text-text-secondary ml-1">ms</span>
        </span>
        <span className="text-xs text-text-secondary mt-1">avg response time</span>
      </div>
    </div>
  );
}

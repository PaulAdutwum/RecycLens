"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import type { ConfidencePoint } from "@/lib/mockAnalytics";

function ConfidenceTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number; payload: ConfidencePoint }[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/10 bg-bg-elevated px-3 py-2 text-xs shadow-xl">
      <span className="text-text-secondary">Scan #{point.index}</span>
      <span className="font-semibold text-accent-secondary ml-1.5">
        {(point.confidence * 100).toFixed(1)}%
      </span>
    </div>
  );
}

export default function ConfidenceLineChart({ data }: { data: ConfidencePoint[] }) {
  return (
    <div className="h-56 -ml-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
          <YAxis
            domain={[0.7, 1]}
            tickFormatter={(v) => `${Math.round(v * 100)}%`}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            width={36}
          />
          <Tooltip content={<ConfidenceTooltip />} cursor={{ stroke: "rgba(255,255,255,0.15)" }} />
          <Line
            type="monotone"
            dataKey="confidence"
            stroke="#86EFAC"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: "#86EFAC", stroke: "#1A2E1C", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

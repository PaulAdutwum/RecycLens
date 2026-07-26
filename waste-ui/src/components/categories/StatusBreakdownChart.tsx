"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { WASTE_CATEGORIES } from "@/lib/wasteCategories";
import type { DisposalStatus } from "@/lib/types";

const STATUS_META: Record<
  DisposalStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  recyclable: { label: "Recyclable", color: "#22C55E", icon: CheckCircle2 },
  special: { label: "Special Disposal", color: "#EAB308", icon: AlertTriangle },
  landfill: { label: "Landfill", color: "#EF4444", icon: XCircle },
};

const STATUS_ORDER: DisposalStatus[] = ["recyclable", "special", "landfill"];

const data = STATUS_ORDER.map((status) => ({
  status,
  name: STATUS_META[status].label,
  value: WASTE_CATEGORIES.filter((c) => c.status === status).length,
  color: STATUS_META[status].color,
}));

const total = WASTE_CATEGORIES.length;

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-white/10 bg-bg-elevated px-3 py-2 text-xs shadow-xl">
      <span className="font-semibold text-text-primary">{item.name}</span>
      <span className="text-text-secondary ml-1.5">
        {item.value} of {total}
      </span>
    </div>
  );
}

export default function StatusBreakdownChart() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-10">
      <div className="relative w-56 h-56 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={68}
              outerRadius={104}
              paddingAngle={3}
              stroke="#1A2E1C"
              strokeWidth={2}
            >
              {data.map((slice) => (
                <Cell key={slice.status} fill={slice.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-display text-4xl font-bold text-text-primary tabular-nums">
            {total}
          </span>
          <span className="text-xs text-text-secondary mt-1">categories</span>
        </div>
      </div>

      <ul className="w-full max-w-xs space-y-4">
        {data.map((slice) => {
          const Icon = STATUS_META[slice.status].icon;
          return (
            <li key={slice.status} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5 text-sm text-text-primary font-medium">
                <Icon className="w-4 h-4 shrink-0" style={{ color: slice.color }} aria-hidden />
                {slice.name}
              </span>
              <span className="text-sm text-text-secondary tabular-nums">
                {slice.value} &middot; {Math.round((slice.value / total) * 100)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

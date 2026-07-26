import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { DisposalStatus } from "@/lib/types";

const STATUS_CONFIG: Record<
  DisposalStatus,
  { label: string; icon: typeof CheckCircle2; color: string; bg: string }
> = {
  recyclable: {
    label: "Recyclable",
    icon: CheckCircle2,
    color: "#22c55e",
    bg: "rgba(34, 197, 94, 0.12)",
  },
  special: {
    label: "Special Disposal",
    icon: AlertTriangle,
    color: "#eab308",
    bg: "rgba(234, 179, 8, 0.12)",
  },
  landfill: {
    label: "Landfill",
    icon: XCircle,
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.12)",
  },
};

export default function StatusBadge({ status }: { status: DisposalStatus }) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ color: config.color, background: config.bg }}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden />
      {config.label}
    </span>
  );
}

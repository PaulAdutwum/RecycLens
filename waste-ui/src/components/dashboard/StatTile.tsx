import type { LucideIcon } from "lucide-react";

export default function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="card-surface rounded-2xl p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-accent-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-accent-primary" aria-hidden />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-text-primary tabular-nums">{value}</p>
        <p className="text-xs text-text-secondary mt-0.5">{label}</p>
      </div>
    </div>
  );
}

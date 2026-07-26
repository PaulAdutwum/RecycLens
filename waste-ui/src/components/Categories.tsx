import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { WASTE_CATEGORIES } from "@/lib/wasteCategories";
import type { DisposalStatus } from "@/lib/types";
import SectionHeading from "./ui/SectionHeading";
import StatusBreakdownChart from "./categories/StatusBreakdownChart";

const STATUS_META: Record<
  DisposalStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  recyclable: { label: "Recyclable", color: "#22C55E", icon: CheckCircle2 },
  special: { label: "Special Disposal", color: "#EAB308", icon: AlertTriangle },
  landfill: { label: "Landfill", color: "#EF4444", icon: XCircle },
};

const STATUS_ORDER: DisposalStatus[] = ["recyclable", "special", "landfill"];

const GROUPS = STATUS_ORDER.map((status) => ({
  status,
  ...STATUS_META[status],
  items: WASTE_CATEGORIES.filter((c) => c.status === status),
}));

export default function Categories() {
  return (
    <section id="categories" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Waste Categories"
          title="15 categories, one bin at a time"
          subtitle="RecycLens recognizes the full range of common household and e-waste materials."
        />

        <div className="card-surface rounded-2xl p-8 mb-8">
          <StatusBreakdownChart />
        </div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-10">
          {GROUPS.map(({ status, label, color, icon: GroupIcon, items }) => (
            <div key={status}>
              <div className="flex items-center gap-2 pb-3 mb-1 border-b border-white/10">
                <GroupIcon className="w-4 h-4" style={{ color }} aria-hidden />
                <h3 className="text-sm font-semibold text-text-primary">{label}</h3>
                <span className="text-xs text-text-secondary ml-auto">{items.length}</span>
              </div>
              <ul>
                {items.map(({ id, name, instruction, icon: Icon }) => (
                  <li
                    key={id}
                    className="flex items-start gap-3 py-3 border-b border-white/5 last:border-none"
                  >
                    <Icon className="w-4 h-4 text-text-secondary mt-0.5 shrink-0" aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{name}</p>
                      <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                        {instruction}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

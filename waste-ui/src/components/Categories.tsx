import { WASTE_CATEGORIES } from "@/lib/wasteCategories";
import type { DisposalStatus } from "@/lib/types";
import SectionHeading from "./ui/SectionHeading";
import StatusBreakdownChart from "./categories/StatusBreakdownChart";

const STATUS_META: Record<DisposalStatus, { label: string; color: string }> = {
  recyclable: { label: "Recyclable", color: "#4ADE80" },
  special: { label: "Special Disposal", color: "#EAB308" },
  landfill: { label: "Landfill", color: "#EF4444" },
};

const STATUS_ORDER: DisposalStatus[] = ["recyclable", "special", "landfill"];

const ROWS = STATUS_ORDER.flatMap((status) =>
  WASTE_CATEGORIES.filter((c) => c.status === status)
);

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

        <div className="card-surface rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 px-6 font-medium text-text-secondary text-xs uppercase tracking-wide">
                    Category
                  </th>
                  <th className="py-3 px-6 font-medium text-text-secondary text-xs uppercase tracking-wide">
                    Status
                  </th>
                  <th className="py-3 px-6 font-medium text-text-secondary text-xs uppercase tracking-wide">
                    Disposal Instructions
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(({ id, name, status, instruction }) => (
                  <tr key={id} className="border-b border-white/5 last:border-none">
                    <td className="py-3 px-6 align-top font-medium text-text-primary whitespace-nowrap">
                      {name}
                    </td>
                    <td
                      className="py-3 px-6 align-top whitespace-nowrap text-xs font-medium"
                      style={{ color: STATUS_META[status].color }}
                    >
                      {STATUS_META[status].label}
                    </td>
                    <td className="py-3 px-6 align-top text-text-secondary leading-relaxed">
                      {instruction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

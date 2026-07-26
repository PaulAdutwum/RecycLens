"use client";

import { useEffect, useState } from "react";
import { ScanLine, Recycle, Target, Timer } from "lucide-react";
import { generateSnapshot, tick } from "@/lib/mockAnalytics";
import SectionHeading from "./ui/SectionHeading";
import StatTile from "./dashboard/StatTile";
import ChartCard from "./dashboard/ChartCard";
import WasteBreakdownDonut from "./dashboard/WasteBreakdownDonut";
import ConfidenceLineChart from "./dashboard/ConfidenceLineChart";
import ProcessingGauge from "./dashboard/ProcessingGauge";

export default function Dashboard() {
  const [snapshot, setSnapshot] = useState(() => generateSnapshot());

  useEffect(() => {
    const id = setInterval(() => setSnapshot((s) => tick(s)), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="dashboard" className="py-20 md:py-28 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Live Analytics"
          title="See the model at work"
          subtitle="A real-time view into what's being classified, how confident the model is, and how fast it responds."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatTile icon={ScanLine} label="Total items classified" value={snapshot.totalClassified.toLocaleString()} />
          <StatTile icon={Recycle} label="Most common type today" value={snapshot.mostCommon} />
          <StatTile icon={Target} label="Average confidence" value={`${(snapshot.avgConfidence * 100).toFixed(1)}%`} />
          <StatTile icon={Timer} label="Average processing time" value={`${snapshot.avgProcessingMs} ms`} />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 items-start">
          <ChartCard title="Waste type breakdown" subtitle="Share of items classified today">
            <WasteBreakdownDonut data={snapshot.donut} />
          </ChartCard>

          <div className="grid gap-4">
            <ChartCard title="Model confidence" subtitle="Score across the most recent scans">
              <ConfidenceLineChart data={snapshot.confidenceSeries} />
            </ChartCard>

            <ChartCard title="Processing speed" subtitle="Average end-to-end API response time">
              <ProcessingGauge ms={snapshot.avgProcessingMs} />
            </ChartCard>
          </div>
        </div>
      </div>
    </section>
  );
}

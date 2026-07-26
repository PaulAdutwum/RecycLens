"use client";

import { useEffect, useState } from "react";
import {
  PlayCircle,
  Package,
  GlassWater,
  Cog,
  FileText,
  Recycle,
  Leaf,
  Cpu,
} from "lucide-react";

const FLOATING_ICONS = [
  { Icon: Package, top: "12%", left: "8%", size: 28, delay: "slow" as const },
  { Icon: GlassWater, top: "22%", left: "82%", size: 32, delay: "slower" as const },
  { Icon: Cog, top: "68%", left: "12%", size: 24, delay: "slower" as const },
  { Icon: FileText, top: "78%", left: "78%", size: 26, delay: "slow" as const },
  { Icon: Recycle, top: "8%", left: "48%", size: 30, delay: "slower" as const },
  { Icon: Leaf, top: "52%", left: "92%", size: 22, delay: "slow" as const },
  { Icon: Cpu, top: "88%", left: "40%", size: 22, delay: "slower" as const },
];

const COUNTER_START = 48213;

export default function Hero() {
  const [count, setCount] = useState(COUNTER_START);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + Math.round(1 + Math.random() * 3));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg-primary pt-20 pb-28 md:pt-28 md:pb-36"
    >
      {/* Floating category icons */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        {FLOATING_ICONS.map(({ Icon, top, left, size, delay }, i) => (
          <div
            key={i}
            className={`absolute text-accent-primary/20 animate-float-${delay}`}
            style={{ top, left }}
          >
            <Icon width={size} height={size} />
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg-card px-4 py-1.5 text-sm text-text-secondary mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
            AI-powered waste classification
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-text-primary">
            Scan. Classify. <span className="text-accent-primary">Recycle Right.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Contamination and human sorting error cost the global recycling
            industry billions every year — and send millions of tons of
            recoverable material to landfill instead. RecycLens pairs computer
            vision with embedded hardware to classify waste in real time: the
            technical foundation for automated sorting systems built to hold
            accuracy at the scale a recycling facility actually runs at.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#scanner"
              className="inline-flex items-center gap-2 rounded-full bg-accent-primary text-bg-primary font-semibold px-7 py-3.5 hover:brightness-110 transition shadow-[0_0_0_1px_rgba(74,222,128,0.3)]"
            >
              Try It Now
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 text-text-primary font-semibold px-7 py-3.5 hover:bg-white/5 transition"
            >
              <PlayCircle className="w-4 h-4" />
              See How It Works
            </a>
          </div>

          <div className="mt-16 inline-flex flex-col items-center">
            <span className="font-display text-4xl md:text-5xl font-bold text-accent-secondary tabular-nums">
              {count.toLocaleString()}
            </span>
            <span className="mt-2 text-sm text-text-secondary tracking-wide uppercase">
              Items classified so far
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

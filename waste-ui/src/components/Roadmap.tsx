import { Wrench, FlaskConical, Handshake, Quote, Cpu, Radar, ScanEye } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const TRACKS = [
  {
    icon: Wrench,
    status: "In progress",
    title: "Building the prototype",
    items: [
      "Jetson Nano + camera running a TensorRT-optimized model",
      "Small conveyor belt mock-up",
      "Servo-actuated diverter triggered by the classification output",
      "Real-time accuracy and throughput metrics",
    ],
  },
  {
    icon: FlaskConical,
    status: "In progress",
    title: "Strengthening the model",
    items: [
      "Filming real sorting scenarios to build a better training dataset",
      "Testing against material types the current model handles poorly",
      "Documenting power draw, inference speed, and error rates",
    ],
  },
  {
    icon: Handshake,
    status: "Ongoing",
    title: "Talking to facilities",
    items: [
      "Reaching out to local recycling facilities to offer live demos",
      "One facility saying “we’d pay for this” outweighs any pitch deck",
    ],
  },
];

const FOUNDATION = [
  { icon: ScanEye, label: "Computer vision model", detail: "This scanner's CNN" },
  { icon: Radar, label: "Motor control firmware", detail: "From the LiDAR project" },
  { icon: Cpu, label: "Embedded deployment", detail: "Edge inference experience" },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="The Bigger Picture"
          title="Built to grow into hardware"
          subtitle="This scanner is the computer-vision core of something bigger: an AI-powered sorting system that runs on physical hardware, mounted above a conveyor belt, classifying and diverting waste in real time at the scale a recycling facility actually runs at."
        />

        <div className="card-surface rounded-2xl p-8 mb-10 relative">
          <Quote className="w-8 h-8 text-accent-primary/40 absolute top-6 left-6" aria-hidden />
          <p className="pl-12 text-lg md:text-xl text-text-primary leading-relaxed font-display">
            Recycling facilities lose billions annually to sorting errors and
            contamination. We&apos;re building an AI-powered sorting system that runs
            on commodity edge hardware &mdash; aiming to replace $500K optical sorters
            with a sub-$2K solution.
          </p>
          <p className="pl-12 mt-3 text-xs text-accent-secondary font-semibold uppercase tracking-wide">
            Our mission
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {TRACKS.map(({ icon: Icon, status, title, items }) => (
            <div
              key={title}
              className="card-surface rounded-2xl p-7 hover:-translate-y-1 hover:border-accent-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent-primary" aria-hidden />
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-primary uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                  {status}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-text-primary mb-3">
                {title}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-text-secondary leading-relaxed">
                    <span className="text-accent-primary mt-1.5 w-1 h-1 rounded-full bg-accent-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-bg-elevated p-6 md:p-8">
          <p className="text-sm text-text-secondary text-center mb-6">
            Nothing here starts from scratch &mdash; it builds directly on work already done:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {FOUNDATION.map(({ icon: Icon, label, detail }) => (
              <div key={label} className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-9 h-9 rounded-lg bg-accent-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-accent-primary" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{label}</p>
                  <p className="text-xs text-text-secondary">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

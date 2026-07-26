import { Camera, BrainCircuit, ClipboardCheck } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const STEPS = [
  {
    icon: Camera,
    step: "01",
    title: "Take or upload a photo",
    body: "Snap a picture with your device camera or drag in an existing image.",
  },
  {
    icon: BrainCircuit,
    step: "02",
    title: "AI analyzes the image",
    body: "A CNN model processes the image and identifies the material in milliseconds.",
  },
  {
    icon: ClipboardCheck,
    step: "03",
    title: "Get instant guidance",
    body: "See the category, confidence score, and exactly how to dispose of it.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="How It Works" title="Three steps to a cleaner bin" />

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map(({ icon: Icon, step, title, body }) => (
            <div
              key={step}
              className="card-surface rounded-2xl p-8 relative hover:-translate-y-1 hover:border-accent-primary/30 transition-all duration-300"
            >
              <span className="font-display text-5xl font-bold text-white/5 absolute top-4 right-6">
                {step}
              </span>
              <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-accent-primary" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-semibold text-text-primary">{title}</h3>
              <p className="mt-2 text-text-secondary text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-text-secondary max-w-2xl mx-auto">
          Powered by a TensorFlow CNN trained on 15 waste categories, served via a
          FastAPI backend.
        </p>
      </div>
    </section>
  );
}

// waste-ui/src/app/components/FutureEnhancements.tsx
import React from "react";
import { Database, Smartphone, Zap, BarChart3, Brain } from "lucide-react";

export default function FutureEnhancements() {
  const enhancements = [
    {
      icon: Database,
      title: "Enhanced Data Integration",
      description:
        "Integrate additional data sources for improved accuracy and broader waste category recognition.",
    },
    {
      icon: Zap,
      title: "Real-time Classification",
      description:
        "Implement continuous classification streams for instant, live waste sorting capabilities.",
    },
    {
      icon: Smartphone,
      title: "Mobile PWA",
      description:
        "Develop a progressive web app with offline support for on-the-go waste classification.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Monitoring",
      description:
        "Add comprehensive logging and analytics for model performance and drift monitoring.",
    },
    {
      icon: Brain,
      title: "Advanced AI Models",
      description:
        "Experiment with cutting-edge CNN architectures and ensemble methods for superior accuracy.",
    },
  ];

  return (
    <section id="future" className="py-16 md:py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Future Enhancements
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Exciting features and improvements coming to Smart Waste Classifier
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {enhancements.map((enhancement, index) => {
          const IconComponent = enhancement.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <IconComponent className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {enhancement.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {enhancement.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

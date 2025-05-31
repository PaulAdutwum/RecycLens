// waste-ui/src/app/components/FutureEnhancements.tsx
import React from "react";
import { Rocket } from "lucide-react";

export default function FutureEnhancements() {
  return (
    <section id="future" className="py-16 md:py-20">
      <div className="text-center">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-12 md:p-16 border border-green-200 max-w-4xl mx-auto">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Rocket className="w-10 h-10 text-green-600" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            More Coming Soon
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're constantly working on exciting new features and improvements
            to make RECYCLENS even better. Stay tuned for amazing updates that
            will enhance your waste classification experience!
          </p>

          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-2xl px-8 py-4 shadow-lg border border-green-200">
              <p className="text-green-700 font-semibold">
                🚀 Innovation in Progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

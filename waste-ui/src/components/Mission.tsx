// waste-ui/src/app/components/Mission.tsx
import React from "react";

export default function Mission() {
  return (
    <section id="mission" className="py-16 md:py-20">
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 md:p-12 border border-green-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-8">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Environmental Impact
              </h3>
              <p className="text-gray-700 leading-relaxed">
                At Smart Waste Classifier, we aim to drive environmental
                sustainability by harnessing AI and machine learning to make
                waste sorting intuitive and accessible for everyone.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
              <div className="text-4xl mb-4">♻️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Smarter Recycling
              </h3>
              <p className="text-gray-700 leading-relaxed">
                By reducing waste contamination and improving recycling
                accuracy, we empower individuals and businesses to make
                eco-friendly choices every day with confidence.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-green-100">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Innovation for Tomorrow
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              We believe technology should serve the planet. Our cutting-edge AI
              models make waste classification accessible to millions, creating
              a cleaner, more sustainable future for generations to come.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

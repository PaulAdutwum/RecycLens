// waste-ui/src/app/components/HowItWorks.tsx
import React from "react";
import { Camera, Upload, Zap, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="flow" className="py-16 md:py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get instant waste classification in just a few simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            1. Capture or Upload
          </h3>
          <p className="text-gray-600">
            Use your camera or upload an image of the waste item you want to
            classify.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            2. AI Analysis
          </h3>
          <p className="text-gray-600">
            Our advanced CNN model analyzes your image using machine learning
            algorithms.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            3. Get Results
          </h3>
          <p className="text-gray-600">
            Receive instant classification with confidence levels and sorting
            recommendations.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            4. Sort Correctly
          </h3>
          <p className="text-gray-600">
            Follow the guidance to properly sort your waste and help the
            environment.
          </p>
        </div>
      </div>
    </section>
  );
}

// waste-ui/src/app/components/Welcome.tsx
import React from "react";

export default function Welcome() {
  return (
    <section id="welcome" className="py-16 md:py-24 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Welcome to the
          <span className="text-green-600 block md:inline"> RecycLens</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Use Convolutional Neural Network to instantly identify images and
          waste materials. Snap a photo with your camera or upload an image, and
          our CNN classifier will tell you whether it is a paper, plastic,
          metal, organic, and more.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mt-12">
          <h3 className="text-2xl font-semibold text-green-800 mb-4">
            🌱 Make Recycling Smarter
          </h3>
          <p className="text-green-700 text-lg">
            Join thousands of users making environmentally conscious decisions
            with AI-powered waste classification.
          </p>
        </div>
      </div>
    </section>
  );
}

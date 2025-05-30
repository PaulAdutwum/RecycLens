// waste-ui/src/app/components/Header.tsx
import React from "react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Smart Waste Classifier
            </h1>
            <p className="text-green-100 text-sm mt-1 hidden sm:block">
              AI-Powered Waste Sorting Solution
            </p>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#welcome"
              className="text-green-100 hover:text-white transition-colors duration-200 font-medium"
            >
              Welcome
            </a>
            <a
              href="#flow"
              className="text-green-100 hover:text-white transition-colors duration-200 font-medium"
            >
              How It Works
            </a>
            <a
              href="#mission"
              className="text-green-100 hover:text-white transition-colors duration-200 font-medium"
            >
              Mission
            </a>
            <a
              href="#future"
              className="text-green-100 hover:text-white transition-colors duration-200 font-medium"
            >
              Future
            </a>
            <a
              href="#feedback"
              className="text-green-100 hover:text-white transition-colors duration-200 font-medium"
            >
              Feedback
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

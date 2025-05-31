// waste-ui/src/app/components/Header.tsx
import React from "react";

export default function Header() {
  return (
    <header className="relative bg-green-600 text-white shadow-lg overflow-hidden">
      {/* Main Header Content */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="group">
            <div className="flex items-center space-x-4">
              {/* Logo Icon */}
              <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">♻️</span>
              </div>

              {/* Brand Text */}
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white to-green-50 bg-clip-text text-transparent group-hover:from-green-50 group-hover:to-white transition-all duration-300 drop-shadow-sm">
                  RECYCLENS
                </h1>
                <p className="text-green-50/95 text-sm mt-1 hidden sm:block font-medium tracking-wide drop-shadow-sm">
                  AI-Powered Waste Sorting Solution
                </p>
              </div>
            </div>
          </div>

          {/* Navigation - Hidden on small screens, shown on medium and up */}
          <nav className="hidden md:flex items-center space-x-1">
            <div className="flex space-x-1 bg-white/15 backdrop-blur-sm rounded-2xl p-2 border border-white/30 shadow-lg">
              <a
                href="#welcome"
                className="text-green-50 hover:text-white hover:bg-white/25 transition-all duration-300 font-medium px-4 lg:px-6 py-3 rounded-xl text-sm uppercase tracking-wide relative group"
              >
                <span className="relative z-10 drop-shadow-sm">Welcome</span>
                <div className="absolute inset-0 bg-white/15 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
              <a
                href="#flow"
                className="text-green-50 hover:text-white hover:bg-white/25 transition-all duration-300 font-medium px-4 lg:px-6 py-3 rounded-xl text-sm uppercase tracking-wide relative group"
              >
                <span className="relative z-10 drop-shadow-sm">
                  How It Works
                </span>
                <div className="absolute inset-0 bg-white/15 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
              <a
                href="#mission"
                className="text-green-50 hover:text-white hover:bg-white/25 transition-all duration-300 font-medium px-4 lg:px-6 py-3 rounded-xl text-sm uppercase tracking-wide relative group"
              >
                <span className="relative z-10 drop-shadow-sm">Mission</span>
                <div className="absolute inset-0 bg-white/15 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
              <a
                href="#future"
                className="text-green-50 hover:text-white hover:bg-white/25 transition-all duration-300 font-medium px-4 lg:px-6 py-3 rounded-xl text-sm uppercase tracking-wide relative group"
              >
                <span className="relative z-10 drop-shadow-sm">Future</span>
                <div className="absolute inset-0 bg-white/15 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
              <a
                href="#feedback"
                className="text-green-50 hover:text-white hover:bg-white/25 transition-all duration-300 font-medium px-4 lg:px-6 py-3 rounded-xl text-sm uppercase tracking-wide relative group"
              >
                <span className="relative z-10 drop-shadow-sm">Feedback</span>
                <div className="absolute inset-0 bg-white/15 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
            </div>

            {/* CTA Button - Now responsive for tablets */}
            <div className="ml-4 lg:ml-6">
              <a
                href="#classifier"
                className="bg-white text-green-600 px-4 lg:px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-green-50 hover:text-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border-2 border-transparent hover:border-white/30"
              >
                Try Now
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button - Now shows on small and medium screens */}
          <div className="md:hidden">
            <button className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl p-3 hover:bg-white/25 transition-all duration-300 shadow-lg">
              <svg
                className="w-6 h-6 text-white drop-shadow-sm"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-6 bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg">
          <div className="flex flex-col space-y-2">
            <a
              href="#welcome"
              className="text-green-50 hover:text-white hover:bg-white/25 transition-all duration-300 font-medium px-4 py-3 rounded-xl text-sm uppercase tracking-wide drop-shadow-sm"
            >
              Welcome
            </a>
            <a
              href="#flow"
              className="text-green-50 hover:text-white hover:bg-white/25 transition-all duration-300 font-medium px-4 py-3 rounded-xl text-sm uppercase tracking-wide drop-shadow-sm"
            >
              How It Works
            </a>
            <a
              href="#mission"
              className="text-green-50 hover:text-white hover:bg-white/25 transition-all duration-300 font-medium px-4 py-3 rounded-xl text-sm uppercase tracking-wide drop-shadow-sm"
            >
              Mission
            </a>
            <a
              href="#future"
              className="text-green-50 hover:text-white hover:bg-white/25 transition-all duration-300 font-medium px-4 py-3 rounded-xl text-sm uppercase tracking-wide drop-shadow-sm"
            >
              Future
            </a>
            <a
              href="#feedback"
              className="text-green-50 hover:text-white hover:bg-white/25 transition-all duration-300 font-medium px-4 py-3 rounded-xl text-sm uppercase tracking-wide drop-shadow-sm"
            >
              Feedback
            </a>
            <a
              href="#classifier"
              className="bg-white text-green-600 px-4 py-3 rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-green-50 hover:text-green-700 transition-all duration-300 text-center mt-4 shadow-lg"
            >
              Try Now
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
    </header>
  );
}

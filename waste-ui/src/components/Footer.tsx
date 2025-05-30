// waste-ui/src/app/components/Footer.tsx
import React from "react";
import { Heart, Globe, Recycle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Recycle className="w-6 h-6 text-green-400" />
              Smart Waste Classifier
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Empowering sustainable choices through AI-powered waste
              classification. Making recycling smarter, one image at a time.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-400" />
              Our Impact
            </h4>
            <ul className="text-gray-300 space-y-2">
              <li>• Reducing waste contamination</li>
              <li>• Improving recycling accuracy</li>
              <li>• Supporting environmental sustainability</li>
              <li>• Educating communities on waste sorting</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Get Started</h4>
            <p className="text-gray-300 mb-4">
              Start classifying your waste today and make a positive
              environmental impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="#welcome"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-center transition-colors duration-200 font-medium"
              >
                Try Now
              </a>
              <a
                href="#feedback"
                className="border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg text-center transition-all duration-200 font-medium"
              >
                Give Feedback
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-gray-300 mb-4 md:mb-0">
            <span>Developed with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>by Paul Adichum</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Smart Waste Classifier. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

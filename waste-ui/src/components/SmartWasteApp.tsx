// waste-ui/src/app/components/SmartWasteApp.tsx
import React from "react";
import Header from "./Header";
import Welcome from "./Welcome";
import HowItWorks from "./HowItWorks";
import Mission from "./Mission";
import Classifier from "./Classifier";
import FutureEnhancements from "./FutureEnhancement";
import Feedback from "./Feedback";
import Footer from "./Footer";

export default function SmartWasteApp({ apiUrl }: { apiUrl: string }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Welcome />
          <HowItWorks />
        </div>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Classifier apiUrl={apiUrl} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FutureEnhancements />
          <Feedback />
        </div>
      </main>
      <Footer />
    </div>
  );
}

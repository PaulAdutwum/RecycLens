// waste-ui/src/app/components/Feedback.tsx
"use client";
import React, { useState } from "react";
import { MessageSquare, Send, CheckCircle } from "lucide-react";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [confirm, setConfirm] = useState("");

  const submit = () => {
    console.log("User Feedback:", feedback);
    setFeedback("");
    setConfirm("Thank you for your feedback!");
    setTimeout(() => setConfirm(""), 3000);
  };

  return (
    <section id="feedback" className="py-16 md:py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Feedback Matters
          </h2>
          <p className="text-xl text-gray-600">
            Help us improve the Smart Waste Classifier with your valuable
            insights
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Share your experience
              </label>
              <textarea
                rows={6}
                className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-900 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 resize-none"
                placeholder="Tell us what you think about the Smart Waste Classifier. How can we make it better?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            <button
              onClick={submit}
              disabled={!feedback.trim()}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold text-lg flex items-center justify-center gap-3 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
              Submit Feedback
            </button>

            {confirm && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <p className="text-green-800 font-medium">{confirm}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

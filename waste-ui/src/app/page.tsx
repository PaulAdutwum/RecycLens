// waste-ui/src/app/page.tsx
import React from "react";
import SmartWasteApp from "../components/SmartWasteApp";

export const metadata = {
  title: "Smart Waste Classifier",
  description: "Instantly sort waste with AI-driven classification.",
};

export default function Page() {
  return <SmartWasteApp apiUrl="http://localhost:8000/classify" />;
}

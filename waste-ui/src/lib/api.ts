import { mockClassify } from "./mockApi";
import { getCategory } from "./wasteCategories";
import type { ClassificationResult } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
const REQUEST_TIMEOUT_MS = 4000;

/**
 * UI-first mode: the CNN/FastAPI backend isn't wired into this build yet, so
 * classification runs against realistic mock data by default. Setting
 * NEXT_PUBLIC_API_URL and NEXT_PUBLIC_USE_MOCK=false switches to the real
 * POST /api/classify contract once the backend is ready.
 */
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export function fileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function classifyWaste(imageBase64: string): Promise<ClassificationResult> {
  if (USE_MOCK) {
    return mockClassify();
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_BASE}/api/classify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageBase64 }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Classification request failed with status ${res.status}`);
    }

    const data = await res.json();
    const category = getCategory(String(data.category).toLowerCase().replace(/\s+/g, "-"));

    return {
      category: data.category,
      confidence: data.confidence,
      instructions: data.instructions ?? category.instruction,
      status: category.status,
      processing_time_ms: data.processing_time_ms,
    };
  } finally {
    clearTimeout(timeout);
  }
}

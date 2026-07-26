import { WASTE_CATEGORIES } from "./wasteCategories";
import type { ClassificationResult } from "./types";

const MOCK_DELAY_MS = 1500;

let cursor = 0;

/**
 * Cycles deterministically through the category list so a demo walkthrough
 * shows variety, with light jitter on confidence/timing so it still feels live.
 */
export function mockClassify(): Promise<ClassificationResult> {
  const category = WASTE_CATEGORIES[cursor % WASTE_CATEGORIES.length];
  cursor += 1;

  const confidence = Math.round((0.82 + Math.random() * 0.17) * 1000) / 1000;
  const processing_time_ms = Math.round(180 + Math.random() * 220);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        category: category.name,
        confidence,
        instructions: category.instruction,
        status: category.status,
        processing_time_ms,
      });
    }, MOCK_DELAY_MS);
  });
}

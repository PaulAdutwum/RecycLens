import {
  Package,
  GlassWater,
  Cog,
  FileText,
  Recycle,
  Trash2,
  BatteryFull,
  Shirt,
  Footprints,
  Leaf,
  Cpu,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import type { WasteCategory } from "./types";

export interface WasteCategoryDisplay extends WasteCategory {
  icon: LucideIcon;
}

export const WASTE_CATEGORIES: WasteCategoryDisplay[] = [
  {
    id: "cardboard",
    name: "Cardboard",
    status: "recyclable",
    instruction: "Flatten boxes and keep dry before placing in the recycling bin.",
    icon: Package,
  },
  {
    id: "glass",
    name: "Glass",
    status: "recyclable",
    instruction: "Rinse clean and remove lids before recycling.",
    icon: GlassWater,
  },
  {
    id: "metal",
    name: "Metal",
    status: "recyclable",
    instruction: "Rinse cans and crush if possible to save space.",
    icon: Cog,
  },
  {
    id: "paper",
    name: "Paper",
    status: "recyclable",
    instruction: "Keep dry and free of food residue before recycling.",
    icon: FileText,
  },
  {
    id: "plastic",
    name: "Plastic",
    status: "recyclable",
    instruction: "Check the resin code and rinse before placing in the bin.",
    icon: Recycle,
  },
  {
    id: "trash",
    name: "Trash",
    status: "landfill",
    instruction: "Not recoverable — dispose of in general landfill waste.",
    icon: Trash2,
  },
  {
    id: "battery",
    name: "Battery",
    status: "special",
    instruction: "Never bin loose — drop off at a battery collection point.",
    icon: BatteryFull,
  },
  {
    id: "clothes",
    name: "Clothes",
    status: "special",
    instruction: "Donate if wearable, otherwise use a textile recycling bin.",
    icon: Shirt,
  },
  {
    id: "shoes",
    name: "Shoes",
    status: "special",
    instruction: "Pair up and donate, or drop off at a shoe recycling point.",
    icon: Footprints,
  },
  {
    id: "white-glass",
    name: "White Glass",
    status: "recyclable",
    instruction: "Clear glass goes in its own stream — rinse before recycling.",
    icon: GlassWater,
  },
  {
    id: "brown-glass",
    name: "Brown Glass",
    status: "recyclable",
    instruction: "Sort separately from clear and green glass, then rinse.",
    icon: GlassWater,
  },
  {
    id: "green-glass",
    name: "Green Glass",
    status: "recyclable",
    instruction: "Sort separately from clear and brown glass, then rinse.",
    icon: GlassWater,
  },
  {
    id: "biological",
    name: "Biological",
    status: "special",
    instruction: "Compost food and garden waste where a composting bin is available.",
    icon: Leaf,
  },
  {
    id: "e-waste",
    name: "E-Waste",
    status: "special",
    instruction: "Take to a certified e-waste facility — never bin electronics.",
    icon: Cpu,
  },
  {
    id: "medical",
    name: "Medical",
    status: "special",
    instruction: "Requires biohazard disposal — return to a pharmacy or clinic.",
    icon: Syringe,
  },
];

export function getCategory(id: string): WasteCategoryDisplay {
  return (
    WASTE_CATEGORIES.find((c) => c.id === id) ?? WASTE_CATEGORIES[0]
  );
}

export type DisposalStatus = "recyclable" | "special" | "landfill";

export interface WasteCategory {
  id: string;
  name: string;
  status: DisposalStatus;
  instruction: string;
}

export interface ClassificationResult {
  category: string;
  confidence: number;
  instructions: string;
  status: DisposalStatus;
  processing_time_ms: number;
}

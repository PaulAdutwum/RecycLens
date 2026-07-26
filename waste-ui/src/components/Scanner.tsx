"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Camera,
  Upload,
  ImageIcon,
  Loader2,
  RotateCcw,
  AlertCircle,
  Aperture,
} from "lucide-react";
import { classifyWaste, fileToBase64 } from "@/lib/api";
import type { ClassificationResult } from "@/lib/types";
import StatusBadge from "./ui/StatusBadge";

type Phase = "idle" | "camera" | "preview" | "analyzing" | "result" | "error";

export default function Scanner() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => stopCamera, [stopCamera]);

  const reset = () => {
    stopCamera();
    setImageSrc(null);
    setResult(null);
    setErrorMessage("");
    setPhase("idle");
  };

  const startCamera = async () => {
    setErrorMessage("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      setPhase("camera");
      // Video element mounts this render; attach on next tick.
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      });
    } catch {
      setErrorMessage("Camera access was denied or is unavailable on this device.");
      setPhase("error");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
    stopCamera();
    setImageSrc(canvas.toDataURL("image/jpeg", 0.92));
    setPhase("preview");
  };

  const loadFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please choose an image file.");
      setPhase("error");
      return;
    }
    setErrorMessage("");
    const base64 = await fileToBase64(file);
    setImageSrc(base64);
    setPhase("preview");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    loadFile(e.dataTransfer.files?.[0]);
  };

  const analyze = async () => {
    if (!imageSrc) return;
    setPhase("analyzing");
    try {
      const data = await classifyWaste(imageSrc);
      setResult(data);
      setPhase("result");
    } catch {
      setErrorMessage("Classification failed. Check your connection and try again.");
      setPhase("error");
    }
  };

  const isBusy = phase === "analyzing";

  return (
    <section id="scanner" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-accent-primary text-sm font-semibold tracking-widest uppercase">
            Scanner
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">
            Point. Shoot. Know instantly.
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Upload a photo or use your camera — RecycLens handles the rest.
          </p>
        </div>

        <div className="card-surface rounded-3xl p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Preview / capture zone */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => loadFile(e.target.files?.[0])}
              />

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`relative aspect-square rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors ${
                  dragActive
                    ? "border-accent-primary bg-accent-primary/5"
                    : "border-white/15 bg-bg-elevated"
                }`}
              >
                {phase === "camera" && (
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                )}

                {imageSrc && phase !== "camera" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageSrc}
                    alt="Selected waste item"
                    className="w-full h-full object-cover"
                  />
                )}

                {isBusy && (
                  <div className="absolute inset-0 bg-bg-primary/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-9 h-9 text-accent-primary animate-spin-slow" />
                    <p className="text-sm font-medium text-text-primary">
                      Analyzing waste type...
                    </p>
                  </div>
                )}

                {phase === "idle" && (
                  <div className="text-center px-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-accent-primary/10 flex items-center justify-center mb-4">
                      <Camera className="w-8 h-8 text-accent-primary" aria-hidden />
                    </div>
                    <p className="text-text-primary font-medium">
                      Drag & drop an image here
                    </p>
                    <p className="text-text-secondary text-sm mt-1">
                      or use the buttons to capture / upload
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  onClick={startCamera}
                  disabled={isBusy}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-bg-elevated hover:bg-white/10 border border-white/10 text-text-primary font-semibold text-sm px-4 py-3 transition disabled:opacity-50"
                >
                  {phase === "camera" ? (
                    <Aperture className="w-4 h-4" />
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                  {phase === "camera" ? "Camera live" : "Take Photo"}
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isBusy}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-bg-elevated hover:bg-white/10 border border-white/10 text-text-primary font-semibold text-sm px-4 py-3 transition disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  Upload Image
                </button>
              </div>

              {phase === "camera" && (
                <button
                  onClick={capturePhoto}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent-primary text-bg-primary font-semibold text-sm px-4 py-3 hover:brightness-110 transition"
                >
                  <ImageIcon className="w-4 h-4" />
                  Capture
                </button>
              )}

              {phase === "preview" && (
                <button
                  onClick={analyze}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent-primary text-bg-primary font-semibold text-sm px-4 py-3 hover:brightness-110 transition"
                >
                  Classify Image
                </button>
              )}

              {(phase === "preview" || phase === "result" || phase === "error") && (
                <button
                  onClick={reset}
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl text-text-secondary hover:text-text-primary text-sm px-4 py-2 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Start over
                </button>
              )}
            </div>

            {/* Result panel */}
            <div className="min-h-[22rem] flex flex-col justify-center">
              {phase === "error" && (
                <div className="rounded-2xl border border-error/30 bg-error/10 p-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-text-primary">Something went wrong</p>
                    <p className="text-text-secondary text-sm mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}

              {phase === "result" && result && (
                <div className="rounded-2xl bg-bg-elevated border border-white/10 p-6 animate-fade-in-up">
                  <div className="flex items-center justify-between">
                    <p className="text-text-secondary text-sm uppercase tracking-wide">
                      Detected category
                    </p>
                    <StatusBadge status={result.status} />
                  </div>
                  <p className="font-display text-3xl font-bold mt-2">{result.category}</p>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-text-secondary">Confidence</span>
                      <span className="font-semibold text-accent-secondary">
                        {(result.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-700"
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-white/10">
                    <p className="text-text-secondary text-sm uppercase tracking-wide mb-1.5">
                      Recycling instructions
                    </p>
                    <p className="text-text-primary text-sm leading-relaxed">
                      {result.instructions}
                    </p>
                  </div>

                  <p className="mt-4 text-xs text-text-secondary">
                    Processed in {result.processing_time_ms} ms
                  </p>
                </div>
              )}

              {(phase === "idle" || phase === "camera" || phase === "preview" || phase === "analyzing") && (
                <div className="text-center md:text-left text-text-secondary text-sm px-2">
                  {phase === "analyzing"
                    ? "Running the CNN classifier — results appear here."
                    : "Your classification result, confidence score, and disposal instructions will appear here."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

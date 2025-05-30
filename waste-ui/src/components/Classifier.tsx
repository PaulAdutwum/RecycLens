// waste-ui/src/app/components/Classifier.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function Classifier({ apiUrl }: { apiUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [mode, setMode] = useState<"camera" | "upload" | null>(null);
  const [result, setResult] = useState<{
    label: string;
    confidence: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    setMessage("");
    setResult(null);
    setCapturedImage(null);
    setUploadedImage(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setMode("camera");
    } catch {
      setMessage("Unable to access camera.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setResult(null);
    setCapturedImage(null);
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setMode("upload");
    } else {
      setMessage("Please select an image file.");
    }
  };

  const captureAndClassify = async () => {
    setLoading(true);
    setMessage("");
    setResult(null);
    let blob: Blob | null = null;

    if (mode === "camera" && videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas
        .getContext("2d")!
        .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob(res, "image/jpeg")
      );
      if (blob) {
        const preview = URL.createObjectURL(blob);
        setCapturedImage(preview);
      }
    } else if (mode === "upload" && fileInputRef.current?.files) {
      blob = fileInputRef.current.files[0];
    }

    if (!blob) {
      setMessage("No image to classify.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", blob, "waste.jpg");
    try {
      const { data } = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(data);
    } catch {
      setMessage("Classification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="classifier" className="mb-12 px-4 md:px-0">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Classify Your Waste
      </h2>
      <div className="flex flex-col md:flex-row items-start md:items-center">
        {/* Preview box */}
        <div className="w-56 h-56 border border-gray-300 p-2 mb-4 md:mb-0 flex items-center justify-center bg-gray-50">
          {mode === "camera" ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded"
            />
          ) : capturedImage ? (
            <img
              src={capturedImage}
              className="w-full h-full object-cover rounded"
              alt="Captured"
            />
          ) : uploadedImage ? (
            <img
              src={uploadedImage}
              className="w-full h-full object-cover rounded"
              alt="Uploaded"
            />
          ) : (
            <span className="text-gray-400">No image</span>
          )}
        </div>

        {/* Controls */}
        <div className="md:ml-8 flex flex-col gap-3">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="flex gap-3">
            <button
              onClick={startCamera}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Use Camera
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Upload Image
            </button>
          </div>
          <button
            onClick={captureAndClassify}
            disabled={loading || !mode}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Classify"}
          </button>
          {result && (
            <div className="mt-4">
              <p className="text-lg font-bold">{result.label}</p>
              <p className="text-sm text-gray-600">
                {(result.confidence * 100).toFixed(1)}%
              </p>
            </div>
          )}
          {message && <p className="mt-2 text-red-600">{message}</p>}
        </div>
      </div>
    </section>
  );
}

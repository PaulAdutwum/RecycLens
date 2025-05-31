"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

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
    <section id="classifier" className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Classify Your Waste
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Use your camera or upload an image to get instant AI-powered waste
            classification
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Preview Box */}
              <div className="flex-shrink-0">
                <div className="w-80 h-80 border-2 border-dashed border-gray-300 p-4 rounded-2xl flex items-center justify-center bg-gray-50 shadow-inner">
                  {mode === "camera" ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                  ) : capturedImage ? (
                    <Image
                      src={capturedImage}
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                      alt="Captured"
                      width={320}
                      height={320}
                      unoptimized
                    />
                  ) : uploadedImage ? (
                    <Image
                      src={uploadedImage}
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                      alt="Uploaded"
                      width={320}
                      height={320}
                      unoptimized
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl text-gray-300 mb-4">📷</div>
                      <span className="text-gray-400 text-lg font-medium">
                        No image selected
                      </span>
                      <p className="text-gray-300 text-sm mt-2">
                        Choose camera or upload to begin
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls Section */}
              <div className="flex-1 w-full lg:w-auto">
                <div className="space-y-6">
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={startCamera}
                      className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg flex items-center justify-center gap-3 group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-200"></span>
                      Use Camera
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg flex items-center justify-center gap-3 group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-200"></span>
                      Upload Image
                    </button>
                  </div>

                  {/* Classify Button */}
                  <button
                    onClick={captureAndClassify}
                    disabled={loading || !mode}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl font-bold text-xl flex items-center justify-center gap-3 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-none group"
                  >
                    {loading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                          🔍
                        </span>
                        Classify Image
                      </>
                    )}
                  </button>

                  {/* Results Section */}
                  {result && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="text-center">
                        <div className="text-4xl mb-3">✅</div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">
                          Results
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 mb-2">
                          {result.label}
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-lg font-semibold text-green-600">
                            {(result.confidence * 100).toFixed(1)}%
                          </span>
                          <span className="text-sm text-gray-600">
                            confidence
                          </span>
                        </div>
                        <div className="mt-3 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-green-600 h-full transition-all duration-1000 ease-out rounded-full"
                            style={{ width: `${result.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {message && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                      <span className="text-red-600 text-xl">⚠️</span>
                      <p className="text-red-800 font-medium">{message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

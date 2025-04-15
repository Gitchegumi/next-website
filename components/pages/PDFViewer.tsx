"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const PDFViewerContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get("url");
  const title = searchParams.get("title") || "Document Viewer";

  if (!pdfUrl) {
    return <div className="md:translate-y-48">No PDF URL provided</div>;
  }

  const handleLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className="w-full h-screen flex-col md:mt-48">
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex items-center">
          <button
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative flex-grow h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500">
            Failed to load PDF
          </div>
        )}
        <iframe
          src={`${pdfUrl}#zoom=100&navpanes=0`}
          className="w-full h-full"
          onLoad={handleLoad}
          onError={handleError}
          title={title}
        />
      </div>
    </div>
  );
};

const PDFViewer = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PDFViewerContent />
    </Suspense>
  );
};

export default PDFViewer;

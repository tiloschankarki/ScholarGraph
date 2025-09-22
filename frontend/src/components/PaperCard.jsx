import React, { useState, useEffect } from "react";

export default function PaperCard({ paper }) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* === Collapsed Card === */}
      <div
        onClick={() => setIsOpen(true)}
        className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition"
      >
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
          {paper.title}
        </h3>
        {paper.year && (
          <p className="text-sm text-gray-600">Year: {paper.year}</p>
        )}
        {paper.doi && (
          <p className="text-sm text-gray-600 truncate">DOI: {paper.doi}</p>
        )}
      </div>

      {/* === Expanded Modal === */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-lg md:w-[600px] max-h-[90vh] overflow-y-auto p-6 z-[10000]">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4">{paper.title}</h2>

            {paper.year && (
              <p className="text-sm text-gray-700 mb-2">
                <strong>Year:</strong> {paper.year}
              </p>
            )}
            {paper.doi && (
              <p className="text-sm text-gray-700 mb-2 break-all">
                <strong>DOI:</strong> {paper.doi}
              </p>
            )}
            {paper.publisher && (
              <p className="text-sm text-gray-700 mb-2">
                <strong>Publisher:</strong> {paper.publisher}
              </p>
            )}
            {paper.authors && paper.authors.length > 0 && (
              <p className="text-sm text-gray-700 mb-2">
                <strong>Authors:</strong> {paper.authors.join(", ")}
              </p>
            )}
            {paper.topics && paper.topics.length > 0 && (
              <p className="text-sm text-gray-700 mb-2">
                <strong>Topics:</strong> {paper.topics.join(", ")}
              </p>
            )}
            {paper.datasets && paper.datasets.length > 0 && (
              <p className="text-sm text-gray-700 mb-2">
                <strong>Datasets:</strong> {paper.datasets.join(", ")}
              </p>
            )}
            {paper.link && (
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                🔗 View Full Paper
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

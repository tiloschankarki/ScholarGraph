import React from "react";

export default function PaperCard({ paper, onDetails, onVisualize }) {
  const { title, authors, year, publisher, doi } = paper;

  return (
    <div className="bg-white rounded-lg shadow p-4 border flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title || "Untitled paper"}</h3>
        <p className="text-sm text-gray-600">Authors: {authors?.join(", ") || "N/A"}</p>
        <p className="text-sm text-gray-600">Year: {year || "N/A"}</p>
        <p className="text-sm text-gray-600">Publisher: {publisher || "N/A"}</p>
        {doi && (
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline text-sm"
          >
            DOI: {doi}
          </a>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onDetails(paper)}
          className="flex-1 bg-[#A39A8D] text-white px-3 py-2 rounded hover:opacity-90"
        >
          🔎 Details
        </button>
        <button
          onClick={() => onVisualize(paper)}
          className="flex-1 bg-[#fcb53b] text-black px-3 py-2 rounded hover:opacity-90"
        >
          🌐 Visualize Graph
        </button>
      </div>
    </div>
  );
}

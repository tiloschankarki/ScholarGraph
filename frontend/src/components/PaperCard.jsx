import React from "react";

function Pill({ children }) {
  return (
    <span className="inline-block rounded-full px-2 py-0.5 text-xs bg-gray-100 border">
      {children}
    </span>
  );
}

export default function PaperCard({ paper }) {
  const { title, year, doi, topics, datasets } = paper || {};

  return (
    <div className="bg-white rounded-lg shadow p-4 border">
      <h3 className="text-lg font-semibold">{title || "Untitled paper"}</h3>

      <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
        {year !== undefined && <span>Year: <strong>{year}</strong></span>}
        {doi && (
          <span className="break-all">
            DOI: <a className="text-blue-600 underline" href={`https://doi.org/${doi}`} target="_blank" rel="noreferrer">{doi}</a>
          </span>
        )}
      </div>

      {Array.isArray(topics) && topics.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium mb-1">Topics</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((t, i) => <Pill key={`t-${i}`}>{t}</Pill>)}
          </div>
        </div>
      )}

      {Array.isArray(datasets) && datasets.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium mb-1">Datasets</p>
          <div className="flex flex-wrap gap-2">
            {datasets.map((d, i) => <Pill key={`d-${i}`}>{d}</Pill>)}
          </div>
        </div>
      )}
    </div>
  );
}
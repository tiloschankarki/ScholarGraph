import React from "react";

export default function TxDisplay({ status, message, data }) {
  if (!status) return null; // nothing to show

  const baseClasses =
    "mt-4 p-3 border rounded transition duration-300 ease-in-out";

  const styles =
    status === "success"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-red-100 text-red-700 border-red-300";

  return (
    <div className={`${baseClasses} ${styles}`}>
      <p className="font-medium">{message}</p>

      {status === "success" && data && (
        <div className="mt-2 text-sm">
          <p>
            <strong>{data.title}</strong> ({data.year})
          </p>
          <p>DOI: {data.doi}</p>
          <p>Author: {data.author}</p>
          <p>Institution: {data.institution}</p>
          <p>Topic: {data.topic}</p>
          <p>Dataset: {data.dataset}</p>
        </div>
      )}
    </div>
  );
}
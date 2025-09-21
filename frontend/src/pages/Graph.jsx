import React from "react";
import GraphView from "../components/GraphView";

export default function Graph() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-black">Collaboration Graph</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <GraphView />
        </div>
      </div>
    </div>
  );
}
import React from "react";
import QueryForm from "../components/QueryForm";
import GraphView from "../components/GraphView";
import AddPaperForm from "../components/AddPaperForm";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">ScholarGraph Dashboard</h1>

      <div className="space-y-12 max-w-6xl mx-auto">
        <QueryForm />

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
            📊 Collaboration Graph
          </h2>
          <GraphView />
        </section>
        <AddPaperForm />
      </div>
    </div>
  );
}
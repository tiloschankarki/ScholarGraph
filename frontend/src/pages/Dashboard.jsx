import React from "react";
import QueryForm from "../components/QueryForm";
import GraphView from "../components/GraphView";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <QueryForm />
      <GraphView />
    </div>
  );
}
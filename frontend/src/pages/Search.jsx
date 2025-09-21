import React from "react";
import { useLocation } from "react-router-dom";
import QueryForm from "../components/QueryForm";

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";
  const type = params.get("type") || "author";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Search Results</h1>

      <QueryForm initialQuery={q} initialType={type} />
    </div>
  );
}
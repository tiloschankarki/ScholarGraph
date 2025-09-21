import React from "react";
import AddPaperForm from "../components/AddPaperForm";

export default function AddPaper() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-black mb-4">Add a Paper</h2>
        <AddPaperForm />
      </div>
    </div>
  );
}
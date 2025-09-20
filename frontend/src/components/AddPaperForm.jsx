import React, { useState } from "react";

export default function AddPaperForm() {
  const [formData, setFormData] = useState({
    title: "",
    doi: "",
    year: "",
    author: "",
    institution: "",
    topic: "",
    dataset: "",
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    // Validate required fields
    for (let key in formData) {
      if (!formData[key]) {
        setError(`Field "${key}" is required.`);
        return;
      }
    }

    try {
      // Simulate network delay
      await new Promise((res) => setTimeout(res, 1000));

      // Mock success response 
      setSuccess({
        message: "✅ Paper added successfully!",
        paper: { ...formData },
      });

      // Clear form
      setFormData({
        title: "",
        doi: "",
        year: "",
        author: "",
        institution: "",
        topic: "",
        dataset: "",
      });
    } catch (err) {
      setError("❌ Failed to add paper. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Paper</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            type={field === "year" ? "number" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Add Paper
        </button>
      </form>

      {/* Success & Error Messages */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded">
          {success.message} <br />
          <strong>{success.paper.title}</strong> ({success.paper.year})
        </div>
      )}
    </div>
  );
}
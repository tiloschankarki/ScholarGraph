import React, { useState } from "react";
import TxDisplay from "./TxDisplay";

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

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [paperData, setPaperData] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setMessage("");
    setPaperData(null);

    // Validate required fields
    for (let key in formData) {
      if (!formData[key]) {
        setStatus("error");
        setError(`Field "${key}" is required.`);
        return;
      }
    }

    try {
      // Simulate network delay
      await new Promise((res) => setTimeout(res, 1000));

      // Mock success response 
      setStatus("success");
      setMessage( "✅ Paper added successfully!");
      setPaperData ({ ...formData });

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
      setStatus("error");  
      setMessage("❌ Failed to add paper. Please try again.");
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

      {/* Transaction Display */}
      <TxDisplay status={status} message={message} data={paperData} />
    </div>
  );
}
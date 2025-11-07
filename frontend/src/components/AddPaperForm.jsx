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
        setMessage(`Field "${key}" is required.`);
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
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-2xl bg-[rgb(233,210,180)] rounded-2xl shadow-lg p-10 md:p-12 min-h-[550px]"
    style={{ maxWidth: "550px" }}>
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">Add New Paper</h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            padding: "10px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: "1.5rem",
            columnGap: "2rem",
            marginBottom: "1.5rem",
          }}
        >
          {Object.keys(formData).map((field) => (
            <div key={field} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "#1a1a1a" }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                type={field === "year" ? "number" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
                style={{
                  padding: "12px 16px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  outline: "none",
                }}
              />
            </div>
          ))}

          {/* Button now inside the same grid */}
          <div
            style={{
              gridColumn: "1 / span 2",
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <button
              type="submit"
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "12px 32px",
                fontSize: "16px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add Paper
            </button>
          </div>
        </div>
      </form>
      <div className="mt-8">
        <TxDisplay status={status} message={message} data={paperData} />
      </div>
    </div>
  </div>
);
}
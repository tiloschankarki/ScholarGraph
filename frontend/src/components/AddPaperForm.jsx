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
  <div
    style={{
      minHeight: "90vh",
      display: "flex",
      borderRadius: "16px",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundImage: "linear-gradient(to right top, #a39a8d, #baa17b, #d0a868, #e6af54, #fcb53b)",
      padding: "0 4rem",
      gap: "3rem",
    }}
  >
    {/* LEFT SIDE TEXT */}
    <div style={{ flex: 1 }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#111827", marginBottom: "1rem" }}>
        Add your research paper to ScholarGraph
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#374151", lineHeight: "1.6" }}>
        Showcase your work, connect with peers, and make your ideas discoverable.
        ScholarGraph helps you record and verify academic contributions easily.
      </p>
    </div>

    {/* RIGHT SIDE TAN CONTAINER */}
    <div
      style={{
        flex: "0 0 520px",
        backgroundColor: "rgb(233,210,180, 0.4)",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        padding: "2.5rem",
        minHeight: "550px",
      }}
    >
      <h2 style={{ fontSize: "1.875rem", fontWeight: "700", textAlign: "center", marginBottom: "2rem", color: "#111827" }}>
        Add New Paper
      </h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: "1.5rem",
            columnGap: "2rem",
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

      <div style={{ marginTop: "2rem" }}>
        <TxDisplay status={status} message={message} data={paperData} />
      </div>
    </div>
  </div>
);
}
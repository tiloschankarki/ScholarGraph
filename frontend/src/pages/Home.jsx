import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgLogo from "../assets/scholarlogo.png";

export default function Home() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("author"); // or "topic"
  const navigate = useNavigate();

  const goSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}&type=${encodeURIComponent(type)}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogo})` }}
    >
      {/* Search row */}
      <form
        onSubmit={goSearch}
        className="absolute flex gap-6"
        style={{ top: "500px" }} 
      >
        {/* Input */}
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a research paper"
          className="rounded-md bg-[#A39A8D] text-white placeholder-white/90 focus:outline-none px-4"
          style={{ width: "380px", height: "40px", borderRadius: "10px" }}
        />

        {/* Button */}
        <button
          type="submit"
          className="rounded-md font-medium bg-[#A39A8D] text-white hover:opacity-90 transition"
          style={{ width: "45px", height: "40px", borderRadius: "10px", marginLeft: "12px", }}
        >
          <span style={{ fontSize: "25px", lineHeight: "1" }}>🔍</span> 
        </button>
      </form>

      {/* Add Paper button */}
      <button
        type="submit"
        className="absolute rounded-md font-medium bg-[#A39A8D] text-white hover:opacity-90 transition"
        style={{ bottom: "40px", right: "40px", width: "120px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        Add a Paper
      </button>
    </div>
  );
}
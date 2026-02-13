import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgLogo from "../assets/scholarlogo.png";
import {
  suggestAuthors,
  suggestTopics,
  suggestPublishers,
} from "../lib/api.js";

export default function Home() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("author");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const goSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q)}&type=${encodeURIComponent(type)}`);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!q.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        let res;
        if (type === "author") res = await suggestAuthors(q);
        else if (type === "topic") res = await suggestTopics(q);
        else if (type === "publisher") res = await suggestPublishers(q);

        setSuggestions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [q, type]);

  return (
    <div
      className="min-h-screen flex flex-col items-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogo})` }}
    >
      {/* Search row */}
      <form
        onSubmit={goSearch}
        className="absolute flex items-center justify-center gap-2"
        style={{ top: "500px" }}
      >
        <div
          style={{
            backgroundColor: "#A39A8D",
            borderRadius: "10px",
            padding: "6px 10px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search by ${type}`}
            className="text-white placeholder-white/80 bg-transparent px-4 focus:outline-none"
            style={{
              width: "360px",
              height: "36px",
              border: "none",
            }}
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-transparent text-white focus:outline-none"
            style={{
              border: "none",
              height: "36px",
              color: "black",
              fontWeight: 500,
            }}
          >
            <option value="author">Author</option>
            <option value="topic">Topic</option>
            <option value="publisher">Publisher</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#A39A8D] text-white hover:opacity-80 transition flex items-center justify-center"
          style={{
            width: "45px",
            height: "42px",
            borderRadius: "10px",
            border: "none",
            marginLeft: "10px",

          }}
        >
          <span style={{ fontSize: "20px" }}>🔍</span>
        </button>
      </form>

      <button
        type="button"
        className="absolute font-medium bg-[#A39A8D] text-white hover:opacity-90 transition-shadow"
        style={{
          bottom: "60px",
          right: "60px",
          width: "120px",
          height: "45px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          letterSpacing: "0.3px",
        }}
        onClick={() => navigate("/add")}
      >
        Add a Paper
      </button>
    </div>
  );
}

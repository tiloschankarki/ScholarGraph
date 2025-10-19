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
        className="absolute flex gap-4 items-center"
        style={{ top: "500px" }}
      >
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-md bg-[#A39A8D] text-white px-2 py-1 focus:outline-none"
          style={{ borderRadius: "10px", height: "40px" }}
        >
          <option value="author">Author</option>
          <option value="topic">Topic</option>
          <option value="publisher">Publisher</option>
        </select>

        <div className="relative">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search by ${type}`}
            className="rounded-md bg-[#A39A8D] text-white placeholder-white/90 focus:outline-none px-4"
            style={{ width: "300px", height: "40px", borderRadius: "10px" }}
          />
          {suggestions.length > 0 && (
            <ul className="absolute bg-white text-black w-full rounded-md mt-1 shadow-md max-h-40 overflow-y-auto z-10">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-3 py-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setQ(s);
                    setSuggestions([]);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="rounded-md font-medium bg-[#A39A8D] text-white hover:opacity-90 transition"
          style={{ width: "45px", height: "40px", borderRadius: "10px" }}
        >
          <span style={{ fontSize: "22px", lineHeight: "1" }}>🔍</span>
        </button>
      </form>

      <button
        type="button"
        className="absolute rounded-md font-medium bg-[#A39A8D] text-white hover:opacity-90 transition"
        style={{
          bottom: "40px",
          right: "40px",
          width: "120px",
          height: "40px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => navigate("/add")}
      >
        Add a Paper
      </button>
    </div>
  );
}

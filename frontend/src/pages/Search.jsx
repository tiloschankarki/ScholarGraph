import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import PaperCard from "../components/PaperCard.jsx";
import miniLogo from "../assets/minischolar.png";
console.log("PaperCard import:", PaperCard);

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const q = params.get("q") || "";
  const type = params.get("type") || "author";

  const [searchValue, setSearchValue] = useState(q);
  const [menuOpen, setMenuOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // === Trigger search whenever q/type changes ===
  useEffect(() => {
    const fetchResults = async () => {
      if (!q.trim()) return;
      setLoading(true);
      try {
        let res;
        if (type === "author") {
          res = await axios.get(`/api/papers?author=${encodeURIComponent(q)}`);
        } else if (type === "topic") {
          res = await axios.get(`/api/papers/topic/${encodeURIComponent(q)}`);
        } else if (type === "publisher") {
          res = await axios.get(`/api/papers/publisher/${encodeURIComponent(q)}`);
        }

        console.log("API Response:", res.data);
        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Error fetching results:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [q, type]);

  // === Handle search box ===
  const handleSearch = () => {
    if (!searchValue.trim()) return;
    navigate(
      `/search?q=${encodeURIComponent(searchValue)}&type=${encodeURIComponent(type)}`
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top header row */}
      <div className="flex items-center justify-between px-6 py-6 relative">
        {/* Logo */}
        <img
          src={miniLogo}
          alt="Scholar Graph"
          className="w-[170px] h-[170px] object-contain"
        />

        {/* Search box */}
        <div
          className="absolute flex items-center gap-2"
          style={{
            top: "40px",
            left: "250px",
            width: "600px",
            height: "40px",
          }}
        >
          {/* Dropdown for search type */}
          <select
            value={type}
            onChange={(e) =>
              navigate(`/search?q=${encodeURIComponent(searchValue)}&type=${e.target.value}`)
            }
            className="rounded-md bg-[#A39A8D] text-white px-2 py-1 focus:outline-none"
            style={{ borderRadius: "10px", height: "40px" }}
          >
            <option value="author">Author</option>
            <option value="topic">Topic</option>
            <option value="publisher">Publisher</option>
          </select>

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Search by ${type}`}
            className="flex-1 h-full rounded-[10px] bg-[#A39A8D] outline-none text-white placeholder-white text-lg px-3"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="w-[62px] h-full flex items-center justify-center rounded-lg hover:opacity-90"
            style={{
              backgroundColor: "#A39A8D",
              borderRadius: "10px",
            }}
          >
            <span style={{ fontSize: "25px", lineHeight: "1" }}>🔍</span>
          </button>
        </div>

        {/* Hamburger menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-8 right-8 flex flex-col justify-between w-8 h-6 cursor-pointer z-50"
        >
          <span className="block w-8 h-1 bg-white rounded"></span>
          <span className="block w-8 h-1 bg-white rounded"></span>
          <span className="block w-8 h-1 bg-white rounded"></span>
        </button>
      </div>

      {/* Slide-out menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-lg p-6 space-y-6">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setMenuOpen(false)}
          >
            ✖
          </button>
          <Link to="/" className="block hover:text-[#fcb53b]">
            Home
          </Link>
          <Link to="/add" className="block hover:text-[#fcb53b]">
            Add a Paper
          </Link>
          <Link to="/graph" className="block hover:text-[#fcb53b]">
            Graph
          </Link>
        </div>
      )}

      {/* Results section */}
      <div className="flex justify-center mt-[118px] px-6">
        <div className="w-full md:w-4/5 lg:w-2/3 bg-[#A39A8D] rounded-lg p-10 text-black">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Results for {type}: <span className="text-yellow-400">{q}</span>
          </h2>
          {loading && <p className="text-white">Loading...</p>}
          {!loading && results.length === 0 && (
            <p className="text-white">No results found.</p>
          )}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
           <PaperCard key={i} paper={p} />
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

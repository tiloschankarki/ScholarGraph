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
    <div className="min-h-screen bg-black/95 text-white flex flex-col px-8 relative overflow-hidden">
      {/* Top header row */}
      <div className="flex items-center justify-between px-6 py-6 relative">
        {/* Logo */}
        <img
          src={miniLogo}
          alt="Scholar Graph"
          className="w-[150px] h-[150px] object-contain"
        />

        {/* Search box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex items-center gap-3"
        >
          {/* input + select */}
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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={`Search by ${type}`}
              className="text-white placeholder-white/80 bg-transparent px-4 focus:outline-none"
              style={{ width: "360px", height: "36px", border: "none" }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <select
              value={type}
              onChange={(e) =>
                navigate(
                  `/search?q=${encodeURIComponent(searchValue)}&type=${e.target.value}`
                )
              }
              className="bg-transparent focus:outline-none"
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

          {/* separate search button with a gap */}
          <button
            type="submit"
            className="hover:opacity-80 transition flex items-center justify-center"
            style={{
              backgroundColor: "#A39A8D",
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
        {/* Navigation Links */}
        <div className="flex items-center justify-end pr-12 gap-8 text-lg  ">
          <Link
            to="/"
            className="text-[#A39A8D] hover:underline hover:text-white transition-all hover:opacity-80 "
          >
            Home
          </Link>
          <Link
            to="/add"
            className="text-[#A39A8D] hover:underline hover:text-white transition-all hover:opacity-80 "
          >
            Add a Paper
          </Link>
        </div>
      </div>  
    
      {/* Results section */}
      <div className="flex justify-center mt-[50px] px-6">
        <div className="w-full md:w-4/5 lg:w-2/3 bg-[#A39A8D] rounded-lg p-10 text-black "
        style={{ borderRadius: "10px" }}
        >
        
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

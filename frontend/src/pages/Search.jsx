import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import QueryForm from "../components/QueryForm";
import miniLogo from "../assets/minischolar.png";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";
  const type = params.get("type") || "author";

  const [searchValue, setSearchValue] = useState(q);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchValue)}&type=${type}`);
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
          className="absolute flex items-center"
          style={{
            top: "40px",
            left: "350px",
            width: "380px",
            height: "40px",
            borderRadius: "10px",
          }}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by author, topic, publisher, institution..."
            className="w-[450px] h-full rounded-[10px] bg-[#A39A8D] outline-none text-white placeholder-white text-lg px-3"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="ml-3 w-[62px] h-full flex items-center justify-center rounded-lg hover:opacity-90"
            style={{
              backgroundColor: "#A39A8D",
              marginLeft: "12px",
              borderRadius: "10px",
            }}
          >
            <span style={{ fontSize: "25px", lineHeight: "1" }}>🔍</span>
          </button>
        </div>

        {/* Hamburger (RIGHT SIDE) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-8 right-8 flex flex-col justify-between w-8 h-6 cursor-pointer z-50"
        >
          <span className="block w-8 h-1 bg-white rounded"></span>
          <span className="block w-8 h-1 bg-white rounded"></span>
          <span className="block w-8 h-1 bg-white rounded"></span>
        </button>
      </div>

      {/* Slide-out menu (opens from right) */}
      {menuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-lg p-6 space-y-6">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setMenuOpen(false)}
          >
            ✖
          </button>
          <Link
            to="/"
            className="block hover:text-[#fcb53b]"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/add"
            className="block hover:text-[#fcb53b]"
            onClick={() => setMenuOpen(false)}
          >
            Add a Paper
          </Link>
          <Link
            to="/graph"
            className="block hover:text-[#fcb53b]"
            onClick={() => setMenuOpen(false)}
          >
            Graph
          </Link>
        </div>
      )}

      {/* Tan Content Box */}
      <div className="flex justify-center mt-[118px] px-6">
        <div className="w-full md:w-4/5 lg:w-2/3 bg-[#A39A8D] rounded-lg p-10">
          <QueryForm initialQuery={q} initialType={type} mode="dashboard" />
        </div>
      </div>
    </div>
  );
}

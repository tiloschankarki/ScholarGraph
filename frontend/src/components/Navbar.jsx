import React from "react";
import { Link } from "react-router-dom";
import miniLogo from "../assets/minischolar.png";

export default function Navbar() {
  return (
   <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={miniLogo}
            alt="Scholar Graph"
            className="h-10 w-auto"
          />
        </Link>

        {/* optional quick links */}
        <div className="hidden sm:flex items-center gap-6 text-sm text-white">
          <Link to="/search" className="hover:text-[#fcb53b] transition">Search</Link>
          <Link to="/add" className="hover:text-[#fcb53b] transition">Add a Paper</Link>
          <Link to="/graph" className="hover:text-[#fcb53b] transition">Graph</Link>
        </div>
      </div>
    </nav>
  );
}
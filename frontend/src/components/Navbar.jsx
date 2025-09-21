import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary text-white px-6 py-3 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <h1 className="font-bold text-xl tracking-wide">ScholarGraph</h1>

      {/* Links */}
      <div className="space-x-6">
        <Link to="/" className="hover:text-accent transition">
          Home
        </Link>
        <Link to="/dashboard" className="hover:text-accent transition">
          Dashboard
        </Link>
        <Link to="/about" className="hover:text-accent transition">
          About
        </Link>
      </div>
    </nav>
  );
}
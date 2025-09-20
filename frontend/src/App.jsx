import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      {/* Simple Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
        <h1 className="font-bold text-xl">ScholarGraph</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <h2 className="text-2xl font-bold">Welcome to ScholarGraph</h2>
            </div>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
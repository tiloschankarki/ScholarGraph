import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar /> 

      {/* Routes */}
      <div className="pt-16">
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
          <Route
            path="/about"
            element={
              <div className="flex items-center justify-center min-h-screen bg-light">
                <h2 className="text-2xl font-bold text-primary">About Page</h2>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
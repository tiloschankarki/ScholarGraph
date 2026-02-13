import React from "react";
import AddPaperForm from "../components/AddPaperForm";
import miniLogo from "../assets/minischolar.png";

export default function AddPaper() {
  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      {/* NAVBAR*/}
      <div className="flex items-center justify-between px-12 py-4 bg-black">
        {/* LEFT — LOGO */}
          <div className="flex items-center gap-4">
            <img
              src={miniLogo}
              alt="Scholar Graph"
              className="h-[150px] w-[150px]"
            />
          </div>
          {/* RIGHT — LINKS */}
          <div className="flex items-center gap-8">
            <a
              href="/"
              className="text-[#A39A8D] hover:underline hover:text-white transition-all hover:opacity-80"
            >
              Home
            </a>
            <a
              href="/search"
              className="text-[#A39A8D] hover:underline hover:text-white transition-all hover:opacity-80"
            >
              Search A paper
            </a>
          </div>
      </div>
      <AddPaperForm />
    </div>
  );
}
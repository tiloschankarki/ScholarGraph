import React from "react";
import AddPaperForm from "../components/AddPaperForm";
import miniLogo from "../assets/minischolar.png";

export default function AddPaper() {
  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      {/* NAVBAR*/}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1rem",
          backgroundColor: "black",
        }}
      >
        {/* LEFT — LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src={miniLogo}
            alt="Scholar Graph"
            style={{ height: "150px", width: "150px" }}
          />
        </div>

        {/* RIGHT — LINKS */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <a
            href="/"
            style={{
              color: "#A39A8D",
              fontWeight: "500",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            Home
          </a>
          <a
            href="/search"
            style={{
              color: "#A39A8D",
              fontWeight: "500",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            Search A Paper
          </a>
        </div>
      </div>
      <AddPaperForm />
    </div>
  );
}
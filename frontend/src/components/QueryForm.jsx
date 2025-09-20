import React, { useState } from "react";

export default function QueryForm() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("author");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Searching by ${searchType}: ${query}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Search Papers</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input */}
        <input
          type="text"
          placeholder="Enter author or topic"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Dropdown */}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="author">Author</option>
          <option value="topic">Topic</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
}
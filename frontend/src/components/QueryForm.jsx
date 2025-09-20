import React, { useState } from "react";
import PaperCard from "./PaperCard";
import axios from "axios";

export default function QueryForm() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("author");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mockResults =
        searchType === "author"
         ? [
            {
                title: "Graph Databases for Research",
                year: 2022,
                doi: "10.1234/mock1",
                topics: ["Knowledge Graphs", "AI"],
                datasets: ["Dataset A", "Dataset B"],
            },
            {
                title: "Neo4j in Decentralized Systems",
                year: 2023,
                doi: "10.1234/mock2",
                topics: ["Blockchain"],
                datasets: ["Dataset X"],
            },
           ]
         : [
            {
                title: "Blockchain for Science",
                year: 2021,
                doi: "10.5678/mock3",
            },
            {
                title: "Decentralized Knowledge Sharing",
                year: 2024,
                doi: "10.5678/mock4",
            },
            ];

    setResults(mockResults);
  };

    /*try {
      let url = "";

      if (searchType === "author") {
        url = `/api/papers?author=${encodeURIComponent(query)}`;
      } else {
        url = `/api/papers/topic/${encodeURIComponent(query)}`;
      }

      const res = await axios.get(url);
      console.log("API Response:", res.data); 
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };*/
    
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="p-6 bg-white rounded-lg shadow-md">
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

        {/* Results */}
        <div className="mt-6">
        {results.length === 0 ? (
            <p className="text-sm text-gray-600 text-center">
            No results yet — try a search above.
            </p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((paper, idx) => (
                <PaperCard
                key={paper.doi || `${paper.title}-${paper.year}-${idx}`}
                paper={paper}
                />
            ))}
            </div>
        )}
        </div>
    </div>
  );
}
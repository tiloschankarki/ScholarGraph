import React, { useState, useEffect } from "react";
import PaperCard from "./PaperCard";
import axios from "axios";

export default function QueryForm({ initialQuery = "", initialType = "author", mode="full" }) {
  const [query, setQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState(initialType);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);   
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      let res;

      if (searchType === "author") {
        res = await axios.get(`http://localhost:4000/api/papers`, { params: { author: query } });
      } else {
        res = await axios.get(`http://localhost:4000/api/papers/topic/${encodeURIComponent(query)}`);
      }
      setResults(res.data); 
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch results. Please try again.");
      }finally {
       setLoading(false);
      }
  };
  useEffect(() => {
    if (initialQuery) {
      handleSubmit();
    }
  }, [initialQuery, searchType]);

  const handleDetails = (paper) => {
    console.log("Show details for:", paper);
    // later: open modal with full details
  };

  const handleVisualize = (paper) => {
    console.log("Visualize graph for:", paper);
    // later: open graph page or modal
  };
     
  return (
    <div className={mode === "dashboard" ? "w-full" : "max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"}>
      {mode === "full" && (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Search Papers</h2>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
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
                  className="w-full md:w-40 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <option value="author">Author</option>
                  <option value="topic">Topic</option>
                </select>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
                  >
                  Search
                </button>
            </form>
        </div>
      )}

        {/* Error */}
        {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
               {error}
            </div>
        )}

        {/* Results */}
        <div className="mt-6">
          {loading ? (
              <p className="text-sm text-gray-600 text-center"> Fetching results </p>
          ) : results.length === 0 ? (
              <p className="text-sm text-gray-600 text-center">
                  No results yet — try a search above.
              </p>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((paper, idx) => (
                  <PaperCard
                  key={paper.doi || `${paper.title}-${paper.year}-${idx}`}
                  paper={paper}
                  onDetails={handleDetails}
                  onVisualize={handleVisualize}
                  />
              ))}
              </div>
          )}
        </div>
    </div>
  );
}
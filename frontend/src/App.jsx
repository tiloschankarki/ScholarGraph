import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";


import Home from "./pages/Home";
import Search from "./pages/Search";
import AddPaper from "./pages/AddPaper";
import Graph from "./pages/Graph";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/add" element={<AddPaper />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
      
    </BrowserRouter>
  );

}
 
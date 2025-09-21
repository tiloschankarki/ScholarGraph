import React from "react";
import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Search from "./pages/Search";
import AddPaper from "./pages/AddPaper";
import Graph from "./pages/Graph";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // no navbar on home

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={!hideNavbar ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/add" element={<AddPaper />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
      </div>
    </>
  );
}
    

export default function App() {
  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  );

}
 
import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";

export default function GraphView() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Mock data
    const mockData = [
      { institution1: "MIT", institution2: "Stanford", paper: "AI for Healthcare" },
      { institution1: "MIT", institution2: "Harvard", paper: "Graph Databases" },
      { institution1: "Stanford", institution2: "CMU", paper: "Blockchain Security" },
    ];

    // Extract unique institutions as nodes
    const institutions = new Set();
    mockData.forEach((c) => {
      institutions.add(c.institution1);
      institutions.add(c.institution2);
    });

    const nodes = Array.from(institutions).map((inst, idx) => ({
      id: idx + 1,
      label: inst,
      shape: "ellipse",
      color: { background: "#E5F4FF", border: "#3B82F6" },
      font: { color: "#1E3A8A", size: 16, face: "Arial" },
    }));

    const nodeMap = {};
    nodes.forEach((n) => (nodeMap[n.label] = n.id));

    // Create edges from collaborations
    const edges = mockData.map((c) => ({
      from: nodeMap[c.institution1],
      to: nodeMap[c.institution2],
      label: c.paper,
      arrows: "to",
      font: { align: "middle", size: 12 },
      color: { color: "#9CA3AF" },
    }));

    const data = { nodes, edges };
    const options = {
      layout: { improvedLayout: true },
      physics: { stabilization: true },
      edges: { smooth: true },
      interaction: { hover: true, zoomView: true },
    };

    new Network(containerRef.current, data, options);
  }, []);

  return (
     <div className="bg-light rounded-lg shadow-inner p-4">
      <div
        ref={containerRef}
        style={{ height: "500px", borderRadius: "8px" }}
        className="bg-white border border-gray-200"
      />
      <p className="text-center text-sm text-gray-500 mt-3">
        Hover over nodes or zoom in/out to explore collaborations
      </p>
     </div>
  );
}
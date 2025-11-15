// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import usePageTracking from "./hooks/usePageTracking";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CgpaCalculator from "./pages/CgpaCalculator";
import InternalMarks2Year from "./pages/InternalMarks2Year";
import InternalMarks3Year from "./pages/InternalMarks3Year";

function App() {
  // Google Analytics route tracking
  usePageTracking();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home Page */}
          <Route index element={<HomePage />} />

          {/* CGPA Calculator */}
          <Route path="cgpa" element={<CgpaCalculator />} />

          {/* Internal Marks Pages */}
          <Route path="internal-2y" element={<InternalMarks2Year />} />
          <Route path="internal-3y" element={<InternalMarks3Year />} />

          {/* Add more routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

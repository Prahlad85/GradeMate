// src/pages/InternalMarks1Year.jsx
import React, { useState } from "react";
import "./calculators.css";

// Reusable Input Component
const FormInput = ({ id, label, max, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label} (Max: {max})
    </label>
    <input
      type="number"
      step="any"
      id={id}
      value={value}
      onChange={onChange}
      min="0"
      max={max}
      placeholder="0"
    />
  </div>
);

const InternalMarks1Year = () => {
  const [activeTab, setActiveTab] = useState("theory");

  // ---------------- THEORY STATE ----------------
  const [theoryMarks, setTheoryMarks] = useState({
    mst1: "",
    mst2: "",
    assignment: "",
    surprise: "",
    attendance: "",
    caseStudy: "",
  });
  const [theoryResult, setTheoryResult] = useState(null);
  const [highlightTheory, setHighlightTheory] = useState(false);

  // ---------------- HYBRID STATE ----------------
  const [hybridMarks, setHybridMarks] = useState({
    mst1: "",
    mst2: "",
    pa1: "",
    pa2: "",
    evaluations: "",
    pa3: "",
    caseStudy: "",
    pmt: "",
    surprise: "",
    assignment: "",
    attendance: "",
  });
  const [hybridResult, setHybridResult] = useState(null);
  const [highlightHybrid, setHighlightHybrid] = useState(false);

  // ---------------- PRACTICAL STATE ----------------
  const [practicalMarks, setPracticalMarks] = useState({
    pa1: "",
    pa2: "",
    pa3: "",
    pmst: "",
    viva: "",
  });
  const [practicalResult, setPracticalResult] = useState(null);
  const [highlightPractical, setHighlightPractical] = useState(false);

  const parse = (val) => parseFloat(val) || 0;

  // ---------- Input Handlers ----------
  const genericHandler = (setter) => (e) => {
    const { id, value } = e.target;
    const max = parseFloat(e.target.max);
    let num = parseFloat(value);
    if (num > max) num = max;
    if (num < 0) num = 0;

    setter((prev) => ({
      ...prev,
      [id]: isNaN(num) ? "" : num,
    }));
  };

  const handleTheoryChange = genericHandler(setTheoryMarks);
  const handleHybridChange = genericHandler(setHybridMarks);
  const handlePracticalChange = genericHandler(setPracticalMarks);

  // ---------------- THEORY SUBMIT ----------------
  const handleTheorySubmit = (e) => {
    e.preventDefault();
    const m = theoryMarks;
    const total =
      (parse(m.mst1) / 20) * 10 +
      (parse(m.mst2) / 20) * 10 +
      (parse(m.assignment) / 12) * 12 +
      (parse(m.surprise) / 12) * 6 +
      (parse(m.attendance) / 2) * 2 +
      (parse(m.caseStudy) / 20) * 10;

    setTheoryResult(total.toFixed(2));
    setHighlightTheory(true);
    setTimeout(() => setHighlightTheory(false), 1000);
  };

  // ---------------- HYBRID SUBMIT ----------------
  const handleHybridSubmit = (e) => {
    e.preventDefault();
    const m = hybridMarks;
    const total =
      (parse(m.mst1) / 20) * 5 +
      (parse(m.mst2) / 20) * 5 +
      (parse(m.pa1) / 30) * 7.5 +
      (parse(m.pa2) / 30) * 7.5 +
      (parse(m.evaluations) / 40) * 20 +
      (parse(m.pa3) / 30) * 7.5 +
      (parse(m.caseStudy) / 20) * 5 +
      (parse(m.pmt) / 30) * 7.5 +
      (parse(m.surprise) / 12) * 3 +
      (parse(m.assignment) / 12) * 5 +
      (parse(m.attendance) / 2) * 2;

    setHybridResult(total.toFixed(2));
    setHighlightHybrid(true);
    setTimeout(() => setHighlightHybrid(false), 1000);
  };

  // ---------------- PRACTICAL SUBMIT ----------------
  const handlePracticalSubmit = (e) => {
    e.preventDefault();
    const m = practicalMarks;
    const total =
      (parse(m.pa1) / 30) * 15 +
      (parse(m.pa2) / 30) * 15 +
      (parse(m.pa3) / 30) * 15 +
      (parse(m.pmst) / 30) * 15 +
      (parse(m.viva) / 40) * 40;

    setPracticalResult(total.toFixed(2));
    setHighlightPractical(true);
    setTimeout(() => setHighlightPractical(false), 1000);
  };

  return (
    <div className="calculator-container2">
      <h1>Internal Marks (1st Year)</h1>

      {/* -------- TABS -------- */}
      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === "theory" ? "active" : ""}`}
          onClick={() => setActiveTab("theory")}
        >
          Theory
        </button>
        <button
          className={`tab-btn ${activeTab === "hybrid" ? "active" : ""}`}
          onClick={() => setActiveTab("hybrid")}
        >
          Hybrid
        </button>
        <button
          className={`tab-btn ${activeTab === "practical" ? "active" : ""}`}
          onClick={() => setActiveTab("practical")}
        >
          Practical
        </button>
      </nav>

      {/* -------- THEORY TAB -------- */}
      <div className={`tab-pane ${activeTab === "theory" ? "active" : ""}`}>
        <form onSubmit={handleTheorySubmit}>
          <div className="form-grid">
            <FormInput id="mst1" label="MST 1" max="20" value={theoryMarks.mst1} onChange={handleTheoryChange} />
            <FormInput id="mst2" label="MST 2" max="20" value={theoryMarks.mst2} onChange={handleTheoryChange} />
            <FormInput id="assignment" label="Assignment" max="12" value={theoryMarks.assignment} onChange={handleTheoryChange} />
            <FormInput id="surprise" label="Surprise Test / Quiz" max="12" value={theoryMarks.surprise} onChange={handleTheoryChange} />
            <FormInput id="attendance" label="Attendance" max="2" value={theoryMarks.attendance} onChange={handleTheoryChange} />
            <FormInput id="caseStudy" label="Case Study / Project" max="20" value={theoryMarks.caseStudy} onChange={handleTheoryChange} />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">Calculate Theory</button>
          </div>
        </form>
        {theoryResult !== null && (
          <div className="result-box">
            <h3>Theory Marks</h3>
            <div className={`result-value ${highlightTheory ? "highlight" : ""}`}>
              {theoryResult} / 50
            </div>
          </div>
        )}
      </div>

      {/* -------- HYBRID TAB -------- */}
      <div className={`tab-pane ${activeTab === "hybrid" ? "active" : ""}`}>
        <form onSubmit={handleHybridSubmit}>
          <div className="form-grid">
            <FormInput id="mst1" label="MST 1" max="20" value={hybridMarks.mst1} onChange={handleHybridChange} />
            <FormInput id="mst2" label="MST 2" max="20" value={hybridMarks.mst2} onChange={handleHybridChange} />
            <FormInput id="pa1" label="Practical Assessment 1" max="30" value={hybridMarks.pa1} onChange={handleHybridChange} />
            <FormInput id="pa2" label="Practical Assessment 2" max="30" value={hybridMarks.pa2} onChange={handleHybridChange} />
            <FormInput id="evaluations" label="Practical Evaluations" max="40" value={hybridMarks.evaluations} onChange={handleHybridChange} />
            <FormInput id="pa3" label="Practical Assessment 3" max="30" value={hybridMarks.pa3} onChange={handleHybridChange} />
            <FormInput id="caseStudy" label="Case Study / Project" max="20" value={hybridMarks.caseStudy} onChange={handleHybridChange} />
            <FormInput id="pmt" label="Practical Mid Term" max="30" value={hybridMarks.pmt} onChange={handleHybridChange} />
            <FormInput id="surprise" label="Surprise Test / Quiz" max="12" value={hybridMarks.surprise} onChange={handleHybridChange} />
            <FormInput id="assignment" label="Assignment" max="12" value={hybridMarks.assignment} onChange={handleHybridChange} />
            <FormInput id="attendance" label="Attendance" max="2" value={hybridMarks.attendance} onChange={handleHybridChange} />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">Calculate Hybrid</button>
          </div>
        </form>
        {hybridResult !== null && (
          <div className="result-box">
            <h3>Hybrid Marks</h3>
            <div className={`result-value ${highlightHybrid ? "highlight" : ""}`}>
              {hybridResult} / 75
            </div>
          </div>
        )}
      </div>

      {/* -------- PRACTICAL TAB -------- */}
      <div className={`tab-pane ${activeTab === "practical" ? "active" : ""}`}>
        <form onSubmit={handlePracticalSubmit}>
          <div className="form-grid">
            <FormInput id="pa1" label="Practical Assessment 1" max="30" value={practicalMarks.pa1} onChange={handlePracticalChange} />
            <FormInput id="pa2" label="Practical Assessment 2" max="30" value={practicalMarks.pa2} onChange={handlePracticalChange} />
            <FormInput id="pa3" label="Practical Assessment 3" max="30" value={practicalMarks.pa3} onChange={handlePracticalChange} />
            <FormInput id="pmst" label="Practical MST" max="30" value={practicalMarks.pmst} onChange={handlePracticalChange} />
            <FormInput id="viva" label="External Viva" max="40" value={practicalMarks.viva} onChange={handlePracticalChange} />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">Calculate Practical</button>
          </div>
        </form>
        {practicalResult !== null && (
          <div className="result-box">
            <h3>Practical Marks</h3>
            <div className={`result-value ${highlightPractical ? "highlight" : ""}`}>
              {practicalResult} / 100
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternalMarks1Year;

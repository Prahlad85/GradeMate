// src/pages/InternalMarks2Year.jsx
import React, { useState } from "react";

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

const InternalMarks2Year = () => {
  const [activeTab, setActiveTab] = useState("hybrid");

  // ---------------- HYBRID STATE ----------------
  const [hybridMarks, setHybridMarks] = useState({
    assignment: "",
    attendance: "",
    surprise: "",
    quiz: "",
    mst1: "",
    mst2: "",
    caseStudy: "",
    worksheet1: "",
    worksheet2: "",
    worksheet3: "",
    worksheet4: "",
    classPerformance: "",
    courseProject: "",
    industryAssessment: "",
    end: "",
  });

  const [hybridResult, setHybridResult] = useState(null);
  const [highlightHybrid, setHighlightHybrid] = useState(false);

  // ---------------- THEORY STATE ----------------
  const [theoryMarks, setTheoryMarks] = useState({
    assignment: "",
    attendance: "",
    surprise: "",
    quiz: "",
    mst1: "",
    mst2: "",
  });

  const [theoryResult, setTheoryResult] = useState(null);
  const [highlightTheory, setHighlightTheory] = useState(false);

  // ---------------- PRACTICAL STATE ----------------
  const [practicalMarks, setPracticalMarks] = useState({
    exp1: "",
    exp2: "",
    exp3: "",
    exp4: "",
    classPerformance: "",
    courseProject: "",
    industryAssessment: "",
    endSemPractical: "",
  });

  const [practicalResult, setPracticalResult] = useState(null);
  const [highlightPractical, setHighlightPractical] = useState(false);

  const parse = (val) => parseFloat(val) || 0;

  // ---------- Input Handlers ----------
  const genericHandler = (setter) => (e) => {
    const { id, value, max } = e.target;
    let num = parseFloat(value);
    if (num > max) num = max;
    if (num < 0) num = 0;

    setter((prev) => ({
      ...prev,
      [id]: isNaN(num) ? "" : num,
    }));
  };

  const handleHybridChange = genericHandler(setHybridMarks);
  const handleTheoryChange = genericHandler(setTheoryMarks);
  const handlePracticalChange = genericHandler(setPracticalMarks);

  // ---------------- HYBRID SUBMIT ----------------
  const handleHybridSubmit = (e) => {
    e.preventDefault();
    const m = hybridMarks;

    const total =
      (parse(m.assignment) / 10) * 5 +
      (parse(m.mst1) / 20) * 5 +
      (parse(m.mst2) / 20) * 5 +
      (parse(m.surprise) / 12) * 2 +
      (parse(m.quiz) / 4) * 2 +
      (parse(m.caseStudy) / 10) * 5 +
      (parse(m.attendance) / 2) * 1 +
      (parse(m.worksheet1) / 30) * 5 +
      (parse(m.worksheet2) / 30) * 5 +
      (parse(m.worksheet3) / 30) * 5 +
      (parse(m.worksheet4) / 30) * 5 +
      (parse(m.classPerformance) / 10) * 2.5 +
      (parse(m.courseProject) / 5) * 2.5 +
      (parse(m.industryAssessment) / 10) * 5 +
      (parse(m.end) / 40) * 20;

    setHybridResult(total.toFixed(2));
    setHighlightHybrid(true);
    setTimeout(() => setHighlightHybrid(false), 1000);
  };

  // ---------------- THEORY SUBMIT ----------------
  const handleTheorySubmit = (e) => {
    e.preventDefault();
    const m = theoryMarks;

    const total =
      parse(m.assignment) +
      parse(m.quiz) +
      (parse(m.mst1) + parse(m.mst2)) / 2 +
      parse(m.attendance) +
      (parse(m.surprise) / 12) * 4;

    setTheoryResult(total.toFixed(2));
    setHighlightTheory(true);
    setTimeout(() => setHighlightTheory(false), 1000);
  };

  // ---------------- PRACTICAL SUBMIT ----------------
  const handlePracticalSubmit = (e) => {
    e.preventDefault();
    const m = practicalMarks;

    const total =
      (parse(m.exp1) / 30) * 10 +
      (parse(m.exp2) / 30) * 10 +
      (parse(m.exp3) / 30) * 10 +
      (parse(m.exp4) / 30) * 10 +
      (parse(m.classPerformance) / 10) * 5 +
      (parse(m.courseProject) / 5) * 5 +
      (parse(m.industryAssessment) / 10) * 10 +
      (parse(m.endSemPractical) / 40) * 40;

    setPracticalResult(total.toFixed(2));
    setHighlightPractical(true);
    setTimeout(() => setHighlightPractical(false), 1000);
  };

  return (
    <div className="calculator-container2">
      <h1>Internal Marks (CSE/IT 2nd Year)</h1>

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

      {/* -------- HYBRID TAB -------- */}
      <div className={`tab-pane ${activeTab === "hybrid" ? "active" : ""}`}>
        <form onSubmit={handleHybridSubmit}>
          <div className="form-grid">
            {Object.keys(hybridMarks).map((key) => {
              const maxValues = {
                assignment: 10,
                attendance: 2,
                surprise: 12,
                quiz: 4,
                mst1: 20,
                mst2: 20,
                caseStudy: 10,
                worksheet1: 30,
                worksheet2: 30,
                worksheet3: 30,
                worksheet4: 30,
                classPerformance: 10,
                courseProject: 5,
                industryAssessment: 10,
                end: 40,
              };
              return (
                <FormInput
                  key={key}
                  id={key}
                  label={key.replace(/([A-Z])/g, " $1")}
                  max={maxValues[key]}
                  value={hybridMarks[key]}
                  onChange={handleHybridChange}
                />
              );
            })}
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Calculate Hybrid
            </button>
          </div>
        </form>

        {hybridResult !== null && (
          <div className="result-box">
            <h3>Hybrid Marks</h3>
            <div
              className={`result-value ${highlightHybrid ? "highlight" : ""}`}
            >
              {hybridResult} / 70
            </div>
          </div>
        )}
      </div>

      {/* -------- THEORY TAB -------- */}
      <div className={`tab-pane ${activeTab === "theory" ? "active" : ""}`}>
        <form onSubmit={handleTheorySubmit}>
          <div className="form-grid">
            <FormInput
              id="assignment"
              label="Assignment"
              max="10"
              value={theoryMarks.assignment}
              onChange={handleTheoryChange}
            />
            <FormInput
              id="attendance"
              label="Attendance"
              max="2"
              value={theoryMarks.attendance}
              onChange={handleTheoryChange}
            />
            <FormInput
              id="surprise"
              label="Surprise Test"
              max="12"
              value={theoryMarks.surprise}
              onChange={handleTheoryChange}
            />
            <FormInput
              id="quiz"
              label="Quiz"
              max="4"
              value={theoryMarks.quiz}
              onChange={handleTheoryChange}
            />
            <FormInput
              id="mst1"
              label="MST 1"
              max="20"
              value={theoryMarks.mst1}
              onChange={handleTheoryChange}
            />
            <FormInput
              id="mst2"
              label="MST 2"
              max="20"
              value={theoryMarks.mst2}
              onChange={handleTheoryChange}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Calculate Theory
            </button>
          </div>
        </form>

        {theoryResult !== null && (
          <div className="result-box">
            <h3>Theory Marks</h3>
            <div
              className={`result-value ${highlightTheory ? "highlight" : ""}`}
            >
              {theoryResult} / 40
            </div>
          </div>
        )}
      </div>

      {/* -------- PRACTICAL TAB -------- */}
      <div className={`tab-pane ${activeTab === "practical" ? "active" : ""}`}>
        <form onSubmit={handlePracticalSubmit}>
          <div className="form-grid">
            <FormInput
              id="exp1"
              label="Experiment 1"
              max="30"
              value={practicalMarks.exp1}
              onChange={handlePracticalChange}
            />
            <FormInput
              id="exp2"
              label="Experiment 2"
              max="30"
              value={practicalMarks.exp2}
              onChange={handlePracticalChange}
            />
            <FormInput
              id="exp3"
              label="Experiment 3"
              max="30"
              value={practicalMarks.exp3}
              onChange={handlePracticalChange}
            />
            <FormInput
              id="exp4"
              label="Experiment 4"
              max="30"
              value={practicalMarks.exp4}
              onChange={handlePracticalChange}
            />
            <FormInput
              id="classPerformance"
              label="Class Performance"
              max="10"
              value={practicalMarks.classPerformance}
              onChange={handlePracticalChange}
            />
            <FormInput
              id="courseProject"
              label="Course Project"
              max="5"
              value={practicalMarks.courseProject}
              onChange={handlePracticalChange}
            />
            <FormInput
              id="industryAssessment"
              label="Industry Assessment"
              max="10"
              value={practicalMarks.industryAssessment}
              onChange={handlePracticalChange}
            />
            <FormInput
              id="endSemPractical"
              label="End Sem Practical External"
              max="40"
              value={practicalMarks.endSemPractical}
              onChange={handlePracticalChange}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Calculate Practical
            </button>
          </div>
        </form>

        {practicalResult !== null && (
          <div className="result-box">
            <h3>Practical Marks</h3>
            <div
              className={`result-value ${
                highlightPractical ? "highlight" : ""
              }`}
            >
              {practicalResult} / 100
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternalMarks2Year;

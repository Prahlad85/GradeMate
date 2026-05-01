// src/pages/AptitudeCalculator.jsx
import React, { useState } from "react";
import "./calculators.css";

// Reusable Input Component
const FormInput = ({ id, label, max, weightage, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label}
      <span className="apt-meta">
        Max: {max}
      </span>
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

// Score breakdown row
const ScoreRow = ({ label, obtained, max, weightage, scaled }) => (
  <tr>
    <td>{label}</td>
    <td>
      {obtained} / {max}
    </td>
    <td>{weightage}</td>
    <td className="apt-scaled">{scaled.toFixed(2)}</td>
  </tr>
);

const components = [
  { key: "mst1",      label: "MST 1",       max: 20, weightage: 10 },
  { key: "mst2",      label: "MST 2",       max: 20, weightage: 10 },
  { key: "assignment",label: "Assignment",   max: 12, weightage: 6  },
  { key: "surprise",  label: "Surprise Test",max: 12, weightage: 4  },
  { key: "quiz",      label: "Quiz",         max: 6,  weightage: 6  },
  { key: "attendance",label: "Attendance",   max: 4,  weightage: 4  },
];

const initialMarks = components.reduce((acc, c) => ({ ...acc, [c.key]: "" }), {});

const AptitudeCalculator = () => {
  const [marks, setMarks] = useState(initialMarks);
  const [result, setResult] = useState(null);
  const [highlight, setHighlight] = useState(false);

  const parse = (val) => Math.min(Math.max(parseFloat(val) || 0, 0), Infinity);

  const handleChange = (e) => {
    const { id, value, max } = e.target;
    let num = parseFloat(value);
    if (num > parseFloat(max)) num = parseFloat(max);
    if (num < 0) num = 0;
    setMarks((prev) => ({ ...prev, [id]: isNaN(num) ? "" : num }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const breakdown = components.map((c) => {
      const obtained = parse(marks[c.key]);
      const scaled = (obtained / c.max) * c.weightage;
      return { ...c, obtained, scaled };
    });
    const total = breakdown.reduce((sum, r) => sum + r.scaled, 0);
    setResult({ breakdown, total });
    setHighlight(true);
    setTimeout(() => setHighlight(false), 1000);
  };

  const handleReset = () => {
    setMarks(initialMarks);
    setResult(null);
  };

  const getGrade = (total) => {
    if (total >= 36) return { label: "O (Outstanding)", color: "#00c853" };
    if (total >= 32) return { label: "A+ (Excellent)", color: "#00bcd4" };
    if (total >= 28) return { label: "A (Very Good)", color: "#2196f3" };
    if (total >= 24) return { label: "B+ (Good)", color: "#9c27b0" };
    if (total >= 20) return { label: "B (Average)", color: "#ff9800" };
    return { label: "Needs Improvement", color: "#f44336" };
  };

  return (
    <div className="calculator-container2 apt-wrapper">
      <div className="apt-header">
        <h1>Aptitude Internal Marks</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {components.map((c) => (
            <FormInput
              key={c.key}
              id={c.key}
              label={c.label}
              max={c.max}
              weightage={c.weightage}
              value={marks[c.key]}
              onChange={handleChange}
            />
          ))}
        </div>

        {/* Weightage info bar */}
        <div className="apt-info-bar">
          <span>📊 Total Weightage: <strong>40 marks</strong></span>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Calculate Marks
          </button>
        </div>
      </form>

      {result !== null && (
        <div className="result-box apt-result-box">
          {/* Main Score */}
          <h3>Your Aptitude Internal Marks</h3>
          <div className={`result-value ${highlight ? "highlight" : ""}`}>
            {result.total.toFixed(2)} <span className="apt-out-of">/ 40</span>
          </div>

          {/* Grade Badge */}
          <div
            className="apt-grade-badge"
            style={{ backgroundColor: getGrade(result.total).color }}
          >
            {getGrade(result.total).label}
          </div>

          {/* Progress Bar */}
          <div className="apt-progress-wrap">
            <div
              className="apt-progress-bar"
              style={{ width: `${(result.total / 40) * 100}%` }}
            />
          </div>
          <p className="apt-percent">
            {((result.total / 40) * 100).toFixed(1)}% scored
          </p>
        </div>
      )}
    </div>
  );
};

export default AptitudeCalculator;

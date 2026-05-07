// src/pages/AptitudeCalculator.jsx
import React, { useState } from "react";
import "./calculators.css";

// Reusable Input Component
const FormInput = ({ id, label, max, value, onChange }) => (
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

const components = [
  { key: "mst1", label: "MST 1", max: 20, weightage: 10 },
  { key: "mst2", label: "MST 2", max: 20, weightage: 10 },
  { key: "assignment", label: "Assignment", max: 12, weightage: 6 },
  { key: "surprise", label: "Surprise Test", max: 12, weightage: 4 },
  { key: "quiz", label: "Quiz", max: 6, weightage: 6 },
  { key: "attendance", label: "Attendance", max: 4, weightage: 4 },

  // External
  { key: "finalcbt", label: "Final CBT", max: 160, weightage: 60 },
];

const initialMarks = components.reduce(
  (acc, c) => ({ ...acc, [c.key]: "" }),
  {}
);

const AptitudeCalculator = () => {
  const [marks, setMarks] = useState(initialMarks);
  const [result, setResult] = useState(null);
  const [highlight, setHighlight] = useState(false);

  const parse = (val) =>
    Math.min(Math.max(parseFloat(val) || 0, 0), Infinity);

  const handleChange = (e) => {
    const { id, value, max } = e.target;

    let num = parseFloat(value);

    if (num > parseFloat(max)) num = parseFloat(max);
    if (num < 0) num = 0;

    setMarks((prev) => ({
      ...prev,
      [id]: isNaN(num) ? "" : num,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Internal Total (40)
    const internalComponents = components.filter(
      (c) => c.key !== "finalcbt"
    );

    const internalTotal = internalComponents.reduce((sum, c) => {
      const obtained = parse(marks[c.key]);
      const scaled = (obtained / c.max) * c.weightage;
      return sum + scaled;
    }, 0);

    // External Total (60)
    const finalObtained = parse(marks.finalcbt);

    const externalTotal =
      (finalObtained / 160) * 60;

    // Grand Total (100)
    const total = internalTotal + externalTotal;

    setResult({
      internalTotal,
      externalTotal,
      total,
    });

    setHighlight(true);

    setTimeout(() => setHighlight(false), 1000);
  };

  const handleReset = () => {
    setMarks(initialMarks);
    setResult(null);
  };

  const getGrade = (total) => {
    if (total >= 90)
      return { label: "O (Outstanding)", color: "#00c853" };

    if (total >= 80)
      return { label: "A+ (Excellent)", color: "#00bcd4" };

    if (total >= 70)
      return { label: "A (Very Good)", color: "#2196f3" };

    if (total >= 60)
      return { label: "B+ (Good)", color: "#9c27b0" };

    if (total >= 50)
      return { label: "B (Average)", color: "#ff9800" };

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
              value={marks[c.key]}
              onChange={handleChange}
            />
          ))}
        </div>

        {/* Weightage info */}
        <div className="apt-info-bar">
          <span>
            📊 Internal: <strong>40</strong> | External:{" "}
            <strong>60</strong> | Total:{" "}
            <strong>100</strong>
          </span>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Calculate Marks
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>

      {result !== null && (
        <div className="result-box apt-result-box">
          <h3>Result Summary</h3>

          {/* Internal */}
          <div className="apt-summary-item">
            <span>Internal Marks</span>

            <div className="result-value">
              {result.internalTotal.toFixed(2)}
              <span className="apt-out-of"> / 40</span>
            </div>
          </div>

          {/* External */}
          <div className="apt-summary-item">
            <span>External Marks</span>

            <div className="result-value">
              {result.externalTotal.toFixed(2)}
              <span className="apt-out-of"> / 60</span>
            </div>
          </div>

          {/* Total */}
          <div className="apt-summary-item total-score">
            <span>Total Marks</span>

            <div className={`result-value ${highlight ? "highlight" : ""}`}>
              {result.total.toFixed(2)}
              <span className="apt-out-of"> / 100</span>
            </div>
          </div>

          {/* Grade */}
          <div
            className="apt-grade-badge"
            style={{
              backgroundColor: getGrade(result.total).color,
            }}
          >
            {getGrade(result.total).label}
          </div>

          {/* Progress Bar */}
          <div className="apt-progress-wrap">
            <div
              className="apt-progress-bar"
              style={{
                width: `${result.total}%`,
              }}
            />
          </div>

          <p className="apt-percent">
            {result.total.toFixed(1)}% scored
          </p>
        </div>
      )}
    </div>
  );
};

export default AptitudeCalculator;

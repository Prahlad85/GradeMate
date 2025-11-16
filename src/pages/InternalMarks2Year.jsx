// src/pages/InternalMarks2Year.jsx
import React, { useState } from 'react';

// Helper component for form input
const FormInput = ({ id, label, max, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={id}>{label} (Max: {max})</label>
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
  const [activeTab, setActiveTab] = useState('hybrid');
  
  // State for Hybrid
  const [hybridMarks, setHybridMarks] = useState({
    assignment: '', attendance: '', surprise: '', quiz: '',
    mst1: '', mst2: '', end: '', worksheet1: '', worksheet2: '',
    worksheet3: '', worksheet4: '', classPerformance: '', courseProject: '',
  });
  const [hybridResult, setHybridResult] = useState(null);
  const [highlightHybrid, setHighlightHybrid] = useState(false);

  // State for Theory
  const [theoryMarks, setTheoryMarks] = useState({
    assignment: '', attendance: '', surprise: '', quiz: '',
    mst1: '', mst2: '',
  });
  const [theoryResult, setTheoryResult] = useState(null);
  const [highlightTheory, setHighlightTheory] = useState(false);

  const handleHybridChange = (e) => {
    const { id, value } = e.target;
    const max = parseFloat(e.target.max);
    let numValue = parseFloat(value);
    
    if (numValue > max) numValue = max;
    if (numValue < 0) numValue = 0;

    setHybridMarks(prev => ({ ...prev, [id]: isNaN(numValue) ? '' : numValue }));
  };

  const handleTheoryChange = (e) => {
    const { id, value } = e.target;
    const max = parseFloat(e.target.max);
    let numValue = parseFloat(value);
    
    if (numValue > max) numValue = max;
    if (numValue < 0) numValue = 0;
    
    setTheoryMarks(prev => ({ ...prev, [id]: isNaN(numValue) ? '' : numValue }));
  };

  const parse = (val) => parseFloat(val) || 0;

  const handleHybridSubmit = (e) => {
    e.preventDefault();
    const m = hybridMarks;
    const surpriseScaled = (parse(m.surprise) / 12) * 4;
    const mstAvg = (parse(m.mst1) + parse(m.mst2)) / 2;
    const worksheet = ((parse(m.worksheet1) + parse(m.worksheet2) + parse(m.worksheet3) + parse(m.worksheet4)) / 120) * 40;
    const classPerformanceScaled = (parse(m.classPerformance) / 10) * 10;
    const courseProjectScaled = (parse(m.courseProject) / 10) * 10;
    
    const total = (
      (parse(m.assignment) + parse(m.quiz) + mstAvg + parse(m.attendance) + 
      surpriseScaled + worksheet + parse(m.end) + courseProjectScaled + classPerformanceScaled) / 140
    ) * 70;

    setHybridResult(total.toFixed(2));
    setHighlightHybrid(true);
    setTimeout(() => setHighlightHybrid(false), 1000);
  };

  const handleTheorySubmit = (e) => {
    e.preventDefault();
    const m = theoryMarks;
    const surpriseScaled = (parse(m.surprise) / 12) * 4;
    const mstAvg = (parse(m.mst1) + parse(m.mst2)) / 2;

    const total = parse(m.assignment) + parse(m.quiz) + mstAvg + parse(m.attendance) + surpriseScaled;
    
    setTheoryResult(total.toFixed(2));
    setHighlightTheory(true);
    setTimeout(() => setHighlightTheory(false), 1000);
  };

  return (
    <div className="calculator-container2">
      <h1>Internal Marks (CSE/IT 2nd Year)</h1>
      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'hybrid' ? 'active' : ''}`}
          onClick={() => setActiveTab('hybrid')}
        >
          Hybrid
        </button>
        <button
          className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
          onClick={() => setActiveTab('theory')}
        >
          Theory
        </button>
      </nav>

      {/* Hybrid Tab */}
      <div className={`tab-pane ${activeTab === 'hybrid' ? 'active' : ''}`}>
        <form onSubmit={handleHybridSubmit}>
          <div className="form-grid">
            <FormInput id="assignment" label="Assignment" max="10" value={hybridMarks.assignment} onChange={handleHybridChange} />
            <FormInput id="attendance" label="Attendance" max="2" value={hybridMarks.attendance} onChange={handleHybridChange} />
            <FormInput id="surprise" label="Surprise Test" max="12" value={hybridMarks.surprise} onChange={handleHybridChange} />
            <FormInput id="quiz" label="Quiz" max="4" value={hybridMarks.quiz} onChange={handleHybridChange} />
            <FormInput id="mst1" label="MST 1" max="20" value={hybridMarks.mst1} onChange={handleHybridChange} />
            <FormInput id="mst2" label="MST 2" max="20" value={hybridMarks.mst2} onChange={handleHybridChange} />
            <FormInput id="end" label="End Term (Practical)" max="20" value={hybridMarks.end} onChange={handleHybridChange} />
            <FormInput id="worksheet1" label="Worksheet 1" max="30" value={hybridMarks.worksheet1} onChange={handleHybridChange} />
            <FormInput id="worksheet2" label="Worksheet 2" max="30" value={hybridMarks.worksheet2} onChange={handleHybridChange} />
            <FormInput id="worksheet3" label="Worksheet 3" max="30" value={hybridMarks.worksheet3} onChange={handleHybridChange} />
            <FormInput id="worksheet4" label="Worksheet 4" max="30" value={hybridMarks.worksheet4} onChange={handleHybridChange} />
            <FormInput id="classPerformance" label="Class Performance" max="10" value={hybridMarks.classPerformance} onChange={handleHybridChange} />
            <FormInput id="courseProject" label="Course Project" max="10" value={hybridMarks.courseProject} onChange={handleHybridChange} />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">Calculate Hybrid</button>
          </div>
        </form>
        {hybridResult !== null && (
          <div className="result-box">
            <h3>Hybrid Marks</h3>
            <div className={`result-value ${highlightHybrid ? 'highlight' : ''}`}>
              {hybridResult} / 70
            </div>
          </div>
        )}
      </div>

      {/* Theory Tab */}
      <div className={`tab-pane ${activeTab === 'theory' ? 'active' : ''}`}>
        <form onSubmit={handleTheorySubmit}>
          <div className="form-grid">
            <FormInput id="assignment" label="Assignment" max="10" value={theoryMarks.assignment} onChange={handleTheoryChange} />
            <FormInput id="attendance" label="Attendance" max="2" value={theoryMarks.attendance} onChange={handleTheoryChange} />
            <FormInput id="surprise" label="Surprise Test" max="12" value={theoryMarks.surprise} onChange={handleTheoryChange} />
            <FormInput id="quiz" label="Quiz" max="4" value={theoryMarks.quiz} onChange={handleTheoryChange} />
            <FormInput id="mst1" label="MST 1" max="20" value={theoryMarks.mst1} onChange={handleTheoryChange} />
            <FormInput id="mst2" label="MST 2" max="20" value={theoryMarks.mst2} onChange={handleTheoryChange} />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">Calculate Theory</button>
          </div>
        </form>
        {theoryResult !== null && (
          <div className="result-box">
            <h3>Theory Marks</h3>
            <div className={`result-value ${highlightTheory ? 'highlight' : ''}`}>
              {theoryResult} / 40
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternalMarks2Year;
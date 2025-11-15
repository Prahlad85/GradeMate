// src/pages/InternalMarks3Year.jsx
import React, { useState } from 'react';
import ExperimentInputs from '../components/ExperimentInputs'; // Reusable component

// Helper component for form input
const FormInput = ({ id, label, max, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={id}>{label} (Max: {max})</label>
    <input
      type="number"
      id={id}
      value={value}
      onChange={onChange}
      min="0"
      max={max}
      placeholder="0"
    />
  </div>
);

const InternalMarks3Year = () => {
  const [activeTab, setActiveTab] = useState('theory');

  // Parse + limit values
  const getScore = (value, max) => {
    let num = parseFloat(value) || 0;
    if (num < 0) num = 0;
    if (num > max) num = max;
    return num;
  };

  /* ----------------------- THEORY ------------------------ */

  const [theoryMarks, setTheoryMarks] = useState({
    mst1: '', mst2: '', assign: '', att: '', surprise: '', quiz: ''
  });

  const [theoryResult, setTheoryResult] = useState(null);

  const handleTheoryChange = (e) => {
    setTheoryMarks(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCalcTheory = () => {
    const mst1 = (getScore(theoryMarks.mst1, 20) / 20) * 10;
    const mst2 = (getScore(theoryMarks.mst2, 20) / 20) * 10;
    const assign = (getScore(theoryMarks.assign, 10) / 10) * 10;
    const att = (getScore(theoryMarks.att, 2) / 2) * 2;
    const surprise = (getScore(theoryMarks.surprise, 12) / 12) * 4;
    const quiz = (getScore(theoryMarks.quiz, 4) / 4) * 4;

    const total = mst1 + mst2 + assign + att + surprise + quiz;
    setTheoryResult(total.toFixed(2));
  };

  /* ----------------------- HYBRID ------------------------ */

  const [hybridMarks, setHybridMarks] = useState({
    pmst: '', mst1: '', mst2: '', assign: '', att: '', surprise: '', quiz: ''
  });

  const [hybridExpScores, setHybridExpScores] = useState(Array(10).fill(''));
  const [hybridResult, setHybridResult] = useState(null);

  const handleHybridChange = (e) => {
    setHybridMarks(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCalcHybrid = () => {
    const totalExp = hybridExpScores.reduce((s, v) => s + getScore(v, 30), 0);
    const exp = (totalExp / 300) * 30;

    const pmst = (getScore(hybridMarks.pmst, 10) / 10) * 10;
    const mst1 = (getScore(hybridMarks.mst1, 20) / 20) * 5;
    const mst2 = (getScore(hybridMarks.mst2, 20) / 20) * 5;
    const assign = (getScore(hybridMarks.assign, 10) / 10) * 10;
    const att = (getScore(hybridMarks.att, 2) / 2) * 2;
    const surprise = (getScore(hybridMarks.surprise, 12) / 12) * 4;
    const quiz = (getScore(hybridMarks.quiz, 4) / 4) * 4;

    const total = exp + pmst + mst1 + mst2 + assign + att + surprise + quiz;
    setHybridResult(total.toFixed(2));
  };

  /* ----------------------- PRACTICAL ------------------------ */

  const [practicalMarks, setPracticalMarks] = useState({ mid: '' });
  const [practicalExpScores, setPracticalExpScores] = useState(Array(10).fill(''));
  const [practicalResult, setPracticalResult] = useState(null);

  const handlePracticalChange = (e) => {
    setPracticalMarks(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCalcPractical = () => {
    const totalExp = practicalExpScores.reduce((s, v) => s + getScore(v, 30), 0);
    const exp = (totalExp / 300) * 45;

    const mid = (getScore(practicalMarks.mid, 15) / 15) * 15;

    const total = exp + mid;
    setPracticalResult(total.toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h1>Internal Marks (CSE/IT 3rd Year)</h1>

      {/* ---------------- TAB BUTTONS ---------------- */}
      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
          onClick={() => setActiveTab('theory')}
        >
          Theory
        </button>

        <button
          className={`tab-btn ${activeTab === 'hybrid' ? 'active' : ''}`}
          onClick={() => setActiveTab('hybrid')}
        >
          Hybrid
        </button>

        <button
          className={`tab-btn ${activeTab === 'practical' ? 'active' : ''}`}
          onClick={() => setActiveTab('practical')}
        >
          Practical
        </button>
      </nav>

      {/* ---------------- THEORY TAB ---------------- */}
      <div className={`tab-pane ${activeTab === 'theory' ? 'active' : ''}`}>
        <div className="form-grid">
          <FormInput id="mst1" label="MST 1" max="20" value={theoryMarks.mst1} onChange={handleTheoryChange} />
          <FormInput id="mst2" label="MST 2" max="20" value={theoryMarks.mst2} onChange={handleTheoryChange} />
          <FormInput id="assign" label="Assignment" max="10" value={theoryMarks.assign} onChange={handleTheoryChange} />
          <FormInput id="att" label="Attendance" max="2" value={theoryMarks.att} onChange={handleTheoryChange} />
          <FormInput id="surprise" label="Surprise Test" max="12" value={theoryMarks.surprise} onChange={handleTheoryChange} />
          <FormInput id="quiz" label="Quiz" max="4" value={theoryMarks.quiz} onChange={handleTheoryChange} />
        </div>

        <div className="button-group">
          <button className="btn btn-primary" onClick={handleCalcTheory}>Calculate Theory</button>
        </div>

        {theoryResult !== null && (
          <div className="result-box">
            <h3>Theory Marks</h3>
            <div className="result-value">{theoryResult} / 40</div>
          </div>
        )}
      </div>

      {/* ---------------- HYBRID TAB ---------------- */}
      <div className={`tab-pane ${activeTab === 'hybrid' ? 'active' : ''}`}>
        <div className="form-grid">
          <FormInput id="pmst" label="PMST" max="10" value={hybridMarks.pmst} onChange={handleHybridChange} />
          <FormInput id="mst1" label="MST 1" max="20" value={hybridMarks.mst1} onChange={handleHybridChange} />
          <FormInput id="mst2" label="MST 2" max="20" value={hybridMarks.mst2} onChange={handleHybridChange} />
          <FormInput id="assign" label="Assignment" max="10" value={hybridMarks.assign} onChange={handleHybridChange} />
          <FormInput id="att" label="Attendance" max="2" value={hybridMarks.att} onChange={handleHybridChange} />
          <FormInput id="surprise" label="Surprise Test" max="12" value={hybridMarks.surprise} onChange={handleHybridChange} />
          <FormInput id="quiz" label="Quiz" max="4" value={hybridMarks.quiz} onChange={handleHybridChange} />
        </div>

        <ExperimentInputs 
          prefix="h"
          scores={hybridExpScores}
          setScores={setHybridExpScores}
          maxScore={30}
        />

        <div className="button-group">
          <button className="btn btn-primary" onClick={handleCalcHybrid}>Calculate Hybrid</button>
        </div>

        {hybridResult !== null && (
          <div className="result-box">
            <h3>Hybrid Marks</h3>
            <div className="result-value">{hybridResult} / 70</div>
          </div>
        )}
      </div>

      {/* ---------------- PRACTICAL TAB ---------------- */}
      <div className={`tab-pane ${activeTab === 'practical' ? 'active' : ''}`}>
        <div className="form-grid">
          <FormInput id="mid" label="Mid-Term Eval" max="15" value={practicalMarks.mid} onChange={handlePracticalChange} />
        </div>

        <ExperimentInputs
          prefix="p"
          scores={practicalExpScores}
          setScores={setPracticalExpScores}
          maxScore={30}
        />

        <div className="button-group">
          <button className="btn btn-primary" onClick={handleCalcPractical}>Calculate Practical</button>
        </div>

        {practicalResult !== null && (
          <div className="result-box">
            <h3>Practical Marks</h3>
            <div className="result-value">{practicalResult} / 60</div>
          </div>
        )}
      </div>

    </div>
  );
};

export default InternalMarks3Year;

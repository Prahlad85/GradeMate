// src/components/ExperimentInputs.jsx
import React from 'react';

const ExperimentInputs = ({ prefix, scores, setScores, maxScore = 30 }) => {
  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    let numValue = parseFloat(value);

    if (isNaN(numValue) || numValue < 0) {
      numValue = 0;
    } else if (numValue > maxScore) {
      numValue = maxScore;
    }

    newScores[index] = numValue;
    setScores(newScores);
  };

  return (
    <div className="experiment-grid">
      <h4>Experiment Scores (Out of {maxScore} each)</h4>
      {[...Array(10)].map((_, i) => (
        <div className="form-group" key={i}>
          <label htmlFor={`${prefix}-exp-${i + 1}`}>Experiment {i + 1}</label>
          <input
            type="number"
            id={`${prefix}-exp-${i + 1}`}
            value={scores[i] || ''}
            onChange={(e) => handleScoreChange(i, e.target.value)}
            placeholder="0"
            min="0"
            max={maxScore}
          />
        </div>
      ))}
    </div>
  );
};

export default ExperimentInputs;
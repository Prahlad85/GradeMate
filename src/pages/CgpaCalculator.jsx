// src/pages/CgpaCalculator.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./CgpaCalculator.css";

// Grade points map
const gradePointsMap = {
  'A+': 10, A: 9, 'B+': 8, B: 7, 'C+': 6,
  C: 5, D: 4, E: 0, F: 0, I: 0, X: 0,
};

const CgpaCalculator = () => {
  const [subjectCounter, setSubjectCounter] = useState(1);
  const [currentCourse, setCurrentCourse] = useState({
    name: `subject-${subjectCounter}`,
    credits: '',
    grade: 'A+',
  });
  const [addedCourses, setAddedCourses] = useState([]);
  const [results, setResults] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCurrentCourseChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!currentCourse.credits || !currentCourse.grade) {
      setErrorMsg('Please fill all fields before adding the course.');
      return;
    }
    setAddedCourses([...addedCourses, { ...currentCourse, id: subjectCounter }]);
    const nextCounter = subjectCounter + 1;
    setSubjectCounter(nextCounter);
    setCurrentCourse({
      name: `subject-${nextCounter}`,
      credits: '',
      grade: 'A+',
    });
  };

  const handleRemoveCourse = (id) => {
    setAddedCourses(addedCourses.filter((course) => course.id !== id));
  };

  const handleCalculateCgpa = () => {
    if (addedCourses.length === 0) {
      setErrorMsg('Please add at least one course before calculating CGPA!');
      return;
    }
    let totalCredits = 0;
    let totalGradePoints = 0;
    addedCourses.forEach((course) => {
      const creditHours = parseFloat(course.credits) || 0;
      const grade = course.grade.trim();
      const gradePoint = gradePointsMap.hasOwnProperty(grade) ? gradePointsMap[grade] : 0;
      totalCredits += creditHours;
      totalGradePoints += creditHours * gradePoint;
    });
    const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    let performanceLevel;
    if (cgpa >= 9) performanceLevel = 'Outstanding 🏆';
    else if (cgpa >= 8) performanceLevel = 'Excellent 🌟';
    else if (cgpa >= 7) performanceLevel = 'Very Good 👍';
    else if (cgpa >= 6) performanceLevel = 'Good 👌';
    else if (cgpa >= 5) performanceLevel = 'Average 💪';
    else if (cgpa >= 4) performanceLevel = 'Pass 👏';
    else performanceLevel = 'Fail 😞';
    setResults({
      cgpa,
      totalCredits,
      totalGradePoints,
      totalCourses: addedCourses.length,
      performanceLevel,
    });
  };

  const handleReset = () => {
    setAddedCourses([]);
    setResults(null);
    setSubjectCounter(1);
    setCurrentCourse({ name: 'subject-1', credits: '', grade: 'A+' });
  };

  const handleDownload = () => {
    if (!results) return;
    let courseDetails = '';
    addedCourses.forEach(row => {
      courseDetails += `<tr><td>${row.name}</td><td>${row.credits}</td><td>${row.grade}</td></tr>`;
    });
    const content = `
      <html><head><title>CGPA Results</title></head>
      <body><h1>CGPA Results</h1><div><h2>${results.cgpa}</h2></div></body></html>
    `;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CGPA_Results.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="calculator-container1">
      <h1>CGPA Calculator</h1>

      {/* --- JSX STRUCTURE KO TABLE MEIN BADLA GAYA HAI --- */}
      <form className="cgpa-input-form" onSubmit={handleAddCourse}>
        
        <table className="input-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="name"
                  value={currentCourse.name}
                  onChange={handleCurrentCourseChange}
                  aria-label="Course Name"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="credits"
                  placeholder="e.g. 3"
                  value={currentCourse.credits}
                  onChange={handleCurrentCourseChange}
                  aria-label="Credits"
                />
              </td>
              <td>
                <select
                  name="grade"
                  value={currentCourse.grade}
                  onChange={handleCurrentCourseChange}
                  aria-label="Grade"
                >
                  {Object.keys(gradePointsMap).map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Full Width Add Button */}
        <button type="submit" className="btn btn-primary">
          + Add
        </button>
      </form>
      {/* --- END OF BADLAAV --- */}

      {/* Reset + Calculate in 1 Row */}
      <div className="action-row">
        <button className="btn btn-danger" onClick={handleReset}>Reset</button>
        <button className="btn btn-success" onClick={handleCalculateCgpa}>Calculate</button>
      </div>

      {/* TABLE */}
      {addedCourses.length > 0 && (
        <div className="table-responsive">
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Credits</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {addedCourses.map((course) => (
                <tr key={course.id}>
                  <td data-label="Course">{course.name}</td>
                  <td data-label="Credits">{course.credits}</td>
                  <td data-label="Grade">{course.grade}</td>
                  <td data-label="Action">
                    <button className="btn btn-danger" onClick={() => handleRemoveCourse(course.id)}>
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* RESULTS */}
      {results && (
        <div className="result-box">
          <h3>Your CGPA</h3>
          <div className="result-value">{results.cgpa}</div>
          <p>{results.performanceLevel}</p>
          <div className="button-group" style={{ justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={handleDownload}>Download Result</button>
          </div>
        </div>
      )}

      {/* Glassmorphism Error Modal */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-background border border-border shadow-2xl rounded-2xl p-6 md:p-8 max-w-sm w-full text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 mx-auto flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Notice</h3>
              <p className="text-muted-foreground mb-6">{errorMsg}</p>
              <button 
                onClick={() => setErrorMsg('')}
                className="w-full py-3 px-4 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Okay, got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CgpaCalculator;
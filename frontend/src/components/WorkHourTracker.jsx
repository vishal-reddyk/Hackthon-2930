// src/components/WorkHourTracker.jsx
import React from 'react';
import './WorkHourTracker.css';

const mockWorkHours = [
  { id: 1, studentName: 'Alice Johnson', position: 'Research Assistant', hours: 25, week: 'Week of Oct 7' },
  { id: 2, studentName: 'Bob Williams', position: 'Library Assistant', hours: 15, week: 'Week of Oct 7' },
  { id: 3, studentName: 'Charlie Davis', position: 'Teaching Assistant', hours: 18, week: 'Week of Oct 7' },
];

const WorkHourTracker = ({ onBack }) => {
  return (
    <div className="work-hour-tracker-container">
      <div className="header-actions">
        <button onClick={onBack} className="back-button">
          <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
        </button>
      </div>
      <h2>Student Work Hour Tracker</h2>
      <p>View and manage submitted work hours by students.</p>
      
      <table className="work-hours-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Position</th>
            <th>Hours Worked</th>
            <th>Week</th>
          </tr>
        </thead>
        <tbody>
          {mockWorkHours.map(entry => (
            <tr key={entry.id}>
              <td>{entry.studentName}</td>
              <td>{entry.position}</td>
              <td>{entry.hours}</td>
              <td>{entry.week}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkHourTracker;
// src/components/Reports.jsx
import React from 'react';
import './Reports.css';

const mockReportData = {
  totalStudents: 45,
  totalPositions: 3,
  completedHours: 1500,
  averageHoursPerStudent: 33.3,
  popularPositions: ['Research Assistant', 'Library Assistant'],
};

const Reports = ({ onBack }) => {
  return (
    <div className="reports-container">
      <div className="header-actions">
        <button onClick={onBack} className="back-button">
          <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
        </button>
      </div>
      <h2>Performance Reports</h2>
      <p>Analyze key metrics and student work-study performance.</p>
      
      <div className="report-metrics-grid">
        <div className="report-metric-card">
          <h3>Total Students</h3>
          <span>{mockReportData.totalStudents}</span>
        </div>
        <div className="report-metric-card">
          <h3>Total Positions</h3>
          <span>{mockReportData.totalPositions}</span>
        </div>
        <div className="report-metric-card">
          <h3>Completed Hours</h3>
          <span>{mockReportData.completedHours}</span>
        </div>
        <div className="report-metric-card">
          <h3>Avg. Hours/Student</h3>
          <span>{mockReportData.averageHoursPerStudent.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="report-details-section">
        <h3>Popular Positions</h3>
        <ul>
          {mockReportData.popularPositions.map(pos => <li key={pos}>{pos}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
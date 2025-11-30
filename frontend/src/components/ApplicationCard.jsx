// src/components/ApplicationCard.jsx
import React from 'react';
import './StudentDashboard.css'; // The styling will be in this file

const ApplicationCard = ({ title, department, status, dateApplied }) => {
  return (
    <div className="application-card">
      <div className="application-details">
        <h3 className="application-title">{title}</h3>
        <p className="application-department">{department}</p>
      </div>
      <div className="application-status">
        <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
        <p className="date-applied">Applied {dateApplied}</p>
      </div>
    </div>
  );
};

export default ApplicationCard;
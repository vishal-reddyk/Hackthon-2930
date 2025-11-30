import React from 'react';
import './StudentDashboard.css'; 

const SummaryCard = ({ title, value, subtext, iconClass }) => {
  return (
    <div className="summary-card">
      <div className="summary-content">
        <h3>{title}</h3>
        <span className="summary-value">{value}</span>
        <p className="summary-subtext">{subtext}</p>
      </div>
      <div className="summary-icon">
        <i className={iconClass}></i>
      </div>
    </div>
  );
};

export default SummaryCard;
// src/components/PositionCard.jsx
import React, { useState } from 'react';
import './AdminDashboard.css'; // Reusing the Admin's styling

const PositionCard = ({
  title,
  department,
  status,
  description,
  location,
  salary,
  hours,
  deadline,
  requirements,
  applicants,
  onViewApplications,
  onRemove,
  onEdit,
  isStudentView = false, // New prop with a default value
  onApply, // New prop for student view
}) => {
  const [showManageOptions, setShowManageOptions] = useState(false);

  const handleManageClick = () => {
    setShowManageOptions(!showManageOptions);
  };

  return (
    <div className="position-card">
      <div className="card-header">
        <h3 className="position-title">{title}</h3>
        <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
      </div>
      <p className="position-department">{department}</p>
      <p className="position-description">{description}</p>
      <div className="position-details">
        <div>
          <i className="fa-solid fa-location-dot"></i> {location}
        </div>
        <div>
          <i className="fa-solid fa-dollar-sign"></i> ${salary}/hour
        </div>
        <div>
          <i className="fa-solid fa-clock"></i> {hours}
        </div>
        <div>
          <i className="fa-solid fa-calendar-days"></i> Due: {deadline}
        </div>
      </div>
      <div className="requirements">
        <h4>Requirements:</h4>
        <ul>
          {requirements.map((req, index) => (
            <li key={index}>
              <i className="fa-solid fa-check"></i> {req}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer">
        <div className="applicants">
          <i className="fa-solid fa-users"></i> {applicants} applicants
        </div>
        <div className="card-actions">
          {isStudentView ? (
            <button className="apply-button" onClick={onApply}>
              Apply
            </button>
          ) : (
            <>
              <button className="view-button" onClick={onViewApplications}>
                View Applications
              </button>
              <button className="manage-button" onClick={handleManageClick}>
                Manage
              </button>
              {showManageOptions && (
                <>
                  <button className="edit-button" onClick={onEdit}>
                    Edit
                  </button>
                  <button className="remove-button" onClick={onRemove}>
                    Remove
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PositionCard;
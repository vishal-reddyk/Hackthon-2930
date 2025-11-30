// src/components/ViewApplications.jsx
import React, { useState } from 'react';
import ReviewApplication from './ReviewApplication';
import './ViewApplications.css';

const ViewApplications = ({ position, applications, onBack, onAccept, onReject }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleReviewClick = (application) => {
    setSelectedApplication(application);
  };

  const handleBackToApplications = () => {
    setSelectedApplication(null);
  };

  if (selectedApplication) {
    return (
      <ReviewApplication
        application={selectedApplication}
        onAccept={onAccept}
        onReject={onReject}
        onBack={handleBackToApplications}
      />
    );
  }

  return (
    <div className="view-applications-container">
      <div className="header-actions">
        <button onClick={onBack} className="back-button">
          <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
        </button>
      </div>
      <h2>Applications for {position.title}</h2>
      <p className="position-details-summary">{position.department} | {position.applicants} applicants</p>

      {applications.length > 0 ? (
        <ul className="applications-list">
          {applications.map((app) => (
            <li key={app.id} className="application-item">
              <div className="applicant-info">
                <h4>{app.studentName}</h4>
                <p>Applied on: {app.date}</p>
              </div>
              <div className="application-status-badge">
                <span className={`status ${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
              </div>
              <button className="review-button" onClick={() => handleReviewClick(app)}>Review</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-applications">No applications have been submitted for this position yet.</p>
      )}
    </div>
  );
};

export default ViewApplications;
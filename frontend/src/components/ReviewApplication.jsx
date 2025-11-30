// src/components/ReviewApplication.jsx
import React from 'react';
import './ReviewApplication.css';

const ReviewApplication = ({ application, onAccept, onReject, onBack }) => {
  return (
    <div className="review-application-container">
      <div className="header-actions">
        <button onClick={onBack} className="back-button">
          <i className="fa-solid fa-arrow-left"></i> Back to Applications
        </button>
      </div>
      <h2>Application Review</h2>
      <div className="application-details-grid">
        <div className="detail-item">
          <strong>Position:</strong>
          <span>{application.positionTitle}</span>
        </div>
        <div className="detail-item">
          <strong>Full Name:</strong>
          <span>{application.studentName}</span>
        </div>
        <div className="detail-item">
          <strong>Email:</strong>
          <span>{application.email}</span>
        </div>
        <div className="detail-item">
          <strong>Phone:</strong>
          <span>{application.phone}</span>
        </div>
        <div className="detail-item">
          <strong>Major:</strong>
          <span>{application.major}</span>
        </div>
        <div className="detail-item">
          <strong>GPA:</strong>
          <span>{application.gpa}</span>
        </div>
      </div>
      <div className="experience-section">
        <h3>Relevant Experience</h3>
        <p>{application.experience || 'No experience provided.'}</p>
      </div>
      <div className="review-actions">
        <button className="accept-button" onClick={() => onAccept(application.id)}>
          Accept
        </button>
        <button className="reject-button" onClick={() => onReject(application.id)}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default ReviewApplication;
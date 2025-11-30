// src/components/ApplicationForm.jsx
import React, { useState } from 'react';
import './ApplicationForm.css';

const ApplicationForm = ({ position, onApply, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    major: '',
    gpa: '',
    experience: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply({
      ...formData,
      positionId: position.id,
      date: new Date().toLocaleDateString(),
      status: 'Pending',
    });
  };

  return (
    <div className="application-form-container">
      <h2>Apply for {position.title}</h2>
      <p className="form-subtitle">Department: {position.department}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="major">Major</label>
          <input type="text" id="major" name="major" value={formData.major} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="gpa">GPA</label>
          <input type="number" step="0.01" id="gpa" name="gpa" value={formData.gpa} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Relevant Experience</label>
          <textarea id="experience" name="experience" value={formData.experience} onChange={handleChange} />
        </div>
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
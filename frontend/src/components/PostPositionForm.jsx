// src/components/PostPositionForm.jsx
import React, { useState, useEffect } from 'react';
import './PostPositionForm.css';

const PostPositionForm = ({ onPositionPosted, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    location: '',
    salary: '',
    hours: '',
    deadline: '',
    requirements: '',
    ...initialData,
    requirements: Array.isArray(initialData?.requirements) ? initialData.requirements.join(', ') : '',
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
    const processedData = {
      ...formData,
      status: initialData ? initialData.status : 'Open',
      applicants: initialData ? initialData.applicants : 0,
      requirements: formData.requirements.split(',').map(req => req.trim()),
    };
    onPositionPosted(processedData);
  };

  return (
    <div className="post-position-container">
      <h2>{initialData ? 'Edit Position' : 'Post New Work-Study Position'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Position Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary ($/hour)</label>
          <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="hours">Hours/Week</label>
          <input type="text" id="hours" name="hours" value={formData.hours} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Application Deadline</label>
          <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="requirements">Requirements (comma-separated)</label>
          <textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">{initialData ? 'Save Changes' : 'Post Position'}</button>
      </form>
    </div>
  );
};

export default PostPositionForm;
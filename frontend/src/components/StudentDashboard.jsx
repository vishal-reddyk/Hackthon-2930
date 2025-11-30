// src/components/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import SummaryCard from './SummaryCard';
import ApplicationCard from './ApplicationCard';
import PositionCard from './PositionCard';
import ApplicationForm from './ApplicationForm';
import Timetable from './Timetable'; // Import the new component
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [positions, setPositions] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showTimetable, setShowTimetable] = useState(false); // New state to show/hide timetable

  useEffect(() => {
    try {
      const storedPositions = localStorage.getItem('positions');
      if (storedPositions) {
        setPositions(JSON.parse(storedPositions));
      }
    } catch (e) {
      console.error("Could not load positions from Local Storage", e);
    }
  }, []);

  useEffect(() => {
    try {
      const storedApplications = localStorage.getItem('applications');
      if (storedApplications) {
        setApplications(JSON.parse(storedApplications));
      }
    } catch (e) {
      console.error("Could not load applications from Local Storage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('applications', JSON.stringify(applications));
    } catch (e) {
      console.error("Could not save applications to Local Storage", e);
    }
  }, [applications]);

  const handleApplyClick = (position) => {
    setSelectedPosition(position);
  };

  const handleApplySubmit = (formData) => {
    const newApplication = {
      id: Date.now(),
      positionId: formData.positionId,
      studentName: formData.name,
      date: formData.date,
      status: formData.status,
    };
    
    setApplications((prevApps) => [newApplication, ...prevApps]);
    setSelectedPosition(null);
    alert(`Application for ${selectedPosition.title} submitted successfully!`);
  };

  const handleCancel = () => {
    setSelectedPosition(null);
    setShowTimetable(false); // Make sure timetable is hidden when form is closed
  };
  
  const summaryData = [
    { title: 'Available Positions', value: positions.length, subtext: 'Currently accepting applications', iconClass: 'fa-solid fa-list-check' },
    { title: 'My Applications', value: applications.length, subtext: 'Total submitted', iconClass: 'fa-regular fa-clock' },
    { title: 'Pending Reviews', value: applications.filter(app => app.status === 'Pending').length, subtext: 'Awaiting response', iconClass: 'fa-regular fa-eye' },
    { title: 'Work Hours', value: '0', subtext: 'This semester', iconClass: 'fa-regular fa-circle-check' },
  ];

  if (selectedPosition) {
    return (
      <ApplicationForm
        position={selectedPosition}
        onApply={handleApplySubmit}
        onCancel={handleCancel}
      />
    );
  }

  // Show the timetable if the state is true
  if (showTimetable) {
    return <Timetable />;
  }

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Student Dashboard</h2>
        <p className="dashboard-subtitle">Discover and apply for work-study opportunities</p>
        <button className="timetable-button" onClick={() => setShowTimetable(true)}>My Timetable</button>
      </div>
      <div className="summary-cards-container">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>
      <h2 className="section-title">My Applications</h2>
      <div className="applications-container">
        {applications.length > 0 ? (
          applications.map(app => (
            <ApplicationCard key={app.id} {...app} />
          ))
        ) : (
          <p>You have not submitted any applications yet.</p>
        )}
      </div>
      <h2 className="section-title">Available Positions</h2>
      <div className="positions-container">
        {positions.length > 0 ? (
          positions.map(position => (
            <PositionCard
              key={position.id}
              {...position}
              isStudentView={true}
              onApply={() => handleApplyClick(position)}
            />
          ))
        ) : (
          <p>No available positions at this time.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;